using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using USABLE.Data;
using USABLE.Models;

namespace USABLE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantController : Controller
    {
        private ApplicationDbContext dbContext;

        public RestaurantController(IConfiguration config)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseSqlServer(config.GetConnectionString("DefaultConnection"));


            dbContext = new ApplicationDbContext(optionsBuilder.Options);
        }


        //Create
        [HttpPost("CreateOrder")]
        public async Task<IActionResult> CreateOrder([FromBody] OrderRequest request)
        {
            Order order = new Order { EmployeeId = request.Employee.EmployeeId, DiscountId = request.Discount.DiscountId, DateTime = request.DateTime, TotalPrice = request.TotalPrice};

            dbContext.Orders.Add(order);
            dbContext.SaveChanges();

            foreach(Item item in request.Items)
            {
                OrderedItem orderedItem = new OrderedItem { OrderId = order.OrderId, ItemId = item.ItemId };
                dbContext.Add(orderedItem);
            }
            foreach (Tax tax in request.Taxes)
            {
                AppliedTax appliedTax = new AppliedTax { TaxId = tax.TaxId, OrderId = order.OrderId };
                dbContext.Add(appliedTax);
            }
            
            dbContext.SaveChanges();

            return Ok();
        }
        //Read
        [HttpGet("GetEmployees")]
        public async Task<IActionResult> GetEmployees()
        { 
            return Ok(await dbContext.Employees.ToListAsync());
        }

        [HttpGet("GetItems")]
        public async Task<IActionResult> GetItems()
        {
            return Ok(await dbContext.Items.ToListAsync());
        }

        [HttpGet("GetDiscounts")]
        public async Task<IActionResult> GetDiscounts()
        {
            return Ok(await dbContext.Discounts.ToListAsync());
        }

        [HttpGet("GetTaxes")]
        public async Task<IActionResult> GetTaxes()
        {
            return Ok(await dbContext.Taxes.ToListAsync());
        }

        [HttpGet("GetOrders")]
        public async Task<IActionResult> GetOrders()
        {
            var completeOrders = new List<GetOrderResponse>();
            var orders = await dbContext.Orders.ToListAsync();
            foreach(Order item in orders)
            {
                var items = new List<Item>();
                var taxes = new List<Tax>();
                GetOrderResponse response = new GetOrderResponse();
                response.Employee = dbContext.Employees
                    .Where(e => e.EmployeeId == item.EmployeeId).FirstOrDefault();
                var orderedItems = dbContext.OrderedItems
                    .Where(i => i.OrderId == item.OrderId).ToList();
                foreach (OrderedItem orderedItem in orderedItems)
                {
                    items.Add(dbContext.Items
                    .Where(i => i.ItemId == orderedItem.ItemId).FirstOrDefault());

                }
                response.Items = items;
                response.Discount = dbContext.Discounts
                    .Where(d => d.DiscountId == item.DiscountId).FirstOrDefault();
                var appliedTaxes = dbContext.AppliedTaxes
                    .Where(t => t.OrderId == item.OrderId).ToList();
                foreach(AppliedTax tax in appliedTaxes)
                {
                    taxes.Add(dbContext.Taxes
                    .Where(t => t.TaxId == tax.TaxId).FirstOrDefault());
                    
                }
                response.Taxes = taxes;
                response.DateTime = item.DateTime;

                completeOrders.Add(response);
            }
            return Ok(completeOrders);
        }
        //Update
    }
}

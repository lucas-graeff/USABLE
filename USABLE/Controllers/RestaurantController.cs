using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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

        [HttpGet("AddEmployee")]
        public async Task<IActionResult> AddEmployee()
        {
            Employee employee = new Employee { FirstName = "Lucas", LastName = "Graeff" };
            dbContext.Employees.Add(employee);
            await dbContext.SaveChangesAsync();
            return Ok();
        }

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
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using USABLE.Models;

namespace USABLE.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<OrderedItem> OrderedItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Tax> Taxes { get; set; }
        public DbSet<AppliedTax> AppliedTaxes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Essential values
        modelBuilder.Entity<Discount>()
         .HasData(
           new Discount { DiscountId = 1, Name = "Veteran", Amount = 10.0, Percentage = true },
           new Discount { DiscountId = 2, Name = "Night Owl", Amount = 2.0, Percentage = false },
           new Discount { DiscountId = 3, Name = "Early Bird", Amount = 2.0, Percentage = false }
         );

        modelBuilder.Entity<Employee>()
         .HasData(
           new Employee { EmployeeId = 1, FirstName = "John", LastName = "Doe" },
           new Employee { EmployeeId = 2, FirstName = "Jane", LastName = "Doe" }
         );

            modelBuilder.Entity<Item>()
         .HasData(
           new Item { ItemId = 1, Name = "Coke", Price = 1.25 },
           new Item { ItemId = 2, Name = "Burger", Price = 4.50 }
         );

            modelBuilder.Entity<Tax>()
         .HasData(
           new Tax { TaxId = 1, Name = "State", Percentage = 3 },
           new Tax { TaxId = 2, Name = "County", Percentage = 1 },
           new Tax { TaxId = 3, Name = "City", Percentage = 4 }
         );

            //Sample order
            modelBuilder.Entity<Order>()
         .HasData(
           new Order { OrderId = 1, EmployeeId = 2, DiscountId = 3, DateTime = new DateTime(), TotalPrice = 3.79}
         );

            modelBuilder.Entity<AppliedTax>()
         .HasData(
           new AppliedTax { AppliedTaxId = 1, TaxId = 2, OrderId = 1}
         );

            modelBuilder.Entity<OrderedItem>()
         .HasData(
           new OrderedItem{ OrderedItemsId = 1, ItemId = 1, OrderId = 1 },
           new OrderedItem { OrderedItemsId = 2, ItemId = 2, OrderId = 1 }
         );
        }
    }
}

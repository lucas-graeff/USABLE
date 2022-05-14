using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace USABLE.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class Discount
    {
        [Key]
        public int DiscountId { get; set; }
        [MaxLength(25), MinLength(1)]
        public string Name { get; set; }
        public double Amount { get; set; }
        public bool Percentage { get; set; }
    }
}

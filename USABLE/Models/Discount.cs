using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace USABLE.Models
{
    public class Discount
    {
        [Key]
        public int DiscountId { get; set; }
        public string Name { get; set; }
        public double Amount { get; set; }
        public bool Percentage { get; set; }
    }
}

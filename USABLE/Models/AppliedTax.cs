using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace USABLE.Models
{
    public class AppliedTax
    {
        [Key]
        public int AppliedTaxId { get; set; }
        public Tax Tax { get; set; }
        public int TaxId { get; set; }
        public Order Order { get; set; }
        [ForeignKey("Order")]
        public int OrderId { get; set; }
    }
}

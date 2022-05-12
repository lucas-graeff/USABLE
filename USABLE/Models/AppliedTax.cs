using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
    }
}

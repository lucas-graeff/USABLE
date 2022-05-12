using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace USABLE.Models
{
    public class Tax
    {
        [Key]
        public int TaxId { get; set; }
        public string Name { get; set; }
        public double Percentage { get; set; }
    }
}

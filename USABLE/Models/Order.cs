using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace USABLE.Models
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        public Employee Employee { get; set; }
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }
        public Discount? Discount { get; set; }
        public List<AppliedTax> AppliedTaxes { get; set; }
        public DateTime DateTime { get; set; }
        public double TotalPrice { get; set; }
    }
}

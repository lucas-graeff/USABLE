using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace USABLE.Models
{
    public class GetOrderResponse
    {
        public Employee Employee { get; set; }
        public List<Item> Items { get; set; }
        public Discount Discount { get; set; }
        public List<Tax> Taxes { get; set; }
        public DateTime DateTime { get; set; }
    }
}

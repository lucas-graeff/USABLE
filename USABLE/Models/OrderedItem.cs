using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace USABLE.Models
{
    public class OrderedItem
    {
        [Key]
        public int OrderedItemsId { get; set; }
        public Order Order { get; set; }
        [ForeignKey("Order")]
        public int OrderId { get; set; }
        public Item Item { get; set; }
        [ForeignKey("Item")]
        public int ItemId { get; set; }
        
    }
}

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace USABLE.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class Item
    {
        [Key]
        public int ItemId { get; set; }
        [MaxLength(25), MinLength(1)]
        public string Name { get; set; }
        public double Price { get; set; }
    }
}

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace USABLE.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class Tax
    {
        [Key]
        public int TaxId { get; set; }
        [MaxLength(25), MinLength(1)]
        public string Name { get; set; }
        [Range(0, 100)]
        public int Percentage { get; set; }
    }
}

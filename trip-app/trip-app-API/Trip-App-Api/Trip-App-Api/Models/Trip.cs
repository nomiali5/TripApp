using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Trip_App_Api.Models
{
    public class Trip: BaseEntity
    {
        [Required]
        public string lat { get; set; }
        [Required]
        public string lng { get; set; }
    }
}

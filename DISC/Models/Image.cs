using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;

namespace DISC.Models
{
    public class Image
    {
        public int Id { get; set; }
        
        [Required]
        public IFormFile Body { get; set; }
        public string Name { get; set; }
    }
}

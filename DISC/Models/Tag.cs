using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace DISC.Models
{
    public class Tag
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Add a Tag Name!")]
        [MaxLength(35)]
        public string Name { get; set; }

    }
}

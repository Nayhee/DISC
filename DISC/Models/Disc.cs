using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace DISC.Models
{
    public class Disc
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Add a Name!")]
        [MaxLength(35)]
        public string Name { get; set; }
        [Required]
        public int BrandId { get; set; }
        [Required]
     
        public string Condition { get; set; }
        [Required]
        public int Speed { get; set; }
        [Required]
        public int Glide { get; set; }
        [Required]
        public int Turn { get; set; }
        [Required]
        public int Fade { get; set; }
        [Required]
        public string Plastic { get; set; }
        [Required]
        public int Price { get; set; }
        [Required]
        public int Weight { get; set; }
        [Required]
        public string ImageUrl { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public bool ForSale { get; set; }

        public List<Tag> Tags { get; set; } = new List<Tag>();

        public Brand Brand { get; set; }
        public string NamePlastic
        {
            get
            {
                return $"{Name} - {Plastic}";
            }
        }

        public string DisplayTags
        {
            get
            {
                var str = "";
                foreach (var tag in Tags)
                {
                    str += $"{tag.Name}  |  ";
                }
                return str;
            }
        }
    }
}

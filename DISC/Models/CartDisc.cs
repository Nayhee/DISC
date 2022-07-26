using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System;

namespace DISC.Models
{
    public class CartDisc
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public int CartId { get; set; }
        public int DiscId { get; set; }


    }
}

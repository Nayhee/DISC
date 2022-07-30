using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System;

namespace DISC.Models
{
    public class Round
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }

        public DateTime Date { get; set; }
        public int Distance { get; set; }
        public int PuttsTaken { get; set; }
        public int PuttsMade { get; set; }

    }
}

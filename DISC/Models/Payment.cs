using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System;

namespace DISC.Models
{
    public class Payment
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }
        public int OrderId { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
    }
}

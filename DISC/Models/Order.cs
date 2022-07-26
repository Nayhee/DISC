using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System;

namespace DISC.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CartId { get; set; }
        public DateTime Date { get; set; }

        public decimal Total { get; set; }

        public string ShippingAddress { get; set; }
        public string ShippingCity { get; set; }
        public string ShippingState { get; set; }
        public string ShippingZip { get; set; }
        public bool IsPaymentReceived { get; set; }

        public List<Disc> Discs { get; set; }

        public string DisplayShipping
        {
            get
            {
                return $"{ShippingAddress} {ShippingCity}, {ShippingState} {ShippingZip}";
            }
        }

        public decimal OrderTotal
        {
            get
            {
                var sum = 0;
                foreach (var disc in Discs)
                {
                    sum += disc.Price;
                }
                return sum;
            }
        }
    }
}

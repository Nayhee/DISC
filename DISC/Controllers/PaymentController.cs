using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DISC.Models;
using DISC.Repositories;
using Microsoft.AspNetCore.Authorization;
using System;

namespace DISC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentRepository _paymentRepository;

        public PaymentController(IPaymentRepository paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }

        [HttpPost]
        public IActionResult AddPayment(Payment payment)
        {
            payment.PaymentDate = DateTime.Now;
            _paymentRepository.AddPayment(payment);
            //return NoContent();
            return CreatedAtAction("Get", new { id = payment.Id }, payment);
        }

    }
}

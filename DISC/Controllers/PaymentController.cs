using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DISC.Models;
using DISC.Repositories;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
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

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_paymentRepository.GetAllPayments());
        }

        [HttpGet("{paymentId}")]
        public IActionResult GetPaymentById(int paymentId)
        {
            var payment = _paymentRepository.GetPaymentById(paymentId);
            if (payment == null)
            {
                return NotFound();
            }
            return Ok(payment);
        }

        [HttpPost]
        public IActionResult Post(Payment payment)
        {
            _paymentRepository.AddPayment(payment);
            return CreatedAtAction("Get", new {id = payment.Id}, payment);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Payment payment)
        {
            _paymentRepository.UpdatePayment(payment);
            return NoContent();
        }

    }
}

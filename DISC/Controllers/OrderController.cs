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
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;

        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_orderRepository.GetAllOrders());
        }


        [HttpPost]
        public IActionResult AddOrder(Order order)
        {
            order.OrderDate = DateTime.Now;
            order.IsPaymentReceived = false;
            _orderRepository.AddOrder(order);
            return NoContent();
            //return CreatedAtAction("Get", new { id = order.Id }, order);
        }



      
    }
}

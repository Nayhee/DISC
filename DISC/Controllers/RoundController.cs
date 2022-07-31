using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DISC.Models;
using DISC.Repositories;
using Microsoft.AspNetCore.Authorization;
using System;
using DISC.Controllers;
using System.Collections.Generic;

namespace DISC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoundController : ControllerBase
    {
        private readonly IRoundRepository _roundRepository;
        public RoundController(IRoundRepository roundRepository)
        {
            _roundRepository = roundRepository;
        }

        [HttpPost]
        public IActionResult Post(Round round)
        {
            round.Date = DateTime.Now;
            _roundRepository.AddRound(round);
            return NoContent();
        }

        [HttpGet("{userId}")]
        public IActionResult GetAUsersRounds(int userId)
        {
            List<Round> Rounds = _roundRepository.GetAUsersRounds(userId);
            if (Rounds == null)
            {
                return NotFound();
            }
            return Ok(Rounds);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _roundRepository.DeleteRound(id);
            return NoContent();
        }


    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;
using System.Net;
using Trip_App_Api.Models;
using Trip_App_Api.Services;

namespace Trip_App_Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TripController : ControllerBase
    {
        private readonly ILogger<TripController> _logger;
        private readonly ITripService _tripService;
        public TripController(ILogger<TripController> logger, ITripService tripService)
        {
            _logger = logger;
            _tripService = tripService;
        }

        [HttpGet]
        [SwaggerResponse((int)HttpStatusCode.OK, Type = typeof(List<Trip>))]
        public IActionResult Get()
        {
            var allTrips = _tripService.GetAll();
            _logger.LogInformation("fetching all trips");
            return Ok(allTrips);
        }

        [HttpPost]
        [SwaggerResponse((int)HttpStatusCode.OK, Type = typeof(Trip))]
        public IActionResult Insert(Trip model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var trip = _tripService.Insert(model);
            _logger.LogInformation($"inserting new trip with lag {model.lat} and lng {model.lng}");
            return Ok(trip);
        }
    }
}

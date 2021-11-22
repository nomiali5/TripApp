using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Trip_App_Api.Models;

namespace Trip_App_Api.Services
{
    public interface ITripService {
        Task<Trip> Insert(Trip entity);
        Task<List<Trip>> GetAll();
    }
    public class TripService : ITripService
    {
        public Task<List<Trip>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Trip> Insert(Trip entity)
        {
            throw new NotImplementedException();
        }
    }
}

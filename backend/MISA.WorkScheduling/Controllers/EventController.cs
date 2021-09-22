using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.WorkScheduling.API.Controllers
{
    public class EventController : BaseApiController<Event>
    {
        public EventController(IBaseService<Event> service):base(service)
        {

        }
    }
}

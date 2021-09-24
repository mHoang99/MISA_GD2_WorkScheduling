using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Helpers;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.WorkScheduling.API.Controllers
{
    /// <summary>
    /// API Controller cho sự kiện lịch
    /// </summary>
    /// CREATED_BY: vmhoang
    [EnableCors("MyPolicy")]
    public class EventController : BaseApiController<Event>
    {
        private new IEventService _service;

        public EventController(IEventService service):base(service)
        {
            _service = service;
        }

        /// <summary>
        /// Lấy theo id
        /// </summary>
        /// <param name="id">Id của bản ghi</param>
        /// <returns></returns>
        /// CREATED_BY: vmhoang
        [HttpGet("All")]
        [Authorize]
        async public Task<IActionResult> GetForUser()
        {
            var userIdString = HttpContext.User.FindFirst("id").Value;

            var res = await _service.GetByUserId(userIdString);

            if (res.SuccessState)
            {
                return Ok(res.Data);
            }
            else
            {
                return Unauthorized(res.ConvertToApiReturn());
            }
        }
    }
}

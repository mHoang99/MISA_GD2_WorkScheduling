using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Helpers;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MISA.WorkScheduling.API.Controllers
{
    public class GroupController : BaseApiController<Group>
    {
        private new IGroupService _service;

        public GroupController(IGroupService service) : base(service)
        {
            _service = service;
        }

        /// <summary>
        /// Lấy theo id
        /// </summary>
        /// <param name="id">Id của bản ghi</param>
        /// <returns></returns>
        /// CREATED_BY: vmhoang
        [HttpGet("Manager")]
        [Authorize]
        async public Task<IActionResult> GetOfManager()
        {
            var employeeId = HttpContext.User.FindFirst("employeeId").Value;
            Role userRole = (Role)Int32.Parse(HttpContext.User.FindFirst(ClaimTypes.Role)?.Value ?? "0");

            

            if(userRole != Role.MANAGER)
            {
                return Unauthorized();
            } 

            var res = await _service.GetOfManager(employeeId);

            if (res.SuccessState)
            {
                return Ok(res.Data);
            }
            else
            {
                return Ok(res.ConvertToApiReturn());
            }
        }
    }
}

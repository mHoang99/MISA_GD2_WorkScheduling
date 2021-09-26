using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Helpers;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Models;
using MISA.WorkScheduling.API.Models.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
        private IGroupService _groupService;

        public EventController(IEventService service, IGroupService groupService) : base(service)
        {
            _service = service;
            _groupService = groupService;
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

        /// <summary>
        /// Lấy danh sách chờ phê duyệt theo group
        /// </summary>
        /// <param name="id">Id của bản ghi</param>
        /// <returns></returns>
        /// CREATED_BY: vmhoang
        [HttpGet("Group/{id}")]
        [Authorize]
        async public Task<IActionResult> GetPendingOfGroup([FromRoute] string id)
        {
            Role userRole = (Role)Int32.Parse(HttpContext.User.FindFirst(ClaimTypes.Role)?.Value ?? "0");
            var employeeId = HttpContext.User.FindFirst("employeeId").Value;

            if (userRole != Role.MANAGER)
            {
                return Unauthorized();
            }
            
            //TODO: Kiểm tra group đang lấy có thuộc thẩm quyền của user không

            var res = await _service.GetPendingByGroupId(id);
            
            if (res.SuccessState)
            {
                return Ok(res.Data);
            }
            else
            {
                return Unauthorized(res.ConvertToApiReturn());
            }
        }


        /// <summary>
        /// Xóa nhiều
        /// </summary>
        /// <param name="id">Id của bản ghi</param>
        /// <returns></returns>
        /// CREATED_BY: vmhoang
        [HttpDelete("MultipleRemoval")]
        [Authorize]
        async public Task<IActionResult> RemoveMultiple([FromBody] MultipleAffectRequest body)
        {
            Role userRole = (Role)Int32.Parse(HttpContext.User.FindFirst(ClaimTypes.Role)?.Value ?? "0");
            var employeeId = HttpContext.User.FindFirst("employeeId").Value;

            //TODO: Kiểm tra event đang lấy có thuộc thẩm quyền của user không

            var res = await _service.RemoveMultiple(body.Ids);

            if (res.SuccessState)
            {
                return Ok(res.Data);
            }
            else
            {
                return Unauthorized(res.ConvertToApiReturn());
            }
        }

        /// <summary>
        /// Duyệt nhiều
        /// </summary>
        /// <param name="id">Id của bản ghi</param>
        /// <returns></returns>
        /// CREATED_BY: vmhoang
        [HttpPut("MultipleApproval")]
        [Authorize]
        async public Task<IActionResult> ApproveMultiple([FromBody] MultipleAffectRequest body)
        {
            Role userRole = (Role)Int32.Parse(HttpContext.User.FindFirst(ClaimTypes.Role)?.Value ?? "0");
            var employeeId = HttpContext.User.FindFirst("employeeId").Value;

            if (userRole != Role.MANAGER)
            {
                return Unauthorized();
            }

            //TODO: Kiểm tra event đang lấy có thuộc thẩm quyền của user không

            var res = await _service.ApproveMultiple(body.Ids, employeeId);

            if (res.SuccessState)
            {
                return Ok(res.Data);
            }
            else
            {
                return Unauthorized(res.ConvertToApiReturn());
            }
        }

        /// <summary>
        /// Duyệt nhiều
        /// </summary>
        /// <param name="id">Id của bản ghi</param>
        /// <returns></returns>
        /// CREATED_BY: vmhoang
        [HttpPut("Completion/{id}")]
        [Authorize]
        async public Task<IActionResult> CompleteEvent([FromRoute] string id)
        {
            var employeeId = HttpContext.User.FindFirst("employeeId").Value;

            //TODO: Kiểm tra event đang lấy có thuộc thẩm quyền của user không

            var res = await _service.CompleteEvent(id);

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

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Exceptions;
using MISA.ApplicationCore.Helpers;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace MISA.WorkScheduling.API
{

    /// <summary>
    /// Base Api controller 
    /// </summary>
    /// CREATED_BY: vmhoang
    [Route("api/[controller]s")]
    [ApiController]
    [EnableCors("MyPolicy")]
    public abstract class BaseApiController<T> : ControllerBase where T : BaseModel
    {
        #region Fields
        /// <summary>
        /// Service xử lý nghiệp vụ
        /// </summary>
        protected IBaseService<T> _service;
        #endregion

        #region Constructors
        public BaseApiController(IBaseService<T> service)
        {
            _service = service;
        }
        #endregion

        #region Methods
        /// <summary>
        /// Lấy tất cả 
        /// </summary>
        /// <returns></returns>
        /// CREATED_BY: vmhoang
        [HttpGet]
        async public Task<IActionResult> Get()
        {
            var res = await _service.Get();

            if (res.SuccessState)
            {
                return Ok(res.Data);
            }
            else
            {
                return BadRequest(res.ConvertToApiReturn());
            }
        }

        /// <summary>
        /// Lấy theo id
        /// </summary>
        /// <param name="id">Id của bản ghi</param>
        /// <returns></returns>
        /// CREATED_BY: vmhoang
        [HttpGet("{id}")]
        async public Task<IActionResult> Get(string id)
        {
            var res = await _service.GetById(id);

            if (res.SuccessState)
            {
                return Ok(res.Data);
            }
            else
            {
                return BadRequest(res.ConvertToApiReturn());
            }
        }

        /// <summary>
        /// Thêm bản ghi
        /// </summary>
        /// <param name="entity">Dữ liệu cần thêm mới</param>
        /// <returns></returns>
        /// CREATED_BY: vmhoang
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] T entity)
        {

            var res = await _service.Add(entity);
            if (res.SuccessState)
            {
                return StatusCode(201, res.Data);
            }
            else
            {
                return Ok(res.ConvertToApiReturn());
            }
        }

        /// <summary>
        /// Sửa Bản ghi
        /// </summary>
        /// <param name="id">Id của bản ghi</param>
        /// <param name="entity">Dữ liệu cần sửa</param>
        /// <returns></returns>
        /// CREATED_BY: vmhoang
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutAsync([FromRoute(Name = "id")] string id, [FromBody] T entity)
        {

            var res = await _service.Update(id, entity);
            if (res.SuccessState)
            {
                return StatusCode(201, res.Data);
            }
            else
            {
                return Ok(res.ConvertToApiReturn());
            }
        }

        /// <summary>
        /// Xóa Bản ghi
        /// </summary>
        /// <param name="id">Id của bản ghi</param>
        /// <returns></returns>
        /// CREATED_BY: vmhoang
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteAsync([FromRoute(Name = "id")] string id)
        {
            var res = await _service.Delete(id);

            if (res.SuccessState)
            {
                return Ok(res.Data);
            }
            else
            {
                return Ok(res.ConvertToApiReturn());
            }
        }
        #endregion

    }
}

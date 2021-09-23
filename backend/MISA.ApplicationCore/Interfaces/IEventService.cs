using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IEventService : IBaseService<Event>
    {
        /// <summary>
        /// Lấy tất cả bản ghi theo userId
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<ServiceResult> GetByUserId(string userId);
        /// <summary>
        /// Lấy tất cả bản ghi theo employeeId
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<ServiceResult> GetByEmployeeId(string userId);

    }
}

using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IEventRepository : IBaseRepository<Event>
    {
        /// <summary>
        /// Lấy tất cả events theo employeeId
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        Task<IEnumerable<object>> GetEntitiesByEmployeeId(Guid employeeId);
        Task<IEnumerable<object>> GetEntitiesByManagerId(Guid managerId);
    }
}

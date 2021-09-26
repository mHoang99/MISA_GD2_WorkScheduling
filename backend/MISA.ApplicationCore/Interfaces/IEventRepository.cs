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
        Task<IEnumerable<object>> GetPendingEntitiesByGroupId(Guid groupId);
        Task<int> DeleteEntitesByIds(string idsString);
        Task<int> ApproveEntitesByIds(string idsString, Guid approverId);
        Task<int> CompleteById(Guid id);
    }
}

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
        /// <summary>
        /// Lấy theo manager
        /// </summary>
        /// <param name="managerId"></param>
        /// <returns></returns>
        Task<IEnumerable<object>> GetEntitiesByManagerId(Guid managerId);
        /// <summary>
        /// Lấy danh sách chờ theo group
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        Task<IEnumerable<object>> GetPendingEntitiesByGroupId(Guid groupId);
        /// <summary>
        /// Xóa nhiều theo id
        /// </summary>
        /// <param name="idsString">string chứa các ids theo format: "id1,id2,id3,..." </param>
        /// <returns></returns>
        Task<int> DeleteEntitesByIds(string idsString);
        /// <summary>
        /// Duyệt nhiều theo id
        /// </summary>
        /// <param name="idsString">string chứa các ids theo format: "id1,id2,id3,..." </param>
        /// <param name="approverId"></param>
        /// <returns></returns>
        Task<int> ApproveEntitesByIds(string idsString, Guid approverId);
        /// <summary>
        /// Hoàn thành theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<int> CompleteById(Guid id);
        /// <summary>
        /// Lấy danh sách sự kiện của 1 nv theo khoảng thời gian
        /// </summary>
        /// <param name="employeeId"></param>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <returns></returns>
        Task<IEnumerable<object>> GetEntitiesOfEmployeeByRange(Guid employeeId, DateTime start, DateTime end);
    }
}

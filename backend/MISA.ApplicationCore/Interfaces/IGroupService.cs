using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IGroupService : IBaseService<Group>
    {
        /// <summary>
        /// Lấy những nhóm được quản lý bởi manager
        /// </summary>
        /// <param name="managerEmployeeId">employeeID của người quản lý</param>
        /// <returns></returns>
        Task<ServiceResult> GetOfManager(string managerEmployeeId);
    }
}

using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IRefreshTokenRepository : IBaseRepository<RefreshToken>
    {
        /// <summary>
        /// Xóa tất cả bản ghi bằng UserId
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<int> DeleteByUserId(Guid userId);
    }
}

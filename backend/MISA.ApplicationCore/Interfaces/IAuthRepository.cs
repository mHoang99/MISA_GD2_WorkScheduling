using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IAuthRepository : IBaseRepository<RefreshToken>
    {
        Task<int> DeleteByUserId(Guid userId);
    }
}

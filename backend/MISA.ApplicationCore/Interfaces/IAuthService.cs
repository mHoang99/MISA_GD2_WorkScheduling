using MISA.ApplicationCore.Authentication;
using MISA.ApplicationCore.Authentication.Model;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IAuthService : IBaseService<RefreshToken>
    {
        Task<ServiceResult> Authenticate(UserLoginModel entity);

        Task<ServiceResult> GetUserById(string id);
        Task<ServiceResult> AddRefreshToken(string refreshTokenString, Guid userId);
        Task<ServiceResult> DeleteByUserId(string userId);
        Task<ServiceResult> getRefreshTokenOwner(string refreshToken);
    }
}

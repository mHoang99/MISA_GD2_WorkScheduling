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
        /// <summary>
        /// Xác thực người dùng
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        /// CREATEDBY: VMHOANG
        Task<ServiceResult> Authenticate(UserLoginModel entity);

        /// <summary>
        /// Lấy người dùng hiện tại theo id
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        /// CREATEDBY: VMHOANG
        Task<ServiceResult> GetUserById(string id);

        /// <summary>
        /// Thêm refresh token vào database
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        /// CREATEDBY: VMHOANG
        Task<ServiceResult> AddRefreshToken(string refreshTokenString, Guid userId);

        /// <summary>
        /// Xóa tất cả RefreshToken liên quan tới người dùng
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        /// CREATEDBY: VMHOANG
        Task<ServiceResult> DeleteRefreshTokenByUserId(string userId);

        /// <summary>
        /// Lấy người dùng sở hữu refresh token
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        /// CREATEDBY: VMHOANG
        Task<ServiceResult> getRefreshTokenOwner(string refreshToken);
    }
}

using MISA.ApplicationCore.Authentication.Hashers;
using MISA.ApplicationCore.Authentication.Model;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Exceptions;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Authentication
{
    public class AuthService : BaseService<RefreshToken>, IAuthService
    {
        private IBaseRepository<User> _userRepository;

        private new IRefreshTokenRepository _repository;

        public AuthService(
            IRefreshTokenRepository repository,
            IBaseRepository<User> userRepo
            )
            : base(repository)
        {
            _userRepository = userRepo;
            _repository = repository;
        }

        async public Task<ServiceResult> AddRefreshToken(string refreshTokenString, Guid userId)
        {
            try
            {
                var entity = new RefreshToken
                {
                    HashedValue = Hasher.Sha256Hash(refreshTokenString),
                    UserId = userId
                };

                serviceResult.SuccessState = true;
                serviceResult.Data = await _repository.Add(entity);
                serviceResult.MISACode = Enums.MISACode.IsValid;

                //Không tác động được bản ghi
                if (int.Parse(serviceResult.Data.ToString()) <= 0)
                {
                    serviceResult = RowAffectingUnexpectedFailureResponse();
                }

                return serviceResult;
            }
            catch (Exception ex)
            {
                throw new ServiceException(
                    ex.Message,
                    UnexpectedErrorResponse(ex.Message)
                );
            }
        }

        async public Task<ServiceResult> Authenticate(UserLoginModel entity)
        {
            try
            {
                var tmpUser = new User
                {
                    Username = entity.Username
                };

                var usernameProp = tmpUser.GetType().GetProperty("Username");

                var user = await _userRepository.GetEntityByProperty(tmpUser, usernameProp);

                if (user == null)
                {
                    serviceResult.UserMsg = "Nguời dùng không tồn tại";
                    serviceResult.DevMsg = serviceResult.UserMsg;
                    serviceResult.SuccessState = false;
                    return serviceResult;
                }

                //Verify Password
                if (!Hasher.BCryptVerify(entity.Password, user.Password))
                {
                    serviceResult.UserMsg = "Mật khẩu không chính xác";
                    serviceResult.DevMsg = serviceResult.UserMsg;
                    serviceResult.SuccessState = false;
                    return serviceResult;
                }

                serviceResult.SuccessState = true;
                serviceResult.Data = user;
                return serviceResult;
            }
            catch (Exception ex)
            {
                throw new ServiceException(
                    ex.Message,
                    UnexpectedErrorResponse(ex.Message)
                );
            }
        }

        async public Task<ServiceResult> DeleteRefreshTokenByUserId(string userId)
        {
            try
            {
                //kiểm tra id là guid
                if (!CheckGuid($"id", userId))
                {
                    return serviceResult;
                }

                var parsedId = Guid.Parse(userId);


                serviceResult.SuccessState = true;
                serviceResult.Data = await _repository.DeleteByUserId(parsedId);


                return serviceResult;
            }
            catch (Exception ex)
            {
                throw new ServiceException(
                    ex.Message,
                    UnexpectedErrorResponse(ex.Message)
                );
            }
        }

        async public Task<ServiceResult> getRefreshTokenOwner(string refreshTokenString)
        {
            try
            {

                var tmpToken = new RefreshToken
                {
                    HashedValue = Hasher.Sha256Hash(refreshTokenString)
                };

                var hashedValueProperty = tmpToken.GetType().GetProperty("HashedValue");

                var currentToken = await _repository.GetEntityByProperty(tmpToken, hashedValueProperty);

                if (currentToken == null)
                {
                    //lỗi
                    serviceResult.UserMsg = "token không tồn tại";
                    serviceResult.DevMsg = serviceResult.UserMsg;
                    serviceResult.SuccessState = false;
                    return serviceResult;
                }

                var user = _userRepository.GetEntityById(currentToken.UserId);
                if (user == null)
                {
                    //Lỗi
                    serviceResult.UserMsg = "user không tồn tại";
                    serviceResult.DevMsg = serviceResult.UserMsg;
                    serviceResult.SuccessState = false;
                    return serviceResult;
                }

                serviceResult.SuccessState = true;
                serviceResult.Data = user;
                serviceResult.MISACode = Enums.MISACode.IsValid;

                return serviceResult;
            }
            catch (Exception ex)
            {
                throw new ServiceException(
                    ex.Message,
                    UnexpectedErrorResponse(ex.Message)
                );
            }
        }

        async public Task<ServiceResult> GetUserById(string id)
        {
            try
            {
                if (CheckGuid($"id", id))
                {
                    serviceResult.SuccessState = true;
                    serviceResult.Data = await _userRepository.GetEntityById(Guid.Parse(id));
                    serviceResult.MISACode = Enums.MISACode.Success;
                }

                return serviceResult;
            }
            catch (Exception ex)
            {
                throw new ServiceException(
                    ex.Message,
                    UnexpectedErrorResponse(ex.Message)
                );
            }
        }
    }
}

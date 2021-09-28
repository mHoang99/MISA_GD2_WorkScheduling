using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MISA.ApplicationCore.Authentication;
using MISA.ApplicationCore.Authentication.Model;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Helpers;
using MISA.ApplicationCore.Interfaces;
using MISA.WorkScheduling.API.Authentication.JWT;
using MISA.WorkScheduling.API.Authentication.JWT.Validators;
using MISA.WorkScheduling.API.Models.Requests;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WorkScheduling.API.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IConfiguration _config;
        private readonly AccessTokenGenerator _accessTokenGenerator;
        private readonly RefreshTokenGenerator _refreshTokenGenerator;
        private readonly RefreshTokenValidator _refreshTokenValidator;

        public AuthController(
            IAuthService authService,
            IConfiguration config,
            AccessTokenGenerator jwtGenerator,
            RefreshTokenGenerator refreshTokenGenerator,
            RefreshTokenValidator refreshTokenValidator
            )
        {
            _authService = authService;
            _config = config;
            _accessTokenGenerator = jwtGenerator;
            _refreshTokenGenerator = refreshTokenGenerator;
            _refreshTokenValidator = refreshTokenValidator;
        }

        /// <summary>
        /// Xác thực
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("login")]
        async public Task<IActionResult> Authenticate([FromBody] UserLoginModel entity)
        {
            //Gọi service xác thực tài khoản
            var response = await _authService.Authenticate(entity);

            //Tài khoản hợp lệ
            if (response.SuccessState)
            {
                var user = response.Data as User;

                //Tạo token mới từ user nhận được
                var tokenString = _accessTokenGenerator.GenerateToken(user);
                var refreshTokenString = _refreshTokenGenerator.GenerateToken();

                //Lưu refresh token
                var addRes = await _authService.AddRefreshToken(refreshTokenString, user.UserId);

                if (addRes.SuccessState)
                {
                    addRes.Data = new
                    {
                        user = user,
                        accessToken = tokenString,
                        refreshToken = refreshTokenString
                    };
                    return Ok(addRes.ConvertToApiReturn());
                }
                else
                {
                    return Ok(addRes.ConvertToApiReturn());
                }
            }
            //Tài khoản không hợp lệ
            else
            {
                return Ok(response.ConvertToApiReturn());
            }
        }

        /// <summary>
        /// Lấy access token mới
        /// </summary>
        /// <param name="refreshRequest"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("refresh")]
        async public Task<IActionResult> Refresh([FromBody] RefreshTokenRequest refreshRequest)
        {
            //Validate refresh token
            bool isValidRefreshToken = _refreshTokenValidator.Validate(refreshRequest.RefreshToken);
            if (!isValidRefreshToken)
            {
                return Unauthorized();
            }

            //Lấy thông tin user tương ứng với token
            var serviceRes = await _authService.getRefreshTokenOwner(refreshRequest.RefreshToken);

            if (!serviceRes.SuccessState)
            {
                return Unauthorized();
            }

            serviceRes.Data = new
            {
                AccessToken = _accessTokenGenerator.GenerateToken(serviceRes.Data as User)
            };

            //Trả về token mới
            return Ok(serviceRes.ConvertToApiReturn());
        }

        /// <summary>
        /// Thoát đăng nhập
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpPost("logout")]
        async public Task<IActionResult> Logout()
        {
            //Lấy UserId từ trong request
            var userId = HttpContext.User.FindFirst("id").Value;

            //Xóa hết refresh token tương ứng vs id trong db
            var res = await _authService.DeleteRefreshTokenByUserId(userId);

            return Ok(res.ConvertToApiReturn());
        }

        /// <summary>
        /// Lấy ra user tương ứng với access token hiện tại
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        async public Task<IActionResult> Get()
        {
            var res = await _authService.GetUserById(HttpContext.User.FindFirstValue("id"));

            if (!res.SuccessState)
            {
                return Unauthorized(res.ConvertToApiReturn());
            }

            return Ok(res.ConvertToApiReturn());
        }

    }
}

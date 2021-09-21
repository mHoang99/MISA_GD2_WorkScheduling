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

        [AllowAnonymous]
        [HttpPost("login")]
        async public Task<IActionResult> Authenticate([FromBody] UserLoginModel entity)
        {
            var response = await _authService.Authenticate(entity);

            if (response.SuccessState)
            {
                var user = response.Data as User;

                var tokenString = _accessTokenGenerator.GenerateToken(user);
                var refreshTokenString = _refreshTokenGenerator.GenerateToken();

                var addRes = await _authService.AddRefreshToken(refreshTokenString, user.UserId);

                if (addRes.SuccessState)
                    return Ok(new
                    {
                        user = user,
                        accessToken = tokenString,
                        refreshToken = refreshTokenString
                    });
                else
                {
                    return StatusCode(500, addRes.ConvertToApiReturn());
                }
            }
            else
            {
                return Ok(response.ConvertToApiReturn());
            }
        }

        [AllowAnonymous]
        [HttpPost("refresh")]
        async public Task<IActionResult> Refresh([FromBody] RefreshTokenRequest refreshRequest)
        {

            var reqUserId = HttpContext.User.FindFirst("id").Value;

            //Validate refresh token
            bool isValidRefreshToken = _refreshTokenValidator.Validate(refreshRequest.RefreshToken);
            if (!isValidRefreshToken)
            {
                return BadRequest();
            }

            //TODO: Tìm user tương ứng + tạo token mới
            var serviceRes = await _authService.getRefreshTokenOwner(refreshRequest.RefreshToken);

            if(!serviceRes.SuccessState)
            {
                return BadRequest();
            }
        
            return Ok(new { AccessToken = _accessTokenGenerator.GenerateToken(serviceRes.Data as User) });
        }

        [Authorize]
        [HttpPost("logout")]
        async public Task<IActionResult> Logout()
        {
            var userId = HttpContext.User.FindFirst("id").Value;

            //TODO: Xóa hết refresh token tương ứng vs id trong db
            var res = await _authService.DeleteByUserId(userId);

            return Ok(res);
        }

        [Authorize]
        [HttpGet]
        async public Task<IActionResult> Get()
        {
            var res = await _authService.GetUserById(HttpContext.User.FindFirstValue("id"));

            if (!res.SuccessState)
            {
                return Unauthorized();
            }

            return Ok(res.Data);
        }

    }
}

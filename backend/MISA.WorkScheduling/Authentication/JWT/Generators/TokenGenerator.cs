using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WorkScheduling.API.Authentication.JWT
{
    /// <summary>
    /// Class tạo JWT token
    /// </summary>
    /// CREATED_BY: vmhoang
    public abstract class TokenGenerator
    {
        #region Fields
        protected string jwtSecret;
        protected string jwtIssuer;
        protected string jwtAudience;
        protected string jwtTokenExpirationMinutes;
        protected bool jwtHasClaims = true;
        #endregion

        #region Constructor
        protected TokenGenerator(
            string cjwtSecret, string cjwtIssuer, string cjwtAudience, string cjwtTokenExpirationMinutes, bool cjwtHasClaims)
        {
            jwtSecret = cjwtSecret;
            jwtIssuer = cjwtIssuer;
            jwtAudience = cjwtAudience;
            jwtTokenExpirationMinutes = cjwtTokenExpirationMinutes;
            jwtHasClaims = cjwtHasClaims;
        }
        #endregion

        #region Methods
        /// <summary>
        /// Tạo token mới
        /// </summary>
        /// <param name="userInfo">User dùng để đưa thông tin vào token</param>
        /// <returns>token string</returns>
        public string GenerateToken(User userInfo = null)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            //add identity to JWT token
            var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, (userInfo?.Username)??""),
                    new Claim("id", (userInfo?.UserId.ToString())??""),
                    new Claim("employeeId", (userInfo?.EmployeeId.ToString())??""),
                    new Claim(ClaimTypes.Role, ((int) (userInfo?.Role ?? ApplicationCore.Enums.Role.EMPLOYEE)).ToString()),
                    new Claim("role", ((int) (userInfo?.Role ?? ApplicationCore.Enums.Role.EMPLOYEE)).ToString()),
                    new Claim("date", DateTime.Now.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

            var token = new JwtSecurityToken(
              jwtIssuer,
              jwtAudience,
              jwtHasClaims ? claims : null,
              notBefore: DateTime.Now,
              expires: DateTime.Now.AddMinutes(double.Parse(jwtTokenExpirationMinutes)),
              signingCredentials: credentials
              );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        #endregion
    }
}

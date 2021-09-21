using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WorkScheduling.API.Authentication.JWT.Validators
{
    public class RefreshTokenValidator
    {

        private readonly IConfiguration _config;

        public RefreshTokenValidator(IConfiguration config)
        {
            _config = config;
        }

        public bool Validate(string refreshToken)
        {

            var validationParameters = new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtConfig:RefreshTokenSecret"])),
                ValidIssuer = _config["JwtConfig:Issuer"],
                ValidAudience = _config["JwtConfig:Audience"],
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                tokenHandler.ValidateToken(refreshToken, validationParameters, out SecurityToken validatedToken);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}

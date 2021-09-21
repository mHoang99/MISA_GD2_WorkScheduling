using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.WorkScheduling.API.Authentication.JWT
{
    public class RefreshTokenGenerator : TokenGenerator
    {
        public RefreshTokenGenerator(IConfiguration config) : base(
            config["JwtConfig:RefreshTokenSecret"],
            config["JwtConfig:Issuer"],
            config["JwtConfig:Audience"],
            config["JwtConfig:RefreshTokenExpirationMinutes"],
            false
        )
        { }
    }
}

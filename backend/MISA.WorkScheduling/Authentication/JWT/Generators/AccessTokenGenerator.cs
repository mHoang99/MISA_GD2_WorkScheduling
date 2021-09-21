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
    public class AccessTokenGenerator : TokenGenerator
    {
        public AccessTokenGenerator(IConfiguration config) : base(
            config["JwtConfig:AccessTokenSecret"], 
            config["JwtConfig:Issuer"], 
            config["JwtConfig:Audience"], 
            config["JwtConfig:AccessTokenExpirationMinutes"],
            true
        ){}
    }
}

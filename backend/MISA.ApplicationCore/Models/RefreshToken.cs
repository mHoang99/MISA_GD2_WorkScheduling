using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Models
{
    public class RefreshToken : BaseModel
    {
        public Guid RefreshTokenId { get; set; }
        public string HashedValue { get; set; }
        public Guid UserId { get; set; }
    }
}

using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Models
{
    /// <summary>
    /// Model cho bảng RefreshToken
    /// </summary>
    /// CREATED_BY: vmhoang
    public class RefreshToken : BaseModel
    {
        [PrimaryKey]
        [DisplayName("Khóa chính")]
        public Guid RefreshTokenId { get; set; }
        
        [DisplayName("Giá trị")]
        public string HashedValue { get; set; }
        
        [DisplayName("Người dùng")]
        public Guid UserId { get; set; }
    }
}

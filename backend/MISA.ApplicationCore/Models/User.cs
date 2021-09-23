using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// Model cho bảng user
    /// </summary>
    /// CREATED_BY: vmhoang
    public class User : BaseModel
    {
        [PrimaryKey]
        [DisplayName("Khóa chính")]
        public Guid UserId { get; set; } = new Guid();
        [Required]
        [Unique]
        [MaxLength(20)]
        [DisplayName("Tên tài khoản")]
        public string Username { get; set; }
        [JsonIgnore]
        [Required]
        [MaxLength(50)]
        [DisplayName("Mật khẩu")]
        public string Password { get; set; }
        [JsonIgnore]
        [MaxLength(255)]
        [DisplayName("Hình đại diện")]
        public string Avatar { get; set; }
        [Unique]
        [DisplayName("Nhân viên tương ứng")]
        public Guid? EmployeeId { get; set; }
    }
}

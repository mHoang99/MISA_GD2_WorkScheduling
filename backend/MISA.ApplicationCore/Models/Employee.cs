using MISA.ApplicationCore.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Models
{
    /// <summary>
    /// Model cho bảng nhân viên
    /// </summary>
    /// CREATED_BY: vmhoang
    class Employee : BaseModel
    {
        [PrimaryKey]
        [DisplayName("Khóa chính")]
        public Guid EmployeeId { get; set; }
        [Required]
        [Unique]
        [MaxLength(20)]
        [DisplayName("Mã nhân viên")]
        public string EmployeeCode { get; set; }
        [Required]
        [MaxLength(100)]
        [DisplayName("Tên đầy đủ")]
        public string FullName { get; set; }
        [DisplayName("Ngày sinh")]
        public DateTime DateOfBirth { get; set; }
        [MaxLength(50)]
        [DisplayName("Email")]
        public string Email { get; set; }
        [DisplayName("Giới tính")]
        public Gender Gender { get; set; }
        [MaxLength(20)]
        [DisplayName("Số điện thoại")]
        public string TelephoneNumber { get; set; }
        [MaxLength(255)]
        [DisplayName("Địa chỉ")]
        public string Address { get; set; }
    }
}

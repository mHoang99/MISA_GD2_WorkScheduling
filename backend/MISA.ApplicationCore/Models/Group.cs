using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Models
{
    /// <summary>
    /// Model cho bảng group
    /// </summary>
    /// CREATED_BY: vmhoang
    class Group : BaseModel
    {
        [PrimaryKey]
        [DisplayName("Khóa chính")]
        public Guid GroupId { get; set; }

        [MaxLength(20)]
        [DisplayName("Mã khối")]
        public string GroupCode { get; set; }

        [MaxLength(100)]
        [DisplayName("Tên khối")]
        public string GroupName { get; set; }

        [Unique]
        [MaxLength(255)]
        [DisplayName("Mô tả")]
        public string Description { get; set; }

    }
}

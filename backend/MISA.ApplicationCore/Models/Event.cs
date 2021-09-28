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
    /// Model cho bảng event
    /// </summary>
    /// CREATED_BY: vmhoang
    public class Event : BaseModel
    {
        #region Properties
        [PrimaryKey]
        [DisplayName("Khóa chính")]
        public Guid EventId { get; set; }

        [Required]
        [MaxLength(255)]
        [DisplayName("Tiêu đề")]
        public string Title{ get; set; }

        [DisplayName("Nội dung")]
        public string Content { get; set; }

        [DisplayName("Nhân viên chịu trách nhiệm")]
        public Guid EmployeeId{ get; set; }

        [DisplayName("Thời gian bắt đầu")]
        [Required]
        public DateTime StartTime { get; set; }

        [DisplayName("Thời gian kết thúc")]
        [Required]
        public DateTime EndTime { get; set; }

        [DisplayName("Trạng thái")]
        public EventState CurrentStatus { get; set; } = EventState.WAITING;

        [DisplayName("Người cấp phép")]
        public Guid? ApproverId { get; set; }
        #endregion
    }
}

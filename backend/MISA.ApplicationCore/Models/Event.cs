using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Models
{
    class Event : BaseModel
    {
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
        public DateTime StartTime { get; set; }

        [DisplayName("Thời gian kết thúc")]
        public DateTime EndTime { get; set; }

        [DisplayName("Được cấp phép")]
        public int IsApproved { get; set; }

        [DisplayName("Người cấp phép")]
        public Guid? ApproverId { get; set; }
    }
}

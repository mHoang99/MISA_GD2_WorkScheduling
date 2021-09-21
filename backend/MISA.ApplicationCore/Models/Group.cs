using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Models
{
    class Group : BaseModel
    {
        [PrimaryKey]
        [DisplayName("Khóa chính")]
        public Guid GroupId { get; set; }

        [MaxLength(100)]
        [DisplayName("Tên khối")]
        public string GroupName { get; set; }

        [Unique]
        [MaxLength(255)]
        [DisplayName("Mô tả")]
        public string Description { get; set; }

    }
}

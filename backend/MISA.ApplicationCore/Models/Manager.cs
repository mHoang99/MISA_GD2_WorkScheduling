using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Models
{
    class Manager : BaseModel
    {
        [PrimaryKey]
        [DisplayName("Khóa chính")]
        public Guid ManagerId { get; set; }

        [DisplayName("Nhân viên")]
        public Guid EmployeeId { get; set; }

        [DisplayName("Khối phụ trách")]
        public Guid GroupId { get; set; }
    }
}

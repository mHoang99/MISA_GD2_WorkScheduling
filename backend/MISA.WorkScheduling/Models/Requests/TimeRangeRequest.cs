using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.WorkScheduling.API.Models.Requests
{
    /// <summary>
    /// Request body khi cần gửi khoảng thời gian
    /// </summary>
    /// CREATED_BY: vmhoang
    public class TimeRangeRequest
    {
        public DateTime start;
        public DateTime end;
    }
}

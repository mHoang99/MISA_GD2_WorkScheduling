using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// Kết quả trả về của service
    /// </summary>
    /// CREATEDBY: VMHOANG (25/07/2021)
    public class ServiceResult
    {
        #region Properties
        public bool SuccessState { get; set; }
        public object Data { get; set; }
        public string UserMsg { get; set; }
        public string DevMsg { get; set; }
        public Enums.MISACode MISACode { get; set; }
        #endregion
    }
}

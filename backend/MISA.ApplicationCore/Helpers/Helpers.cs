using MISA.ApplicationCore.Entities;
using System;
using System.Linq;
using System.Net.Mail;
using System.Text.RegularExpressions;

namespace MISA.ApplicationCore.Helpers
{
    /// <summary>
    /// Class chứa các hàm dùng chung
    /// </summary>
    public static class Helpers
    {
        #region Methods
        /// <summary>
        /// Chuyển từ ServiceResult sang ApiErrorReturn
        /// </summary>
        /// <param name="serviceResult"></param>
        /// <returns>instance của ApiErrorReturn</returns>
        public static ApiReturn ConvertToApiReturn(this ServiceResult serviceResult)
        {
            if(serviceResult.SuccessState)
            {
                serviceResult.MISACode = Enums.MISACode.Success;
                serviceResult.DevMsg = "";
                serviceResult.UserMsg = "";
            } else
            {
                serviceResult.Data = null;
            }

            var aer = new ApiReturn
            {
                Success = serviceResult.SuccessState,
                Data = serviceResult.Data,
                DevMsg = serviceResult.DevMsg,
                UserMsg = serviceResult.UserMsg,
                ErrorCode = $"misa-{serviceResult.MISACode.GetHashCode()}"
            };

            return aer;
        }
        #endregion
    }

    public static class Validator
    {
        #region Methods
        /// <summary>
        /// Validate email
        /// </summary>
        /// <param name="email">email</param>
        /// <returns>true: hợp lệ | false: không hợp lệ</returns>
        public static bool IsValidEmail(string email)
        {
            if (!MailAddress.TryCreate(email, out _))
                return false;
            return true;
        }
        #endregion
    }
}

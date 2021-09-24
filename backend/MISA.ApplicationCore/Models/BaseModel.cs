using MISA.ApplicationCore.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Models
{
    /// <summary>
    /// Class Attribute cho trường bắt buộc
    /// </summary>
    /// CREATEDBY: VMHOANG
    [AttributeUsage(AttributeTargets.Property)]
    public class Required : Attribute
    {

    }

    /// <summary>
    /// Class Attribute cho trường không được phép trùng
    /// </summary>
    /// CREATEDBY: VMHOANG
    [AttributeUsage(AttributeTargets.Property)]
    public class Unique : Attribute
    {

    }

    /// <summary>
    /// Class Attribute cho trường khóa chính
    /// </summary>
    /// CREATEDBY: VMHOANG
    [AttributeUsage(AttributeTargets.Property)]
    public class PrimaryKey : Attribute
    {

    }

    /// <summary>
    /// Class Attribute cho trường là email
    /// </summary>
    /// CREATEDBY: VMHOANG
    [AttributeUsage(AttributeTargets.Property)]
    public class Email : Attribute
    {
    }

    /// <summary>
    /// Class Attribute cho trường số điện thoại
    /// </summary>
    /// CREATEDBY: VMHOANG
    [AttributeUsage(AttributeTargets.Property)]
    public class PhoneNumber : Attribute
    {

    }

    /// <summary>
    /// Class Attribute cho trường có độ dài tối đa
    /// </summary>
    /// CREATEDBY: VMHOANG
    [AttributeUsage(AttributeTargets.Property)]
    public class MaxLength: Attribute
    {
        #region Properties
        public int Value { get; set; }
        #endregion

        #region Constructor
        public MaxLength(int maxLength = 20)
        {
            this.Value = maxLength;
        }
        #endregion
    }

    public class BaseModel
    {
        #region Properties
        [JsonIgnore]
        public EntityState EntityState { get; set; } = EntityState.GET;
        /// <summary>
        /// Ngày tạo
        /// </summary>
        [DisplayName("Ngày tạo")]
        public DateTime? CreatedAt { get; set; }
        /// <summary>
        /// Người tạo
        /// </summary>
        [JsonIgnore]
        [DisplayName("Người tạo")]
        public string CreatedBy { get; set; }
        /// <summary>
        /// Ngày thay đổi gần nhất
        /// </summary>
        [DisplayName("Ngày thay đổi gần nhất")]
        public DateTime? ModifiedAt { get; set; }
        /// <summary>
        /// Người thay đổi gần nhất
        /// </summary>
        [JsonIgnore]
        [DisplayName("Người thay đổi")]
        public string ModifiedBy { get; set; }
        #endregion
    }
}

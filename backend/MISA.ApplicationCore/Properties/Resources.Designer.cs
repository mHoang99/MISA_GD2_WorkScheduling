﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MISA.ApplicationCore.Properties {
    using System;
    
    
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    // This class was auto-generated by the StronglyTypedResourceBuilder
    // class via a tool like ResGen or Visual Studio.
    // To add or remove a member, edit your .ResX file then rerun ResGen
    // with the /str option, or rebuild your VS project.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "16.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    internal class Resources {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal Resources() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("MISA.ApplicationCore.Properties.Resources", typeof(Resources).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Vui lòng liện hệ bộ phận hỗ trợ MISA để được tư vấn.
        /// </summary>
        internal static string MISA_ResponseMessage_Default {
            get {
                return ResourceManager.GetString("MISA.ResponseMessage.Default", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to {0} &lt;{1}&gt; đã tồn tại trong hệ thống, vui lòng kiểm tra lại..
        /// </summary>
        internal static string MISA_ResponseMessage_Duplicated {
            get {
                return ResourceManager.GetString("MISA.ResponseMessage.Duplicated", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to {0} không đúng định dạng email..
        /// </summary>
        internal static string MISA_ResponseMessage_InvalidEmail {
            get {
                return ResourceManager.GetString("MISA.ResponseMessage.InvalidEmail", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to {0} không đúng định dạng số điện thoại..
        /// </summary>
        internal static string MISA_ResponseMessage_InvalidPhoneNumber {
            get {
                return ResourceManager.GetString("MISA.ResponseMessage.InvalidPhoneNumber", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to {0} không được phép để trống.
        /// </summary>
        internal static string MISA_ResponseMessage_IsNull {
            get {
                return ResourceManager.GetString("MISA.ResponseMessage.IsNull", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to {0} không được vượt quá {1} ký tự.
        /// </summary>
        internal static string MISA_ResponseMessage_MaxLengthExceeded {
            get {
                return ResourceManager.GetString("MISA.ResponseMessage.MaxLengthExceeded", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to {0} phải là kiểu UUID.
        /// </summary>
        internal static string MISA_ResponseMessage_NotUUID {
            get {
                return ResourceManager.GetString("MISA.ResponseMessage.NotUUID", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Bản ghi với {0} &lt;{1}&gt; không tồn tại.
        /// </summary>
        internal static string MISA_ResponseMessage_RecordIdNotExists {
            get {
                return ResourceManager.GetString("MISA.ResponseMessage.RecordIdNotExists", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Tác động bản ghi trong CSDL thất bại.
        /// </summary>
        internal static string MISA_ResponseMessage_RowAffectingUnexpectedFailure {
            get {
                return ResourceManager.GetString("MISA.ResponseMessage.RowAffectingUnexpectedFailure", resourceCulture);
            }
        }
    }
}

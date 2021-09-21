using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Exceptions;
using MISA.ApplicationCore.Helpers;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Resources;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore
{
    /// <summary>
    /// Base Service
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// CREATEDBY: VMHOANG (25/07/2021)
    public class BaseService<T> : IBaseService<T> where T : BaseModel
    {
        #region Fields
        /// <summary>
        /// repository kết nối DB
        /// </summary>
        protected IBaseRepository<T> _repository;
        #endregion

        #region Properties
        protected ServiceResult serviceResult;
        #endregion

        #region Constructor
        public BaseService(IBaseRepository<T> repository)
        {
            try
            {
                _repository = repository;
                serviceResult = new ServiceResult
                {
                    SuccessState = true,
                    MISACode = Enums.MISACode.Success
                };
            }
            catch (Exception ex)
            {
                throw new ServiceException(
                    ex.Message,
                    UnexpectedErrorResponse(ex.Message)
                );
            }
        }
        #endregion

        #region Methods
        public async Task<ServiceResult> Get()
        {
            try
            {
                serviceResult.SuccessState = true;
                serviceResult.Data = await _repository.Get();
                serviceResult.MISACode = Enums.MISACode.Success;
                return serviceResult;
            }
            catch (Exception ex)
            {
                throw new ServiceException(
                    ex.Message,
                    UnexpectedErrorResponse(ex.Message)
                );
            }
        }

        public async Task<ServiceResult> GetById(string id)
        {
            try
            {
                //Kiểm tra kiểu dữ liệu Guid
                if (CheckGuid($"id", id))
                {
                    serviceResult.SuccessState = true;
                    serviceResult.Data = await _repository.GetEntityById(Guid.Parse(id));
                    serviceResult.MISACode = Enums.MISACode.Success;
                }

                return serviceResult;
            }
            catch (Exception ex)
            {
                throw new ServiceException(
                    ex.Message,
                    UnexpectedErrorResponse(ex.Message)
                );
            }

        }

        public async Task<ServiceResult> Add(T entity)
        {
            try
            {
                entity.EntityState = Enums.EntityState.ADD;

                //validate entity
                var isValid = await Validate(entity);
                if (!isValid)
                {
                    return serviceResult;
                }

                serviceResult.SuccessState = true;
                serviceResult.Data = await _repository.Add(entity);
                serviceResult.MISACode = Enums.MISACode.IsValid;

                //Không tác động được bản ghi
                if (int.Parse(serviceResult.Data.ToString()) <= 0)
                {
                    serviceResult = RowAffectingUnexpectedFailureResponse();
                }

                return serviceResult;
            }
            catch (Exception ex)
            {
                throw new ServiceException(
                    ex.Message,
                    UnexpectedErrorResponse(ex.Message)
                );
            }

        }

        async public Task<ServiceResult> Update(string id, T entity)
        {
            try
            {
                //kiểm tra id là guid
                if (!CheckGuid($"id", id))
                {
                    return serviceResult;
                }

                var parsedId = Guid.Parse(id);

                entity.EntityState = Enums.EntityState.UPDATE;

                //set id của entity thành parsedId
                entity.GetType().GetProperty($"{typeof(T).Name}Id").SetValue(entity, parsedId);

                //Lấy dữ liệu từ repository
                var en = await _repository.GetEntityById(parsedId);

                if (en == null)
                {
                    serviceResult.SuccessState = false;
                    serviceResult.DevMsg = string.Format(Properties.Resources.MISA_ResponseMessage_RecordIdNotExists, id);
                    serviceResult.UserMsg = string.Format(Properties.Resources.MISA_ResponseMessage_RecordIdNotExists, id);
                    serviceResult.MISACode = Enums.MISACode.NotValid;
                    return serviceResult;
                }

                //validate entity
                var isValid = await Validate(entity);

                if (!isValid)
                {
                    return serviceResult;
                }

                serviceResult.SuccessState = true;
                serviceResult.Data = await _repository.Update(entity);
                serviceResult.MISACode = Enums.MISACode.IsValid;

                //Không tác động được bản ghi
                if (int.Parse(serviceResult.Data.ToString()) <= 0)
                {
                    serviceResult = RowAffectingUnexpectedFailureResponse();
                }

                return serviceResult;
            }
            catch (Exception ex)
            {
                throw new ServiceException(
                    ex.Message,
                    UnexpectedErrorResponse(ex.Message)
                );
            }
        }

        async public Task<ServiceResult> Delete(string id)
        {
            try
            {
                //kiểm tra id là guid
                if (!CheckGuid($"id", id))
                {
                    return serviceResult;
                }

                var parsedId = Guid.Parse(id);

                //lấy enity từ repository
                var entity = await _repository.GetEntityById(parsedId);

                if (entity == null)
                {
                    serviceResult.SuccessState = false;
                    serviceResult.DevMsg = string.Format(Properties.Resources.MISA_ResponseMessage_RecordIdNotExists, id);
                    serviceResult.UserMsg = string.Format(Properties.Resources.MISA_ResponseMessage_RecordIdNotExists, id);
                    serviceResult.MISACode = Enums.MISACode.NotValid;
                }
                else
                {
                    serviceResult.SuccessState = true;
                    entity.EntityState = Enums.EntityState.REMOVE;
                    serviceResult.Data = await _repository.Delete(parsedId);

                    if (int.Parse(serviceResult.Data.ToString()) <= 0)
                    {
                        serviceResult = RowAffectingUnexpectedFailureResponse();
                    }
                }
                return serviceResult;
            }
            catch (Exception ex)
            {
                throw new ServiceException(
                    ex.Message,
                    UnexpectedErrorResponse(ex.Message)
                );
            }
        }

        /// <summary>
        /// Validate dữ liệu
        /// </summary>
        /// <param name="entity">đối tượng cần validate</param>
        /// <returns>true: hợp lệ | false: không hợp lệ</returns>
        private async Task<bool> Validate(T entity)
        {
            var isValid = true;

            var properties = entity.GetType().GetProperties();

            //Duyệt qua tất cả các properties của entity
            foreach (var property in properties)
            {
                var propertyValue = property.GetValue(entity);
                var propertyName = property.Name;

                var propertyDisplayName = property.GetCustomAttributes(typeof(DisplayNameAttribute), false).FirstOrDefault() as DisplayNameAttribute;

                //Kiểm tra property có bắt buộc không
                if (property.IsDefined(typeof(Required), true))
                {
                    if (propertyValue == null && entity.EntityState != Enums.EntityState.ADD)
                    {
                        isValid = false;
                        serviceResult.SuccessState = false;
                        serviceResult.UserMsg = string.Format(Properties.Resources.MISA_ResponseMessage_RecordIdNotExists, propertyDisplayName?.DisplayName, propertyValue);
                        serviceResult.DevMsg = string.Format(Properties.Resources.MISA_ResponseMessage_RecordIdNotExists, propertyName, propertyValue);
                        serviceResult.MISACode = Enums.MISACode.NotValid;
                        break;
                    }
                }

                //Kiểm tra property có cần duy nhất không
                if (property.IsDefined(typeof(Unique), true))
                {
                    var entityNotUnique = await _repository.GetEntityByProperty(entity, property);
                    if (entityNotUnique != null)
                    {
                        isValid = false;
                        serviceResult.SuccessState = false;
                        serviceResult.UserMsg = string.Format(Properties.Resources.MISA_ResponseMessage_Duplicated, propertyDisplayName.DisplayName, propertyValue.ToString());
                        serviceResult.DevMsg = string.Format(Properties.Resources.MISA_ResponseMessage_Duplicated, propertyName, propertyValue.ToString());
                        serviceResult.MISACode = Enums.MISACode.NotValid;
                        break;
                    }
                }

                //Kiểm tra độ dài
                if (property.IsDefined(typeof(MaxLength), false))
                {
                    var attr = property.GetCustomAttributes(typeof(MaxLength), false).FirstOrDefault() as MaxLength;

                    var maxLength = attr?.Value;

                    if (property.PropertyType == typeof(string))
                    {
                        if (((propertyValue?.ToString()) ?? "").Length > maxLength)
                        {
                            isValid = false;
                            serviceResult.SuccessState = false;
                            serviceResult.UserMsg = string.Format(
                                Properties.Resources.MISA_ResponseMessage_MaxLengthExceeded,
                                propertyDisplayName?.DisplayName ?? propertyName,
                                maxLength
                                );
                            serviceResult.DevMsg = string.Format(Properties.Resources.MISA_ResponseMessage_MaxLengthExceeded, propertyName, maxLength);
                            serviceResult.MISACode = Enums.MISACode.NotValid;
                            break;
                        }
                    }

                }

                //Kiểm tra email
                if (property.IsDefined(typeof(Email), false))
                {
                    var testPropertyValue = propertyValue;
                    if (testPropertyValue == null)
                    {
                        testPropertyValue = "";
                    }

                    if (property.PropertyType == typeof(string))
                    {
                        if (!Validator.IsValidEmail((string)testPropertyValue))
                        {
                            isValid = false;
                            serviceResult.SuccessState = false;
                            serviceResult.UserMsg = string.Format(Properties.Resources.MISA_ResponseMessage_InvalidEmail, propertyDisplayName?.DisplayName ?? propertyName);
                            serviceResult.DevMsg = string.Format(Properties.Resources.MISA_ResponseMessage_InvalidEmail, propertyName);
                            serviceResult.MISACode = Enums.MISACode.NotValid;
                            break;
                        }
                    }
                }
            }

            return isValid && await CustomValidate(entity);
        }

        /// <summary>
        /// Hàm validate tùy chọn
        /// </summary>
        /// <returns>true | false</returns>
        protected async virtual Task<Boolean> CustomValidate(T entity)
        {
            return true;
        }

        /// <summary>
        /// Kiểm tra string là guid
        /// </summary>
        /// <param name="fieldName">tên trường</param>
        /// <param name="toCheck">string cần kiểm tra</param>
        /// <returns>true | false</returns>
        protected bool CheckGuid(string fieldName, string toCheck)
        {
            var check = Guid.TryParse(toCheck, out _);

            if (!check)
            {
                serviceResult.SuccessState = false;
                serviceResult.DevMsg = string.Format(Properties.Resources.MISA_ResponseMessage_NotUUID, fieldName);
                serviceResult.UserMsg = string.Format(Properties.Resources.MISA_ResponseMessage_NotUUID, fieldName);
                serviceResult.MISACode = Enums.MISACode.NotValid;
            }

            return check;
        }

        /// <summary>
        /// Kết quả của service khi không thể thay đổi bản ghi trong CSDL không rõ nguyên nhân
        /// </summary>
        /// <returns>Kết quả của service</returns>
        protected ServiceResult RowAffectingUnexpectedFailureResponse()
        {
            serviceResult.SuccessState = false;
            serviceResult.UserMsg = Properties.Resources.MISA_ResponseMessage_RowAffectingUnexpectedFailure;
            serviceResult.DevMsg = Properties.Resources.MISA_ResponseMessage_RowAffectingUnexpectedFailure;
            serviceResult.MISACode = Enums.MISACode.UnexpectedError;
            return serviceResult;
        }

        /// <summary>
        /// Kết quả của service khi gặp lỗi không xác định
        /// </summary>
        /// <param name="errorMessage">Message lỗi</param>
        /// <returns>Kết quả của service</returns>
        protected ServiceResult UnexpectedErrorResponse(string errorMessage)
        {
            serviceResult.SuccessState = false;
            serviceResult.DevMsg = errorMessage;
            serviceResult.UserMsg = Properties.Resources.MISA_ResponseMessage_Default;
            serviceResult.MISACode = Enums.MISACode.DBUnexpectedError;
            return serviceResult;
        }

        #endregion
    }
}

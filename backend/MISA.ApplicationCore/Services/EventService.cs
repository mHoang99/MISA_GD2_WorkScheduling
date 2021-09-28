using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Exceptions;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Services
{    /// <summary>
     /// Event service xử lý nghiệp vụ
     /// </summary>
    public class EventService : BaseService<Event>, IEventService
    {
        #region Fields
        private IBaseRepository<User> _userRepository;

        private new IEventRepository _repository;

        private IGroupRepository _groupRepository;
        #endregion

        #region Constructors
        public EventService(IEventRepository repository, IBaseRepository<User> userRepository, IGroupRepository groupRepository) : base(repository)
        {
            _userRepository = userRepository;
            _repository = repository;
            _groupRepository = groupRepository;
        }
        #endregion

        #region Methods
        async public Task<ServiceResult> GetByUserId(string userId)
        {
            try
            {
                //kiểm tra id là guid
                if (!CheckGuid($"id", userId))
                {
                    return serviceResult;
                }

                var parsedId = Guid.Parse(userId);

                //Lấy user từ DB
                var user = await _userRepository.GetEntityById(parsedId);

                if (user == null)
                {
                    serviceResult.SuccessState = false;
                    serviceResult.UserMsg = "";
                    serviceResult.DevMsg = "";
                    return serviceResult;
                }

                var employeeId = user.EmployeeId;

                serviceResult.SuccessState = true;

                //Lấy events từ db theo employeeId
                serviceResult.Data = await _repository.GetEntitiesByEmployeeId(employeeId ?? Guid.Empty);

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

        async public Task<ServiceResult> GetByEmployeeId(string userId)
        {
            try
            {
                //kiểm tra id là guid
                if (!CheckGuid($"id", userId))
                {
                    return serviceResult;
                }

                var parsedId = Guid.Parse(userId);

                var user = await _repository.GetEntitiesByEmployeeId(parsedId);

                serviceResult.SuccessState = true;
                serviceResult.Data = user;

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

        public async Task<ServiceResult> GetOfEmployeeIdByRange(string employeeIdString, DateTime start, DateTime end)
        {
            try
            {
                //kiểm tra id là guid
                if (!CheckGuid($"id", employeeIdString))
                {
                    return serviceResult;
                }

                var parsedId = Guid.Parse(employeeIdString);

                if (end < start)
                {
                    serviceResult.SuccessState = false;
                    serviceResult.Data = "";
                    serviceResult.DevMsg = Properties.Resources.MISA_ResponseMessage_WrongTimeOrder;
                    serviceResult.UserMsg = serviceResult.DevMsg;
                    return serviceResult;
                }

                var user = await _repository.GetEntitiesOfEmployeeByRange(parsedId, start, end);

                serviceResult.SuccessState = true;
                serviceResult.Data = user;

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

        async public Task<ServiceResult> GetPendingByGroupId(string groupId, string managerId)
        {
            try
            {
                //kiểm tra id là guid
                if (!CheckGuid($"groupId", groupId))
                {
                    return serviceResult;
                }

                //kiểm tra id là guid
                if (!CheckGuid($"managerId", managerId))
                {
                    return serviceResult;
                }

                //Kiểm tra group đang lấy có thuộc thẩm quyền của user không
                var groups = await _groupRepository.GetOfManager(Guid.Parse(managerId));

                var groupFound = groups.FirstOrDefault(group => group.GroupId.ToString() == groupId);

                //Không có quyền
                if (groupFound == null)
                {
                    serviceResult.SuccessState = false;
                    serviceResult.DevMsg = "";
                    serviceResult.UserMsg = "";
                    return serviceResult;
                }

                var parsedId = Guid.Parse(groupId);

                serviceResult.SuccessState = true;
                serviceResult.Data = await _repository.GetPendingEntitiesByGroupId(parsedId);

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

        async public Task<ServiceResult> GetByManagerId(string managerId)
        {
            try
            {
                //kiểm tra id là guid
                if (!CheckGuid($"id", managerId))
                {
                    return serviceResult;
                }

                var parsedId = Guid.Parse(managerId);

                serviceResult.SuccessState = true;
                serviceResult.Data = await _repository.GetEntitiesByManagerId(parsedId);

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

        async public Task<ServiceResult> RemoveMultiple(IEnumerable<string> ids)
        {
            try
            {

                foreach (string id in ids)
                {
                    //kiểm tra id là guid
                    if (!CheckGuid($"id", id))
                    {
                        return serviceResult;
                    }
                }

                var idsString = string.Join(",", ids);

                serviceResult.SuccessState = true;
                serviceResult.Data = await _repository.DeleteEntitesByIds(idsString);


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

        public async Task<ServiceResult> ApproveMultiple(IEnumerable<string> ids, string approverId)
        {
            try
            {
                if (!CheckGuid("approverId", approverId))
                {
                    return serviceResult;
                }

                foreach (string id in ids)
                {
                    //kiểm tra id là guid
                    if (!CheckGuid($"id", id))
                    {
                        return serviceResult;
                    }
                }

                var parsedId = Guid.Parse(approverId);

                var idsString = string.Join(",", ids);

                serviceResult.SuccessState = true;
                serviceResult.Data = await _repository.ApproveEntitesByIds(idsString, parsedId);


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

        public async Task<ServiceResult> CompleteEvent(string id)
        {
            try
            {
                if (!CheckGuid("id", id))
                {
                    return serviceResult;
                }

                var parsedId = Guid.Parse(id);

                serviceResult.SuccessState = true;
                serviceResult.Data = await _repository.CompleteById(parsedId);

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

        async protected override Task<bool> CustomValidate(Event entity)
        {
            if (entity.EndTime < entity.StartTime)
            {
                serviceResult.SuccessState = false;
                serviceResult.Data = "";
                serviceResult.DevMsg = Properties.Resources.MISA_ResponseMessage_WrongTimeOrder;
                serviceResult.UserMsg = serviceResult.DevMsg;
                return false;
            }
            return true;
        }
        #endregion



    }
}

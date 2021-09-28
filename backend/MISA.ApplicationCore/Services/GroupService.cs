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
{
    /// <summary>
    /// Group service xử lý nghiệp vụ
    /// </summary>
    public class GroupService : BaseService<Group>, IGroupService
    {
        #region Fields
        private new IGroupRepository _repository;

        #endregion

        #region Constructor
        public GroupService(IGroupRepository repository) : base(repository)
        {
            _repository = repository;
        }
        #endregion

        #region Methods
        public async Task<ServiceResult> GetOfManager(string managerEmployeeId)
        {
            try
            {
                //kiểm tra id là guid
                if (!CheckGuid($"id", managerEmployeeId))
                {
                    return serviceResult;
                }

                var parsedId = Guid.Parse(managerEmployeeId);

                var groups = await _repository.GetOfManager(parsedId);

                serviceResult.SuccessState = true;
                serviceResult.Data = groups;

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
        #endregion
    }
}

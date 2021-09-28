using Dapper;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Infrastructure
{
    /// <summary>
    /// Group Repository kết nối database
    /// </summary>
    /// CREATEDBY: VMHOANG
    public class GroupRepository : BaseRepository<Group>, IGroupRepository
    {
        #region Constructor
        public GroupRepository(IDBContext dbContext) : base(dbContext)
        {
        }
        #endregion

        #region Methods
        public async Task<IEnumerable<dynamic>> GetOfManager(Guid employeeId)
        {
            try
            {
                var parameters = new DynamicParameters();

                parameters.Add($"@EmployeeId", employeeId, DbType.String);

                //thực hiện query
                var result = await _dbConnection.QueryAsync($"Proc_Get{_tableName}sHavingMangerEmployeeId", parameters, commandType: CommandType.StoredProcedure);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion
    }
}

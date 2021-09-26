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
    public class GroupRepository : BaseRepository<Group>, IGroupRepository
    {
        public GroupRepository(IDBContext dbContext) : base(dbContext)
        {
        }

        public async Task<IEnumerable<dynamic>> GetOfManager(Guid employeeId)
        {
            try
            {
                var parameters = new DynamicParameters();

                parameters.Add($"@EmployeeId", employeeId, DbType.String);


                var result = await _dbConnection.QueryAsync($"Proc_Get{_tableName}sHavingMangerEmployeeId", parameters, commandType: CommandType.StoredProcedure);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

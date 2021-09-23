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
    public class EventRepository : BaseRepository<Event>, IEventRepository
    {

        public EventRepository(IDBContext dbContext) : base(dbContext)
        {
        }

        public async Task<IEnumerable<object>> GetEntitiesByEmployeeId(Guid employeeId)
        {
            try
            {
                var parameters = new DynamicParameters();

                parameters.Add($"@EmployeeId", employeeId, DbType.String);


                var result = await _dbConnection.QueryAsync($"Proc_Get{_tableName}sByEmployeeId", parameters, commandType: CommandType.StoredProcedure);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<IEnumerable<object>> GetEntitiesByManagerId(Guid managerId)
        {
            try
            {
                var parameters = new DynamicParameters();

                parameters.Add($"@ManagerId", managerId, DbType.String);

                var result = await _dbConnection.QueryAsync($"Proc_Get{_tableName}sByManagerId", parameters, commandType: CommandType.StoredProcedure);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

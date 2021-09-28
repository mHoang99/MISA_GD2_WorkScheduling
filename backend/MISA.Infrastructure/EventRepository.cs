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
    /// Event Repository kết nối database
    /// </summary>
    /// CREATEDBY: VMHOANG
    public class EventRepository : BaseRepository<Event>, IEventRepository
    {
        #region Constructor
        public EventRepository(IDBContext dbContext) : base(dbContext)
        {
        }
        #endregion

        #region Methods
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

        public async Task<IEnumerable<object>> GetPendingEntitiesByGroupId(Guid groupId)
        {
            try
            {
                var parameters = new DynamicParameters();

                parameters.Add($"@GroupId", groupId, DbType.String);

                var result = await _dbConnection.QueryAsync($"Proc_GetPending{_tableName}sByGroupId", parameters, commandType: CommandType.StoredProcedure);

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

        public async Task<IEnumerable<object>> GetEntitiesOfEmployeeByRange(Guid employeeId, DateTime start, DateTime end)
        {
            try
            {
                var parameters = new DynamicParameters();

                parameters.Add($"@EmployeeId", employeeId, DbType.String);
                parameters.Add($"@StartTime", start);
                parameters.Add($"@EndTime", end);

                var result = await _dbConnection.QueryAsync($"Proc_Get{_tableName}sOfEmployeeByTimeRange", parameters, commandType: CommandType.StoredProcedure);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<int> DeleteEntitesByIds(string idsString)
        {
            var rowsAffected = 0;

            _dbConnection.Open();
            using (var transaction = _dbConnection.BeginTransaction())
            {
                try
                {
                    var parameters = new DynamicParameters();

                    parameters.Add($"@IdsString", idsString, DbType.String);

                    rowsAffected = await _dbConnection.ExecuteAsync($"Proc_Delete{_tableName}sByIds", parameters, commandType: CommandType.StoredProcedure, transaction: transaction);
                    transaction.Commit();
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    throw;
                }
            }

            return rowsAffected;
        }

        public async Task<int> ApproveEntitesByIds(string idsString, Guid approverId)
        {
            var rowsAffected = 0;

            _dbConnection.Open();
            using (var transaction = _dbConnection.BeginTransaction())
            {
                try
                {
                    var parameters = new DynamicParameters();

                    parameters.Add($"@IdsString", idsString, DbType.String);
                    parameters.Add($"@ApproverId", approverId, DbType.String);

                    rowsAffected = await _dbConnection.ExecuteAsync($"Proc_Approve{_tableName}sByIds", parameters, commandType: CommandType.StoredProcedure, transaction: transaction);
                    transaction.Commit();
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    throw;
                }
            }

            return rowsAffected;
        }

        public async Task<int> CompleteById(Guid id)
        {
            var rowsAffected = 0;

            _dbConnection.Open();
            using (var transaction = _dbConnection.BeginTransaction())
            {
                try
                {
                    var parameters = new DynamicParameters();

                    parameters.Add($"@EventId", id, DbType.String);

                    rowsAffected = await _dbConnection.ExecuteAsync($"Proc_Complete{_tableName}ById", parameters, commandType: CommandType.StoredProcedure, transaction: transaction);
                    transaction.Commit();
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    throw;
                }
            }

            return rowsAffected;
        }
        #endregion

    }
}

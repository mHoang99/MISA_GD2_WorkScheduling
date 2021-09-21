using Dapper;
using MISA.ApplicationCore.Authentication;
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
    public class AuthRepository : BaseRepository<RefreshToken>, IAuthRepository
    {
        private new string _tableName = "RefreshToken";
        public AuthRepository(IDBContext dbContext) : base(dbContext)
        {
        }

        async public Task<int> DeleteByUserId(Guid userId)
        {
            var rowsAffected = 0;

            _dbConnection.Open();
            using (var transaction = _dbConnection.BeginTransaction())
            {
                try
                {
                    var parameters = new DynamicParameters();

                    parameters.Add($"@UserId", userId, DbType.String);

                    //Thực thi commandText
                    rowsAffected = await _dbConnection.ExecuteAsync($"Proc_Delete{_tableName}ByUserId", parameters, commandType: CommandType.StoredProcedure, transaction: transaction);

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
    }
}

using Dapper;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Reflection;
using MISA.ApplicationCore.Models;
using MISA.ApplicationCore.Enums;

namespace MISA.Infrastructure
{
    /// <summary>
    /// Base Repository kết nối database
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// CREATEDBY: VMHOANG (27/07/2021)
    public class BaseRepository<T> : IBaseRepository<T>, IDisposable where T : BaseModel
    {
        #region Fields
        /// <summary>
        /// Tên bảng
        /// </summary>
        protected string _tableName;
        /// <summary>
        /// Kết nối tới DB
        /// </summary>
        protected IDbConnection _dbConnection;
        #endregion

        #region Constructor
        public BaseRepository(IDBContext dbContext)
        {
            _tableName = typeof(T).Name;
            _dbConnection = dbContext.GetConnection();
        }
        #endregion

        #region Methods
        async public Task<IEnumerable<T>> Get()
        {
            var pluralizedName = PluralizeService.Core.PluralizationProvider.Pluralize(_tableName);

            //Khởi tạo commandText
            var entities = await _dbConnection.QueryAsync<T>($"Proc_Get{pluralizedName}", commandType: CommandType.StoredProcedure);

            return entities;
        }

        async public Task<IEnumerable<Object>> GetView()
        {
            //Khởi tạo commandText
            var query = $"SELECT * FROM View_{_tableName}";

            var entities = await _dbConnection.QueryAsync<T>(query, commandType: CommandType.Text);
            return entities;
        }

        async public virtual Task<T> GetEntityById(Guid id)
        {
            var query = $"SELECT * FROM {_tableName} WHERE {_tableName}Id = '{id}'";

            //Khởi tạo commandText
            var entity = await _dbConnection.QueryFirstOrDefaultAsync<T>(
                query,
                commandType: CommandType.Text
                );

            return entity;
        }

        async public virtual Task<int> Add(T entity)
        {
            var rowsAffected = 0;

            _dbConnection.Open();
            using (var transaction = _dbConnection.BeginTransaction())
            {
                try
                {
                    var parameters = MappingDbType(entity);
                    rowsAffected = await _dbConnection.ExecuteAsync($"Proc_Insert{_tableName}", parameters, commandType: CommandType.StoredProcedure, transaction: transaction);
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

        async public virtual Task<int> Update(T entity)
        {
            var rowsAffected = 0;

            _dbConnection.Open();
            using (var transaction = _dbConnection.BeginTransaction())
            {
                try
                {
                    var parameters = MappingDbType(entity);
                    rowsAffected = await _dbConnection.ExecuteAsync($"Proc_Update{_tableName}", parameters, commandType: CommandType.StoredProcedure, transaction: transaction);
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

        async public virtual Task<int> Delete(Guid id)
        {
            var rowsAffected = 0;

            _dbConnection.Open();
            using (var transaction = _dbConnection.BeginTransaction())
            {
                try
                {
                    var query = $"DELETE FROM {_tableName} WHERE {_tableName}Id = '{id}'";

                    //Thực thi commandText
                    rowsAffected = await _dbConnection.ExecuteAsync(query, commandType: CommandType.Text, transaction: transaction);

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

        async public Task<T> GetEntityByProperty(T entity, PropertyInfo property)
        {
            var propertyName = property.Name;
            var propertyValue = property.GetValue(entity);
            var keyValue = entity.GetType().GetProperty($"{_tableName}Id").GetValue(entity);

            var query = string.Empty;

            if (entity.EntityState == EntityState.ADD || entity.EntityState == EntityState.GET)
            {
                query = $"SELECT * FROM {_tableName} WHERE {propertyName} = '{propertyValue}'";
            }
            else if (entity.EntityState == EntityState.UPDATE)
            {
                query = $"SELECT * FROM {_tableName} WHERE {propertyName} = '{propertyValue}' AND {_tableName}Id <> '{keyValue}'";
            }
            else
            {
                return null;
            }

            var res = await _dbConnection.QueryFirstOrDefaultAsync<T>(query, commandType: CommandType.Text);
            return res;
        }

        /// <summary>
        /// Map dữ liệu của 1 entity sang thành dynamic parameters dùng cho truy vấn SQL
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="entity"></param>
        /// <returns>dynamic parameters đã được format đúng</returns>
        protected DynamicParameters MappingDbType<TEntity>(TEntity entity)
        {
            var properties = entity.GetType().GetProperties();
            var parameters = new DynamicParameters();
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(entity);
                var propertyType = property.PropertyType;
                if(propertyName == "EntityState")
                {
                    continue;
                }
                else if (propertyType == typeof(Guid) || propertyType == typeof(Guid?))
                {
                    parameters.Add($"@{propertyName}", propertyValue, DbType.String);
                }
                else
                {
                    parameters.Add($"@{propertyName}", propertyValue);
                }
            }

            return parameters;
        }

        public void Dispose()
        {
            if (_dbConnection.State == ConnectionState.Open)
            {
                _dbConnection.Close();
            }
        }
        #endregion
    }
}

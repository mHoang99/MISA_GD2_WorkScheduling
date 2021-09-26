using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySqlConnector;
using System.Data;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Interfaces;

namespace MISA.Infrastructure.Database
{   
    /// <summary>
    /// Class quản lý connection
    /// </summary>
    /// CREATED_BY: vmhoang (22/07/2021)
    public class DBContext : IDBContext
    {
        #region Properties

        /// <summary>
        /// connection tới db
        /// </summary>
        private IDbConnection DbConnection { get; }
        #endregion

        #region Constructor
        /// <summary>
        /// constructor
        /// </summary>
        public DBContext(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("LocalDB");
            DbConnection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Methods
        public IDbConnection GetConnection()
        {
            return DbConnection;
        }
        #endregion
    }
}

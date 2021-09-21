using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Interfaces
{
    /// <summary>
    /// Interface cho Base Service
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// CREATEDBY: VMHOANG (25/07/2021)
    public interface IBaseService<T>
    {
        #region Methods

        /// <summary>
        /// Lấy tất cả dữ liệu
        /// </summary>
        /// <returns>Danh sách tất cả dữ liệu</returns>
        Task<ServiceResult> Get();
        /// <summary>
        /// Lấy dữ liệu qua khóa chính
        /// </summary>
        /// <param name="id">Khóa chính</param>
        /// <returns>Bản ghi có khóa chính tương ứng | null</returns>
        Task<ServiceResult> GetById(string id);
        /// <summary>
        /// Thêm mới bản ghi
        /// </summary>
        /// <param name="entity">Thực thể theo kiểu T</param>
        /// <returns>Thông tin trả về</returns>
        Task<ServiceResult> Add(T entity);
        /// <summary>
        /// Thay đổi bản ghi
        /// </summary>
        /// <param name="entity">Thực thể theo kiểu T</param>
        /// <param name="id">Khóa chính</param>
        /// <returns>Thông tin trả vềL</returns>
        Task<ServiceResult> Update(string id, T entity);
        /// <summary>
        /// Xóa bản ghi
        /// </summary>
        /// <param name="id">Khóa chính</param>
        /// <returns>Thông tin trả về</returns>
        Task<ServiceResult> Delete(string id);
        #endregion
    }
}

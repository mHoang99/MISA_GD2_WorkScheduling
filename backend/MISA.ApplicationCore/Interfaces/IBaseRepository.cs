using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Interfaces
{
    /// <summary>
    /// Interface cho Base Repository
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// CREATEDBY: VMHOANG (25/07/2021)
    public interface IBaseRepository<T>
    {
        #region Methods
        /// <summary>
        /// Lấy tất cả dữ liệu
        /// </summary>
        /// <returns>Danh sách tất cả dữ liệu</returns>
        Task<IEnumerable<T>> Get();
        /// <summary>
        /// Lấy dữ liệu qua khóa chính
        /// </summary>
        /// <param name="id">Khóa chính</param>
        /// <returns>Bản ghi có khóa chính tương ứng | null</returns>
        Task<T> GetEntityById(Guid id);
        /// <summary>
        /// Thêm mới bản ghi
        /// </summary>
        /// <param name="entity">Thực thể theo kiểu T</param>
        /// <returns>Số bản ghi được thay đổi</returns>
        Task<int> Add(T entity);
        /// <summary>
        /// Thay đổi bản ghi
        /// </summary>
        /// <param name="entity">Thực thể theo kiểu T</param>
        /// <returns>Số bản ghi được thay đổi</returns>
        Task<int> Update(T entity);
        /// <summary>
        /// Xóa bản ghi
        /// </summary>
        /// <param name="id">Khóa chính</param>
        /// <returns>Số bản ghi được thay đổi</returns>
        Task<int> Delete(Guid id);
        /// <summary>
        /// Lấy bản ghi theo tiêu chí
        /// </summary>
        /// <returns>Đối tượng tìm được | null</returns>
        Task<T> GetEntityByProperty(T entity, PropertyInfo property);
        #endregion
    }
}

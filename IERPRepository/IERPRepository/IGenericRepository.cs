using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace IERPRepository.IERPRepository
{
    public interface IGenericRepository<T> where T : class
    {
        int GetTotalRows(Expression<System.Func<T, bool>> predicate);
        IQueryable<T> GetAll();
        IQueryable<T> FindBy(Expression<System.Func<T, bool>> predicate);
        void Add(T entity);
        void AddRange(List<T> entities);
        void Delete(T entity);
        void Edit(T entity);
        void Save();
        Task<int> SaveAsync();
        //void DeleteRange(Expression<System.Func<T, bool>> predicate);
        void DeleteRange(List<T> predicate);
        Task<int> DeleteRangeExistingList(List<T> deleteList);
        void Reload(T entity);
    }
}

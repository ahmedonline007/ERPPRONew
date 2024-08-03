using IERPRepository.IERPRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ERPRepository.ERPRepository
{
    public abstract class GenericRepository<C, T> : IGenericRepository<T>
      where T : class
      where C : DbContext, new()
    {
        private C _entities = new C();
        public C Context
        {
            get { return _entities; }
            set { _entities = value; }
        }

        public virtual IQueryable<T> GetAll()
        {
            IQueryable<T> query = _entities.Set<T>().AsNoTracking();
            return query;
        }
        public virtual int GetTotalRows(Expression<System.Func<T, bool>> predicate)
        {
            int query = _entities.Set<T>().Where(predicate).Count();
            return query;
        }

        public IQueryable<T> FindBy(Expression<System.Func<T, bool>> predicate)
        {
            //_entities.Configuration.AutoDetectChangesEnabled = true;

            var query = _entities.Set<T>().Where(predicate);
            //_entities.Configuration.AutoDetectChangesEnabled = false;

            return query;
        }
        public virtual void Add(T entity)
        {
            _entities.Set<T>().Add(entity);
        }

        public virtual void AddRange(List<T> entities)
        {
            _entities.Set<T>().AddRange(entities);
        }

        public virtual void Delete(T entity)
        {
            _entities.Set<T>().Remove(entity);
        }

        public virtual void DeleteRange(List<T> predicate)
        {
            _entities.Set<T>().RemoveRange(predicate);
        }

        public virtual async Task<int> DeleteRangeExistingList(List<T> deleteList)
        {
            _entities.Set<T>().RemoveRange(deleteList);

            return await _entities.SaveChangesAsync();
        }

        public virtual void Edit(T entity)
        {
            _entities.Entry(entity).State = EntityState.Modified;
        }


        public virtual void Save()
        {
            try
            {
                _entities.SaveChanges();
            }
            catch (Exception e)
            {
                //need to create table to save bug of system
                throw e;
            }
        }

        public virtual void Reload(T entity)
        {
            try
            {
                _entities.Entry(entity).GetDatabaseValues();
            }
            catch { }
        }

        public virtual async Task<int> SaveAsync()
        {
            return await _entities.SaveChangesAsync();
        }
    }
}

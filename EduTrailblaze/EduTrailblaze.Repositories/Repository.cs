using EduTrailblaze.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EduTrailblaze.Repositories
{
    public class Repository<T, TKey> : IRepository<T, TKey> where T : class
    {
        private readonly EduTrailblazeDbContext _context;
        private readonly DbSet<T> _dbSet;

        public Repository(EduTrailblazeDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public Task<IQueryable<T>> GetDbSet()
        {
            try
            {
                var dbSet = Task.FromResult(_dbSet.AsQueryable());
                if (dbSet == null)
                {
                    throw new InvalidOperationException("DbSet returned null.");
                }
                return dbSet;
            }
            catch (Exception ex)
            {
                throw new Exception($"Couldn't retrieve entities: {ex.Message}");
            }
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            try
            {
                return await _dbSet.AsQueryable().ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Couldn't retrieve entities: {ex.Message}");
            }
        }

        public async Task<T?> GetByIdAsync(TKey id)
        {
            try
            {
                return await _dbSet.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception($"Couldn't retrieve entity: {ex.Message}");
            }
        }

        public async Task AddAsync(T entity)
        {
            try
            {
                await _dbSet.AddAsync(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Couldn't add entity: {ex.Message}");
            }
        }

        public async Task UpdateAsync(T entity)
        {
            try
            {
                _dbSet.Update(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Couldn't update entity: {ex.Message}");
            }
        }

        public async Task DeleteAsync(T entity)
        {
            try
            {
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Couldn't delete entity: {ex.Message}");
            }
        }
    }
}


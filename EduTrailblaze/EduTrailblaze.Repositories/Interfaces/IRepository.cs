namespace EduTrailblaze.Repositories.Interfaces
{
    public interface IRepository<T, TKey> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<IQueryable<T>> GetDbSet();
        Task<T?> GetByIdAsync(TKey id);
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
    }
}

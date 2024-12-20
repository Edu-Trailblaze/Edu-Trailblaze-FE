namespace EduTrailblaze.Services.Interface
{
    public interface IRedisService
    {
        Task<bool> AcquireLock(string lockKey, string lockValue);
        Task<bool> ReleaseLock(string lockKey);
    }
}

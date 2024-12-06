namespace EduTrailblaze.Services.Interfaces
{
    public interface IRedisLock
    {
        void ReleaseLock(string lockKey, string lockValue);
        bool AcquireLock(string lockKey, string lockValue);
    }
}

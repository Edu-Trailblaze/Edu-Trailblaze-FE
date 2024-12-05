using EduTrailblaze.Services.Interfaces;
using StackExchange.Redis;

namespace EduTrailblaze.Services
{
    public class RedisLock : IRedisLock
    {
        private readonly IDatabase _database;
        private readonly IConnectionMultiplexer _redisConnection;
        private readonly TimeSpan _expiry = TimeSpan.FromMinutes(3);

        public RedisLock(IConnectionMultiplexer redisConnection)
        {
            _redisConnection = redisConnection;
            _database = _redisConnection.GetDatabase();
        }

        public bool AcquireLock(string lockKey, string lockValue)
        {
            // Attempt to acquire the lock
            return _database.StringSet(lockKey, lockValue, _expiry, When.NotExists);
        }

        public void ReleaseLock(string lockKey, string lockValue)
        {
            // Check if the lock value matches before releasing
            if (_database.StringGet(lockKey) == lockValue)
            {
                _database.KeyDelete(lockKey);
            }
        }
    }
}

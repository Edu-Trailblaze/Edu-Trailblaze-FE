using EduTrailblaze.Services.Interface;
using StackExchange.Redis;

namespace EduTrailblaze.Services
{
    public class RedisService : IRedisService
    {
        private readonly IConnectionMultiplexer _redisService;
        private readonly IDatabase _database;

        public RedisService(IConnectionMultiplexer redisService)
        {
            _redisService = redisService;
            // _redisService = ConnectionMultiplexer.Connect("");
            _database = _redisService.GetDatabase();
        }
        public async Task<bool> AcquireLock(string lockKey, string lockValue) => _database.StringSet(lockKey, lockValue, TimeSpan.FromMinutes(30), When.NotExists);
        public async Task<bool> ReleaseLock(string lockKey) => await _database.KeyDeleteAsync(lockKey);
    }
}

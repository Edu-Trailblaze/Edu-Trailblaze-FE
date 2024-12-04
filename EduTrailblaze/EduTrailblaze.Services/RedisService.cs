using EduTrailblaze.Services.Interface;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public async Task<bool> AcquireLock(string lockKey, string lockValue) =>  _database.StringSet(lockKey, lockValue, TimeSpan.FromMinutes(30), When.NotExists);
        
    }
}

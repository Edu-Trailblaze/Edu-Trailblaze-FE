using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduTrailblaze.Services.Interface
{
    public interface IRedisService
    {
        Task<bool> AcquireLock(string lockKey, string lockValue);
        Task<bool> ReleaseLock(string lockKey);
    }
}

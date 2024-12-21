using EduTrailblaze.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IRoleService
    {
        Task<ApiResponse> AssignRole(AssignRoleModel model);
    }
}

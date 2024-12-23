using EduTrailblaze.Services.Models;

namespace EduTrailblaze.Services.Interfaces
{
    public interface IRoleService
    {
        Task<ApiResponse> AssignRole(AssignRoleModel model);
    }
}

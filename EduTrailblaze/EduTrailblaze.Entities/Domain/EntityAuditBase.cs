using EduTrailblaze.API.Domain.Interfaces;

namespace EduTrailblaze.API.Domain
{
    public class EntityAuditBase<T> : EntityBase<T>, IAuditable
    {
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? UpdatedAt { get; set; }
    }
}

using EduTrailblaze.API.Domain.Interfaces;

namespace EduTrailblaze.API.Domain
{
    public class EntityAuditBase<T> : EntityBase<T> , IAuditable 
    {
        public DateTimeOffset CreatedDate { get; set; }
        public DateTimeOffset? LastModifiedDate { get; set; }
    }
}

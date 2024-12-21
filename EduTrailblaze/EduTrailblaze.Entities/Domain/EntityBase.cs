using EduTrailblaze.API.Domain.Interfaces;
namespace EduTrailblaze.API.Domain
{
    public class EntityBase<TKey> : IEntityBase<TKey>
    {
        public TKey Id { get; set; }
    }
}

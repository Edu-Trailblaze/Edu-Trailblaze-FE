using EduTrailblaze.API.Domain.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace EduTrailblaze.API.Domain
{
    public class EntityBase<TKey> : IEntityBase<TKey>
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual TKey Id { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class Language
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LanguageId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Code { get; set; }


        // Navigation properties
        public virtual ICollection<CourseLanguage> CourseLanguages { get; set; }
    }
}

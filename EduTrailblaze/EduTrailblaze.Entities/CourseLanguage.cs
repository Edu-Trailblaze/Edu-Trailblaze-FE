using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class CourseLanguage
    {
        [Key, ForeignKey("Course")]
        public int CourseId { get; set; }

        [Key, ForeignKey("Language")]
        public int LanguageId { get; set; }


        // Navigation properties
        public virtual Course Course { get; set; }
        public virtual Language Language { get; set; }
    }
}
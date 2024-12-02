using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class Answer
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AnswerId { get; set; }

        [Required, ForeignKey("Question")]
        public int QuestionId { get; set; }

        [Required, StringLength(int.MaxValue)]
        public string AnswerText { get; set; }

        [Required]
        public bool IsCorrect { get; set; }


        // Navigation properties
        public virtual Question Question { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class Question
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int QuestionId { get; set; }

        [Required, ForeignKey("Quiz")]
        public int QuizzId { get; set; }

        [Required, StringLength(int.MaxValue)]
        public string QuestionText { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }


        // Navigation properties
        public virtual Quiz Quiz { get; set; }
        public virtual ICollection<Answer> Answers { get; set; }
        public virtual ICollection<QuizAnswer> QuizAnswers { get; set; }
    }
}

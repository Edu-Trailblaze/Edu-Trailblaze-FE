using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class CartItem
    {
        [Key, ForeignKey("Cart")]
        public int CartId { get; set; }

        [Key, ForeignKey("Course")]
        public int CourseId { get; set; }


        // Navigation properties
        public virtual Cart Cart { get; set; }
        public virtual Course Course { get; set; }
    }
}
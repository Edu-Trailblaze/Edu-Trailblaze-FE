using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class Order
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderId { get; set; }

        [Required, ForeignKey("User")]
        public string UserId { get; set; }

        [Required]
        public decimal OrderAmount { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        [StringLength(20)]
        public string OrderStatus { get; set; } = "Pending";
        //'Pending', 'Processing', 'Cancelled'

        // Navigation properties
        public virtual User User { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }

    }
}
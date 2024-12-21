using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduTrailblaze.Entities
{
    public class Payment
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PaymentId { get; set; }

        [Required, ForeignKey("Order")]
        public int OrderId { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required, StringLength(50)]
        public string PaymentMethod { get; set; }
        //'VNPAY', 'MoMo', 'PayPal', 'SystemBalance'

        [StringLength(20)]
        public string PaymentStatus { get; set; } = "Processing";
        //'Success', 'Failed', 'Processing'

        public DateTime PaymentDate { get; set; }


        // Navigation property
        public virtual Order Order { get; set; }
    }
}
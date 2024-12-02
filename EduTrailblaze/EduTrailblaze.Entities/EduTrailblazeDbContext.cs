using EduTrailblaze.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Reflection.Emit;

namespace IdentityAPI.Entities
{
    public class EduTrailblazeDbContext : IdentityDbContext<User>
    {
        public EduTrailblazeDbContext(DbContextOptions<EduTrailblazeDbContext> options)
            : base(options)
        {
        }

        public EduTrailblazeDbContext()
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

            IConfigurationRoot configurationRoot = builder.Build();
            optionsBuilder.UseSqlServer(configurationRoot.GetConnectionString("DefaultConnection"));
        }

        public DbSet<Answer> Answers { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Certificate> Certificates { get; set; }
        public DbSet<Coupon> Coupons { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseCoupon> CourseCoupons { get; set; }
        public DbSet<CourseDiscount> CourseDiscounts { get; set; }
        public DbSet<CourseInstructor> CourseInstructors { get; set; }
        public DbSet<CourseLanguage> CourseLanguages { get; set; }
        public DbSet<CourseTag> CourseTags { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Lecture> Lectures { get; set; }
        public DbSet<News>  News { get; set; }
        public DbSet<Notification>  Notifications { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<QuizAnswer> QuizAnswers { get; set; }
        public DbSet<QuizHistory> QuizHistories { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<UserCertificate> UserCertificates { get; set; }
        public DbSet<UserNotification> UserNotifications { get; set; }
        public DbSet<UserProgress> UserProgresses { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<Video> Videos { get; set; }
        public DbSet<Voucher> Vouchers { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<CartItem>().HasKey(ci => new { ci.CartId, ci.CourseId });
            builder.Entity<CourseCoupon>().HasKey(cc => new { cc.CourseId, cc.CouponId });
            builder.Entity<CourseDiscount>().HasKey(cd => new { cd.CourseId, cd.DiscountId });
            builder.Entity<CourseInstructor>().HasKey(ci => new { ci.CourseId, ci.InstructorId });
            builder.Entity<CourseLanguage>().HasKey(cl => new { cl.CourseId, cl.LanguageId });
            builder.Entity<CourseTag>().HasKey(ct => new { ct.CourseId, ct.TagId });
            builder.Entity<OrderDetail>().HasKey(od => new { od.CourseId, od.OrderId });
            builder.Entity<UserNotification>().HasKey(un => new { un.UserId, un.NotificationId });

            builder.Entity<QuizAnswer>()
                .HasOne(q => q.QuizHistory)
                .WithMany(qh => qh.QuizAnswers)
                .HasForeignKey(q => q.QuizHistoryId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<IdentityRole>().HasData(
                new IdentityRole
                {
                    Id = "R001",
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                    ConcurrencyStamp = Guid.NewGuid().ToString()
                },
                new IdentityRole
                {
                    Id = "R002",
                    Name = "Instructor",
                    NormalizedName = "INSTRUCTOR",
                    ConcurrencyStamp = Guid.NewGuid().ToString()
                },
                new IdentityRole
                {
                    Id = "R003",
                    Name = "Student",
                    NormalizedName = "STUDENT",
                    ConcurrencyStamp = Guid.NewGuid().ToString()
                }
            );
        }
    }
}

using EduTrailblaze.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace EduTrailblaze.Repositories
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
        public DbSet<News> News { get; set; }
        public DbSet<Notification> Notifications { get; set; }
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

            builder.Entity<UserCertificate>()
                .Property(n => n.IssuedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<CourseInstructor>()
                .Property(n => n.AssignedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<Tag>()
                .Property(n => n.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<Tag>()
                .Property(n => n.UpdatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<UserProgress>()
                .Property(n => n.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<UserProgress>()
                .Property(n => n.UpdatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<Quiz>()
                .Property(n => n.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<Quiz>()
                .Property(n => n.UpdatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<Question>()
                .Property(n => n.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<Question>()
                .Property(n => n.UpdatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<Certificate>()
                .Property(n => n.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<Certificate>()
                .Property(n => n.UpdatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<Notification>()
                .Property(n => n.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<Course>()
                .Property(n => n.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<Course>()
                .Property(n => n.UpdatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<Course>()
                .Property(n => n.IsDeleted)
                .HasDefaultValue(false);

            builder.Entity<Voucher>()
                .Property(n => n.IsUsed)
                .HasDefaultValue(false);

            builder.Entity<Video>()
                .Property(n => n.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<Video>()
                .Property(n => n.UpdatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<Video>()
                .Property(n => n.IsDeleted)
                .HasDefaultValue(false);

            builder.Entity<Lecture>()
                .Property(n => n.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<Lecture>()
                .Property(n => n.UpdatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<Lecture>()
                .Property(n => n.IsDeleted)
                .HasDefaultValue(false);

            builder.Entity<Enrollment>()
                .Property(n => n.EnrolledAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<Enrollment>()
                .Property(n => n.UpdatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<Enrollment>()
                .Property(n => n.ProgressPercentage)
                .HasDefaultValue(0m);
            builder.Entity<Enrollment>()
                .Property(n => n.IsCompleted)
                .HasDefaultValue(false);

            builder.Entity<UserNotification>()
                .Property(n => n.IsRead)
                .HasDefaultValue(false);

            builder.Entity<Discount>()
                .Property(n => n.StartDate)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<Discount>()
                .Property(n => n.IsActive)
                .HasDefaultValue(true);

            builder.Entity<Cart>()
                .Property(n => n.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<Cart>()
                .Property(n => n.UpdatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<Cart>()
                .Property(n => n.IsActive)
                .HasDefaultValue(true);

            builder.Entity<Coupon>()
                .Property(n => n.IsActive)
                .HasDefaultValue(true);

            builder.Entity<News>()
                .Property(n => n.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<News>()
                .Property(n => n.UpdatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<News>()
                .Property(n => n.IsDeleted)
                .HasDefaultValue(false);

            builder.Entity<Order>()
                .Property(n => n.OrderDate)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<Order>()
                .Property(n => n.OrderStatus)
                .HasDefaultValue("Pending");

            builder.Entity<Payment>()
                .Property(n => n.PaymentDate)
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Entity<Payment>()
                .Property(n => n.PaymentStatus)
                .HasDefaultValue("Pending");

            builder.Entity<QuizAnswer>()
                .HasOne(q => q.QuizHistory)
                .WithMany(qh => qh.QuizAnswers)
                .HasForeignKey(q => q.QuizHistoryId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<UserProfile>()
                .Property(n => n.Balance)
                .HasDefaultValue(0m);

            builder.Entity<UserProfile>()
                .Property(n => n.ProfilePictureUrl)
                .HasDefaultValue("https://firebasestorage.googleapis.com/v0/b/storage-8b808.appspot.com/o/OIP.jpeg?alt=media&token=60195a0a-2fd6-4c66-9e3a-0f7f80eb8473");

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

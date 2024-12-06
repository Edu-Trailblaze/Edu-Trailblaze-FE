using EduTrailblaze.Entities;
using EduTrailblaze.Repositories;
using EduTrailblaze.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Moq;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace EduTrailblaze.Tests
{
    public class CourseServiceTest
    {
        private readonly Mock<DbSet<Course>> mockSet;
        private readonly Mock<EduTrailblazeDbContext> mockContext;
        private readonly List<Course> courseList;
        private readonly IRepository<Course, int> _courseRepository;

        public CourseServiceTest()
        {
            mockSet = new Mock<DbSet<Course>>();
            mockContext = new Mock<EduTrailblazeDbContext>();
            courseList = new List<Course>
                {
                    new Course
                    {
                        CourseId = 1,
                        Title = "Course 1",
                        ImageURL = "example.com/image1.jpg",
                        Description = "Description for Course 1",
                        Price = 100.00m,
                        Duration = 10,
                        DifficultyLevel = "Beginner",
                        Prerequisites = "None",
                        EstimatedCompletionTime = 5.0m,
                        CreatedBy = "Admin",
                        UpdatedBy = "Admin",
                        IsPublished = true,
                        IsDeleted = false,
                        CreatedAt = DateTime.UtcNow,
                        UpdatedAt = DateTime.UtcNow
                    },
                    new Course
                    {
                        CourseId = 2,
                        Title = "Course 2",
                        ImageURL = "example.com/image2.jpg",
                        Description = "Description for Course 2",
                        Price = 200.00m,
                        Duration = 20,
                        DifficultyLevel = "Intermediate",
                        Prerequisites = "Course 1",
                        EstimatedCompletionTime = 10.0m,
                        CreatedBy = "Admin",
                        UpdatedBy = "Admin",
                        IsPublished = true,
                        IsDeleted = false,
                        CreatedAt = DateTime.UtcNow,
                        UpdatedAt = DateTime.UtcNow
                    }
                };

            var data = courseList.AsQueryable();

            mockSet.As<IQueryable<Course>>().Setup(m => m.Provider).Returns(data.Provider);
            mockSet.As<IQueryable<Course>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<Course>>().Setup(m => m.ElementType).Returns(data.ElementType);
            mockSet.As<IQueryable<Course>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());

            mockContext.Setup(c => c.Courses).Returns(mockSet.Object);

            _courseRepository = new Repository<Course, int>(mockContext.Object);
        }

        [Fact]
        public async void GetCoursesByConditions_ReturnsCourses()
        {
            var courses = await _courseRepository.GetAllAsync();
            Assert.NotNull(courses);
            Assert.Equal(2, courses.Count());
        }
    }
}
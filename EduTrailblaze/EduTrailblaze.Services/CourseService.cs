using AutoMapper;
using EduTrailblaze.Entities;
using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Services.DTOs;
using EduTrailblaze.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EduTrailblaze.Services
{
    public class CourseService : ICourseService
    {
        private readonly IRepository<Course, int> _courseRepository;
        private readonly IRepository<CourseInstructor, int> _courseInstructorRepository;
        private readonly IRepository<Enrollment, int> _enrollment;
        private readonly IReviewService _reviewService;
        private readonly IElasticsearchService _elasticsearchService;
        private readonly IDiscountService _discountService;
        private readonly IMapper _mapper;

        public CourseService(IRepository<Course, int> courseRepository, IReviewService reviewService, IElasticsearchService elasticsearchService, IMapper mapper, IDiscountService discountService, IRepository<CourseInstructor, int> courseInstructorRepository, IRepository<Enrollment, int> enrollment)
        {
            _courseRepository = courseRepository;
            _reviewService = reviewService;
            _elasticsearchService = elasticsearchService;
            _mapper = mapper;
            _discountService = discountService;
            _courseInstructorRepository = courseInstructorRepository;
            _enrollment = enrollment;
        }

        public async Task<Course?> GetCourse(int courseId)
        {
            try
            {
                return await _courseRepository.GetByIdAsync(courseId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the course.", ex);
            }
        }

        public async Task<IEnumerable<Course>> GetCourses()
        {
            try
            {
                return await _courseRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the course.", ex);
            }
        }

        public async Task AddCourse(Course course)
        {
            try
            {
                await _courseRepository.AddAsync(course);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the course.", ex);
            }
        }

        public async Task UpdateCourse(Course course)
        {
            try
            {
                await _courseRepository.UpdateAsync(course);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the course.", ex);
            }
        }

        public async Task DeleteCourse(Course course)
        {
            try
            {
                await _courseRepository.DeleteAsync(course);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the course.", ex);
            }
        }

        public async Task<decimal> CalculateEffectivePrice(int courseId)
        {
            var dbSet = await _courseRepository.GetDbSet();

            var course = await dbSet
                .Include(c => c.CourseDiscounts)
                .ThenInclude(cd => cd.Discount)
                .FirstOrDefaultAsync(c => c.CourseId == courseId);

            if (course == null)
            {
                throw new ArgumentException("Invalid course ID");
            }

            var effectivePrice = course.Price;
            if (course.CourseDiscounts.Any())
            {
                var maxDiscount = course.CourseDiscounts
                    .Where(d => d.Discount.IsActive &&
                                d.Discount.StartDate <= DateTime.UtcNow &&
                                d.Discount.EndDate >= DateTime.UtcNow)
                    .Max(d => d.Discount.DiscountType == "Percentage"
                        ? course.Price * d.Discount.DiscountValue / 100
                        : d.Discount.DiscountValue);

                effectivePrice -= maxDiscount;
            }

            return effectivePrice;
        }

        public async Task<int?> GetMaxDiscountId(int courseId)
        {
            var dbSet = await _courseRepository.GetDbSet();

            var course = await dbSet
                .Include(c => c.CourseDiscounts)
                .ThenInclude(cd => cd.Discount)
                .FirstOrDefaultAsync(c => c.CourseId == courseId);

            if (course == null)
            {
                throw new ArgumentException("Invalid course ID");
            }

            var maxDiscount = course.CourseDiscounts
                .Where(d => d.Discount.IsActive &&
                            d.Discount.StartDate <= DateTime.UtcNow &&
                            d.Discount.EndDate >= DateTime.UtcNow)
                .OrderByDescending(d => d.Discount.DiscountType == "Percentage"
                    ? course.Price * d.Discount.DiscountValue / 100
                    : d.Discount.DiscountValue)
                .FirstOrDefault();

            return maxDiscount?.DiscountId;
        }

        public async Task<List<CourseDTO>?> GetCoursesByConditions(GetCoursesRequest request)
        {
            try
            {
                var dbSet = await _courseRepository.GetDbSet();

                if (request.IsDeleted != null)
                {
                    dbSet = dbSet.Where(c => c.IsDeleted == request.IsDeleted);
                }

                if (request.IsPublished != null)
                {
                    dbSet = dbSet.Where(c => c.IsPublished == request.IsPublished);
                }

                if (request.TagId != null)
                {
                    dbSet = dbSet.Where(c => c.CourseTags.Any(t => t.TagId == request.TagId));
                }

                if (request.InstructorId != null)
                {
                    dbSet = dbSet.Where(c => c.CourseInstructors.Any(t => t.InstructorId == request.InstructorId));
                }

                if (request.LanguageId != null)
                {
                    dbSet = dbSet.Where(c => c.CourseLanguages.Any(t => t.LanguageId == request.LanguageId));
                }

                if (request.MinRating != null)
                {
                    dbSet = dbSet.Where(c => c.Reviews.Any() && c.Reviews.Average(r => r.Rating) >= request.MinRating);
                }

                if (request.MaxRating != null)
                {
                    dbSet = dbSet.Where(c => c.Reviews.Any() && c.Reviews.Average(r => r.Rating) <= request.MaxRating);
                }

                if (request.MinDuration != null)
                {
                    dbSet = dbSet.Where(c => c.Duration >= request.MinDuration);
                }

                if (request.MaxDuration != null)
                {
                    dbSet = dbSet.Where(c => c.Duration <= request.MaxDuration);
                }

                if (request.HasQuizzes == true)
                {
                    dbSet = dbSet.Where(c => c.Sections.Any(s => s.Lectures.Any(l => l.Quizzes.Count != 0)));
                }

                if (request.DifficultyLevel != null)
                {
                    dbSet = dbSet.Where(c => c.DifficultyLevel == request.DifficultyLevel);
                }

                if (request.IsFree == true)
                {
                    dbSet = dbSet.Where(c => c.Price == 0);
                }

                var items = await dbSet.ToListAsync();

                if (request.MinPrice.HasValue || request.MaxPrice.HasValue)
                {
                    items = items
                        .Select(c => new
                        {
                            Course = c,
                            EffectivePrice = CalculateEffectivePrice(c.CourseId).Result
                        })
                        .Where(x =>
                            (!request.MinPrice.HasValue || x.EffectivePrice >= request.MinPrice) &&
                            (!request.MaxPrice.HasValue || x.EffectivePrice <= request.MaxPrice)
                        )
                        .Select(x => x.Course)
                        .ToList();
                }

                //var items = await dbSet
                //        .Include(c => c.CourseDiscounts)
                //        .ThenInclude(cd => cd.Discount)
                //        .ToListAsync();

                //if (request.MinPrice.HasValue || request.MaxPrice.HasValue)
                //{
                //    items = items
                //        .Select(c => new
                //        {
                //            Course = c,
                //            MaxDiscount = c.CourseDiscounts
                //                .Where(d => d.Discount.IsActive &&
                //                            d.Discount.StartDate <= DateTime.UtcNow &&
                //                            d.Discount.EndDate >= DateTime.UtcNow)
                //                .Select(d => d.Discount.DiscountType == "Percentage"
                //                    ? c.Price * d.Discount.DiscountValue / 100
                //                    : d.Discount.DiscountValue)
                //                .DefaultIfEmpty(0m) // Handle courses with no valid discounts
                //                .Max()
                //        })
                //        .Where(x =>
                //            (!request.MinPrice.HasValue || (x.Course.Price - x.MaxDiscount) >= request.MinPrice) &&
                //            (!request.MaxPrice.HasValue || (x.Course.Price - x.MaxDiscount) <= request.MaxPrice)
                //        )
                //        .Select(x => x.Course)
                //        .ToList();
                //}

                var courseDTOs = _mapper.Map<List<CourseDTO>>(items);

                if (!string.IsNullOrEmpty(request.Title))
                {
                    if (!await _elasticsearchService.IsAvailableAsync())
                    {
                        courseDTOs = courseDTOs
                            .Where(p => p.Title.ToLower().Contains(request.Title.ToLower()) || p.Description.ToLower().Contains(request.Title.ToLower()))
                            .ToList();
                    }
                    else
                    {
                        await _elasticsearchService.EnsureIndexExistsAsync("courses");
                        await _elasticsearchService.IndexCoursesAsync(courseDTOs);
                        courseDTOs = await _elasticsearchService.SearchCoursesByNameAsync(request.Title);
                    }
                }

                return courseDTOs;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the courses.", ex);
            }
        }

        public async Task<List<CourseCardResponse>> GetCourseInformation(GetCoursesRequest request)
        {
            try
            {
                var courseCard = new List<CourseCardResponse>();
                var courses = await GetCoursesByConditions(request);

                if (courses == null)
                {
                    throw new Exception("No courses found.");
                }

                foreach (var course in courses)
                {
                    var discountId = await GetMaxDiscountId(course.CourseId);
                    var discount = discountId != null ? await _discountService.GetDiscount((int)discountId) : null;

                    var instructors = await (await _courseInstructorRepository.GetDbSet())
                        .Where(ci => ci.CourseId == course.CourseId)
                        .Select(ci => ci.Instructor)
                        .ToListAsync();

                    var numberOfEnrollment = (await _enrollment.GetDbSet())
                        .Where(e => e.CourseId == course.CourseId)
                        .CountAsync();

                    var courseCardResponse = new CourseCardResponse
                    {
                        Course = _mapper.Map<CoursesResponse>(course),
                        Review = await _reviewService.GetAverageRatingAndNumberOfRatings(course.CourseId),
                        Discount = _mapper.Map<DiscountInformation>(discount),
                        Instructors = _mapper.Map<List<InstructorInformation>>(instructors),
                        Enrollment = new EnrollmentInformation
                        {
                            TotalEnrollments = await numberOfEnrollment
                        }
                    };
                    courseCard.Add(courseCardResponse);
                }

                return courseCard;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the course information.", ex);
            }
        }
    }
}

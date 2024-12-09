using AutoMapper;
using EduTrailblaze.Entities;
using EduTrailblaze.Services.DTOs;

namespace EduTrailblaze.Services.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Course, CoursesResponse>();
            CreateMap<Course, CourseDTO>();
            CreateMap<CreateCourseRequest, Course>();
            CreateMap<CourseDTO, CoursesResponse>();
            CreateMap<Discount, DiscountInformationResponse>();
            CreateMap<User, InstructorInformation>();
        }
    }
}
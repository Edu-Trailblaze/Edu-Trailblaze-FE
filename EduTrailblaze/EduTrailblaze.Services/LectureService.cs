﻿using EduTrailblaze.Entities;
using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Services.DTOs;
using EduTrailblaze.Services.Helper;
using EduTrailblaze.Services.Interfaces;

namespace EduTrailblaze.Services
{
    public class LectureService : ILectureService
    {
        private readonly IRepository<Lecture, int> _lectureRepository;

        public LectureService(IRepository<Lecture, int> lectureRepository)
        {
            _lectureRepository = lectureRepository;
        }

        public async Task<Lecture?> GetLecture(int lectureId)
        {
            try
            {
                return await _lectureRepository.GetByIdAsync(lectureId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the lecture.", ex);
            }
        }

        public async Task<IEnumerable<Lecture>> GetLectures()
        {
            try
            {
                return await _lectureRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the lecture.", ex);
            }
        }

        public async Task AddLecture(Lecture lecture)
        {
            try
            {
                await _lectureRepository.AddAsync(lecture);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the lecture.", ex);
            }
        }

        public async Task UpdateLecture(Lecture lecture)
        {
            try
            {
                await _lectureRepository.UpdateAsync(lecture);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the lecture.", ex);
            }
        }

        public async Task AddLecture(CreateLectureRequest lecture)
        {
            try
            {
                var lectureEntity = new Lecture
                {
                    SectionId = lecture.SectionId,
                    Title = lecture.Title,
                    Content = lecture.Content,
                    Description = lecture.Description,
                    Duration = lecture.Duration,
                };
                await _lectureRepository.AddAsync(lectureEntity);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the lecture.", ex);
            }
        }

        public async Task UpdateLecture(UpdateLectureRequest lecture)
        {
            try
            {
                var lectureEntity = await _lectureRepository.GetByIdAsync(lecture.LectureId);
                if (lectureEntity == null)
                {
                    throw new Exception("Lecture not found.");
                }
                lectureEntity.SectionId = lecture.SectionId;
                lectureEntity.Title = lecture.Title;
                lectureEntity.Content = lecture.Content;
                lectureEntity.Description = lecture.Description;
                lectureEntity.Duration = lecture.Duration;
                lectureEntity.UpdatedAt = DateTimeHelper.GetVietnamTime();

                await _lectureRepository.UpdateAsync(lectureEntity);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the lecture.", ex);
            }
        }

        public async Task DeleteLecture(Lecture lecture)
        {
            try
            {
                await _lectureRepository.DeleteAsync(lecture);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the lecture.", ex);
            }
        }

        public async Task DeleteLecture(int lectureId)
        {
            try
            {
                var lecture = await _lectureRepository.GetByIdAsync(lectureId);
                if (lecture == null)
                {
                    throw new Exception("Lecture not found.");
                }

                lecture.IsDeleted = true;

                await _lectureRepository.UpdateAsync(lecture);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the lecture.", ex);
            }
        }
    }
}

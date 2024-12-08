using EduTrailblaze.Entities;
using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Services.DTOs;
using EduTrailblaze.Services.Helper;
using EduTrailblaze.Services.Interfaces;

namespace EduTrailblaze.Services
{
    public class VideoService : IVideoService
    {
        private readonly IRepository<Video, int> _videoRepository;

        public VideoService(IRepository<Video, int> videoRepository)
        {
            _videoRepository = videoRepository;
        }

        public async Task<Video?> GetVideo(int videoId)
        {
            try
            {
                return await _videoRepository.GetByIdAsync(videoId);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the video.", ex);
            }
        }

        public async Task<IEnumerable<Video>> GetVideos()
        {
            try
            {
                return await _videoRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while getting the video.", ex);
            }
        }

        public async Task AddVideo(Video video)
        {
            try
            {
                await _videoRepository.AddAsync(video);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the video.", ex);
            }
        }

        public async Task UpdateVideo(Video video)
        {
            try
            {
                await _videoRepository.UpdateAsync(video);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the video.", ex);
            }
        }

        public async Task DeleteVideo(Video video)
        {
            try
            {
                await _videoRepository.DeleteAsync(video);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the video.", ex);
            }
        }

        public async Task AddVideo(CreateVideoRequest video)
        {
            try
            {
                var newVideo = new Video
                {
                    LectureId = video.LectureId,
                    Title = video.Title,
                    VideoUrl = video.VideoUrl,
                    Transcript = video.Transcript,
                };
                await _videoRepository.AddAsync(newVideo);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the video.", ex);
            }
        }

        public async Task UpdateVideo(UpdateVideoRequest video)
        {
            try
            {
                var existingVideo = await _videoRepository.GetByIdAsync(video.VideoId);
                if (existingVideo == null)
                {
                    throw new Exception("Video not found.");
                }
                existingVideo.Title = video.Title;
                existingVideo.VideoUrl = video.VideoUrl;
                existingVideo.Transcript = video.Transcript;
                existingVideo.UpdatedAt = DateTimeHelper.GetVietnamTime();
                await _videoRepository.UpdateAsync(existingVideo);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the video.", ex);
            }
        }

        public async Task DeleteVideo(int video)
        {
            try
            {
                var existingVideo = await _videoRepository.GetByIdAsync(video);
                if (existingVideo == null)
                {
                    throw new Exception("Video not found.");
                }
                existingVideo.IsDeleted = true;
                await _videoRepository.UpdateAsync(existingVideo);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the video.", ex);
            }
        }
    }
}

﻿using EduTrailblaze.Entities;
using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Services.DTOs;
using EduTrailblaze.Services.Helper;
using EduTrailblaze.Services.Interfaces;
using Hangfire;
using Microsoft.AspNetCore.Http;

namespace EduTrailblaze.Services
{
    public class VideoService : IVideoService
    {
        private readonly IRepository<Video, int> _videoRepository;
        private readonly IClamAVService _clamAVService;
        //private readonly IWindowsDefenderService _windowsDefenderService;
        private readonly IVimeoService _vimeoService;
        private readonly ICloudinaryService _cloudinaryService;
        private readonly IBackgroundJobClient _backgroundJobClient;
        private readonly IAIService _aIService;

        public VideoService(IRepository<Video, int> videoRepository, IVimeoService vimeoService, IClamAVService clamAVService, IAIService aIService, IBackgroundJobClient backgroundJobClient, ICloudinaryService cloudinaryService)
        {
            _videoRepository = videoRepository;
            _vimeoService = vimeoService;
            _cloudinaryService = cloudinaryService;
            _clamAVService = clamAVService;
            //_windowsDefenderService = windowsDefenderService;
            _aIService = aIService;
            _backgroundJobClient = backgroundJobClient;
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

        public async Task<UploadVideoResponse> UploadVideoAsync(UploadVideoRequest video)
        {
            try
            {
                //Scan the video file for viruses using ClamAV
                //var (scanResult, virusName) = await _clamAVService.ScanFileWithClamd(video.File);
                //if (scanResult != "The file is clean.")
                //{
                //    throw new Exception($"Virus detected: {virusName}");
                //}

                // Save the file to a temporary location
                var tempFilePath = Path.GetTempFileName();
                using (var stream = new FileStream(tempFilePath, FileMode.Create))
                {
                    await video.File.CopyToAsync(stream);
                }

                // Upload the video to Vimeo
                var uploadResponse = await _vimeoService.UploadVideoAsync(tempFilePath, video.Title, string.Empty);

                // Save the video details to the database
                var newVideo = new Video
                {
                    LectureId = video.LectureId,
                    Title = video.Title,
                    VideoUrl = uploadResponse.VideoUri,
                    Duration = uploadResponse.Duration
                };
                await _videoRepository.AddAsync(newVideo);

                // Enqueue the background job for generating the transcript
                //_backgroundJobClient.Enqueue(() => GenerateAndUpdateTranscript(newVideo.VideoId));

                // Delete the temporary file
                File.Delete(tempFilePath);

                return uploadResponse;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while uploading the video: " + ex.Message);
            }
        }

        public async Task<UploadVideoResponse> UploadVideoWithCloudinaryAsync(UploadVideoRequest video)
        {
            var tempFilePath = Path.GetTempFileName();
            try
            {
                //Scan the video file for viruses using ClamAV
                //var (scanResult, virusName) = await _clamAVService.ScanFileWithClamd(video.File);
                //if (scanResult != "The file is clean.")
                //{
                //    throw new Exception($"Virus detected: {virusName}");
                //}

                // Save the file to a temporary location
                using (var stream = new FileStream(tempFilePath, FileMode.Create))
                {
                    await video.File.CopyToAsync(stream);
                }

                var newVideo = new Video
                {
                    LectureId = video.LectureId,
                    Title = video.Title,
                };
                await _videoRepository.AddAsync(newVideo);


                // Upload the video to Vimeo
                var uploadResponse = await _cloudinaryService.UploadVideoAsync(tempFilePath, "vd-" + newVideo.VideoId);

                newVideo.Duration = uploadResponse.Duration;
                newVideo.VideoUrl = uploadResponse.VideoUri;
                _videoRepository.UpdateAsync(newVideo);

                // Enqueue the background job for generating the transcript
                //_backgroundJobClient.Enqueue(() => GenerateAndUpdateTranscript(newVideo.VideoId));

                return uploadResponse;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while uploading the video: " + ex.Message);
            }
            finally
            {
                // Delete the temporary file
                File.Delete(tempFilePath);
            }
        }

        public async Task GenerateAndUpdateTranscript(int videoId)
        {
            var video = await _videoRepository.GetByIdAsync(videoId);
            if (video == null)
            {
                throw new Exception("Video not found.");
            }

            // Generate the transcript
            var transcript = await _aIService.GenerateTranscriptUsingWhisper(new WhisperChatRequest { file = new FormFile(new MemoryStream(), 0, 0, null, video.VideoUrl) });

            // Update the video with the generated transcript
            video.Transcript = transcript.transcript;
            video.UpdatedAt = DateTimeHelper.GetVietnamTime();
            await _videoRepository.UpdateAsync(video);
        }
    }
}

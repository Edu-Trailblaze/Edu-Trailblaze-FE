using EduTrailblaze.Services.DTOs;
using EduTrailblaze.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using VimeoDotNet;
using VimeoDotNet.Models;
using VimeoDotNet.Net;
using Xabe.FFmpeg;

namespace StreamingService.Services
{
    public class VimeoService : IVimeoService
    {
        private readonly VimeoClient _vimeoClient;

        public VimeoService(IConfiguration configuration)
        {
            _vimeoClient = new VimeoClient(configuration["Vimeo:AccessToken"]);
        }

        public async Task<UploadVideoResponse> UploadVideoAsync(string filePath, string title, string description)
        {
            if (string.IsNullOrEmpty(filePath) || !System.IO.File.Exists(filePath))
            {
                throw new FileNotFoundException("File not found at the specified path.");
            }

            try
            {
                // Convert the file path to IBinaryContent
                var fileContent = new BinaryContent(filePath);

                // Upload the video
                var uploadRequest = await _vimeoClient.UploadEntireFileAsync(fileContent);

                // Set the title and description for the uploaded video
                var videoUri = uploadRequest.ClipUri;

                // Update the video metadata (title and description)
                var updateRequest = new VideoUpdateMetadata
                {
                    Name = title,
                    Description = description
                };

                // Return the URI of the uploaded video
                if (uploadRequest.ClipId != null)
                {
                    await _vimeoClient.UpdateVideoMetadataAsync(uploadRequest.ClipId.Value, updateRequest);
                }

                IMediaInfo mediaInfo = await FFmpeg.GetMediaInfo(filePath);
                var duration = mediaInfo.Duration;

                return new UploadVideoResponse
                {
                    VideoUri = videoUri,
                    Duration = duration
                };
            }
            catch (Exception ex)
            {
                throw new Exception($"Error uploading video to Vimeo:  {ex.Message}");
            }
        }

        public async Task<string> UploadVideoAsync(string filePath)
        {
            if (string.IsNullOrEmpty(filePath) || !System.IO.File.Exists(filePath))
            {
                throw new FileNotFoundException("File not found at the specified path.");
            }

            try
            {
                // Convert the file path to IBinaryContent
                var fileContent = new BinaryContent(filePath);

                // Upload the video
                var uploadRequest = await _vimeoClient.UploadEntireFileAsync(fileContent);

                // Get the uploaded video details
                return uploadRequest.ClipUri;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error uploading video to Vimeo:  {ex.Message}");
            }
        }
        public async Task DeleteVideoAsync(long videoId)
        {
            try
            {
                await _vimeoClient.DeleteVideoAsync(videoId);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error deleting video from Vimeo: {ex.Message}");
            }
        }
    }
}

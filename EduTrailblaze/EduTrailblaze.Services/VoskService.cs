using EduTrailblaze.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using NAudio.Wave;
using Vosk;

namespace EduTrailblaze.Services
{
    public class VoskService : IVoskService
    {
        private readonly Model _model;

        public VoskService(IConfiguration configuration)
        {
            _model = new Model(configuration["Vosk:ModelPath"]); // Load model only once
        }

        public async Task<string> ConvertSpeechToTextAsyncFromFile(IFormFile audio)
        {
            string tempFilePath = Path.Combine(Path.GetTempPath(), Path.GetRandomFileName() + ".wav");

            try
            {
                // Save file temporarily
                await using (var stream = new FileStream(tempFilePath, FileMode.Create))
                {
                    await audio.CopyToAsync(stream);
                }

                // Validate file format and process it
                using (var waveStream = new WaveFileReader(tempFilePath))
                {
                    if (waveStream.WaveFormat.SampleRate < 8000 || waveStream.WaveFormat.SampleRate > 48000)
                        throw new Exception("Unsupported audio sample rate. Ensure the audio is 8-48 kHz.");

                    using var recognizer = new VoskRecognizer(_model, waveStream.WaveFormat.SampleRate);
                    while (waveStream.Position < waveStream.Length)
                    {
                        byte[] buffer = new byte[4096];
                        int bytesRead = waveStream.Read(buffer, 0, buffer.Length);
                        recognizer.AcceptWaveform(buffer, bytesRead);
                    }

                    return recognizer.FinalResult(); // Get the complete transcription
                }
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while converting speech to text from file: " + ex.Message);
            }
            finally
            {
                // Ensure cleanup of the temporary file
                if (File.Exists(tempFilePath))
                {
                    File.Delete(tempFilePath);
                }
            }
        }
    }
}

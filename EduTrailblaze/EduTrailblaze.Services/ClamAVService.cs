using EduTrailblaze.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using nClam;

namespace EduTrailblaze.Services
{
    //docker run -d -p 3310:3310 mkodockx/docker-clamav
    public class ClamAVService : IClamAVService
    {
        private readonly ClamClient _clamClient;

        public ClamAVService(IConfiguration configuration)
        {
            _clamClient = new ClamClient(configuration["ClamAV:Host"], int.Parse(configuration["ClamAV:Port"]))
            {
                MaxStreamSize = long.Parse(configuration["ClamAV:MaxStreamSize"]),
            };
        }

        public async Task<(string, string)> ScanFileWithClamd(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    throw new Exception("No file uploaded or file is empty.");
                }
                // Read the file into a memory stream
                using var memoryStream = new MemoryStream();
                await file.CopyToAsync(memoryStream);
                memoryStream.Position = 0; // Reset the stream position for reading

                // Scan the file's byte data in memory
                var scanResult = await _clamClient.SendAndScanFileAsync(memoryStream);

                switch (scanResult.Result)
                {
                    case ClamScanResults.Clean:
                        return ("The file is clean.", "No virus detected.");

                    case ClamScanResults.VirusDetected:
                        return
                        (
                            "Virus detected!",
                            scanResult.InfectedFiles[0].VirusName
                        );

                    case ClamScanResults.Error:
                        throw new Exception("An error occurred during the scan.");

                    default:
                        throw new Exception("Unexpected scan result.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error scanning file with ClamAV: " + ex.Message);
            }
        }
    }
}

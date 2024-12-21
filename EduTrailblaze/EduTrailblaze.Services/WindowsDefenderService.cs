using EduTrailblaze.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Diagnostics;

namespace EduTrailblaze.Services
{
    public class WindowsDefenderService : IWindowsDefenderService
    {
        private readonly string _windowsDefenderPath;

        public WindowsDefenderService(IConfiguration configuration)
        {
            _windowsDefenderPath = configuration["WindowsDefender:Path"];
        }

        public async Task<string> ScanFileWithWindowsDefenderReturnMessage(IFormFile file)
        {
            // Validate that MpCmdRun.exe exists
            if (!File.Exists(_windowsDefenderPath))
            {
                throw new FileNotFoundException("Windows Defender's MpCmdRun.exe not found.");
            }

            // Save the uploaded file to a temporary location
            string tempFilePath = Path.Combine(Path.GetTempPath(), Guid.NewGuid() + Path.GetExtension(file.FileName));
            try
            {
                using (var fileStream = new FileStream(tempFilePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                // Prepare and run the scan command
                var process = new Process
                {
                    StartInfo = new ProcessStartInfo
                    {
                        FileName = _windowsDefenderPath,
                        Arguments = $"-Scan -ScanType 3 -File \"{tempFilePath}\"",
                        RedirectStandardOutput = true,
                        RedirectStandardError = true,
                        UseShellExecute = false,
                        CreateNoWindow = true
                    }
                };

                process.Start();

                // Read the output and error streams
                string output = await process.StandardOutput.ReadToEndAsync();
                string error = await process.StandardError.ReadToEndAsync();

                process.WaitForExit();

                // Return detailed information
                if (process.ExitCode == 0)
                {
                    return $"No threats found. Scan output: {output}";
                }
                else
                {
                    return $"Potential threat detected or error occurred. Exit Code: {process.ExitCode}. Output: {output}. Error: {error}";
                }
            }
            catch (Exception ex)
            {
                // Return detailed error message
                return $"Error in Windows Defender Service: {ex.Message}";
            }
            finally
            {
                // Clean up the temporary file
                if (File.Exists(tempFilePath))
                {
                    File.Delete(tempFilePath);
                }
            }
        }
    }
}

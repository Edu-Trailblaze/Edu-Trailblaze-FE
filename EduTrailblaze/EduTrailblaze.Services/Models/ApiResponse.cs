namespace EduTrailblaze.Services.Models
{
    public class ApiResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public object? Data { get; set; }
    }
}

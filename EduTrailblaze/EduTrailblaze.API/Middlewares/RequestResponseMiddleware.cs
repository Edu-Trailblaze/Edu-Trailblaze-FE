using System.Diagnostics;
using System.Text;

namespace EduTrailblaze.API.Middlewares
{
    public class RequestResponseMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<RequestResponseMiddleware> _logger;

        public RequestResponseMiddleware(RequestDelegate next, ILogger<RequestResponseMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();

            // Log request details
            var request = await FormatRequest(context.Request);
            _logger.LogInformation($"Incoming request: {request}");

            // Copy a pointer to the original response body stream
            var originalBodyStream = context.Response.Body;

            using (var responseBody = new MemoryStream())
            {
                // Temporarily replace the response body with a memory stream
                context.Response.Body = responseBody;

                // Call the next middleware in the pipeline
                await _next(context);

                // Log response details
                var response = await FormatResponse(context.Response);
                _logger.LogInformation($"Outgoing response: {response}");

                // Copy the contents of the new memory stream (response body) to the original stream, which is then returned to the client
                await responseBody.CopyToAsync(originalBodyStream);
            }

            stopwatch.Stop();
            _logger.LogInformation($"Request processing time: {stopwatch.ElapsedMilliseconds}ms");
        }

        private async Task<string> FormatRequest(HttpRequest request)
        {
            var body = request.Body;

            // Allow the body to be read multiple times
            request.EnableBuffering();

            // Read the stream as text
            var buffer = new byte[Convert.ToInt32(request.ContentLength)];
            await request.Body.ReadAsync(buffer, 0, buffer.Length);
            var bodyAsText = Encoding.UTF8.GetString(buffer).Replace(Environment.NewLine, "").Replace("\n", "").Replace("\r", "");
            request.Body.Seek(0, SeekOrigin.Begin);

            var headers = string.Join("; ", request.Headers.Select(h => $"{h.Key}: {h.Value.ToString().Replace(Environment.NewLine, "").Replace("\n", "").Replace("\r", "")}"));

            var sanitizedMethod = request.Method.Replace(Environment.NewLine, "").Replace("\n", "").Replace("\r", "");
            var sanitizedPath = request.Path.ToString().Replace(Environment.NewLine, "").Replace("\n", "").Replace("\r", "");
            var sanitizedQueryString = request.QueryString.ToString().Replace(Environment.NewLine, "").Replace("\n", "").Replace("\r", "");

            return $"Method: {sanitizedMethod}, Path: {sanitizedPath}, QueryString: {sanitizedQueryString}, Headers: [{headers}], Body: {bodyAsText}";
        }

        private async Task<string> FormatResponse(HttpResponse response)
        {
            // Set the pointer to the beginning of the stream
            response.Body.Seek(0, SeekOrigin.Begin);

            // Read the stream as text
            var text = await new StreamReader(response.Body).ReadToEndAsync();

            // Set the pointer back to the beginning of the stream
            response.Body.Seek(0, SeekOrigin.Begin);

            var headers = string.Join("; ", response.Headers.Select(h => $"{h.Key}: {h.Value}"));

            return $"Status Code: {response.StatusCode}, Headers: [{headers}], Body: {text}";
        }
    }
}

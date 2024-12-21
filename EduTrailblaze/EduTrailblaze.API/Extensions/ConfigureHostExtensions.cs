namespace EduTrailblaze.API.Extensions
{
    public static class ConfigureHostExtensions
    {
        public static void AddAppConfiguration(this ConfigureHostBuilder host)
        {
            host.ConfigureAppConfiguration((hostingContext, config) =>
            {
                var env = hostingContext.HostingEnvironment;
                config.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                      .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true)
                      .AddEnvironmentVariables();
            });
        }
    }
}

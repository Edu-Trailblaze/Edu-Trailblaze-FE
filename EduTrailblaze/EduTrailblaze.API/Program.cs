using EduTrailblaze.API.Extensions;
using EduTrailblaze.API.Logging;
using EduTrailblaze.Repositories;
using Serilog;


namespace EduTrailblaze.API
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);

            Log.Information("Start API");

            try
            {
                builder.Host.UseSerilog(SeriLog.Configure);
                builder.Host.AddAppConfiguration();
                builder.Services.AddInfrastructor(builder.Configuration);

                // Kestrel Config (hide in Header Request)
                builder.WebHost.ConfigureKestrel(options =>
                {
                    options.AddServerHeader = false;
                });


                var app = builder.Build();

                app.UseInfrastructure();
                // Configure the HTTP request pipeline.
                //if (app.Environment.IsDevelopment())
                //{}
                app.MapControllers();
                app.MigrateDatabase<EduTrailblazeDbContext>();
                app.Run();
            }

            catch (Exception ex)
            {
                Log.Fatal(ex, "Unhandled Exception");
            }
            finally
            {
                Log.Information("Shutting down API");
                Log.CloseAndFlush();
            }

        }
    }

}

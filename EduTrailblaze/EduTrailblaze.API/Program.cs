
using EduTrailblaze.Services;
using EduTrailblaze.Services.Helper;
using EduTrailblaze.Services.Interface;

using Hangfire;
using Microsoft.Extensions.Options;

using SendGrid;
using StackExchange.Redis;
using System.Text;
using Serilog;
using EduTrailblaze.API.Logging;
using EduTrailblaze.API.Extensions;

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

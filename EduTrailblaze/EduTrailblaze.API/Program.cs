
using EduTrailblaze.Services;
using EduTrailblaze.Services.Helper;

using EduTrailblaze.Services.Interfaces;
using EduTrailblaze.Services.Mappings;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;


using Hangfire;

using Microsoft.Extensions.Options;

using SendGrid;
using StackExchange.Redis;
using System.Text;

using System.Text.Json.Serialization;
using Serilog;

using Serilog;
using EduTrailblaze.API.Logging;
using EduTrailblaze.API.Extensions;
using EduTrailblaze.Repositories;


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

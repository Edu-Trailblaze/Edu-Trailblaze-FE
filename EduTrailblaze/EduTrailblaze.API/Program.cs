using EduTrailblaze.API.Middlewares;
using EduTrailblaze.Entities;
using EduTrailblaze.Repositories;
using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Services;
using EduTrailblaze.Services.DTOs;
using EduTrailblaze.Services.Interfaces;
using EduTrailblaze.Services.Mappings;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Nest;
using Polly;
using StackExchange.Redis;

namespace EduTrailblaze.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<EduTrailblazeDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            builder.Services.AddIdentity<User, IdentityRole>(options =>
            {
                options.SignIn.RequireConfirmedEmail = true;
                options.User.RequireUniqueEmail = true;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
            })
                    .AddEntityFrameworkStores<EduTrailblazeDbContext>()
                    .AddDefaultTokenProviders();

            // Add services to the container.
            builder.Services.AddControllers();

            // Register FluentValidation
            builder.Services.AddFluentValidationAutoValidation();
            builder.Services.AddValidatorsFromAssemblyContaining<GetCoursesRequestValidator>();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter a valid token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                       {
                           {
                               new OpenApiSecurityScheme
                               {
                                   Reference = new OpenApiReference
                                   {
                                       Type = ReferenceType.SecurityScheme,
                                       Id = "Bearer"
                                   }
                               },
                               new string[] { }
                           }
                       });
            });
            builder.Services.AddAutoMapper(typeof(MappingProfile));

            builder.Services.AddScoped(typeof(IRepository<,>), typeof(Repository<,>));

            builder.Services.AddScoped<INewsService, NewsService>();
            builder.Services.AddScoped<ICourseService, CourseService>();
            builder.Services.AddScoped<IReviewService, ReviewService>();
            builder.Services.AddScoped<IDiscountService, DiscountService>();

            builder.Services.AddSingleton<IConnectionMultiplexer>(sp =>
            {
                var configurationOptions = new ConfigurationOptions
                {
                    EndPoints = { "localhost:6379" },
                    ConnectTimeout = 5000,
                    AbortOnConnectFail = false
                };

                var retryPolicy = Polly.Policy
                    .Handle<RedisConnectionException>()
                    .WaitAndRetry(5, retryAttempt => TimeSpan.FromSeconds(retryAttempt), (exception, timeSpan, retryCount, context) =>
                    {
                        Console.WriteLine($"Retrying Redis connection. Attempt {retryCount}. Error: {exception.Message}");
                    });

                return retryPolicy.Execute(() => ConnectionMultiplexer.Connect(configurationOptions));
            });

            builder.Services.AddSingleton<IElasticClient>(sp =>
            {
                var settings = new ConnectionSettings(new Uri("http://localhost:9200"))
                .DefaultIndex("courses");

                var retryPolicy = Polly.Policy
                    .Handle<Exception>() // Handle any exception, or you can be more specific
                    .WaitAndRetryAsync(5, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)),
                        (exception, timeSpan, retryCount, context) =>
                        {
                            Console.WriteLine($"Attempt {retryCount} to connect to Elasticsearch failed. Error: {exception.Message}");
                        });

                IElasticClient client = null;
                try
                {
                    retryPolicy.ExecuteAsync(async () =>
                    {
                        client = new ElasticClient(settings);
                        var pingResponse = await client.PingAsync();
                        if (!pingResponse.IsValid)
                        {
                            throw new Exception("Elasticsearch ping failed.");
                        }
                    }).Wait();
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Elasticsearch connection failed after retries: {ex.Message}");
                }

                return client ?? new ElasticClient(settings);
            });

            builder.Services.AddSingleton<IElasticsearchService, ElasticsearchService>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    policy =>
                    {
                        policy.WithOrigins(
                            "https://localhost:3000",
                            "http://localhost:3000"
                        )
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                    });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseMiddleware<RequestResponseMiddleware>();
            app.MapControllers();

            app.Run();
        }
    }
}

using EduTrailblaze.API.Middlewares;
using EduTrailblaze.Entities;
using EduTrailblaze.Repositories;
using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Services;
using EduTrailblaze.Services.DTOs;
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
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Nest;
using Polly;
using SendGrid;
using StackExchange.Redis;
using System.Text;
using System.Text.Json.Serialization;
using Serilog;

namespace EduTrailblaze.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .WriteTo.Console()
                .CreateBootstrapLogger();
            Log.Information("Starting up EDUTRAILBLAZE API");
            try
            {
                var builder = WebApplication.CreateBuilder(args);
                // Add services to the container.
                builder.Host.UseSerilog(configureLogger: (HostBuilderContext, LoggerConfiguration) =>
                 LoggerConfiguration.WriteTo.Console(
                     outputTemplate: "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}"
                     ).Enrich.FromLogContext().ReadFrom.Configuration(HostBuilderContext.Configuration)
                );

                builder.Services.AddControllers().AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
                    options.JsonSerializerOptions.WriteIndented = true;
                });
                // Add Caching for response Middleware 
                builder.Services.AddResponseCaching();


                //builder.Services.AddDbContext<EduTrailblazeDbContext>(options =>
                //{
                //    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
                //});

                //builder.Services.AddIdentity<User, IdentityRole>(options =>
                //{
                //    options.SignIn.RequireConfirmedEmail = true;
                //    options.User.RequireUniqueEmail = true;
                //    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
                //})
                //        .AddEntityFrameworkStores<EduTrailblazeDbContext>()
                //        .AddDefaultTokenProviders();

                // Add services to the container.
                builder.Services.AddControllers();

                // Register FluentValidation
                builder.Services.AddFluentValidationAutoValidation();
                builder.Services.AddValidatorsFromAssemblyContaining<GetCoursesRequestValidator>();

                // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
                builder.Services.AddEndpointsApiExplorer();

                builder.Services.AddAutoMapper(typeof(MappingProfile));



                builder.Services.AddCors(options =>
                {
                    options.AddPolicy("AllowSpecificOrigin",
                        policy =>
                        {
                            policy.
                            WithOrigins(
                                "https://localhost:3000",
                                "http://localhost:3000",
                                "http://localhost:5148",
                                "https://localhost:7034"
                            )
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                        });
                });

                // Kestrel Config (hide in Header Request)
                builder.WebHost.ConfigureKestrel(options =>
                {
                    options.AddServerHeader = false;
                });



                // Add DbContext Pool
                builder.Services.AddDbContextPool<EduTrailblazeDbContext>(options =>
                {
                    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"), sqlOption =>
                    sqlOption.EnableRetryOnFailure()).ConfigureWarnings(w => w.Ignore(CoreEventId.DetachedLazyLoadingWarning)).EnableDetailedErrors();
                }, poolSize: 50);

                // Identity Configuration
                builder.Services.AddIdentity<User, IdentityRole>(option =>
                {
                    option.Lockout.MaxFailedAccessAttempts = 2;
                    option.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromHours(1);
                    option.Password.RequireUppercase = false;
                    option.Password.RequireNonAlphanumeric = false;
                    option.Password.RequireDigit = false;
                    option.Tokens.AuthenticatorTokenProvider = TokenOptions.DefaultAuthenticatorProvider;
                }
                ).AddEntityFrameworkStores<EduTrailblazeDbContext>().AddDefaultTokenProviders();

                // JWT Configuration
                builder.Services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                })
                    .AddJwtBearer(options =>
                    {
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidateAudience = true,
                            ValidateLifetime = true,
                            ValidateIssuerSigningKey = true,
                            ValidIssuer = builder.Configuration["JwtToken:Issuer"],
                            ValidAudience = builder.Configuration["JwtToken:Audience"],
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtToken:Key"])),
                            ClockSkew = TimeSpan.FromHours(7)
                        };
                    });

                //Prevent CSRF
                builder.Services.AddAntiforgery(options =>
                {

                    options.Cookie.Name = "AntiForgeryCookie";
                    options.HeaderName = "X-XSRF-TOKEN";
                });
                // add authorization for swagger 
                builder.Services.AddSwaggerGen(c =>
                {
                    c.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
                    {
                        In = ParameterLocation.Header,
                        Name = "Authorization",
                        Type = SecuritySchemeType.ApiKey,
                        BearerFormat = "JWT",
                        Description = "Enter 'Bearer' [space] and then your token",
                        Scheme = JwtBearerDefaults.AuthenticationScheme

                    });
                    c.AddSecurityRequirement(new OpenApiSecurityRequirement
                    {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = JwtBearerDefaults.AuthenticationScheme
                            },
                            Scheme = "Oauth2",
                            Name = JwtBearerDefaults.AuthenticationScheme,
                            In = ParameterLocation.Header
                        },
                        new List<string>()
                    }
                    });
                });


                // Add services to Dependency Container
                builder.Services.AddTransient<TokenGenerator>();
                builder.Services.AddScoped<IAuthService, AuthService>();
                builder.Services.AddScoped<ITokenGenerator, TokenGenerator>();
                builder.Services.AddScoped<IRedisService, RedisService>();
                builder.Services.AddScoped<ISendMail, SendMail>();
                builder.Services.AddScoped(typeof(IRepository<,>), typeof(Repository<,>));
                builder.Services.AddScoped<INewsService, NewsService>();
                builder.Services.AddScoped<ICourseService, CourseService>();
                builder.Services.AddScoped<IReviewService, ReviewService>();
                builder.Services.AddScoped<IDiscountService, DiscountService>();
                builder.Services.AddScoped<IRoleService, RoleService>();

                //Elasticsearch Configuration
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

                //redis Configuration
                builder.Services.Configure<RedisConfig>(builder.Configuration.GetSection("RedisConfig"));
                var redisConfigurationSection = builder.Services.BuildServiceProvider().GetRequiredService<IOptions<RedisConfig>>().Value;

                var redisConfiguration = new ConfigurationOptions
                {
                    EndPoints = { $"{redisConfigurationSection.Host}:{redisConfigurationSection.Port}" },
                    Password = redisConfigurationSection.Password,
                    Ssl = bool.Parse(redisConfigurationSection.Ssl),
                    AbortOnConnectFail = bool.Parse(redisConfigurationSection.AbortOnConnectFail),
                    ConnectRetry = 5,
                    ConnectTimeout = 5000,
                    SyncTimeout = 5000,
                    KeepAlive = 180

                };
                builder.Services.AddSingleton(redisConfiguration);
                builder.Services.AddSingleton<IConnectionMultiplexer>(sp =>
                {
                    var configuration = sp.GetRequiredService<ConfigurationOptions>();
                    return ConnectionMultiplexer.Connect(configuration);
                });

                //sendgrid Configuration

                builder.Services.AddSingleton<ISendGridClient, SendGridClient>(provider =>
                {
                    var apiKey = builder.Configuration["SendGrid:ApiKey"];
                    return new SendGridClient(apiKey);
                });

                var app = builder.Build();

                // Configure the HTTP request pipeline.
                if (app.Environment.IsDevelopment())
                {
                    app.UseSwagger();
                    app.UseSwaggerUI(options =>
                    {
                        options.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
                    });
                }

                app.UseHttpsRedirection();
                app.UseCors("AllowSpecificOrigin");
                app.UseHsts();
                app.Use(async (context, next) =>
                {
                    context.Response.Headers["X-Content-Type-Options"] = "nosniff";
                    context.Response.Headers["Referrer-Policy"] = "no-referrer";
                    context.Response.Headers["X-XSS-Protection"] = "1; mode=block";
                    context.Response.Headers["X-Frame-Options"] = "DENY";
                    await next();
                });

                app.UseStaticFiles();
                app.UseAuthentication();
                app.UseAuthorization();

                //app.UseMiddleware<RequestResponseMiddleware>();
                app.MapControllers();
                app.Run();
            }catch (Exception ex)
            {
                Log.Fatal(ex, "Unhandled Exception");
            }
            finally
            {
                Log.Information("Shutting down EDUTRAILBLAZE API");
                Log.CloseAndFlush();
            }
        }
        private class RedisConfig
        {
            public string Host { get; set; }
            public string Port { get; set; }
            public string Password { get; set; }
            public string Ssl { get; set; }
            public string AbortOnConnectFail { get; set; }
        }
    }

}

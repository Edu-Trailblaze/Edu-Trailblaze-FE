using EduTrailblaze.Entities;
using EduTrailblaze.Repositories;
using EduTrailblaze.Repositories.Interfaces;
using EduTrailblaze.Services;
using EduTrailblaze.Services.DTOs;
using EduTrailblaze.Services.Helper;
using EduTrailblaze.Services.Interface;
using EduTrailblaze.Services.Interfaces;
using EduTrailblaze.Services.Mappings;
using FluentValidation;
using FluentValidation.AspNetCore;
using Hangfire;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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
using EduTrailblaze.API.Logging;

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
                
                // Add services to the container.
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
                //builder.Services.AddSwaggerGen(c =>
                //{
                //    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
                //    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                //    {
                //        In = ParameterLocation.Header,
                //        Description = "Please enter a valid token",
                //        Name = "Authorization",
                //        Type = SecuritySchemeType.ApiKey,
                //        Scheme = "Bearer"
                //    });
                //    c.AddSecurityRequirement(new OpenApiSecurityRequirement
                //           {
                //               {
                //                   new OpenApiSecurityScheme
                //                   {
                //                       Reference = new OpenApiReference
                //                       {
                //                           Type = ReferenceType.SecurityScheme,
                //                           Id = "Bearer"
                //                       }
                //                   },
                //                   new string[] { }
                //               }
                //           });
                //});
                builder.Services.AddAutoMapper(typeof(MappingProfile));

                builder.Services.AddScoped(typeof(IRepository<,>), typeof(Repository<,>));

                builder.Services.AddScoped<IAIService, AIService>();
                builder.Services.AddHttpClient<IAIService, AIService>(client =>
                {
                    client.Timeout = TimeSpan.FromMinutes(60);
                });
                builder.Services.AddScoped<IAnswerService, AnswerService>();
                builder.Services.AddScoped<ICartItemService, CartItemService>();
                builder.Services.AddScoped<ICartService, CartService>();
                builder.Services.AddScoped<ICertificateService, CertificateService>();
                builder.Services.AddScoped<IClamAVService, ClamAVService>();
                builder.Services.AddScoped<ICloudinaryService, CloudinaryService>();
                builder.Services.AddScoped<ICouponService, CouponService>();
                builder.Services.AddScoped<ICourseCouponService, CourseCouponService>();
                builder.Services.AddScoped<ICourseDiscountService, CourseDiscountService>();
                builder.Services.AddScoped<ICourseInstructorService, CourseInstructorService>();
                builder.Services.AddScoped<ICourseLanguageService, CourseLanguageService>();
                builder.Services.AddScoped<ICourseService, CourseService>();
                builder.Services.AddScoped<ICourseTagService, CourseTagService>();
                builder.Services.AddScoped<IDiscountService, DiscountService>();
                builder.Services.AddScoped<IEnrollmentService, EnrollmentService>();
                builder.Services.AddScoped<ILanguageService, LanguageService>();
                builder.Services.AddScoped<ILectureService, LectureService>();
                builder.Services.AddScoped<IMailService, MailService>();
                builder.Services.AddScoped<INewsService, NewsService>();
                builder.Services.AddScoped<INotificationService, NotificationService>();
                builder.Services.AddScoped<IOrderDetailService, OrderDetailService>();
                builder.Services.AddScoped<IOrderService, OrderService>();
                builder.Services.AddScoped<IPaymentService, PaymentService>();
                builder.Services.AddScoped<IQuestionService, QuestionService>();
                builder.Services.AddScoped<IQuizAnswerService, QuizAnswerService>();
                builder.Services.AddScoped<IQuizHistoryService, QuizHistoryService>();
                builder.Services.AddScoped<IQuizService, QuizService>();
                builder.Services.AddScoped<IRedisLock, RedisLock>();
                builder.Services.AddScoped<IReviewService, ReviewService>();
                builder.Services.AddScoped<ISectionService, SectionService>();
                builder.Services.AddScoped<ITagService, TagService>();
                builder.Services.AddScoped<IUserCertificateService, UserCertificateService>();
                builder.Services.AddScoped<IUserProfileService, UserProfileService>();
                builder.Services.AddScoped<IUserProgressService, UserProgressService>();
                builder.Services.AddScoped<IUserCourseCouponService, UserCourseCouponService>();
                builder.Services.AddScoped<IVideoService, VideoService>();
                builder.Services.AddScoped<IVimeoService, VimeoService>();
                builder.Services.AddScoped<IVoucherService, VoucherService>();

                builder.Services.AddScoped<IVNPAYService, VNPAYService>();
                builder.Services.AddScoped<IMoMoService, MoMoService>();

                builder.Services.AddHangfire(config => config.UseSqlServerStorage(builder.Configuration.GetConnectionString("DefaultConnection")));
                builder.Services.AddHangfireServer();

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

                // Kestrel Config (hide in Header Request)
                builder.WebHost.ConfigureKestrel(options =>
                {
                    options.AddServerHeader = false;
                });



                // Add DbContext Pool
                builder.Services.AddDbContext<EduTrailblazeDbContext>(options =>
                {
                    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"), sqlOption =>
                    sqlOption.EnableRetryOnFailure());
                });

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
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtToken:Key"]))
                        };
                    });

                //Prevent CSRF
                builder.Services.AddAntiforgery(options =>
                {

                    options.Cookie.Name = "AntiForgeryCookie";
                    options.HeaderName = "X-XSRF-TOKEN";
                });

                builder.Services.AddSwaggerGen(c =>
                {
                    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                    {
                        In = ParameterLocation.Header,
                        Name = "Authorization",
                        Type = SecuritySchemeType.ApiKey,
                        BearerFormat = "JWT",
                        Description = "Enter 'Bearer' [space] and then your token"
                    });
                });

                //sendgrid Configuration

                builder.Services.AddSingleton<ISendGridClient, SendGridClient>(provider =>
                {
                    var apiKey = builder.Configuration["SendGrid:ApiKey"];
                    return new SendGridClient(apiKey);
                });

                // Add services to Dependency Container
                builder.Services.AddTransient<TokenGenerator>();
                builder.Services.AddScoped<IAuthService, AuthService>();
                builder.Services.AddScoped<ITokenGenerator, TokenGenerator>();
                builder.Services.AddScoped<IRedisService, RedisService>();
                builder.Services.AddScoped<ISendMail, SendMail>();

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


                var app = builder.Build();

                app.UseHangfireDashboard();

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

using Microsoft.AspNetCore.Authentication.JwtBearer;
using EduTrailblaze.Entities;
using IdentityAPI.Entities;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using EduTrailblaze.Services.Helper;
using System.Text.Json;
using Polly;

using Polly.Retry;
using Polly.CircuitBreaker;
using EduTrailblaze.Services.Interface;
using EduTrailblaze.API.Controllers;
using EduTrailblaze.Services;
using Microsoft.Extensions.Options;
using System.Text.Json.Serialization;

namespace EduTrailblaze.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
                options.JsonSerializerOptions.WriteIndented = true; 
            }
            )
            ;
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Add DbContext
            builder.Services.AddDbContext<EduTrailblazeDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            // Identity Configuration
            builder.Services.AddIdentity<User, IdentityRole>(option =>
            {
                option.Lockout.MaxFailedAccessAttempts = 2;
                option.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromHours(1);
                option.Password.RequireUppercase = false;
                option.Password.RequireNonAlphanumeric = false;
                option.Password.RequireDigit = false;
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


            // Add services to Dependency Container
            builder.Services.AddTransient<TokenGenerator>(); 
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<ITokenGenerator, TokenGenerator>();


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

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodStacks.Dal;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using FoodStacks.Dal.Repositories;
using FoodStacks.Api.Interfaces;
using FoodStacks.Bl.Services;
using FoodStacks.Common.Automapper;

namespace FoodStacks.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddDbContext<FoodStacksDbContext>
                (options => options.UseSqlServer(Configuration.GetConnectionString("FoodStacksDb")));

            services.AddScoped<IFoodService, FoodService>();
            services.AddScoped<IFoodRepository, FoodRepository>();

            //Configure Automapper
            var config = new AutoMapper.MapperConfiguration(c =>
            {
                c.AddProfile(new AutoMapperProfile());
            });
            var mapper = config.CreateMapper();
            services.AddSingleton(mapper);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.Use(async (context, nextMiddleware) =>
            {
                context.Response.OnStarting(() =>
                {
                    context.Response.Headers.Add("Access-Control-Allow-Origin", "http://localhost:19006");
                    context.Response.Headers.Add("Access-Control-Allow-Credentials", "true");
                    context.Response.Headers.Add("Access-Control-Allow-Methods", "GET");
                    context.Response.Headers.Add("Access-Control-Allow-Headers", "Origin, Content-Type");
                    return Task.FromResult(0);
                });
                await nextMiddleware();
            });
        }
    }
}

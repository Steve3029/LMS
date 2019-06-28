﻿using DevYeah.LMS.Business;
using DevYeah.LMS.Business.ConfigurationModels;
using DevYeah.LMS.Business.Interfaces;
using DevYeah.LMS.Data;
using DevYeah.LMS.Data.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DevYeah.LMS.Web
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
            var dbConnection = Configuration.GetValue<string>("DefualtConnection");
            services.AddDbContext<LMSContext>(options => options.UseSqlServer(dbConnection));
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            #region Configuration Setting
            var lmsConfig = Configuration.GetSection("LMSConfig");
            services.Configure<AppSettings>(lmsConfig);
            #endregion

            #region IOC Setting
            services.AddScoped<DbContext, LMSContext>();
            services.AddScoped<IEmailClient, EmailClient>();
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IAccountService, AccountService>();
            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}

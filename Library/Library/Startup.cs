using Library.Data;
using Library.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Library
{
	public class Startup
	{
		#region Properties

		public IConfiguration Configuration { get; }

		#endregion

		#region Construction

		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		#endregion

		#region Public Methods

		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			app.UseCors("Policy");

			if(env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseHttpsRedirection();

			app.UseRouting();

			app.UseAuthorization();

			app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
		}

		public void ConfigureServices(IServiceCollection services)
		{
			services.AddCors(o => o.AddPolicy("Policy", builder =>
			                                            {
				                                            builder.AllowAnyOrigin()
				                                                   .AllowAnyMethod()
				                                                   .AllowAnyHeader();
			                                            }));
			services.AddControllers();
			services.AddDbContext<DataContext>(builder => builder.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
			services.AddScoped<IBookService, BookService>();
		}

		#endregion
	}
}

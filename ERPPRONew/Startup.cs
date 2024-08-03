using ContextERP.Models;
using ERPRepository.ERPRepository;
using IERPRepository.IERPRepository;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ERPPRONew
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
            var connection = Configuration.GetConnectionString("ERPDataBase");

            services.AddDbContextPool<ERPDBContext>(options => options.UseSqlServer(connection));

            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IExpencesRepository, ExpencesRepository>();
            services.AddScoped<IInvoicesRepository, InvoicesRepository>();
            services.AddScoped<IInvoicesDetailsRepository, InvoicesDetailsRepository>();
            services.AddScoped<IPermissionsRepository, PermissionsRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IProductNumberRepository, ProductNumberRepository>();
            services.AddScoped<IProductSizeRepository, ProductSizeRepository>();
            services.AddScoped<IPurchaseOrderRepository, PurchaseOrderRepository>();
            services.AddScoped<IPurchaseOrderDetailsRepository, PurchaseOrderDetailsRepository>();
            services.AddScoped<IReturnInvoicesRepository, ReturnInvoicesRepository>();
            services.AddScoped<IReturnInvoicesDetailsRespository, ReturnInvoicesDetailsRespository>();
            services.AddScoped<IReturnPurchaseOrderRespository, ReturnPurchaseOrderRespository>();
            services.AddScoped<IReturnPurchaseOrderDetailsRespository, ReturnPurchaseOrderDetailsRespository>();
            services.AddScoped<ISupplierCustomerRespository, SupplierCustomerRespository>();
            services.AddScoped<ITransactionProductSizeRepository, TransactionProductSizeRepository>();
            services.AddScoped<ITransactionProductNumberRepository, TransactionProductNumberRepository>();
            services.AddScoped<ITransactionSupplierCustomerRepository, TransactionSupplierCustomerRepository>();
            services.AddScoped<IUsersRepository, UsersRepository>();
            services.AddScoped<IInstallmentRepository, InstallmentRepository>();
            services.AddScoped<IExpencesToRepository, ExpencesToRepository>();
            services.AddScoped<ITransactionSupplierCustomerStoreRepository, TransactionSupplierCustomerStoreRepository>();
            services.AddScoped<IPaymentScheduleRepository, PaymentScheduleRepository>();
            services.AddScoped<IPayoffaDebtRepository, PayoffaDebtRepository>();
            services.AddScoped<ICustomerIndebtednessesRepository, CustomerIndebtednessesRepository>();
            services.AddScoped<IBanksRepository, BanksRepository>();
            services.AddScoped<ITransactionBankRepository, TransactionBankRepository>();
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<IFinancialAdvancesRepository, FinancialAdvancesRepository>();
            services.AddScoped<IAddSalaryEmployeeRepository, AddSalaryEmployeeRepository>();
            services.AddScoped<IVacationRepository, VacationRepository>();
            services.AddScoped<IBouneRepository, BouneRepository>();
            services.AddScoped<ICustomerSettlementRepository, CustomerSettlementRepository>();

            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                    //spa.UseProxyToSpaDevelopmentServer(baseUri: "https://localhost:5000");
                }
            });
        }
    }
}

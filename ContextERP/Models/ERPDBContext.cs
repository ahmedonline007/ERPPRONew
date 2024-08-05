using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace ContextERP.Models
{
    public partial class ERPDBContext : DbContext
    {
        public ERPDBContext()
        {
        }

        public ERPDBContext(DbContextOptions<ERPDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AddEmployeeSalary> AddEmployeeSalaries { get; set; }
        public virtual DbSet<TblBank> TblBanks { get; set; }
        public virtual DbSet<TblBoune> TblBounes { get; set; }
        public virtual DbSet<TblCategory> TblCategories { get; set; }
        public virtual DbSet<TblCustomerIndebtedness> TblCustomerIndebtednesses { get; set; }
        public virtual DbSet<TblCustomerSettlement> TblCustomerSettlements { get; set; }
        public virtual DbSet<TblEmployee> TblEmployees { get; set; }
        public virtual DbSet<TblExpence> TblExpences { get; set; }
        public virtual DbSet<TblExpencesTo> TblExpencesTos { get; set; }
        public virtual DbSet<TblFinancialAdvance> TblFinancialAdvances { get; set; }
        public virtual DbSet<TblInstallment> TblInstallments { get; set; }
        public virtual DbSet<TblInvoice> TblInvoices { get; set; }
        public virtual DbSet<TblInvoicesDetail> TblInvoicesDetails { get; set; }
        public virtual DbSet<TblLength> TblLengths { get; set; }
        public virtual DbSet<TblPaymentSchedule> TblPaymentSchedules { get; set; }
        public virtual DbSet<TblPayoffaDebt> TblPayoffaDebts { get; set; }
        public virtual DbSet<TblPermission> TblPermissions { get; set; }
        public virtual DbSet<TblProduct> TblProducts { get; set; }
        public virtual DbSet<TblProductNumber> TblProductNumbers { get; set; }
        public virtual DbSet<TblProductSize> TblProductSizes { get; set; }
        public virtual DbSet<TblPurchaseOrder> TblPurchaseOrders { get; set; }
        public virtual DbSet<TblPurchaseOrderDetail> TblPurchaseOrderDetails { get; set; }
        public virtual DbSet<TblReturnInvoice> TblReturnInvoices { get; set; }
        public virtual DbSet<TblReturnInvoicesDetail> TblReturnInvoicesDetails { get; set; }
        public virtual DbSet<TblReturnPurchaseOrder> TblReturnPurchaseOrders { get; set; }
        public virtual DbSet<TblReturnPurchaseOrderDetail> TblReturnPurchaseOrderDetails { get; set; }
        public virtual DbSet<TblSupplierCustomer> TblSupplierCustomers { get; set; }
        public virtual DbSet<TblTransactionBank> TblTransactionBanks { get; set; }
        public virtual DbSet<TblTransactionProductNumber> TblTransactionProductNumbers { get; set; }
        public virtual DbSet<TblTransactionProductSize> TblTransactionProductSizes { get; set; }
        public virtual DbSet<TblTransactionSupplierCustomer> TblTransactionSupplierCustomers { get; set; }
        public virtual DbSet<TblUser> TblUsers { get; set; }
        public virtual DbSet<TblVacation> TblVacations { get; set; }
        public virtual DbSet<TransactionSupplierCustomerStore> TransactionSupplierCustomerStores { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=(local);Initial Catalog=ERPDB;Persist Security Info=False;User ID=youssef;Password=01009615946; ");
                //optionsBuilder.UseSqlServer("Server=(local);Initial Catalog=ERPDB;Trusted_Connection=True;TrustServerCertificate=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<AddEmployeeSalary>(entity =>
            {
                entity.ToTable("AddEmployeeSalary");

                entity.Property(e => e.ActualSalary).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Bounes).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Descount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Salary).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.SalaryDate).HasColumnType("date");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.AddEmployeeSalaries)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("TblEmployee_EmployeeIdSalary_FK");
            });

            modelBuilder.Entity<TblBank>(entity =>
            {
                entity.ToTable("TblBank");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cost)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("cost");

                entity.Property(e => e.Describtion)
                    .HasMaxLength(200)
                    .HasColumnName("describtion");

                entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

                entity.Property(e => e.Name)
                    .HasMaxLength(200)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<TblBoune>(entity =>
            {
                entity.Property(e => e.BounesDate).HasColumnType("date");

                entity.Property(e => e.Describtion).HasMaxLength(250);

                entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

                entity.Property(e => e.Salary).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.TblBounes)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("TblEmployee_EmployeeIdBoune_FK");
            });

            modelBuilder.Entity<TblCategory>(entity =>
            {
                entity.ToTable("tblCategory");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IsDelete).HasColumnName("isDelete");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<TblCustomerIndebtedness>(entity =>
            {
                entity.ToTable("tblCustomerIndebtedness");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CustomerId).HasColumnName("customerId");

                entity.Property(e => e.Debt)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("debt");

                entity.Property(e => e.DebtDate)
                    .HasColumnType("date")
                    .HasColumnName("debtDate");

                entity.Property(e => e.Describtion)
                    .HasMaxLength(200)
                    .HasColumnName("describtion");

                entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.TblCustomerIndebtednesses)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("tblCustomer_Indebtedness_FK");
            });

            modelBuilder.Entity<TblCustomerSettlement>(entity =>
            {
                entity.ToTable("TblCustomerSettlement");

                entity.Property(e => e.CustomerId).HasColumnName("customerId");

                entity.Property(e => e.Debt)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("debt");

                entity.Property(e => e.DebtDate)
                    .HasColumnType("date")
                    .HasColumnName("debtDate");

                entity.Property(e => e.Describtion).HasMaxLength(250);

                entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.TblCustomerSettlements)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("TblCustomer_CustomerIdSettlement_FK");
            });

            modelBuilder.Entity<TblEmployee>(entity =>
            {
                entity.ToTable("TblEmployee");

                entity.Property(e => e.EmployeeAddress).HasMaxLength(200);

                entity.Property(e => e.EmployeeName).HasMaxLength(200);

                entity.Property(e => e.EmployeePhone).HasMaxLength(200);

                entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

                entity.Property(e => e.Salary).HasColumnType("decimal(18, 2)");
            });

            modelBuilder.Entity<TblExpence>(entity =>
            {
                entity.ToTable("tblExpences");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cost)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("cost");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("date");

                entity.Property(e => e.Description)
                    .HasMaxLength(100)
                    .HasColumnName("description");

                entity.Property(e => e.ExpencesName)
                    .HasMaxLength(100)
                    .HasColumnName("expencesName");

                entity.Property(e => e.IsDelete).HasColumnName("isDelete");
            });

            modelBuilder.Entity<TblExpencesTo>(entity =>
            {
                entity.ToTable("tblExpencesTo");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cost)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("cost");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("date");

                entity.Property(e => e.Description)
                    .HasMaxLength(100)
                    .HasColumnName("description");

                entity.Property(e => e.ExpencesToName)
                    .HasMaxLength(100)
                    .HasColumnName("expencesToName");

                entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");
            });

            modelBuilder.Entity<TblFinancialAdvance>(entity =>
            {
                entity.ToTable("TblFinancialAdvance");

                entity.Property(e => e.BounesDate).HasColumnType("date");

                entity.Property(e => e.Describtion).HasMaxLength(250);

                entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

                entity.Property(e => e.Salary).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.TblFinancialAdvances)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("TblEmployee_EmployeeIdBounes_FK");
            });

            modelBuilder.Entity<TblInstallment>(entity =>
            {
                entity.ToTable("tblInstallment");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CustomerId).HasColumnName("customerId");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("date");

                entity.Property(e => e.IsPayed).HasColumnName("isPayed");

                entity.Property(e => e.Money).HasColumnName("money");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.TblInstallments)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK_tblInstallment_tblSupplierCustomer");
            });

            modelBuilder.Entity<TblInvoice>(entity =>
            {
                entity.ToTable("tblInvoices");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Amount)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("amount");

                entity.Property(e => e.CustomerId).HasColumnName("customerId");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("date");

                entity.Property(e => e.Descount)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("descount");

                entity.Property(e => e.Description).HasMaxLength(500);

                entity.Property(e => e.ExpencesInvoices)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("expencesInvoices");

                entity.Property(e => e.IsDelete).HasColumnName("isDelete");

                entity.Property(e => e.ItemCount).HasColumnName("itemCount");

                entity.Property(e => e.NumberOfInvoiceBySystem).HasColumnName("numberOfInvoiceBySystem");

                entity.Property(e => e.Payed)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("payed");

                entity.Property(e => e.TotalInvoice)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("totalInvoice");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.TblInvoices)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK_tblInvoices_tblSupplierCustomer");
            });

            modelBuilder.Entity<TblInvoicesDetail>(entity =>
            {
                entity.ToTable("tblInvoicesDetails");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Centi)
                    .HasColumnType("decimal(18, 4)")
                    .HasColumnName("centi");

                entity.Property(e => e.Code)
                    .HasMaxLength(50)
                    .HasColumnName("code");

                entity.Property(e => e.Height).HasColumnName("height");

                entity.Property(e => e.InvoiceId).HasColumnName("invoiceId");

                entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

                entity.Property(e => e.Meter).HasColumnName("meter");

                entity.Property(e => e.PriceSelling)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("priceSelling");

                entity.Property(e => e.PriceSupplier)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("priceSupplier");

                entity.Property(e => e.ProductId).HasColumnName("productId");

                entity.Property(e => e.Qty).HasColumnName("qty");

                entity.Property(e => e.Size).HasColumnName("size");

                entity.Property(e => e.Type).HasColumnName("type");

                entity.Property(e => e.Width).HasColumnName("width");

                entity.HasOne(d => d.Invoice)
                    .WithMany(p => p.TblInvoicesDetails)
                    .HasForeignKey(d => d.InvoiceId)
                    .HasConstraintName("FK_tblInvoicesDetails1_tblInvoices");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblInvoicesDetails)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_tblInvoicesDetails1_tblProduct");
            });

            modelBuilder.Entity<TblLength>(entity =>
            {
                entity.ToTable("tblLengths");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Centi)
                    .HasColumnType("decimal(18, 4)")
                    .HasColumnName("centi");

                entity.Property(e => e.Code)
                    .HasMaxLength(50)
                    .HasColumnName("code");

                entity.Property(e => e.Height).HasColumnName("height");

                entity.Property(e => e.IsUsed).HasColumnName("isUsed");

                entity.Property(e => e.Meter).HasColumnName("meter");

                entity.Property(e => e.ProductId).HasColumnName("productId");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.Width).HasColumnName("width");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblLengths)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("tblLengths_productId_FK");
            });

            modelBuilder.Entity<TblPaymentSchedule>(entity =>
            {
                entity.ToTable("tblPaymentSchedule");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Credit)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("credit");

                entity.Property(e => e.CreditBank)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("creditBank");

                entity.Property(e => e.CustomerId).HasColumnName("customerId");

                entity.Property(e => e.Debit)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("debit");

                entity.Property(e => e.InvicesNumber)
                    .HasMaxLength(50)
                    .HasColumnName("invicesNumber");

                entity.Property(e => e.IsCreditBank).HasColumnName("isCreditBank");

                entity.Property(e => e.Total)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("total");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.TblPaymentSchedules)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("tblPaymentSchedule_customerId_FK");
            });

            modelBuilder.Entity<TblPayoffaDebt>(entity =>
            {
                entity.ToTable("tblPayoffaDebt");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CustomerId).HasColumnName("customerId");

                entity.Property(e => e.Debt)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("debt");

                entity.Property(e => e.DebtDate)
                    .HasColumnType("date")
                    .HasColumnName("debtDate");

                entity.Property(e => e.Describtion)
                    .HasMaxLength(150)
                    .HasColumnName("describtion");

                entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.TblPayoffaDebts)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("tblSupplierCustomer_CustomerID_FK");
            });

            modelBuilder.Entity<TblPermission>(entity =>
            {
                entity.ToTable("tblPermissions");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ParentId).HasColumnName("parentId");

                entity.Property(e => e.PermissionId).HasColumnName("permissionID");

                entity.Property(e => e.PermissionValues).HasColumnName("permissionValues");

                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.TblPermissions)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_tblPermissions_tblUsers");
            });

            modelBuilder.Entity<TblProduct>(entity =>
            {
                entity.ToTable("tblProduct");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CategoryId).HasColumnName("categoryId");

                entity.Property(e => e.IsDelete).HasColumnName("isDelete");

                entity.Property(e => e.Name)
                    .HasMaxLength(200)
                    .HasColumnName("name");

                entity.Property(e => e.PriceSelling)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("priceSelling");

                entity.Property(e => e.PriceSupplier)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("priceSupplier");

                entity.Property(e => e.Type).HasColumnName("type");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.TblProducts)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK_tblProduct_tblCategory");
            });

            modelBuilder.Entity<TblProductNumber>(entity =>
            {
                entity.ToTable("tblProductNumber");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Code)
                    .HasMaxLength(20)
                    .HasColumnName("code");

                entity.Property(e => e.IsUsed).HasColumnName("isUsed");

                entity.Property(e => e.ProductId).HasColumnName("productId");

                entity.Property(e => e.Qty).HasColumnName("qty");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblProductNumbers)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_tblProductNumber_tblProduct");
            });

            modelBuilder.Entity<TblProductSize>(entity =>
            {
                entity.ToTable("tblProductSize");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Centi)
                    .HasColumnType("decimal(18, 4)")
                    .HasColumnName("centi");

                entity.Property(e => e.Code)
                    .HasMaxLength(20)
                    .HasColumnName("code");

                entity.Property(e => e.Height).HasColumnName("height");

                entity.Property(e => e.IsUsed).HasColumnName("isUsed");

                entity.Property(e => e.Meter).HasColumnName("meter");

                entity.Property(e => e.ProductId).HasColumnName("productId");

                entity.Property(e => e.Qty).HasColumnName("qty");

                entity.Property(e => e.Size).HasColumnName("size");

                entity.Property(e => e.Width).HasColumnName("width");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblProductSizes)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_tblProductSize1_tblProduct");
            });

            modelBuilder.Entity<TblPurchaseOrder>(entity =>
            {
                entity.ToTable("tblPurchaseOrder");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Amount)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("amount");

                entity.Property(e => e.CustomerId).HasColumnName("customerId");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("date");

                entity.Property(e => e.Descount)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("descount");

                entity.Property(e => e.Description).HasMaxLength(500);

                entity.Property(e => e.IsDelete).HasColumnName("isDelete");

                entity.Property(e => e.ItemCount).HasColumnName("itemCount");

                entity.Property(e => e.NumberOfInvoiceBySystem).HasColumnName("numberOfInvoiceBySystem");

                entity.Property(e => e.NumberOfInvoiceSupplier).HasColumnName("numberOfInvoiceSupplier");

                entity.Property(e => e.Payed)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("payed");

                entity.Property(e => e.TotalInvoice)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("totalInvoice");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.TblPurchaseOrders)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK_tblPurchaseOrder_tblSupplierCustomer");
            });

            modelBuilder.Entity<TblPurchaseOrderDetail>(entity =>
            {
                entity.ToTable("tblPurchaseOrderDetails");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Centi)
                    .HasColumnType("decimal(18, 4)")
                    .HasColumnName("centi");

                entity.Property(e => e.Code)
                    .HasMaxLength(50)
                    .HasColumnName("code");

                entity.Property(e => e.Hight).HasColumnName("hight");

                entity.Property(e => e.InvoiceId).HasColumnName("invoiceId");

                entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

                entity.Property(e => e.Meter).HasColumnName("meter");

                entity.Property(e => e.PriceSelling)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("priceSelling");

                entity.Property(e => e.PriceSupplier)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("priceSupplier");

                entity.Property(e => e.ProductId).HasColumnName("productId");

                entity.Property(e => e.Qty).HasColumnName("qty");

                entity.Property(e => e.Size).HasColumnName("size");

                entity.Property(e => e.Type).HasColumnName("type");

                entity.Property(e => e.Width).HasColumnName("width");

                entity.HasOne(d => d.Invoice)
                    .WithMany(p => p.TblPurchaseOrderDetails)
                    .HasForeignKey(d => d.InvoiceId)
                    .HasConstraintName("FK_tblPurchaseOrderDetails_tblPurchaseOrder");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblPurchaseOrderDetails)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_tblPurchaseOrderDetails_tblProduct");
            });

            modelBuilder.Entity<TblReturnInvoice>(entity =>
            {
                entity.ToTable("tblReturnInvoices");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Amount)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("amount");

                entity.Property(e => e.CustomerId).HasColumnName("customerId");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("date");

                entity.Property(e => e.Descount)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("descount");

                entity.Property(e => e.IsDelate).HasColumnName("isDelate");

                entity.Property(e => e.ItemCount).HasColumnName("itemCount");

                entity.Property(e => e.NumberOfInvoiceBySystem).HasColumnName("numberOfInvoiceBySystem");

                entity.Property(e => e.NumberOfInvoiceSupplier)
                    .HasMaxLength(50)
                    .HasColumnName("numberOfInvoiceSupplier");

                entity.Property(e => e.Payed)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("payed");

                entity.Property(e => e.TotalInvoice)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("totalInvoice");
            });

            modelBuilder.Entity<TblReturnInvoicesDetail>(entity =>
            {
                entity.ToTable("tblReturnInvoicesDetails");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Centi)
                    .HasColumnType("decimal(18, 4)")
                    .HasColumnName("centi");

                entity.Property(e => e.Code)
                    .HasMaxLength(50)
                    .HasColumnName("code");

                entity.Property(e => e.Hight).HasColumnName("hight");

                entity.Property(e => e.InvoiceId).HasColumnName("invoiceId");

                entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

                entity.Property(e => e.Meter).HasColumnName("meter");

                entity.Property(e => e.PriceReturn)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("priceReturn");

                entity.Property(e => e.ProductId).HasColumnName("productId");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.Size).HasColumnName("size");

                entity.Property(e => e.Type).HasColumnName("type");

                entity.Property(e => e.Width).HasColumnName("width");

                entity.HasOne(d => d.Invoice)
                    .WithMany(p => p.TblReturnInvoicesDetails)
                    .HasForeignKey(d => d.InvoiceId)
                    .HasConstraintName("FK_ReturnInvoicesDetails_Invoices");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblReturnInvoicesDetails)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_ReturnInvoicesDetails_product");
            });

            modelBuilder.Entity<TblReturnPurchaseOrder>(entity =>
            {
                entity.ToTable("tblReturnPurchaseOrder");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Amount)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("amount");

                entity.Property(e => e.CustomerId).HasColumnName("customerId");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("date");

                entity.Property(e => e.Descount)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("descount");

                entity.Property(e => e.IsDelate).HasColumnName("isDelate");

                entity.Property(e => e.ItemCount).HasColumnName("itemCount");

                entity.Property(e => e.NumberOfInvoiceBySystem).HasColumnName("numberOfInvoiceBySystem");

                entity.Property(e => e.Payed)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("payed");

                entity.Property(e => e.TotalInvoice)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("totalInvoice");
            });

            modelBuilder.Entity<TblReturnPurchaseOrderDetail>(entity =>
            {
                entity.ToTable("tblReturnPurchaseOrderDetails");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Centi)
                    .HasColumnType("decimal(18, 4)")
                    .HasColumnName("centi");

                entity.Property(e => e.Code)
                    .HasMaxLength(50)
                    .HasColumnName("code");

                entity.Property(e => e.Hight).HasColumnName("hight");

                entity.Property(e => e.InvoiceId).HasColumnName("invoiceId");

                entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

                entity.Property(e => e.Meter).HasColumnName("meter");

                entity.Property(e => e.PriceReturn)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("priceReturn");

                entity.Property(e => e.ProductId).HasColumnName("productId");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.Type).HasColumnName("type");

                entity.Property(e => e.Width).HasColumnName("width");

                entity.HasOne(d => d.Invoice)
                    .WithMany(p => p.TblReturnPurchaseOrderDetails)
                    .HasForeignKey(d => d.InvoiceId)
                    .HasConstraintName("FK_ReturnPurchaseOrderDetails_PurchaseOrder");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblReturnPurchaseOrderDetails)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_ReturnPurchaseOrderDetails_Product");
            });

            modelBuilder.Entity<TblSupplierCustomer>(entity =>
            {
                entity.ToTable("tblSupplierCustomer");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Address)
                    .HasMaxLength(200)
                    .HasColumnName("address");

                entity.Property(e => e.Credit)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("credit");

                entity.Property(e => e.Debit)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("debit");

                entity.Property(e => e.Flag).HasColumnName("flag");

                entity.Property(e => e.IsDelete).HasColumnName("isDelete");

                entity.Property(e => e.Name)
                    .HasMaxLength(200)
                    .HasColumnName("name");

                entity.Property(e => e.Phone)
                    .HasMaxLength(20)
                    .HasColumnName("phone");
            });

            modelBuilder.Entity<TblTransactionBank>(entity =>
            {
                entity.ToTable("TblTransactionBank");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.BankId).HasColumnName("bankId");

                entity.Property(e => e.Cost)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("cost");

                entity.Property(e => e.CustomerId).HasColumnName("customerId");

                entity.Property(e => e.Describtion)
                    .HasMaxLength(200)
                    .HasColumnName("describtion");

                entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

                entity.Property(e => e.TransactionDate)
                    .HasColumnType("date")
                    .HasColumnName("transactionDate");

                entity.Property(e => e.TransactionType).HasColumnName("transactionType");

                entity.HasOne(d => d.Bank)
                    .WithMany(p => p.TblTransactionBanks)
                    .HasForeignKey(d => d.BankId)
                    .HasConstraintName("tblBank_TransactionBank_FK");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.TblTransactionBanks)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("tblCustomer_TransactionBank_FK");
            });

            modelBuilder.Entity<TblTransactionProductNumber>(entity =>
            {
                entity.ToTable("tblTransactionProductNumber");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Code)
                    .HasMaxLength(20)
                    .HasColumnName("code");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("date");

                entity.Property(e => e.InvoicesNo).HasColumnName("invoicesNo");

                entity.Property(e => e.PriceSelling)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("priceSelling");

                entity.Property(e => e.PriceSupplier)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("priceSupplier");

                entity.Property(e => e.ProductId).HasColumnName("productId");

                entity.Property(e => e.Qty).HasColumnName("qty");

                entity.Property(e => e.Serial)
                    .HasMaxLength(20)
                    .HasColumnName("serial");

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .HasColumnName("type");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblTransactionProductNumbers)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_tblTransactionProductNumber_tblProduct");
            });

            modelBuilder.Entity<TblTransactionProductSize>(entity =>
            {
                entity.ToTable("tblTransactionProductSize");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Centi)
                    .HasColumnType("decimal(18, 4)")
                    .HasColumnName("centi");

                entity.Property(e => e.Code)
                    .HasMaxLength(20)
                    .HasColumnName("code");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("date");

                entity.Property(e => e.Height).HasColumnName("height");

                entity.Property(e => e.InvoicesNo).HasColumnName("invoicesNo");

                entity.Property(e => e.Meter).HasColumnName("meter");

                entity.Property(e => e.PriceSelling)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("priceSelling");

                entity.Property(e => e.PriceSupplier)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("priceSupplier");

                entity.Property(e => e.ProductId).HasColumnName("productId");

                entity.Property(e => e.Qty).HasColumnName("qty");

                entity.Property(e => e.Serial)
                    .HasMaxLength(20)
                    .HasColumnName("serial");

                entity.Property(e => e.Size).HasColumnName("size");

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .HasColumnName("type");

                entity.Property(e => e.Width).HasColumnName("width");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.TblTransactionProductSizes)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_tblTransactionProductSize_tblProduct");
            });

            modelBuilder.Entity<TblTransactionSupplierCustomer>(entity =>
            {
                entity.ToTable("tblTransactionSupplierCustomer");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Credit)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("credit");

                entity.Property(e => e.CustomerId).HasColumnName("customerId");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("date");

                entity.Property(e => e.Debit)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("debit");

                entity.Property(e => e.Description)
                    .HasMaxLength(200)
                    .HasColumnName("description");

                entity.Property(e => e.InvoiceNumber)
                    .HasMaxLength(50)
                    .HasColumnName("invoiceNumber");

                entity.Property(e => e.Total)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("total");

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .HasColumnName("type");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.TblTransactionSupplierCustomers)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK_tblTransactionSupplierCustomer_tblSupplierCustomer");
            });

            modelBuilder.Entity<TblUser>(entity =>
            {
                entity.ToTable("tblUsers");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IsDelete).HasColumnName("isDelete");

                entity.Property(e => e.Name)
                    .HasMaxLength(150)
                    .HasColumnName("name");

                entity.Property(e => e.Password)
                    .HasMaxLength(100)
                    .HasColumnName("password");

                entity.Property(e => e.UserName)
                    .HasMaxLength(100)
                    .HasColumnName("userName");
            });

            modelBuilder.Entity<TblVacation>(entity =>
            {
                entity.ToTable("TblVacation");

                entity.Property(e => e.DateVacation).HasColumnType("date");

                entity.Property(e => e.Describtion).HasMaxLength(250);

                entity.Property(e => e.EndVacation).HasColumnType("date");

                entity.Property(e => e.IsDeleted).HasColumnName("isDeleted");

                entity.Property(e => e.StartVacation).HasColumnType("date");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.TblVacations)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("TblEmployee_EmployeeId_FK");
            });

            modelBuilder.Entity<TransactionSupplierCustomerStore>(entity =>
            {
                entity.ToTable("transactionSupplierCustomerStore");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Amount)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("amount");

                entity.Property(e => e.Credit)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("credit");

                entity.Property(e => e.CustomerId).HasColumnName("customerId");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasColumnName("date");

                entity.Property(e => e.Debit)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("debit");

                entity.Property(e => e.Describtion)
                    .HasMaxLength(150)
                    .HasColumnName("describtion");

                entity.Property(e => e.InvoiceNumber)
                    .HasMaxLength(50)
                    .HasColumnName("invoiceNumber");

                entity.Property(e => e.Total)
                    .HasColumnType("decimal(18, 2)")
                    .HasColumnName("total");

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .HasColumnName("type");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.TransactionSupplierCustomerStores)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("tblTransaction_CustomerID_FK");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

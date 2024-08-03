using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblSupplierCustomer
    {
        public TblSupplierCustomer()
        {
            TblCustomerIndebtednesses = new HashSet<TblCustomerIndebtedness>();
            TblCustomerSettlements = new HashSet<TblCustomerSettlement>();
            TblInstallments = new HashSet<TblInstallment>();
            TblInvoices = new HashSet<TblInvoice>();
            TblPaymentSchedules = new HashSet<TblPaymentSchedule>();
            TblPayoffaDebts = new HashSet<TblPayoffaDebt>();
            TblPurchaseOrders = new HashSet<TblPurchaseOrder>();
            TblTransactionBanks = new HashSet<TblTransactionBank>();
            TblTransactionSupplierCustomers = new HashSet<TblTransactionSupplierCustomer>();
            TransactionSupplierCustomerStores = new HashSet<TransactionSupplierCustomerStore>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public decimal? Credit { get; set; }
        public decimal? Debit { get; set; }
        public bool? IsDelete { get; set; }
        public bool? Flag { get; set; }

        public virtual ICollection<TblCustomerIndebtedness> TblCustomerIndebtednesses { get; set; }
        public virtual ICollection<TblCustomerSettlement> TblCustomerSettlements { get; set; }
        public virtual ICollection<TblInstallment> TblInstallments { get; set; }
        public virtual ICollection<TblInvoice> TblInvoices { get; set; }
        public virtual ICollection<TblPaymentSchedule> TblPaymentSchedules { get; set; }
        public virtual ICollection<TblPayoffaDebt> TblPayoffaDebts { get; set; }
        public virtual ICollection<TblPurchaseOrder> TblPurchaseOrders { get; set; }
        public virtual ICollection<TblTransactionBank> TblTransactionBanks { get; set; }
        public virtual ICollection<TblTransactionSupplierCustomer> TblTransactionSupplierCustomers { get; set; }
        public virtual ICollection<TransactionSupplierCustomerStore> TransactionSupplierCustomerStores { get; set; }
    }
}

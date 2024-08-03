using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TransactionSupplierCustomerStore
    {
        public int Id { get; set; }
        public int? CustomerId { get; set; }
        public DateTime? Date { get; set; }
        public string InvoiceNumber { get; set; }
        public decimal? Debit { get; set; }
        public decimal? Credit { get; set; }
        public string Type { get; set; }
        public decimal? Total { get; set; }
        public decimal? Amount { get; set; }
        public string Describtion { get; set; }

        public virtual TblSupplierCustomer Customer { get; set; }
    }
}

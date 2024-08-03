using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblTransactionSupplierCustomer
    {
        public int Id { get; set; }
        public int? CustomerId { get; set; }
        public DateTime? Date { get; set; }
        public string InvoiceNumber { get; set; }
        public decimal? Debit { get; set; }
        public decimal? Credit { get; set; }
        public decimal? Total { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }

        public virtual TblSupplierCustomer Customer { get; set; }
    }
}

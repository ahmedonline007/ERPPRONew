using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblInvoice
    {
        public TblInvoice()
        {
            TblInvoicesDetails = new HashSet<TblInvoicesDetail>();
        }

        public int Id { get; set; }
        public int? NumberOfInvoiceBySystem { get; set; }
        public int? ItemCount { get; set; }
        public DateTime? Date { get; set; }
        public decimal? TotalInvoice { get; set; }
        public decimal? Payed { get; set; }
        public decimal? Amount { get; set; }
        public decimal? Descount { get; set; }
        public bool? IsDelete { get; set; }
        public int? CustomerId { get; set; }
        public string Description { get; set; }
        public decimal? ExpencesInvoices { get; set; }

        public virtual TblSupplierCustomer Customer { get; set; }
        public virtual ICollection<TblInvoicesDetail> TblInvoicesDetails { get; set; }
    }
}

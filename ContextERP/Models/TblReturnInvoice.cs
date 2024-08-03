using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblReturnInvoice
    {
        public TblReturnInvoice()
        {
            TblReturnInvoicesDetails = new HashSet<TblReturnInvoicesDetail>();
        }

        public int Id { get; set; }
        public int? NumberOfInvoiceBySystem { get; set; }
        public int? ItemCount { get; set; }
        public DateTime? Date { get; set; }
        public decimal? TotalInvoice { get; set; }
        public decimal? Payed { get; set; }
        public decimal? Amount { get; set; }
        public decimal? Descount { get; set; }
        public bool? IsDelate { get; set; }
        public int? CustomerId { get; set; }
        public string NumberOfInvoiceSupplier { get; set; }

        public virtual ICollection<TblReturnInvoicesDetail> TblReturnInvoicesDetails { get; set; }
    }
}

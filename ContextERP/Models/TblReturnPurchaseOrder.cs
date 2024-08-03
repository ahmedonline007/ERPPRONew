using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblReturnPurchaseOrder
    {
        public TblReturnPurchaseOrder()
        {
            TblReturnPurchaseOrderDetails = new HashSet<TblReturnPurchaseOrderDetail>();
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

        public virtual ICollection<TblReturnPurchaseOrderDetail> TblReturnPurchaseOrderDetails { get; set; }
    }
}

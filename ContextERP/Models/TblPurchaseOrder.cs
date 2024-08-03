using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblPurchaseOrder
    {
        public TblPurchaseOrder()
        {
            TblPurchaseOrderDetails = new HashSet<TblPurchaseOrderDetail>();
        }

        public int Id { get; set; }
        public int? NumberOfInvoiceSupplier { get; set; }
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

        public virtual TblSupplierCustomer Customer { get; set; }
        public virtual ICollection<TblPurchaseOrderDetail> TblPurchaseOrderDetails { get; set; }
    }
}

using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblReturnPurchaseOrderDetail
    {
        public int Id { get; set; }
        public int? ProductId { get; set; }
        public int? InvoiceId { get; set; }
        public double? Width { get; set; }
        public double? Hight { get; set; }
        public string Code { get; set; }
        public double? Meter { get; set; }
        public decimal? Centi { get; set; }
        public bool? Type { get; set; }
        public int? Quantity { get; set; }
        public decimal? PriceReturn { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual TblReturnPurchaseOrder Invoice { get; set; }
        public virtual TblProduct Product { get; set; }
    }
}

using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblPurchaseOrderDetail
    {
        public int Id { get; set; }
        public int? ProductId { get; set; }
        public int? InvoiceId { get; set; }
        public double? Width { get; set; }
        public double? Hight { get; set; }
        public double? Size { get; set; }
        public string Code { get; set; }
        public int? Qty { get; set; }
        public double? Meter { get; set; }
        public decimal? Centi { get; set; }
        public bool? Type { get; set; }
        public decimal? PriceSupplier { get; set; }
        public decimal? PriceSelling { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual TblPurchaseOrder Invoice { get; set; }
        public virtual TblProduct Product { get; set; }
    }
}

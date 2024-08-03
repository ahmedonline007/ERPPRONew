using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblTransactionProductSize
    {
        public int Id { get; set; }
        public int? ProductId { get; set; }
        public DateTime? Date { get; set; }
        public double? Width { get; set; }
        public double? Height { get; set; }
        public double? Size { get; set; }
        public string Code { get; set; }
        public double? Meter { get; set; }
        public decimal? Centi { get; set; }
        public int? Qty { get; set; }
        public string Serial { get; set; }
        public decimal? PriceSupplier { get; set; }
        public decimal? PriceSelling { get; set; }
        public string Type { get; set; }
        public int? InvoicesNo { get; set; }

        public virtual TblProduct Product { get; set; }
    }
}

using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblTransactionProductNumber
    {
        public int Id { get; set; }
        public DateTime? Date { get; set; }
        public int? ProductId { get; set; }
        public int? Qty { get; set; }
        public string Code { get; set; }
        public decimal? PriceSupplier { get; set; }
        public decimal? PriceSelling { get; set; }
        public string Type { get; set; }
        public int? InvoicesNo { get; set; }
        public string Serial { get; set; }

        public virtual TblProduct Product { get; set; }
    }
}

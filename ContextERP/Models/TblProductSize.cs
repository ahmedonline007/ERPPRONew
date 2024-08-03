using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblProductSize
    {
        public int Id { get; set; }
        public int? ProductId { get; set; }
        public double? Width { get; set; }
        public double? Height { get; set; }
        public double? Size { get; set; }
        public string Code { get; set; }
        public double? Meter { get; set; }
        public decimal? Centi { get; set; }
        public int? Qty { get; set; }
        public bool? IsUsed { get; set; }

        public virtual TblProduct Product { get; set; }
    }
}

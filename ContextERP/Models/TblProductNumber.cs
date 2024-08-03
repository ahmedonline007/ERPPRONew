using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblProductNumber
    {
        public int Id { get; set; }
        public int? ProductId { get; set; }
        public int? Qty { get; set; }
        public string Code { get; set; }
        public bool? IsUsed { get; set; }

        public virtual TblProduct Product { get; set; }
    }
}

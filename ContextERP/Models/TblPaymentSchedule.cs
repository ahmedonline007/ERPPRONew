using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblPaymentSchedule
    {
        public int Id { get; set; }
        public int? CustomerId { get; set; }
        public string InvicesNumber { get; set; }
        public decimal? Total { get; set; }
        public decimal? Credit { get; set; }
        public decimal? Debit { get; set; }
        public bool? IsCreditBank { get; set; }
        public decimal? CreditBank { get; set; }

        public virtual TblSupplierCustomer Customer { get; set; }
    }
}

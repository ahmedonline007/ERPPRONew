using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
    public class DtoPaymentSchedule
    {
        public int Id { get; set; }
        public int? CustomerId { get; set; }
        public string InvicesNumber { get; set; }
        public decimal? Total { get; set; }
        public decimal? Credit { get; set; }
        public decimal? Debit { get; set; }
        public bool? IsCreditBank { get; set; }
        public decimal? CreditBank { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
    public class DtoTransactionBank
    {
        public int id { get; set; }
        public int? bankId { get; set; }
        public int? customerId { get; set; }
        public int? transactionType { get; set; }
        public string transactionTypeName { get; set; }
        public DateTime? transactionDate { get; set; }
        public decimal? cost { get; set; }
        public string description { get; set; }
    }
}

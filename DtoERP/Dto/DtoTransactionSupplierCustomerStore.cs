using System;
using System.Collections.Generic;

namespace DtoERP.Dto
{
  public  class DtoTransactionSupplierCustomerStore
    {
        public int Id { get; set; }
        public int? CustomerId { get; set; }
        public string CustomerName { get; set; }
        public DateTime? Date { get; set; }
        public string InvoiceNumber { get; set; }
        public decimal? Total { get; set; }
        public decimal? Debit { get; set; }
        public decimal? Credit { get; set; }
        public decimal? Amount { get; set; }
        public string Type { get; set; }
        public List<DtoPurchaseOrderDetails> listPurchaseOrderDetails { get; set; }
        public string describtion { get; set; }
        public string itemss { get; set; }
    }

    public class DtoReturnCreditDebit
    {
        public decimal? Debit { get; set; }
        public decimal? Credit { get; set; }
    }
}

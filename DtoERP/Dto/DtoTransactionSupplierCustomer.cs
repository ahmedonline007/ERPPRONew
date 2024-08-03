using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
 public   class DtoTransactionSupplierCustomer
    {
        public int id { get; set; }
        public int? customerId { get; set; }
        public string customerName { get; set; }
        public DateTime? date { get; set; }
        public string invoiceNumber { get; set; }
        public decimal? debit { get; set; }
        public decimal? credit { get; set; }
        public decimal? total { get; set; }
        public decimal? amount { get; set; }
        public string type { get; set; }
        public string description { get; set; }
        public List<DtoInvoicesDetails> listofItem { get; set; }
    }
}

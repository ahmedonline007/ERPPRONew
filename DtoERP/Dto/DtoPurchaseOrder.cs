using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
  public  class DtoPurchaseOrder
    {
        public int id { get; set; }
        public int? numberOfInvoiceSupplier { get; set; }
        public int? numberOfInvoiceBySystem { get; set; }
        public int? itemCount { get; set; }
        public DateTime? date { get; set; }
        public decimal? totalInvoice { get; set; }
        public decimal? payed { get; set; }
        public decimal? amount { get; set; }
        public decimal? descount { get; set; }
        public bool? isDelete { get; set; }
        public int? customerId { get; set; }
        public string customerName { get; set; }
        public string isPrice { get; set; }
        public string description { get; set; }
        public bool? type { get; set; }
        public string describtion { get; set; }
        public List<DtoPurchaseOrderDetails> listPurchaseOrderDetails { get; set; }
    }
}

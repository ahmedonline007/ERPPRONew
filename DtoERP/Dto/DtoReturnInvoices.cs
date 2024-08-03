using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
  public  class DtoReturnInvoices
    {
        public int id { get; set; }
        public int? numberOfInvoiceBySystem { get; set; }
        public int? numberOfInvoiceSupplier { get; set; }
        public int? itemCount { get; set; }
        public DateTime? date { get; set; }
        public decimal? totalInvoice { get; set; }
        public double? payed { get; set; }
        public decimal? amount { get; set; }
        public double? descount { get; set; }
        public bool? isDelate { get; set; }
        public bool? isPayed { get; set; }
        public int? customerId { get; set; }
        public string customerName { get; set; }
        public List<DtoReturnInvoicesDetails> listReturnInvoicesDetails { get; set; }
    }
}

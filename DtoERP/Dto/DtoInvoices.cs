using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
    public class DtoInvoices
    {
        public int id { get; set; }
        public int? numberOfInvoiceBySystem { get; set; }
        public int? invoiceNumber { get; set; }
        public int? itemCount { get; set; }
        public DateTime? date { get; set; }
        public decimal? totalInvoice { get; set; }
        public decimal? totalInvoiceWithoutDescount { get; set; }
        public decimal? payed { get; set; }
        public decimal? amount { get; set; }
        public decimal? descount { get; set; }
        public decimal? expencesInvoices { get; set; }
        public bool? isDelete { get; set; }
        public int? customerId { get; set; }
        public string customerName { get; set; }
        public string description { get; set; }
        public List<DtoInvoicesDetails> listInvoicesDetails { get; set; }
    }
}

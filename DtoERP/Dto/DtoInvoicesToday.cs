using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
    public class DtoInvoicesToday
    {
        public int id { get; set; }
        public string invoicesNumber { get; set; }
        public double? totalInvoice { get; set; }
        public double? amount { get; set; }
        public double? payed { get; set; }
        public double? expencesInvoices { get; set; }
        public string customerName { get; set; }
        public List<DtoInvoicesDetails> listInvoicesDetails { get; set; }
        public string invoicesNumber1 { get; set; }
        public double? totalInvoice1 { get; set; }
        public double? amount1 { get; set; }
        public double? payed1 { get; set; }
        public string customerName1 { get; set; }
        public List<DtoInvoicesDetails> listInvoicesDetails1 { get; set; }
        public double? totalInvoice2 { get; set; }
        public string invoicesNumber2 { get; set; }
        public double? amount2 { get; set; }
        public double? payed2 { get; set; }
        public double? payed3 { get; set; }
        public string customerName2 { get; set; }
        public string customerName3 { get; set; }
        public string date { get; set; }
        public string description { get; set; }
        public List<DtoInvoicesDetails> listInvoicesDetails2 { get; set; }
    }
}

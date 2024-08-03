using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
  public  class DtoInstallment
    {
        public int id { get; set; }
        public int? customerId { get; set; }
        public string customerName { get; set; }
        public string address { get; set; }
        public string phone { get; set; }
        public DateTime? date { get; set; }
        public double? money { get; set; }
        public bool? isPayed { get; set; }
    }
}

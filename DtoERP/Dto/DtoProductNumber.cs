using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
   public class DtoProductNumber
    {
        public int id { get; set; }
        public int? productId { get; set; }
        public string productName { get; set; }
        public int? qty { get; set; }
        public string code { get; set; }
        public double? priceSupplier { get; set; }
        public double? priceSelling { get; set; }
        public bool? type { get; set; }
        public string invoiceId { get; set; }
        public int invoiceNo { get; set; }
    }
}

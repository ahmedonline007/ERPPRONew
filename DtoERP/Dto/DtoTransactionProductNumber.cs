using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
  public  class DtoTransactionProductNumber
    {
        public int id { get; set; }
        public DateTime? date { get; set; }
        public int? productId { get; set; }
        public string productName { get; set; }
        public int? qty { get; set; }
        public string code { get; set; }
        public decimal? priceSupplier { get; set; }
        public decimal? priceSelling { get; set; }
        public string type { get; set; }
        public int? invoicesNo { get; set; }
        public string serial { get; set; }
    }
}

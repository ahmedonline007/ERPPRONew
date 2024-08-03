using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
    public class DtoTransactionProductSize
    {
        public int id { get; set; }
        public int? categoryId { get; set; }
        public string categoryName { get; set; }
        public int? productId { get; set; }
        public string productName { get; set; }
        public DateTime? date { get; set; }
        public double? width { get; set; }
        public double? height { get; set; }
        public double? size { get; set; }
        public string code { get; set; }
        public double? meter { get; set; }
        public decimal? centi { get; set; }
        public string centii { get; set; }
        public int? qty { get; set; }
        public int? invoicesNo { get; set; }
        public decimal? priceSupplier { get; set; }
        public decimal? priceSelling { get; set; }
        public string type { get; set; }
        public string serial { get; set; }
    }
}

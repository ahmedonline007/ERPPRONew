using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
    public class DtoProductSize
    {
        public int id { get; set; }
        public int? productId { get; set; }
        public string productName { get; set; }
        public double? width { get; set; }
        public double? height { get; set; }
        public double? size { get; set; }
        public string code { get; set; }
        public double? meter { get; set; }
        public decimal? centi { get; set; }
        public string _centiString { get; set; }
        public string centiString { get; set; }
        public int? qty { get; set; }
        public int? invoicesNo { get; set; }
        public double? priceSupplier { get; set; }
        public double? priceSelling { get; set; }
        public bool? type { get; set; }
        public string typeText { get; set; }
    }

    public class DtoNewProductSize
    {
        public int? productId { get; set; }
        public string productName { get; set; }
        public string width { get; set; }
        public string height { get; set; }
        public string size { get; set; }
        public string code { get; set; }
        public string meter { get; set; }
        public string centi { get; set; }
        public int? qty { get; set; }
    }
}

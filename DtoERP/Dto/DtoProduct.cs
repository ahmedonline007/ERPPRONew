using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
    public class DtoProduct
    {
        public int id { get; set; }
        public int? categoryId { get; set; }
        public int? productId { get; set; }
        public string categoryName { get; set; }
        public string name { get; set; }
        public decimal? priceSupplier { get; set; }
        public decimal? priceSelling { get; set; }
        public bool? type { get; set; }
        public string typeText { get; set; }
        public bool? isDelete { get; set; }
        public double? sumMeter { get; set; }
        public decimal? sumCenti { get; set; }
        public string sumCentiString { get; set; }
        public int? countMeter { get; set; }
        public int? countCenti { get; set; }
        public int? qty { get; set; }
        public List<DtoProductNumber> listProductNumber { get; set; }
        public List<DtoProductSize> listProductSize { get; set; }
    }

    public class DtoNewProduct
    {
        public int id { get; set; }
        public int? categoryId { get; set; }
        public int? productId { get; set; }
        public string categoryName { get; set; }
        public string name { get; set; }
        public decimal? priceSupplier { get; set; }
        public decimal? priceSelling { get; set; }
        public bool? type { get; set; }
        public string typeText { get; set; }
        public bool? isDelete { get; set; }
        public double? sumMeter { get; set; }
        public decimal? sumCenti { get; set; }
        public string sumCentiString { get; set; }
        public int? countMeter { get; set; }
        public int? countCenti { get; set; }
        public int? qty { get; set; }
        public List<DtoProductNumber> listProductNumber { get; set; }
        public List<DtoNewProductSize> listProductSize { get; set; }
    }
}

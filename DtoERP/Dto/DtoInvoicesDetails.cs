using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
  public  class DtoInvoicesDetails
    {
        public int id { get; set; }
        public int? productId { get; set; }
        public string productName { get; set; }
        public int? invoiceId { get; set; }
        public double? width { get; set; }
        public double? hight { get; set; }
        public double? size { get; set; }
        public string code { get; set; }
        public double? meter { get; set; }
        public string  centi { get; set; }
        public bool? type { get; set; }
        public string typeText { get; set; }
        public int? quantity { get; set; }
        public decimal? priceSupplier { get; set; }
        public decimal? priceSelling { get; set; }
        public double? totalPrice{ get; set; }
        public int? invoicesNo { get; set; }
        public double? total { get; set; }
        public bool? isDeleted { get; set; }
    }
}

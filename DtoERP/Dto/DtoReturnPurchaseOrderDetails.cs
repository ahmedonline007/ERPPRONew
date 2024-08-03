using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
   public class DtoReturnPurchaseOrderDetails
    {
        public int id { get; set; }
        public int? productId { get; set; }
        public string productName { get; set; }
        public int? invoiceId { get; set; }
        public int? width { get; set; }
        public int? hight { get; set; }
        public string code { get; set; }
        public int? meter { get; set; }
        public int? centi { get; set; }
        public bool? type { get; set; }
        public int? quantity { get; set; }
        public double? priceReturn { get; set; }
    }
}

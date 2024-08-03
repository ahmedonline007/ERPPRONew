using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
    public class DtoPayoffaDebt
    {
        public int id { get; set; }
        public int? customerId { get; set; }
        public string customerName { get; set; }
        public decimal? debt { get; set; }
        public DateTime? debtDate { get; set; }
        public bool? isDeleted { get; set; }
        public bool? isReturn { get; set; }
        public string describtion { get; set; }
    }
}

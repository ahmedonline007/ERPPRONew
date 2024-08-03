using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
    public class DtoSupplierCustomer
    {
        public int id { get; set; }
        public string name { get; set; }
        public string address { get; set; }
        public string phone { get; set; }
        public decimal? credit { get; set; }
        public decimal? debit { get; set; }
        public bool? isDelete { get; set; }
        public bool? flag { get; set; }
        public List<DtoPayoffaDebt> listPayed { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
  public  class DtoExpences
    {
        public int id { get; set; }
        public string expencesName { get; set; }
        public DateTime? date { get; set; }
        public decimal? cost { get; set; }
        public string description { get; set; }
        public bool? isDelete { get; set; }
    }
}

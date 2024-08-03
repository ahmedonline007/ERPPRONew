using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
    public class DtoBank
    {
        public int Id { get; set; }
        public string name { get; set; }
        public decimal? cost { get; set; }
        public string description { get; set; }
    }
}

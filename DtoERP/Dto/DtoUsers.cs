using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
  public  class DtoUsers
    {
        public int id { get; set; }
        public string name { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
        public bool? isDelete { get; set; }
    }
}

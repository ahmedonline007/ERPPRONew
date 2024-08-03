using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
 public   class DtoPermissions
    {
        public int id { get; set; }
        public int? userId { get; set; }
        public int? parentId { get; set; }
        public int? permissionID { get; set; }
        public bool? permissionValues { get; set; }
    }
}

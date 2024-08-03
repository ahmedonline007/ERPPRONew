using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblPermission
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? ParentId { get; set; }
        public int? PermissionId { get; set; }
        public bool? PermissionValues { get; set; }

        public virtual TblUser User { get; set; }
    }
}

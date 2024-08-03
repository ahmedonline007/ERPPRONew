using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblUser
    {
        public TblUser()
        {
            TblPermissions = new HashSet<TblPermission>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool? IsDelete { get; set; }

        public virtual ICollection<TblPermission> TblPermissions { get; set; }
    }
}

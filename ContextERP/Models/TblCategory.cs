using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblCategory
    {
        public TblCategory()
        {
            TblProducts = new HashSet<TblProduct>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public bool? IsDelete { get; set; }

        public virtual ICollection<TblProduct> TblProducts { get; set; }
    }
}

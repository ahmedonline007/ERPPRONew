using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblBank
    {
        public TblBank()
        {
            TblTransactionBanks = new HashSet<TblTransactionBank>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public decimal? Cost { get; set; }
        public bool? IsDeleted { get; set; }
        public string Describtion { get; set; }

        public virtual ICollection<TblTransactionBank> TblTransactionBanks { get; set; }
    }
}

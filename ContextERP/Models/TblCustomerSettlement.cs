using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblCustomerSettlement
    {
        public int Id { get; set; }
        public int? CustomerId { get; set; }
        public DateTime? DebtDate { get; set; }
        public decimal? Debt { get; set; }
        public bool? IsDeleted { get; set; }
        public string Describtion { get; set; }

        public virtual TblSupplierCustomer Customer { get; set; }
    }
}

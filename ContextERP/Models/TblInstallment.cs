using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblInstallment
    {
        public int Id { get; set; }
        public int? CustomerId { get; set; }
        public DateTime? Date { get; set; }
        public double? Money { get; set; }
        public bool? IsPayed { get; set; }

        public virtual TblSupplierCustomer Customer { get; set; }
    }
}

using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblTransactionBank
    {
        public int Id { get; set; }
        public int? BankId { get; set; }
        public int? CustomerId { get; set; }
        public int? TransactionType { get; set; }
        public DateTime? TransactionDate { get; set; }
        public decimal? Cost { get; set; }
        public bool? IsDeleted { get; set; }
        public string Describtion { get; set; }

        public virtual TblBank Bank { get; set; }
        public virtual TblSupplierCustomer Customer { get; set; }
    }
}

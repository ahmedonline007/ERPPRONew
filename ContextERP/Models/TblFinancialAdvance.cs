using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblFinancialAdvance
    {
        public int Id { get; set; }
        public int? EmployeeId { get; set; }
        public DateTime? BounesDate { get; set; }
        public decimal? Salary { get; set; }
        public bool? IsDeleted { get; set; }
        public string Describtion { get; set; }

        public virtual TblEmployee Employee { get; set; }
    }
}

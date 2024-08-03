using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblVacation
    {
        public int Id { get; set; }
        public int? EmployeeId { get; set; }
        public DateTime? DateVacation { get; set; }
        public DateTime? StartVacation { get; set; }
        public DateTime? EndVacation { get; set; }
        public int? NumberOfVacation { get; set; }
        public bool? IsDeleted { get; set; }
        public string Describtion { get; set; }

        public virtual TblEmployee Employee { get; set; }
    }
}

using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class AddEmployeeSalary
    {
        public int Id { get; set; }
        public int? EmployeeId { get; set; }
        public decimal? Salary { get; set; }
        public decimal? Bounes { get; set; }
        public decimal? Descount { get; set; }
        public decimal? ActualSalary { get; set; }
        public DateTime? SalaryDate { get; set; }

        public virtual TblEmployee Employee { get; set; }
    }
}

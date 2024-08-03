using System;
using System.Collections.Generic;

#nullable disable

namespace ContextERP.Models
{
    public partial class TblEmployee
    {
        public TblEmployee()
        {
            AddEmployeeSalaries = new HashSet<AddEmployeeSalary>();
            TblBounes = new HashSet<TblBoune>();
            TblFinancialAdvances = new HashSet<TblFinancialAdvance>();
            TblVacations = new HashSet<TblVacation>();
        }

        public int Id { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeAddress { get; set; }
        public string EmployeePhone { get; set; }
        public decimal? Salary { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual ICollection<AddEmployeeSalary> AddEmployeeSalaries { get; set; }
        public virtual ICollection<TblBoune> TblBounes { get; set; }
        public virtual ICollection<TblFinancialAdvance> TblFinancialAdvances { get; set; }
        public virtual ICollection<TblVacation> TblVacations { get; set; }
    }
}

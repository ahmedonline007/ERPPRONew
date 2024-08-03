using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
    public class DtoEmployees
    {
        public int Id { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeAddress { get; set; }
        public string EmployeePhone { get; set; }
        public decimal? Salary { get; set; }
    }

    public class DtoEmployeeSalary
    {
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public decimal? Salary { get; set; }
        public decimal? FinancialAdvance { get; set; }
        public decimal? Descount { get; set; }
        public decimal? ActualSalary { get; set; }
    }
}

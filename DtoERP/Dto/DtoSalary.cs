using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
    public class DtoSalary
    {
        public int Id { get; set; }
        public int? EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public decimal? Salary { get; set; }
        public decimal? Bounes { get; set; }
        public decimal? Descount { get; set; }
        public decimal? ActualSalary { get; set; }
        public DateTime? SalaryDate { get; set; }
    }
}

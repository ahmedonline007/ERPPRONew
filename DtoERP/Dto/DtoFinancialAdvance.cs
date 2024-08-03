using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
    public class DtoFinancialAdvance
    {
        public int Id { get; set; }
        public int? EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public DateTime? BounesDate { get; set; }
        public decimal? Salary { get; set; }
        public string Describtion { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace DtoERP.Dto
{
    public class DtoVacation
    {
        public int Id { get; set; }
        public int? EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public DateTime? DateVacation { get; set; }
        public DateTime StartVacation { get; set; }
        public DateTime EndVacation { get; set; }
        public int? NumberOfVacation { get; set; }
        public string Describtion { get; set; }
    }
}

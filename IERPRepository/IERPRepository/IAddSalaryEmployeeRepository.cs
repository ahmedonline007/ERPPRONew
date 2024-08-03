using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface IAddSalaryEmployeeRepository : IGenericRepository<AddEmployeeSalary>
    {
        List<DtoSalary> GetAllSalary();
        decimal? GetTotalSalaryToday(string date);
        bool AddSalary(List<DtoSalary> dto);
    }
}

using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface IEmployeeRepository : IGenericRepository<TblEmployee>
    {
        List<DtoEmployees> GetAllEmployee();
        List<DtoEmployees> GetAllEmployeeForDrop();
        DtoEmployees AddEditEmployees(DtoEmployees dto);
        void DeleteEmployees(int? id);
        List<DtoEmployeeSalary> GetEmployeeSalary();
    }
}

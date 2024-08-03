using ContextERP.Models;
using DtoERP.Dto;
using IERPRepository.IERPRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ERPRepository.ERPRepository
{
    public class AddSalaryEmployeeRepository : GenericRepository<ERPDBContext, AddEmployeeSalary>, IAddSalaryEmployeeRepository
    {
        public bool AddSalary(List<DtoSalary> dto)
        {
            if (dto != null)
            {
                var isExist = FindBy(x => x.SalaryDate.Value.Month == DateTime.Now.Month && x.SalaryDate.Value.Year == DateTime.Now.Year).Any();

                if (isExist == false)
                {
                    foreach (var item in dto)
                    {
                        var obj = new AddEmployeeSalary()
                        {
                            ActualSalary = item.ActualSalary,
                            Bounes = item.Bounes,
                            Descount = item.Descount,
                            EmployeeId = item.EmployeeId,
                            Salary = item.Salary,
                            SalaryDate = DateTime.Now
                        };

                        Add(obj);
                    }

                    Save();

                    return true;
                }

                return false;
            }
            return false;
        }

        public List<DtoSalary> GetAllSalary()
        {
            var result = (from q in Context.AddEmployeeSalaries.AsNoTracking()
                          select new DtoSalary
                          {
                              ActualSalary = q.ActualSalary,
                              Bounes = q.Bounes,
                              Descount = q.Descount,
                              EmployeeId = q.EmployeeId,
                              EmployeeName = q.Employee.EmployeeName,
                              Salary = q.Salary,
                              SalaryDate = q.SalaryDate
                          }).OrderByDescending(x => x.Id).ToList();

            return result;
        }

        public decimal? GetTotalSalaryToday(string date)
        {

            var TotalSalary = FindBy(x => x.SalaryDate == Convert.ToDateTime(date)).Sum(x => x.ActualSalary);

            return TotalSalary;
        }
    }
}

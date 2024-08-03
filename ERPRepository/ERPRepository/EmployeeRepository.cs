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
    public class EmployeeRepository : GenericRepository<ERPDBContext, TblEmployee>, IEmployeeRepository
    {
        public List<DtoEmployees> GetAllEmployee()
        {
            var result = (from q in Context.TblEmployees.AsNoTracking().Where(x => x.IsDeleted == null)
                          select new DtoEmployees
                          {
                              Id = q.Id,
                              EmployeeAddress = q.EmployeeAddress,
                              EmployeeName = q.EmployeeName,
                              EmployeePhone = q.EmployeePhone,
                              Salary = q.Salary
                          }).OrderByDescending(x => x.Id).ToList();

            return result;
        }

        public List<DtoEmployees> GetAllEmployeeForDrop()
        {
            var result = (from q in Context.TblEmployees.AsNoTracking().Where(x => x.IsDeleted == null)
                          select new DtoEmployees
                          {
                              Id = q.Id,
                              EmployeeName = q.EmployeeName
                          }).OrderByDescending(x => x.Id).ToList();

            return result;
        }

        public DtoEmployees AddEditEmployees(DtoEmployees dto)
        {
            if (dto != null)
            {
                if (dto.Id > 0)
                {
                    var isExist = FindBy(x => x.Id == dto.Id).FirstOrDefault();

                    if (isExist != null)
                    {
                        isExist.EmployeeAddress = dto.EmployeeAddress;
                        isExist.EmployeeName = dto.EmployeeName;
                        isExist.EmployeePhone = dto.EmployeePhone;
                        isExist.Salary = dto.Salary;

                        Edit(isExist);
                        Save();
                    }
                }
                else
                {
                    var obj = new TblEmployee()
                    {
                        EmployeeAddress = dto.EmployeeAddress,
                        EmployeeName = dto.EmployeeName,
                        EmployeePhone = dto.EmployeePhone,
                        Salary = dto.Salary
                    };

                    Add(obj);
                    Save();

                    dto.Id = obj.Id;
                }
            }

            return dto;
        }

        public void DeleteEmployees(int? id)
        {
            var isExist = FindBy(x => x.Id == id).FirstOrDefault();

            if (isExist != null)
            {
                isExist.IsDeleted = true;

                Edit(isExist);
                Save();
            }
        }

        public List<DtoEmployeeSalary> GetEmployeeSalary()
        {
            List<DtoEmployeeSalary> result = new List<DtoEmployeeSalary>();

            DateTime now = DateTime.Now;
            var start = new DateTime(now.Year, now.Month, 1);
            var end = start.AddMonths(1).AddDays(-1);

            var listEmployee = (from q in Context.TblEmployees.AsNoTracking().Where(x => x.IsDeleted == null)
                                select new
                                {
                                    Id = q.Id,
                                    EmployeeName = q.EmployeeName,
                                    Salary = q.Salary
                                }).ToList();

            int NumberOfVacation = DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month);

            

            foreach (var item in listEmployee)
            {
                decimal? salaryOfDay = Math.Round((decimal)(item.Salary / NumberOfVacation), 2);

                DtoEmployeeSalary obj = new DtoEmployeeSalary();
                obj.Salary = item.Salary;
                obj.EmployeeId = item.Id;
                obj.EmployeeName = item.EmployeeName;

                var Vacation = Context.TblVacations.AsNoTracking().Where(x => x.IsDeleted == null && x.EmployeeId == item.Id && (x.StartVacation >= Convert.ToDateTime(start) && x.EndVacation <= Convert.ToDateTime(end))).Sum(x => x.NumberOfVacation) ?? 0;
                var FinancialAdvance = Context.TblFinancialAdvances.AsNoTracking().Where(x => x.IsDeleted == null && x.EmployeeId == item.Id && (x.BounesDate >= Convert.ToDateTime(start) && x.BounesDate <= Convert.ToDateTime(end))).Sum(x => x.Salary) ?? 0;

                decimal? totalDescount = (Vacation * salaryOfDay);
                obj.Descount =Math.Round((decimal)totalDescount,0);
                obj.FinancialAdvance = FinancialAdvance;
                obj.ActualSalary = ((obj.Salary) - (FinancialAdvance + obj.Descount));

                result.Add(obj);
            }

            return result;
        }
    }
}

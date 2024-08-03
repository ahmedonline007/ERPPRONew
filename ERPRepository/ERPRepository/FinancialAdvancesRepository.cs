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
    public class FinancialAdvancesRepository : GenericRepository<ERPDBContext, TblFinancialAdvance>, IFinancialAdvancesRepository
    {
        public List<DtoFinancialAdvance> GetAllFinancialAdvance()
        {
            int? month = DateTime.Now.Month;
            int? year = DateTime.Now.Year;
            var result = (from q in Context.TblFinancialAdvances.AsNoTracking().Where(x => x.IsDeleted == null && x.BounesDate.Value.Month == month && x.BounesDate.Value.Year == year)
                          select new DtoFinancialAdvance
                          {
                              Id = q.Id,
                              BounesDate = q.BounesDate,
                              EmployeeId = q.EmployeeId,
                              EmployeeName = q.Employee.EmployeeName,
                              Salary = q.Salary,
                              Describtion = q.Describtion
                          }).OrderByDescending(x => x.BounesDate).ToList();

            return result;
        }

        public DtoFinancialAdvance AddEditFinancialAdvance(DtoFinancialAdvance dto)
        {
            if (dto != null)
            {
                if (dto.Id > 0)
                {
                    var isExist = FindBy(x => x.Id == dto.Id).FirstOrDefault();

                    if (isExist != null)
                    {
                        isExist.BounesDate = dto.BounesDate;
                        isExist.EmployeeId = dto.EmployeeId;
                        isExist.Salary = dto.Salary;
                        isExist.Describtion = dto.Describtion;

                        Edit(isExist);
                        Save();
                    }
                }
                else
                {
                    var obj = new TblFinancialAdvance()
                    {
                        Salary = dto.Salary,
                        BounesDate = dto.BounesDate,
                        EmployeeId = dto.EmployeeId,
                        Describtion = dto.Describtion
                    };

                    Add(obj);
                    Save();

                    dto.Id = obj.Id;
                }
            }

            return dto;
        }

        public void DeleteFinancialAdvance(int? id)
        {
            var isExist = FindBy(x => x.Id == id).FirstOrDefault();

            if (isExist != null)
            {
                isExist.IsDeleted = true;

                Edit(isExist);
                Save();
            }
        }

        public decimal? selectTotalFinancialAdvanceToday(string date)
        {
            var result = FindBy(x => x.BounesDate == Convert.ToDateTime(date) && x.IsDeleted == null).ToList();
            return result.Sum(x => x.Salary);
        }
    }
}

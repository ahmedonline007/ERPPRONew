using ContextERP.Models;
using DtoERP.Dto;
using IERPRepository.IERPRepository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace ERPRepository.ERPRepository
{
    public class VacationRepository : GenericRepository<ERPDBContext, TblVacation>, IVacationRepository
    {
        public DtoVacation AddEditVaction(DtoVacation dto)
        {
            if (dto != null)
            {
                TimeSpan diff = (dto.EndVacation - dto.StartVacation);
                dto.NumberOfVacation = diff.Days;

                dto.NumberOfVacation += 1;

                if (dto.Id > 0)
                {
                    var isExist = FindBy(x => x.Id == dto.Id).FirstOrDefault();

                    if (isExist != null)
                    {
                        isExist.EmployeeId = dto.EmployeeId;
                        isExist.DateVacation = DateTime.Now;
                        isExist.EndVacation = dto.EndVacation;
                        isExist.StartVacation = dto.StartVacation;
                        isExist.NumberOfVacation = dto.NumberOfVacation;
                        isExist.Describtion = dto.Describtion;

                        Edit(isExist);
                        Save();
                    }
                }
                else
                {
                    var obj = new TblVacation()
                    {
                        EmployeeId = dto.EmployeeId,
                        DateVacation = DateTime.Now,
                        EndVacation = dto.EndVacation,
                        StartVacation = dto.StartVacation,
                        NumberOfVacation = dto.NumberOfVacation,
                        Describtion = dto.Describtion
                    };

                    Add(obj);
                    Save();

                    dto.Id = obj.Id;
                }
            }

            return dto;
        }

        public List<DtoVacation> GetAllVacation()
        {
            int? month = DateTime.Now.Month;
            int? year = DateTime.Now.Year;
            var result = (from q in Context.TblVacations.AsNoTracking().Where(x => x.IsDeleted == null && x.DateVacation.Value.Month == month && x.DateVacation.Value.Year == year)
                          select new DtoVacation
                          {
                              Id = q.Id,
                              DateVacation = q.DateVacation,
                              EmployeeId = q.EmployeeId,
                              EndVacation = (DateTime)q.EndVacation,
                              NumberOfVacation = q.NumberOfVacation,
                              StartVacation = (DateTime)q.StartVacation,
                              EmployeeName = q.Employee.EmployeeName,
                              Describtion = q.Describtion
                          }).OrderByDescending(x => x.Id).ToList();

            return result;
        }

        public void DeleteVacation(int? id)
        {
            var isExist = FindBy(x => x.Id == id).FirstOrDefault();

            if (isExist != null)
            {
                isExist.IsDeleted = true;

                Edit(isExist);
                Save();
            }
        }

        //public decimal? selectTotalVacationToday(string date)
        //{ 
        //    var listEmployee = (from q in Context.TblEmployees.AsNoTracking().Where(x => x.IsDeleted == null)
        //                        select new
        //                        {
        //                            Id = q.Id,
        //                            EmployeeName = q.EmployeeName,
        //                            Salary = q.Salary
        //                        }).ToList();

        //    var result = FindBy(x => x.DateVacation == Convert.ToDateTime(date) && x.IsDeleted == null).ToList();
        //    return result.Sum(x => x.);
        //}
    }
}

using ContextERP.Models;
using IERPRepository.IERPRepository;
using System;
using System.Collections.Generic;
using System.Text;
using DtoERP.Dto;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace ERPRepository.ERPRepository
{
    public class ExpencesRepository : GenericRepository<ERPDBContext, TblExpence>, IExpencesRepository
    {
        public DtoExpences AddEditExpences(DtoExpences dtoExpences)
        {
            if (dtoExpences != null)
            {
                if (dtoExpences.id > 0)
                {
                    var isExist = FindBy(x => x.Id == dtoExpences.id).FirstOrDefault();

                    if (isExist != null)
                    {
                        isExist.ExpencesName = dtoExpences.expencesName;
                        isExist.Cost = dtoExpences.cost;
                        isExist.Date = dtoExpences.date;
                        isExist.Description = dtoExpences.description;

                        Edit(isExist);
                        Save();
                    }
                }
                else
                {
                    var objExpences = new TblExpence()
                    {
                        ExpencesName = dtoExpences.expencesName,
                        Cost = dtoExpences.cost,
                        Date = dtoExpences.date,
                        Description = dtoExpences.description
                    };

                    Add(objExpences);
                    Save();

                    dtoExpences.id = objExpences.Id;

                    return dtoExpences;
                }
            }

            return dtoExpences;
        }

        public List<DtoExpences> selectAllExpences()
        {
            var result = (from q in Context.TblExpences.AsNoTracking().Where(x => x.IsDelete == null)
                          select new DtoExpences
                          {
                              id = q.Id,
                              expencesName = q.ExpencesName,
                              cost = Math.Round((decimal)q.Cost, 2),
                              date = q.Date,
                              description = q.Description
                          }).OrderByDescending(x => x.date).ToList();

            return result;
        }

        public void deleteExpences(int? id)
        {
            var isExist = FindBy(x => x.Id == id).FirstOrDefault();

            if (isExist != null)
            {
                isExist.IsDelete = true;

                Edit(isExist);
                Save();
            }
        }

        public decimal? selectTotalExpencesToday(string date)
        {
            var result = FindBy(x => x.Date == Convert.ToDateTime(date) && x.IsDelete == null).ToList();
            return result.Sum(x => x.Cost);
        }

        public List<DtoExpences> selectDetailsExpencesToday(string date)
        {
            var result = (from q in Context.TblExpences.AsNoTracking().Where(x => x.Date == Convert.ToDateTime(date) && x.IsDelete == null)
                          select new DtoExpences
                          {
                              id = q.Id,
                              expencesName = q.ExpencesName,
                              cost = Math.Round((decimal)q.Cost, 2),
                              date = q.Date,
                              description = q.Description
                          }).OrderByDescending(x => x.id).ToList();

            return result;
        }
    }
}

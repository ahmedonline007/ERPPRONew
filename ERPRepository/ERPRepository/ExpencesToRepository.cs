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
    public class ExpencesToRepository : GenericRepository<ERPDBContext, TblExpencesTo>, IExpencesToRepository
    {
        public DtoExpencesTo AddEditExpences(DtoExpencesTo dtoExpences)
        {
            if (dtoExpences != null)
            {
                if (dtoExpences.id > 0)
                {
                    var isExist = FindBy(x => x.Id == dtoExpences.id).FirstOrDefault();

                    if (isExist != null)
                    {
                        isExist.ExpencesToName = dtoExpences.expencesToName;
                        isExist.Cost = dtoExpences.cost;
                        isExist.Date = dtoExpences.date;
                        isExist.Description = dtoExpences.description;

                        Edit(isExist);
                        Save();
                    }
                }
                else
                {
                    var objExpences = new TblExpencesTo()
                    {
                        ExpencesToName = dtoExpences.expencesToName,
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

        public List<DtoExpencesTo> selectAllExpences()
        {
            var result = (from q in Context.TblExpencesTos.AsNoTracking().Where(x => x.IsDeleted == null)
                          select new DtoExpencesTo
                          {
                              id = q.Id,
                              expencesToName = q.ExpencesToName,
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
                isExist.IsDeleted = true;

                Edit(isExist);
                Save();
            }
        }

        public decimal? selectTotalExpencesToday(string date)
        {
            var result = FindBy(x => x.Date == Convert.ToDateTime(date) && x.IsDeleted == null).ToList();
            return result.Sum(x => x.Cost);
        }

        public List<DtoExpencesTo> selectDetailsExpencesToToday(string date)
        {
            var result = (from q in Context.TblExpencesTos.AsNoTracking().Where(x => x.Date == Convert.ToDateTime(date) && x.IsDeleted == null)
                          select new DtoExpencesTo
                          {
                              id = q.Id,
                              expencesToName = q.ExpencesToName,
                              cost = Math.Round((decimal)q.Cost, 2),
                              date = q.Date,
                              description = q.Description
                          }).OrderByDescending(x => x.id).ToList();

            return result;
        }
    }
}

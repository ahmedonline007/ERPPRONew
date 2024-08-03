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
    public class BanksRepository : GenericRepository<ERPDBContext, TblBank>, IBanksRepository
    {
        public List<DtoBank> GetAllBank()
        {
            var result = (from q in Context.TblBanks.AsNoTracking().Where(x => x.IsDeleted == null)
                          select new DtoBank
                          {
                              Id = q.Id,
                              cost = q.Cost,
                              description = q.Describtion,
                              name = q.Name
                          }).OrderByDescending(x => x.Id).ToList();

            return result;
        }

        public void DeleteBank(int id)
        {
            var result = FindBy(x => x.Id == id).FirstOrDefault();

            if (result != null)
            {
                result.IsDeleted = true;

                Edit(result);
                Save();
            }
        }

        public DtoBank AddEditBank(DtoBank dtoBank)
        {
            if (dtoBank != null)
            {
                if (dtoBank.Id > 0)
                {
                    var isExist = FindBy(x => x.Id == dtoBank.Id).FirstOrDefault();

                    if (isExist != null)
                    {
                        isExist.Name = dtoBank.name;
                        isExist.Describtion = dtoBank.description;
                        isExist.Cost = dtoBank.cost;

                        Edit(isExist);
                        Save();
                    }
                }
                else
                {
                    var obj = new TblBank()
                    {
                        Cost = dtoBank.cost,
                        Describtion = dtoBank.description,
                        Name = dtoBank.name
                    };

                    Add(obj);
                    Save();

                    dtoBank.Id = obj.Id;
                }
            }

            return dtoBank;
        }

        public void UpdateBank(int? id, decimal? cost)
        {
            var isExist = FindBy(x => x.Id == id).FirstOrDefault();

            if (isExist != null)
            {
                isExist.Cost = cost;

                Edit(isExist);
                Save();
            }
        }

        public decimal? GetCostBank(int? bankId)
        {
            var cost = FindBy(x => x.Id == bankId).FirstOrDefault().Cost;

            return cost;
        }
    }
}

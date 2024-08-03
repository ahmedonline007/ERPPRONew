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
    public class InstallmentRepository : GenericRepository<ERPDBContext, TblInstallment>, IInstallmentRepository
    {
        public void AddInstallment(int? customerId, DateTime? date, decimal? money)
        {
            var isExist = FindBy(x => x.CustomerId == customerId).FirstOrDefault();

            if (isExist != null)
            {
                isExist.Money = (double)money;
                isExist.Date = date;
                isExist.IsPayed = true;

                Edit(isExist);
                Save();
            }
            else
            {
                var obj = new TblInstallment()
                {
                    CustomerId = customerId,
                    Date = date,
                    Money = (double)money,
                    IsPayed = true
                };

                Add(obj);
                Save();
            }
        }

        public void UpdateInstallment(int? customerId, decimal? money)
        {
            var isExist = FindBy(x => x.CustomerId == customerId).FirstOrDefault();

            if (isExist != null)
            {
                isExist.Money = (double)money;
                isExist.IsPayed = money <= 0 ? false : true;

                Edit(isExist);
                Save();
            }
        }

        public void UpdateDateInstallment(int? id, DateTime? date)
        {
            var isExist = FindBy(x => x.Id == id).FirstOrDefault();

            if (isExist != null)
            {
                isExist.Date = date;

                Edit(isExist);
                Save();
            }
        }

        public List<DtoInstallment> SelectAllInstallment(bool? type)
        {
            var result = (from q in Context.TblInstallments.AsNoTracking().Where(x => x.IsPayed == true && x.Customer.Flag == type && x.Customer.IsDelete == null)
                          select new DtoInstallment
                          {
                              id = q.Id,
                              money = Math.Round((double)q.Money, 2),
                              customerName = q.Customer.Name,
                              customerId = q.CustomerId,
                              address = q.Customer.Address,
                              phone = q.Customer.Phone,
                              date = q.Date
                          }).OrderBy(x => x.customerName).ToList();

            return result;
        }
    }
}

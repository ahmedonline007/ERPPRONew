using ContextERP.Models;
using IERPRepository.IERPRepository;
using DtoERP.Dto;
using System.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace ERPRepository.ERPRepository
{
    public class PaymentScheduleRepository : GenericRepository<ERPDBContext, TblPaymentSchedule>, IPaymentScheduleRepository
    {
        public void AddPaymentSchedule(DtoPaymentSchedule dtoPaymentSchedule)
        {
            if (dtoPaymentSchedule != null)
            {
                var objPayment = new TblPaymentSchedule()
                {
                    CustomerId = dtoPaymentSchedule.CustomerId,
                    InvicesNumber = dtoPaymentSchedule.InvicesNumber,
                    Total = dtoPaymentSchedule.Total,
                    Credit = dtoPaymentSchedule.Credit,
                    Debit = dtoPaymentSchedule.Debit,
                    IsCreditBank = dtoPaymentSchedule.IsCreditBank,
                    CreditBank = dtoPaymentSchedule.CreditBank
                };

                Add(objPayment);
                Save();
            }
        }

        public void EditPaymentSchedule(DtoPaymentSchedule dtoPaymentSchedule)
        {
            if (dtoPaymentSchedule != null)
            {
                var isExist = FindBy(x => x.InvicesNumber == dtoPaymentSchedule.InvicesNumber && x.CustomerId == dtoPaymentSchedule.CustomerId).FirstOrDefault();

                if (isExist != null)
                {
                    isExist.Total = dtoPaymentSchedule.Total;
                    isExist.Credit = dtoPaymentSchedule.Credit;
                    isExist.Debit = dtoPaymentSchedule.Debit;

                    Edit(isExist);
                    Save();
                }
            }
        }

        public void DeletePaymentSchedule(string invoicesNumber, int? customerId)
        {
            var isExist = FindBy(x => x.CustomerId == customerId && x.InvicesNumber == invoicesNumber).FirstOrDefault();

            if (isExist != null)
            {
                Delete(isExist);
                Save();
            }
        }

        public DtoPaymentSchedule SelectInvoiceByCustomerId(string invoicesNumber, int? customerId)
        {
            var objRow = (from q in Context.TblPaymentSchedules.AsNoTracking().Where(x => x.CustomerId == customerId && x.InvicesNumber == invoicesNumber)
                          select new DtoPaymentSchedule
                          {
                              Id = q.Id,
                              Credit = q.Credit ?? 0,
                              Debit = q.Debit ?? 0,
                              Total = q.Total ?? 0,
                              IsCreditBank = q.IsCreditBank,
                              CreditBank = q.CreditBank ?? 0
                          }).FirstOrDefault();

            return objRow;
        }
    }
}

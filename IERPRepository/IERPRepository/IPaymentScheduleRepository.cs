using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface IPaymentScheduleRepository : IGenericRepository<TblPaymentSchedule>
    {
        void AddPaymentSchedule(DtoPaymentSchedule dtoPaymentSchedule);
        void EditPaymentSchedule(DtoPaymentSchedule dtoPaymentSchedule);
        void DeletePaymentSchedule(string invoicesNumber, int? customerId);
        DtoPaymentSchedule SelectInvoiceByCustomerId(string invoicesNumber, int? customerId);
    }
}

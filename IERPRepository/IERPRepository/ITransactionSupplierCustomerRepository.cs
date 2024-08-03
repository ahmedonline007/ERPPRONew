using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface ITransactionSupplierCustomerRepository : IGenericRepository<TblTransactionSupplierCustomer>
    {
        void AddTransactionSupplierCustomer(DtoTransactionSupplierCustomer dtoTransactionSupplierCustomer);
        List<DtoTransactionSupplierCustomer> SelectTransactionSupplierCustomer(bool? flag);
        decimal? selectTotalTransactionToday(bool? flag, string date);
        List<DtoTransactionSupplierCustomer> SelectTransactionSupplierCustomerToDay(bool? flag, string date);
    }
}

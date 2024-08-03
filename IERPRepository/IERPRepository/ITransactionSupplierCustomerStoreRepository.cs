using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface ITransactionSupplierCustomerStoreRepository : IGenericRepository<TransactionSupplierCustomerStore>
    {
        DtoReturnCreditDebit AddTransactionStore(DtoTransactionSupplierCustomerStore dtoTransactionSupplierCustomerStore);
        DtoReturnCreditDebit EditTransactionStore(DtoTransactionSupplierCustomerStore dtoTransactionSupplierCustomerStore);
        DtoReturnCreditDebit DeleteTransactionStore(string InvoiceNumber, int? CustomerId, string type);
        List<DtoTransactionSupplierCustomerStore> selectTransactionStore(bool? flag);
    }
}

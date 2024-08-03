using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface ISupplierCustomerRespository : IGenericRepository<TblSupplierCustomer>
    {
        DtoSupplierCustomer AddEditSupplierCustomer(DtoSupplierCustomer dtoSupplierCustomer);
        List<DtoSupplierCustomer> selectAllSupplierCustomerByFlag(bool? flag);
        void deleteSupplierCustomer(int? id);
        bool? CheckExistsSupplierCustomer(string name, bool? flag, int? id = 0);
        List<DtoSupplierCustomer> selectAllSupplierCustomerByFlagForDrop(bool? flag);
        void UpdateCreditDebit(int? customerId, decimal? credit, decimal? debit, decimal? total, string InvicesNumber);
        void UpdateCreditDebitForReturnInvoices(int? customerId, decimal? total);
        DtoSupplierCustomer PayedCash(int? customerId, decimal? credit, DateTime? date);
        List<DtoSupplierCustomer> selectSupplierCustomerHaveDebit(bool? flag);
        DtoSupplierCustomer selectSupplierCustomerById(int? id);
        void DeleteCreditOrDebitById(string invoiceNumber, int? customerId);
        void UpdateSupplierCustomerWithNewStore(int? customerId, decimal? credit, decimal? debit);
        void _UpdateSupplierCustomerWithNewStore(int? customerId, decimal? credit, decimal? debit);
        DtoSupplierCustomer UpdateCreditDebitOnly(DtoSupplierCustomer dtoSupplierCustomer);
    }
}

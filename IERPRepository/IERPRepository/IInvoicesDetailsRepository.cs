using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface IInvoicesDetailsRepository : IGenericRepository<TblInvoicesDetail>
    {
        object AddInvoicesDetails(int? invoiceId, int? invoicesNo, List<DtoInvoicesDetails> dtoInvoicesDetails);
        void DeleteItemsFromInvoicesDetails(int? InvoiceId, int? numberOfInvoiceBySystem);
        DtoInvoicesDetails AddNewItemFromEditInvoices(int? invoiceId, int? invoicesNo, DtoInvoicesDetails dtoInvoicesDetails);
        void UpdatePriceProductandTransaction(DtoInvoicesDetails dtoInvoices);
        void DeleteListItemFromInvoiceDetails(string stringList, int? numberOfInvoiceBySystem);
    }
}

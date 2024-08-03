using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface IInvoicesRepository : IGenericRepository<TblInvoice>
    {
        DtoInvoices selectInvoicesById(int? id);
        object AddNewInvoices(DtoInvoices dtoInvoices);
        List<DtoInvoices> selectAllInvoices();
        List<DtoInvoices> selectAllInvoicesToday(string date);
        List<DtoInvoicesToday> selectAllNewInvoicesToday(string date);
        List<DtoInvoicesToday> _selectAllNewInvoicesToday(string date);
        void DeletInvoices(int? id);
        void EditInvoice(DtoInvoices dtoInvoices);
    }
}

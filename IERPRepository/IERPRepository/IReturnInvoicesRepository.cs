using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface IReturnInvoicesRepository : IGenericRepository<TblReturnInvoice>
    {
        object AddReturnInvoices(DtoReturnInvoices dtoReturnInvoices);
        List<DtoReturnInvoices> selectAllReturnInvoices();
        decimal? selectAllReturnInvoicesToday(string date);
        decimal? selectAllTotalReturnInvoicesToday(string date);
        void DeletReturnInvoices(int? id);
    }
}

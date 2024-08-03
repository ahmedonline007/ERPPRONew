using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface IReturnInvoicesDetailsRespository : IGenericRepository<TblReturnInvoicesDetail>
    {
        void AddReturnInvoicesDetails(int? invoiceId, int? invoicesNo, List<DtoReturnInvoicesDetails> dtoReturnInvoicesDetails);
    }
}

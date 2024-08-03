using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface ITransactionBankRepository : IGenericRepository<TblTransactionBank>
    {
        List<DtoTransactionBank> GetAllTransactionBank();
        void DeleteTransactionBank(int id);
        DtoTransactionBank AddEditTransactionBank(DtoTransactionBank dto);
    }
}

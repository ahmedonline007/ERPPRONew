using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface IFinancialAdvancesRepository : IGenericRepository<TblFinancialAdvance>
    {
        List<DtoFinancialAdvance> GetAllFinancialAdvance();
        DtoFinancialAdvance AddEditFinancialAdvance(DtoFinancialAdvance dto);
        void DeleteFinancialAdvance(int? id);
        decimal? selectTotalFinancialAdvanceToday(string date);
    }
}

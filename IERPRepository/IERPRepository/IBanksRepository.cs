using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface IBanksRepository : IGenericRepository<TblBank>
    {
        DtoBank AddEditBank(DtoBank dtoBank);
        void DeleteBank(int id);
        List<DtoBank> GetAllBank();
        void UpdateBank(int? id, decimal? cost);
        decimal? GetCostBank(int? bankId);
    }
}

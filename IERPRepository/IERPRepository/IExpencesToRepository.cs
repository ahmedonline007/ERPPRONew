using System;
using System.Collections.Generic;
using System.Text;
using ContextERP.Models;
using DtoERP.Dto;

namespace IERPRepository.IERPRepository
{
    public interface IExpencesToRepository : IGenericRepository<TblExpencesTo>
    {
        DtoExpencesTo AddEditExpences(DtoExpencesTo dtoExpences);
        List<DtoExpencesTo> selectAllExpences();
        void deleteExpences(int? id);
        decimal? selectTotalExpencesToday(string date);
        List<DtoExpencesTo> selectDetailsExpencesToToday(string date);
    }
}

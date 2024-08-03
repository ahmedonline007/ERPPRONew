using System;
using System.Collections.Generic;
using System.Text;
using ContextERP.Models;
using DtoERP.Dto;

namespace IERPRepository.IERPRepository
{
    public interface IExpencesRepository : IGenericRepository<TblExpence>
    {
        DtoExpences AddEditExpences(DtoExpences dtoExpences);
        List<DtoExpences> selectAllExpences();
        void deleteExpences(int? id);
        decimal? selectTotalExpencesToday(string date);
        List<DtoExpences> selectDetailsExpencesToday(string date);
    }
}

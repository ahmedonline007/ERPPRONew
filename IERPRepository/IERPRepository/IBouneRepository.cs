using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface IBouneRepository : IGenericRepository<TblBoune>
    {
        List<DtoBounes> GetAllBounes();
        DtoBounes AddEditBounes(DtoBounes dto);
        void DeleteBounes(int? id);
        decimal? selectTotalBounesToday(string date);
    }
}

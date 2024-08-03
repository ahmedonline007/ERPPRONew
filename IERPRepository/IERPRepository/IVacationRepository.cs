using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface IVacationRepository : IGenericRepository<TblVacation>
    {
        DtoVacation AddEditVaction(DtoVacation dto);
        List<DtoVacation> GetAllVacation();
        void DeleteVacation(int? id);
    }
}

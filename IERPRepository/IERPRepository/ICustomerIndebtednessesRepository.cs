using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface ICustomerIndebtednessesRepository : IGenericRepository<TblCustomerIndebtedness>
    {
        DtoIndebtness AddEditIndebtedness(DtoIndebtness dtoIndebtness);
        List<DtoIndebtness> SelectAllIndebtedness(bool? flag);
        List<DtoIndebtness> SelectAllIndebtednessByDate(bool? flag, string date);
        void DeleteIndebtedness(int? id);
    }
}

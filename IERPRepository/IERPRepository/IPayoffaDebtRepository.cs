using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface IPayoffaDebtRepository : IGenericRepository<TblPayoffaDebt>
    {
        DtoPayoffaDebt AddEditPayedOff(DtoPayoffaDebt dtoPayoffaDebt);
        List<DtoPayoffaDebt> SelectAllDebets(bool? flag);
        List<DtoPayoffaDebt> SelectAllDebetsByDate(bool? flag, string date);
        void DeletePayedOffDebt(int? id);
    }
}

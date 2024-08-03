using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface ICustomerSettlementRepository : IGenericRepository<TblCustomerSettlement>
    {
        DtoCustomerSettlement AddEditCustomerSettlement(DtoCustomerSettlement dtoIndebtness);
        List<DtoCustomerSettlement> SelectAllCustomerSettlement(bool? flag);
        List<DtoCustomerSettlement> SelectAllCustomerSettlementByDate(bool? flag, string date);
        void DeleteCustomerSettlement(int? id);
    }
}

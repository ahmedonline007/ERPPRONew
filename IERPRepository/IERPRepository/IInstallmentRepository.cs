using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
   public interface IInstallmentRepository : IGenericRepository<TblInstallment>
    {
        void AddInstallment(int? customerId, DateTime? date, decimal? money);
        void UpdateInstallment(int? customerId, decimal? money);
        void UpdateDateInstallment(int? id, DateTime? date);
        List<DtoInstallment> SelectAllInstallment(bool? type);
    }
}

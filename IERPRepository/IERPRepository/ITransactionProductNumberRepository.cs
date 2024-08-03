using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface ITransactionProductNumberRepository : IGenericRepository<TblTransactionProductNumber>
    {
        void AddTransactionProductNumber(DtoTransactionProductNumber dtoTransactionProductNumber);
        void UpdateTransactionProductNumber(int? productId, string serial, int? invoiceNo, decimal? priceSelling, decimal? priceSupplier);
    }
}

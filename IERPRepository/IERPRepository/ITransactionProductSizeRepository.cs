using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface ITransactionProductSizeRepository : IGenericRepository<TblTransactionProductSize>
    {
        void AddTransactionProductSize(DtoTransactionProductSize dtoTransactionProductSize);
        void UpdateTransactionProductSize(int? productId, string serial, int? invoiceNo, decimal? priceSelling, decimal? priceSupplier);
    }
}

using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface IProductNumberRepository : IGenericRepository<TblProductNumber>
    {
        DtoProductNumber AddEditProductNumber(DtoProductNumber dtoProductNumber);
        void AddNewQuantity(DtoProductNumber dtoProductNumber);
        DtoProductNumber AddNewQuantityFromPurshaceorder(DtoProductNumber dtoProductNumber);
        void UpdateQuantity(DtoProductNumber dtoProductNumber);
        bool? checkQuantity(int? productId, int? Qty);
        void DeleteProductNumber(int productId);
        void DeleteQuantityFromPurchaseOrder(DtoPurchaseOrderDetails dtoProductNumber);
        void DeleteQuantityFromInvoices(DtoInvoicesDetails dtoProductNumber);
    }
}

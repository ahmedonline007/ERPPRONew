using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface IProductSizeRepository : IGenericRepository<TblProductSize>
    {
        DtoProductSize AddEditProductSize(DtoProductSize dtoProductSize);
        void UpdateProduct(DtoProductSize dtoProductSize);
        DtoProductSize AddNewProductFromPurchaseOrder(DtoProductSize dtoProductSize);
        void DeleteProductFromPurchaseOrder(DtoProductSize dtoProductSize);
        void UpdateProductFromInvoices(DtoProductSize dtoProductSize);
        bool? checkQuantity(int? productId, int? Meter);
        void DeleteProductSizeFromPurchaseOrder(DtoPurchaseOrderDetails dtoProductSize);
        void DeleteProductSizeFromInvoices(DtoInvoicesDetails dtoInvoicesDetails);
        List<DtoProductSize> GetProductDetails();
        void ResetProductQty(int? ProductId);
        void DeleteProductQty(int? Id);
    }
}

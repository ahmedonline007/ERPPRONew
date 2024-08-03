using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface IPurchaseOrderDetailsRepository : IGenericRepository<TblPurchaseOrderDetail>
    {
        void AddPurchaseOrderDetails(int? purchaseOrderId, int? invoicesNo, List<DtoPurchaseOrderDetails> dtoPurchaseOrderDetails);
        DtoPurchaseOrderDetails AddNewItemFromPurchaseOrderByAdmin(DtoPurchaseOrderDetails dtoPurchaseOrderDetails);
        void UpdatePriceProductandTransaction(DtoPurchaseOrderDetails dtoPurchaseOrderDetails);
        void DeleteItemsFromPurchaseOrderDetails(int? InvoiceId, int? numberOfInvoiceBySystem);
        void DeleteOneItemFromPurchaseOrderDetails(int? Id, int? numberOfInvoiceBySystem);
        void DeleteListItemFromPurchaseOrderDetails(string stringList, int? numberOfInvoiceBySystem);
    }
}

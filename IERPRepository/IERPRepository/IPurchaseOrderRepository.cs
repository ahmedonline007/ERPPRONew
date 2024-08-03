using ContextERP.Models;
using DtoERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace IERPRepository.IERPRepository
{
    public interface IPurchaseOrderRepository : IGenericRepository<TblPurchaseOrder>
    {
        int? AddNewPurchaseOrder(DtoPurchaseOrder dtoPurchaseOrder);
        void EditPurchaseOrder(DtoPurchaseOrder dtoPurchaseOrder);
        object AddNewPurchaseOrderByClient(DtoPurchaseOrder dtoPurchaseOrder);
        void DeletPurchaseOrder(int? id);
        DtoPurchaseOrder selectPurchaseOrderById(int? id);
        void DeletPurchaseOrderWithoutSupplier(int? id);
        List<DtoPurchaseOrder> selectAllPurchaseOrder();
    }
}

using ContextERP.Models;
using IERPRepository.IERPRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace ERPRepository.ERPRepository
{
    public class ReturnPurchaseOrderDetailsRespository : GenericRepository<ERPDBContext, TblReturnPurchaseOrderDetail>, IReturnPurchaseOrderDetailsRespository
    {
    }
}

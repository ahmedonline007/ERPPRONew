using System;
using System.Collections.Generic;
using System.Text;
using ContextERP.Models;
using IERPRepository.IERPRepository;

namespace ERPRepository.ERPRepository
{
    public class ReturnPurchaseOrderRespository : GenericRepository<ERPDBContext, TblReturnPurchaseOrder>, IReturnPurchaseOrderRespository
    {
    }
}

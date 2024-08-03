using ContextERP.Models;
using DtoERP.Dto;
using IERPRepository.IERPRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ERPRepository.ERPRepository
{
    public class TransactionProductNumberRepository : GenericRepository<ERPDBContext, TblTransactionProductNumber>, ITransactionProductNumberRepository
    {
        public void AddTransactionProductNumber(DtoTransactionProductNumber dtoTransactionProductNumber)
        {
            if (dtoTransactionProductNumber != null)
            {
                var objTransactions = new TblTransactionProductNumber()
                {
                    Code = dtoTransactionProductNumber.code,
                    Date = dtoTransactionProductNumber.date,
                    PriceSelling = dtoTransactionProductNumber.priceSelling,
                    PriceSupplier = dtoTransactionProductNumber.priceSupplier,
                    ProductId = dtoTransactionProductNumber.productId,
                    Qty = dtoTransactionProductNumber.qty,
                    Type = dtoTransactionProductNumber.type,
                    InvoicesNo = dtoTransactionProductNumber.invoicesNo,
                    Serial = dtoTransactionProductNumber.serial
                };

                Add(objTransactions);
                Save();
            }
        }

        public void UpdateTransactionProductNumber(int? productId, string serial, int? invoiceNo, decimal? priceSelling, decimal? priceSupplier)
        {
            var isExist = FindBy(x => x.ProductId == productId && x.InvoicesNo == invoiceNo && x.Serial == serial).FirstOrDefault();

            if (isExist != null)
            {
                isExist.PriceSelling = priceSelling;
                isExist.PriceSupplier = priceSupplier;

                Edit(isExist);
                Save();
            }
        }
    }
}

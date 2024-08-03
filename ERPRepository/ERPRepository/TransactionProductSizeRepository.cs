using ContextERP.Models;
using DtoERP.Dto;
using IERPRepository.IERPRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ERPRepository.ERPRepository
{
    public class TransactionProductSizeRepository : GenericRepository<ERPDBContext, TblTransactionProductSize>, ITransactionProductSizeRepository
    {
        public void AddTransactionProductSize(DtoTransactionProductSize dtoTransactionProductSize)
        {
            if (dtoTransactionProductSize != null)
            {
                var objTransaction = new TblTransactionProductSize()
                {
                    ProductId = dtoTransactionProductSize.productId,
                    Date = dtoTransactionProductSize.date,
                    Width = dtoTransactionProductSize.width,
                    Height = dtoTransactionProductSize.height,
                    Size = dtoTransactionProductSize.size,
                    Code = dtoTransactionProductSize.code,
                    Meter = dtoTransactionProductSize.meter,
                    Centi = dtoTransactionProductSize.centi,
                    Qty = dtoTransactionProductSize.qty ?? 0,
                    PriceSelling = dtoTransactionProductSize.priceSelling,
                    PriceSupplier = dtoTransactionProductSize.priceSupplier,
                    Type = dtoTransactionProductSize.type,
                    InvoicesNo = dtoTransactionProductSize.invoicesNo,
                    Serial = dtoTransactionProductSize.serial
                };

                Add(objTransaction);
                Save();
            }
        }

        public void UpdateTransactionProductSize(int? productId, string serial, int? invoiceNo, decimal? priceSelling, decimal? priceSupplier)
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

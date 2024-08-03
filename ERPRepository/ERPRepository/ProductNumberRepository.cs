using ContextERP.Models;
using DtoERP.Dto;
using IERPRepository.IERPRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace ERPRepository.ERPRepository
{
    public class ProductNumberRepository : GenericRepository<ERPDBContext, TblProductNumber>, IProductNumberRepository
    {
        private readonly ITransactionProductNumberRepository _transactionProductNumberRepository;

        public ProductNumberRepository(ITransactionProductNumberRepository transactionProductNumberRepository)
        {
            _transactionProductNumberRepository = transactionProductNumberRepository;
        }

        public DtoProductNumber AddEditProductNumber(DtoProductNumber dtoProductNumber)
        {
            if (dtoProductNumber != null)
            {
                var Productobj = Context.TblProducts.AsNoTracking().Where(x => x.Id == dtoProductNumber.productId)
                    .Select(x => new { priceSelling = x.PriceSelling, priceSupplier = x.PriceSupplier }).FirstOrDefault();

                if (dtoProductNumber.code == "")
                {
                    var isExist = FindBy(x => x.Code == "" && x.ProductId == dtoProductNumber.productId && x.IsUsed == null).FirstOrDefault();
                    if (isExist != null)
                    {
                        isExist.Qty = dtoProductNumber.qty;

                        Edit(isExist);
                        Save();

                        DtoTransactionProductNumber dtoTransactionProductNumber = new DtoTransactionProductNumber()
                        {
                            code = dtoProductNumber.code,
                            date = DateTime.Now,
                            productId = dtoProductNumber.productId,
                            priceSelling = Productobj.priceSelling,
                            priceSupplier = Productobj.priceSupplier,
                            qty = dtoProductNumber.qty,
                            type = "تعديل كميات"
                        };
                        _transactionProductNumberRepository.AddTransactionProductNumber(dtoTransactionProductNumber);
                    }
                    else
                    {
                        var objProduct = new TblProductNumber()
                        {
                            Code = dtoProductNumber.code,
                            ProductId = dtoProductNumber.productId,
                            Qty = dtoProductNumber.qty
                        };

                        Add(objProduct);
                        Save();

                        DtoTransactionProductNumber dtoTransactionProductNumber = new DtoTransactionProductNumber()
                        {
                            code = dtoProductNumber.code,
                            date = DateTime.Now,
                            productId = dtoProductNumber.productId,
                            priceSelling = Productobj.priceSelling,
                            priceSupplier = Productobj.priceSupplier,
                            qty = dtoProductNumber.qty,
                            type = "تسجيل كميات جديدة"
                        };
                        _transactionProductNumberRepository.AddTransactionProductNumber(dtoTransactionProductNumber);

                        dtoProductNumber.id = objProduct.Id;

                        return dtoProductNumber;
                    }
                }
                else if (dtoProductNumber.code != "")
                {
                    var isExistCode = FindBy(x => x.Code == dtoProductNumber.code && x.IsUsed == null && x.ProductId == dtoProductNumber.productId).FirstOrDefault();

                    if (isExistCode != null)
                    {
                        isExistCode.Qty = dtoProductNumber.qty;

                        Edit(isExistCode);
                        Save();

                        DtoTransactionProductNumber dtoTransactionProductNumber = new DtoTransactionProductNumber()
                        {
                            code = dtoProductNumber.code,
                            date = DateTime.Now,
                            productId = dtoProductNumber.productId,
                            priceSelling = Productobj.priceSelling,
                            priceSupplier = Productobj.priceSupplier,
                            qty = dtoProductNumber.qty,
                            type = "تعديل كميات"
                        };
                        _transactionProductNumberRepository.AddTransactionProductNumber(dtoTransactionProductNumber);
                    }
                    else
                    {
                        var objProduct = new TblProductNumber()
                        {
                            Code = dtoProductNumber.code,
                            ProductId = dtoProductNumber.productId,
                            Qty = dtoProductNumber.qty
                        };

                        Add(objProduct);
                        Save();

                        DtoTransactionProductNumber dtoTransactionProductNumber = new DtoTransactionProductNumber()
                        {
                            code = dtoProductNumber.code,
                            date = DateTime.Now,
                            productId = dtoProductNumber.productId,
                            priceSelling = Productobj.priceSelling,
                            priceSupplier = Productobj.priceSupplier,
                            qty = dtoProductNumber.qty,
                            type = "تسجيل كميات جديدة"
                        };
                        _transactionProductNumberRepository.AddTransactionProductNumber(dtoTransactionProductNumber);

                        dtoProductNumber.id = objProduct.Id;

                        return dtoProductNumber;
                    }
                }
            }

            return dtoProductNumber;
        }

        public void AddNewQuantity(DtoProductNumber dtoProductNumber)
        {
            if (dtoProductNumber != null)
            {
                // التحقق من وجود نفس المنتج مع الكود 
                var isExist = FindBy(x => x.ProductId == dtoProductNumber.productId && x.Code == dtoProductNumber.code && x.IsUsed == null).FirstOrDefault();

                if (isExist != null)
                {
                    var totalQty = isExist.Qty <= 0 ? dtoProductNumber.qty : (isExist.Qty + dtoProductNumber.qty);
                    isExist.Qty = totalQty ?? 0;

                    Edit(isExist);
                    Save();
                }
                else
                {
                    var objProduct = new TblProductNumber()
                    {
                        Code = dtoProductNumber.code,
                        ProductId = dtoProductNumber.productId,
                        Qty = dtoProductNumber.qty
                    };

                    Add(objProduct);
                    Save();
                }
            }
        }

        public DtoProductNumber AddNewQuantityFromPurshaceorder(DtoProductNumber dtoProductNumber)
        {
            if (dtoProductNumber != null)
            {
                var isExist = FindBy(x => x.ProductId == dtoProductNumber.productId && x.IsUsed == null).FirstOrDefault();

                if (isExist != null)
                {
                    var totalQty = isExist.Qty <= 0 ? dtoProductNumber.qty : (isExist.Qty + dtoProductNumber.qty);
                    isExist.Qty = totalQty ?? 0;

                    Edit(isExist);
                    Save();

                    DtoTransactionProductNumber dtoTransactionProductNumber = new DtoTransactionProductNumber()
                    {
                        code = dtoProductNumber.code,
                        date = DateTime.Now,
                        productId = dtoProductNumber.productId, 
                        qty = dtoProductNumber.qty,
                        type = "تعديل كميات من فاتورة مشتريات",
                        invoicesNo=dtoProductNumber.invoiceNo
                    };
                    _transactionProductNumberRepository.AddTransactionProductNumber(dtoTransactionProductNumber);

                    dtoProductNumber.id = isExist.Id;

                    return dtoProductNumber;
                }
                else
                {
                    var objProduct = new TblProductNumber()
                    {
                        Code = dtoProductNumber.code,
                        ProductId = dtoProductNumber.productId,
                        Qty = dtoProductNumber.qty
                    };

                    Add(objProduct);
                    Save();

                    DtoTransactionProductNumber dtoTransactionProductNumber = new DtoTransactionProductNumber()
                    {
                        code = dtoProductNumber.code,
                        date = DateTime.Now,
                        productId = dtoProductNumber.productId, 
                        qty = dtoProductNumber.qty,
                        type = "تسجيل كميات جديدة من فاتورة مشتريات",
                        invoicesNo = dtoProductNumber.invoiceNo
                    };
                    _transactionProductNumberRepository.AddTransactionProductNumber(dtoTransactionProductNumber);

                    dtoProductNumber.id = objProduct.Id;
                    
                    return dtoProductNumber;
                }
            }

            return dtoProductNumber;
        }

        public void UpdateQuantity(DtoProductNumber dtoProductNumber)
        {
            if (dtoProductNumber != null)
            {
                var product = FindBy(x => x.ProductId == dtoProductNumber.productId && x.Code == dtoProductNumber.code && x.IsUsed == null).FirstOrDefault();

                if (product != null)
                {
                    if (dtoProductNumber.qty >= product.Qty)
                    {
                        product.Qty = 0;
                        //product.IsUsed = true;
                    }
                    else
                    {
                        var qty = product.Qty - dtoProductNumber.qty;
                        product.Qty = qty <= 0 ? 0 : qty;
                    }
                    Edit(product);
                    Save();
                }
            }
        }

        public bool? checkQuantity(int? productId, int? Qty)
        {
            var isExist = FindBy(x => x.ProductId == productId && x.IsUsed == null).FirstOrDefault();

            if (isExist != null)
            {
                if (isExist.Qty < Qty)
                {
                    return true;
                }

                return false;
            }

            return true;
        }

        public void DeleteProductNumber(int productId)
        {
            var isExist = FindBy(x => x.ProductId == productId && x.IsUsed == null).FirstOrDefault();

            if (isExist != null)
            {
                Delete(isExist);
                Save();
            }
        }

        public void DeleteQuantityFromPurchaseOrder(DtoPurchaseOrderDetails dtoProductNumber)
        {
            if (dtoProductNumber != null)
            {
                var product = FindBy(x => x.ProductId == dtoProductNumber.productId && x.Code == dtoProductNumber.code && x.IsUsed == null).FirstOrDefault();

                if (product != null)
                {
                    if (dtoProductNumber.quantity >= product.Qty)
                    {
                        var qty = dtoProductNumber.quantity - product.Qty;
                        product.Qty = qty <= 0 ? 0 : qty;
                    }
                    else
                    {
                        var qty = product.Qty - dtoProductNumber.quantity;
                        product.Qty = qty <= 0 ? 0 : qty;
                    }

                    Edit(product);
                    Save();

                    DtoTransactionProductNumber dtoTransactionProductNumber = new DtoTransactionProductNumber()
                    {
                        code = dtoProductNumber.code,
                        date = DateTime.Now,
                        productId = dtoProductNumber.productId,
                        priceSelling = 0,
                        priceSupplier = 0,
                        qty = dtoProductNumber.quantity,
                        type = "حذف من فاتورة مشتريات",
                        invoicesNo = dtoProductNumber.invoiceNo,
                        serial = dtoProductNumber.id.ToString()
                    };

                    _transactionProductNumberRepository.AddTransactionProductNumber(dtoTransactionProductNumber);
                }
            }
        }

        public void DeleteQuantityFromInvoices(DtoInvoicesDetails dtoProductNumber)
        {
            if (dtoProductNumber != null)
            {
                var product = FindBy(x => x.ProductId == dtoProductNumber.productId && x.Code == dtoProductNumber.code && x.IsUsed == null).FirstOrDefault();

                if (product != null)
                {
                    if (dtoProductNumber.quantity >= product.Qty)
                    {
                        var qty = dtoProductNumber.quantity + product.Qty;
                        product.Qty = qty <= 0 ? 0 : qty;
                    }
                    else
                    {
                        var qty = product.Qty + dtoProductNumber.quantity;
                        product.Qty = qty <= 0 ? 0 : qty;
                    }

                    Edit(product);
                    Save();


                    DtoTransactionProductNumber dtoTransactionProductNumber = new DtoTransactionProductNumber()
                    {
                        code = dtoProductNumber.code,
                        date = DateTime.Now,
                        productId = dtoProductNumber.productId,
                        priceSelling = 0,
                        priceSupplier = 0,
                        qty = dtoProductNumber.quantity,
                        type = "حذف من فاتورة مبيعات",
                        invoicesNo = dtoProductNumber.invoicesNo
                    };

                    _transactionProductNumberRepository.AddTransactionProductNumber(dtoTransactionProductNumber);
                }
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ContextERP.Models;
using DtoERP.Dto;
using IERPRepository.IERPRepository;
using Microsoft.EntityFrameworkCore;

namespace ERPRepository.ERPRepository
{
    public class ReturnInvoicesDetailsRespository : GenericRepository<ERPDBContext, TblReturnInvoicesDetail>, IReturnInvoicesDetailsRespository
    {
        private readonly ITransactionProductNumberRepository _transactionProductNumberRepository;
        private readonly ITransactionProductSizeRepository _transactionProductSizeRepository;
        private readonly IProductNumberRepository _productNumberRepository;
        private readonly IProductSizeRepository _productSizeRepository;

        public ReturnInvoicesDetailsRespository(ITransactionProductNumberRepository transactionProductNumberRepository,
            ITransactionProductSizeRepository transactionProductSizeRepository,
            IProductNumberRepository productNumberRepository, IProductSizeRepository productSizeRepository)
        {
            _productNumberRepository = productNumberRepository;
            _productSizeRepository = productSizeRepository;
            _transactionProductNumberRepository = transactionProductNumberRepository;
            _transactionProductSizeRepository = transactionProductSizeRepository;
        }

        public void AddReturnInvoicesDetails(int? invoiceId, int? invoicesNo, List<DtoReturnInvoicesDetails> dtoReturnInvoicesDetails)
        {
            if (dtoReturnInvoicesDetails.Count > 0)
            {
                foreach (var item in dtoReturnInvoicesDetails)
                {
                    var priceSupplier = Context.TblProducts.AsNoTracking().Where(x => x.Id == item.productId && x.IsDelete == null).OrderByDescending(x => x.Id).Select(x => x.PriceSupplier).FirstOrDefault();

                    var objDetails = new TblReturnInvoicesDetail()
                    {
                        ProductId = item.productId,
                        InvoiceId = invoiceId,
                        Width = item.width ?? 0,
                        Hight = item.hight ?? 0,
                        Code = item.code,
                        Size = item.size ?? 0,
                        Quantity = item.quantity ?? 0,
                        Meter = item.meter ?? 0,
                        Centi = Convert.ToDecimal(item.centi),
                        Type = item.type,//هسجله متر مكعب ولا عدد 
                        PriceReturn = item.priceSelling
                    };

                    Add(objDetails);
                    Save();

                    // فى حالة ان المنتج متر مكعب
                    if (item.type == true)
                    {
                        //تسجيل منتج جديد

                        DtoProductSize dtoProductSize = new DtoProductSize()
                        {
                            width = item.width,
                            height = item.hight,
                            size = item.size,
                            productId = item.productId,
                            code = item.code,
                            meter = item.meter,
                            centi = Convert.ToDecimal(item.centi),
                            qty = item.quantity
                        };

                        _productSizeRepository.UpdateProduct(dtoProductSize);

                        //حركة الصنف
                        DtoTransactionProductSize dtoTransactionProductSize = new DtoTransactionProductSize()
                        {
                            productId = item.productId,
                            date = DateTime.Now,
                            width = item.width ?? 0,
                            height = item.hight ?? 0,
                            size = item.size ?? 0,
                            code = item.code,
                            meter = item.meter ?? 0,
                            centi = Convert.ToDecimal(item.centi),
                            qty = item.quantity ?? 0,
                            priceSelling = item.priceReturn ?? 0,
                            priceSupplier = priceSupplier ?? 0,
                            type = "فاتورة مرتجع مبيعات",
                            invoicesNo = invoicesNo
                        };

                        _transactionProductSizeRepository.AddTransactionProductSize(dtoTransactionProductSize);
                    }
                    else
                    {
                        //تسجيل منتج جديد

                        DtoProductNumber dtoProductNumber = new DtoProductNumber()
                        {
                            productId = item.productId,
                            code = item.code,
                            qty = item.quantity
                        };

                        _productNumberRepository.AddNewQuantity(dtoProductNumber);

                        //حركة أصناف
                        DtoTransactionProductNumber dtoTransactionProductNumber = new DtoTransactionProductNumber()
                        {
                            productId = item.productId,
                            date = DateTime.Now,
                            code = item.code,
                            qty = item.quantity ?? 0,
                            priceSelling = item.priceReturn ?? 0,
                            priceSupplier = priceSupplier ?? 0,
                            type = "فاتورة مرتجع مبيعات",
                            invoicesNo = invoicesNo
                        };

                        _transactionProductNumberRepository.AddTransactionProductNumber(dtoTransactionProductNumber);
                    }
                }
            }
        }

        public void DeleteItemsFromInvoicesDetails(int? InvoiceId, int? numberOfInvoiceBySystem)
        {
            var _productList = FindBy(x => x.InvoiceId == InvoiceId).ToList();

            var productList = FindBy(x => x.InvoiceId == InvoiceId).Select(x =>
            new DtoInvoicesDetails
            {
                id = x.Id,
                productId = x.ProductId,
                width = x.Width,
                hight = x.Hight,
                size = x.Size,
                code = x.Code,
                quantity = x.Quantity,
                meter = x.Meter,
                centi = x.Centi.ToString(),
                type = x.Type
            }).ToList();

            foreach (var item in _productList)
            {
                item.IsDeleted = true;

                Edit(item);
                Save();
            }

            foreach (var item in productList)
            {
                item.invoiceId = numberOfInvoiceBySystem;

                //لو المنتج مترمكعب
                // فى حالة ان المنتج متر مكعب
                if (item.type == true)
                {
                    //تسجيل منتج جديد
                    DtoProductSize dtoProductSize = new DtoProductSize()
                    {
                        productId = item.productId,
                        code = item.code,
                        meter = item.meter,
                        centi = Convert.ToDecimal(item.centi),
                        qty = item.quantity,
                        height = item.hight,
                        width = item.width,
                        size = item.size
                    };
                    _productSizeRepository.UpdateProductFromInvoices(dtoProductSize);

                    //حركة الصنف
                    DtoTransactionProductSize dtoTransactionProductSize = new DtoTransactionProductSize()
                    {
                        productId = item.productId,
                        date = DateTime.Now,
                        width = item.width ?? 0,
                        height = item.hight ?? 0,
                        size = item.size ?? 0,
                        code = item.code,
                        meter = item.meter ?? 0,
                        centi = Convert.ToDecimal(item.centi),
                        qty = item.quantity ?? 0,
                        priceSelling = item.priceSelling ?? 0,
                        priceSupplier = 0,
                        type = "حذف مرتجع  فاتورة مبيعات",
                        invoicesNo = numberOfInvoiceBySystem
                    };
                    _transactionProductSizeRepository.AddTransactionProductSize(dtoTransactionProductSize);
                }
                else
                {
                    //تسجيل منتج جديد
                    DtoProductNumber dtoProductNumber = new DtoProductNumber()
                    {
                        productId = item.productId,
                        code = item.code,
                        qty = item.quantity
                    };
                    _productNumberRepository.UpdateQuantity(dtoProductNumber);


                    //حركة أصناف
                    DtoTransactionProductNumber dtoTransactionProductNumber = new DtoTransactionProductNumber()
                    {
                        productId = item.productId,
                        date = DateTime.Now,
                        code = item.code,
                        qty = item.quantity ?? 0,
                        priceSelling = item.priceSelling ?? 0,
                        priceSupplier = 0,
                        type = "حذف مرتجع  فاتورة مبيعات",
                        invoicesNo = numberOfInvoiceBySystem
                    };
                    _transactionProductNumberRepository.AddTransactionProductNumber(dtoTransactionProductNumber);
                }
            }
        }
    }
}

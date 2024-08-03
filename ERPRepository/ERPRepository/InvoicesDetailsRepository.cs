using ContextERP.Models;
using DtoERP.Dto;
using IERPRepository.IERPRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ERPRepository.ERPRepository
{
    public class InvoicesDetailsRepository : GenericRepository<ERPDBContext, TblInvoicesDetail>, IInvoicesDetailsRepository
    {
        private readonly ITransactionProductNumberRepository _transactionProductNumberRepository;
        private readonly ITransactionProductSizeRepository _transactionProductSizeRepository;
        private readonly IProductNumberRepository _productNumberRepository;
        private readonly IProductSizeRepository _productSizeRepository;
        private readonly IProductRepository _productRepository;

        public InvoicesDetailsRepository(ITransactionProductNumberRepository transactionProductNumberRepository,
            ITransactionProductSizeRepository transactionProductSizeRepository,
            IProductNumberRepository productNumberRepository, IProductSizeRepository productSizeRepository,
            IProductRepository productRepository)
        {
            _productNumberRepository = productNumberRepository;
            _productSizeRepository = productSizeRepository;
            _transactionProductNumberRepository = transactionProductNumberRepository;
            _transactionProductSizeRepository = transactionProductSizeRepository;
            _productRepository = productRepository;
        }

        public object AddInvoicesDetails(int? invoiceId, int? invoicesNo, List<DtoInvoicesDetails> dtoInvoicesDetails)
        {
            if (dtoInvoicesDetails.Count > 0)
            {
                foreach (var item in dtoInvoicesDetails)
                {
                    //var priceSupplier = Context.TblProducts.AsNoTracking().Where(x => x.Id == item.productId && x.IsDelete == null).Select(x => x.PriceSupplier).FirstOrDefault();

                    var objDetails = new TblInvoicesDetail()
                    {
                        ProductId = item.productId,
                        InvoiceId = invoiceId,
                        Width = item.width ?? 0,
                        Height = item.hight ?? 0,
                        Code = item.code,
                        Size = item.size ?? 0,
                        Qty = item.quantity ?? 0,
                        Meter = item.meter ?? 0,
                        Centi = Convert.ToDecimal(item.centi),
                        Type = item.type,//هسجله متر مكعب ولا عدد 
                        PriceSelling = item.priceSelling,
                        PriceSupplier =  0
                    };

                    Add(objDetails);
                    Save();

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
                            priceSupplier =   0,
                            type = "فاتورة مبيعات جديدة",
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
                        _productNumberRepository.UpdateQuantity(dtoProductNumber);


                        //حركة أصناف
                        DtoTransactionProductNumber dtoTransactionProductNumber = new DtoTransactionProductNumber()
                        {
                            productId = item.productId,
                            date = DateTime.Now,
                            code = item.code,
                            qty = item.quantity ?? 0,
                            priceSelling = item.priceSelling ?? 0,
                            priceSupplier =   0,
                            type = "فاتورة مبيعات جديدة",
                            invoicesNo = invoicesNo
                        };
                        _transactionProductNumberRepository.AddTransactionProductNumber(dtoTransactionProductNumber);
                    }
                }

                var objCustomer = Context.TblInvoices.AsNoTracking().Where(x => x.Id == invoiceId).Select(x => new
                {
                    customerId = x.CustomerId,
                    customerName = x.Customer.Name
                }).FirstOrDefault();

                return objCustomer;
            }

            return new { customerId = 0, customerName = "" };
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
                hight = x.Height,
                size = x.Size,
                code = x.Code,
                quantity = x.Qty,
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
                if (item.type == true)
                {
                    _productSizeRepository.DeleteProductSizeFromInvoices(item);
                }
                //لو المنتج عدد
                else
                {
                    _productNumberRepository.DeleteQuantityFromInvoices(item);
                }
            }
        }


        public DtoInvoicesDetails AddNewItemFromEditInvoices(int? invoiceId, int? invoicesNo, DtoInvoicesDetails dtoInvoicesDetails)
        {
            if (dtoInvoicesDetails != null)
            {
                var priceSupplier = Context.TblProducts.AsNoTracking().Where(x => x.Id == dtoInvoicesDetails.productId && x.IsDelete == null).Select(x => x.PriceSupplier).FirstOrDefault();

                var objDetails = new TblInvoicesDetail()
                {
                    ProductId = dtoInvoicesDetails.productId,
                    InvoiceId = invoiceId,
                    Width = dtoInvoicesDetails.width ?? 0,
                    Height = dtoInvoicesDetails.hight ?? 0,
                    Code = dtoInvoicesDetails.code,
                    Size = dtoInvoicesDetails.size ?? 0,
                    Qty = dtoInvoicesDetails.quantity ?? 0,
                    Meter = dtoInvoicesDetails.meter ?? 0,
                    Centi = Convert.ToDecimal(dtoInvoicesDetails.centi),
                    Type = dtoInvoicesDetails.type,//هسجله متر مكعب ولا عدد 
                    PriceSelling = dtoInvoicesDetails.priceSelling,
                    PriceSupplier = priceSupplier ?? 0
                };

                Add(objDetails);
                Save();

                // فى حالة ان المنتج متر مكعب
                if (dtoInvoicesDetails.type == true)
                {
                    //تسجيل منتج جديد
                    DtoProductSize dtoProductSize = new DtoProductSize()
                    {
                        productId = dtoInvoicesDetails.productId,
                        code = dtoInvoicesDetails.code,
                        meter = dtoInvoicesDetails.meter,
                        centi = Convert.ToDecimal(dtoInvoicesDetails.centi),
                        qty = dtoInvoicesDetails.quantity,
                        height = dtoInvoicesDetails.hight,
                        width = dtoInvoicesDetails.width,
                        size = dtoInvoicesDetails.size
                    };
                    _productSizeRepository.UpdateProductFromInvoices(dtoProductSize);

                    //حركة الصنف
                    DtoTransactionProductSize dtoTransactionProductSize = new DtoTransactionProductSize()
                    {
                        productId = dtoInvoicesDetails.productId,
                        date = DateTime.Now,
                        width = dtoInvoicesDetails.width ?? 0,
                        height = dtoInvoicesDetails.hight ?? 0,
                        size = dtoInvoicesDetails.size ?? 0,
                        code = dtoInvoicesDetails.code,
                        meter = dtoInvoicesDetails.meter ?? 0,
                        centi = Convert.ToDecimal(dtoInvoicesDetails.centi),
                        qty = dtoInvoicesDetails.quantity ?? 0,
                        priceSelling = dtoInvoicesDetails.priceSelling ?? 0,
                        priceSupplier = priceSupplier ?? 0,
                        type = "فاتورة مبيعات جديدة",
                        invoicesNo = invoicesNo
                    };
                    _transactionProductSizeRepository.AddTransactionProductSize(dtoTransactionProductSize);
                }
                else
                {
                    //تسجيل منتج جديد
                    DtoProductNumber dtoProductNumber = new DtoProductNumber()
                    {
                        productId = dtoInvoicesDetails.productId,
                        code = dtoInvoicesDetails.code,
                        qty = dtoInvoicesDetails.quantity
                    };
                    _productNumberRepository.UpdateQuantity(dtoProductNumber);


                    //حركة أصناف
                    DtoTransactionProductNumber dtoTransactionProductNumber = new DtoTransactionProductNumber()
                    {
                        productId = dtoInvoicesDetails.productId,
                        date = DateTime.Now,
                        code = dtoInvoicesDetails.code,
                        qty = dtoInvoicesDetails.quantity ?? 0,
                        priceSelling = dtoInvoicesDetails.priceSelling ?? 0,
                        priceSupplier = priceSupplier ?? 0,
                        type = "فاتورة مبيعات جديدة",
                        invoicesNo = invoicesNo
                    };
                    _transactionProductNumberRepository.AddTransactionProductNumber(dtoTransactionProductNumber);
                }

                dtoInvoicesDetails.id = objDetails.Id;

                return dtoInvoicesDetails;
            }

            return dtoInvoicesDetails;
        }


        public void UpdatePriceProductandTransaction(DtoInvoicesDetails dtoInvoices)
        {
            if (dtoInvoices != null)
            {
                var isExist = FindBy(x => x.Id == dtoInvoices.id).FirstOrDefault();

                if (isExist != null)
                {
                    isExist.PriceSelling = dtoInvoices.priceSelling;
                    isExist.PriceSupplier = dtoInvoices.priceSupplier;

                    Edit(isExist);
                    Save();

                    //تعديل الاسعار مع مدير النظام 
                   _productRepository.UpdatePrice(isExist.ProductId, isExist.PriceSupplier, isExist.PriceSelling);

                    if (isExist.Type == true)
                    {
                        _transactionProductSizeRepository.UpdateTransactionProductSize(dtoInvoices.productId, dtoInvoices.id.ToString(), dtoInvoices.invoicesNo, dtoInvoices.priceSelling, dtoInvoices.priceSupplier);
                    }
                    else
                    {
                        _transactionProductNumberRepository.UpdateTransactionProductNumber(dtoInvoices.productId, dtoInvoices.id.ToString(), dtoInvoices.invoicesNo, dtoInvoices.priceSelling, dtoInvoices.priceSupplier);
                    }
                }
            }
        }


        public void DeleteListItemFromInvoiceDetails(string stringList, int? numberOfInvoiceBySystem)
        {
            var intList = stringList.Split(',').Select(Int32.Parse).ToList();

            foreach (var item in intList)
            {
                var objItem = FindBy(x => x.Id == item).Select(x => new DtoInvoicesDetails
                {
                    id = x.Id,
                    productId = x.ProductId,
                    width = x.Width,
                    hight = x.Height,
                    size = x.Size,
                    code = x.Code,
                    quantity = x.Qty,
                    meter = x.Meter,
                    centi = x.Centi.ToString(),
                    type = x.Type,
                    invoicesNo = numberOfInvoiceBySystem,
                    isDeleted = x.IsDeleted
                }).FirstOrDefault();

                var itemdeleted = FindBy(x => x.Id == item).FirstOrDefault();

                itemdeleted.IsDeleted = true;

                Edit(itemdeleted);
                Save();

                if (objItem.type == true)
                {
                    _productSizeRepository.DeleteProductSizeFromInvoices(objItem);
                }
                //لو المنتج عدد
                else
                {
                    _productNumberRepository.DeleteQuantityFromInvoices(objItem);
                }
            }
        }
    }
}

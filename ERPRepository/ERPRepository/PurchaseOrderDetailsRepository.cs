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
    public class PurchaseOrderDetailsRepository : GenericRepository<ERPDBContext, TblPurchaseOrderDetail>, IPurchaseOrderDetailsRepository
    {
        private readonly ITransactionProductNumberRepository _transactionProductNumberRepository;
        private readonly ITransactionProductSizeRepository _transactionProductSizeRepository;
        private readonly IProductNumberRepository _productNumberRepository;
        private readonly IProductSizeRepository _productSizeRepository;
        private readonly IProductRepository _productRepository;

        public PurchaseOrderDetailsRepository(ITransactionProductNumberRepository transactionProductNumberRepository,
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

        public void AddPurchaseOrderDetails(int? purchaseOrderId, int? invoicesNo, List<DtoPurchaseOrderDetails> dtoPurchaseOrderDetails)
        {
            if (dtoPurchaseOrderDetails.Count > 0)
            {
                foreach (var item in dtoPurchaseOrderDetails)
                {
                    var objDetails = new TblPurchaseOrderDetail()
                    {
                        ProductId = item.productId,
                        InvoiceId = purchaseOrderId,
                        Width = item.width ?? 0,
                        Hight = item.hight ?? 0,
                        Code = item.code,
                        Size = item.size ?? 0,
                        Qty = item.quantity ?? 0,
                        Meter = item.meter ?? 0,
                        Centi = Convert.ToDecimal(item.centi),
                        Type = item.type,//هسجله متر مكعب ولا عدد 
                        PriceSelling = item.priceSelling ?? 0,
                        PriceSupplier = item.priceSupplier ?? 0
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
                            width = item.width ?? 0,
                            height = item.hight ?? 0,
                            code = item.code,
                            size = item.size ?? 0,
                            meter = item.meter ?? 0,
                            centi = Convert.ToDecimal(item.centi),
                            qty = item.quantity ?? 0
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
                            priceSelling = item.priceSelling ?? 0,
                            priceSupplier = item.priceSupplier ?? 0,
                            type = "فاتورة مشتريات جديدة",
                            invoicesNo = invoicesNo,
                            serial = objDetails.Id.ToString()
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
                            priceSelling = item.priceSelling ?? 0,
                            priceSupplier = item.priceSupplier ?? 0,
                            type = "فاتورة مشتريات جديدة",
                            invoicesNo = invoicesNo,
                            serial = objDetails.Id.ToString()
                        };

                        _transactionProductNumberRepository.AddTransactionProductNumber(dtoTransactionProductNumber);
                    }
                }
            }
        }


        public DtoPurchaseOrderDetails AddNewItemFromPurchaseOrderByAdmin(DtoPurchaseOrderDetails dtoPurchaseOrderDetails)
        {
            var objDetails = new TblPurchaseOrderDetail()
            {
                ProductId = dtoPurchaseOrderDetails.productId,
                InvoiceId = dtoPurchaseOrderDetails.purchaseOrderId,
                Width = dtoPurchaseOrderDetails.width ?? 0,
                Hight = dtoPurchaseOrderDetails.hight ?? 0,
                Code = dtoPurchaseOrderDetails.code,
                Size = dtoPurchaseOrderDetails.size ?? 0,
                Qty = dtoPurchaseOrderDetails.quantity ?? 0,
                Meter = dtoPurchaseOrderDetails.meter ?? 0,
                Centi = Convert.ToDecimal(dtoPurchaseOrderDetails.centi),
                Type = dtoPurchaseOrderDetails.type,//هسجله متر مكعب ولا عدد 
                PriceSelling = dtoPurchaseOrderDetails.priceSelling ?? 0,
                PriceSupplier = dtoPurchaseOrderDetails.priceSupplier ?? 0
            };

            Add(objDetails);
            Save();

            // فى حالة ان المنتج متر مكعب
            if (dtoPurchaseOrderDetails.type == true)
            {
                //تسجيل منتج جديد
                DtoProductSize dtoProductSize = new DtoProductSize()
                {
                    productId = dtoPurchaseOrderDetails.productId,
                    width = dtoPurchaseOrderDetails.width ?? 0,
                    height = dtoPurchaseOrderDetails.hight ?? 0,
                    code = dtoPurchaseOrderDetails.code,
                    size = dtoPurchaseOrderDetails.size ?? 0,
                    meter = dtoPurchaseOrderDetails.meter ?? 0,
                    centi = Convert.ToDecimal(dtoPurchaseOrderDetails.centi),
                    qty = dtoPurchaseOrderDetails.quantity ?? 0
                };

                _productSizeRepository.UpdateProduct(dtoProductSize);

                //حركة الصنف
                DtoTransactionProductSize dtoTransactionProductSize = new DtoTransactionProductSize()
                {
                    productId = dtoPurchaseOrderDetails.productId,
                    date = DateTime.Now,
                    width = dtoPurchaseOrderDetails.width ?? 0,
                    height = dtoPurchaseOrderDetails.hight ?? 0,
                    size = dtoPurchaseOrderDetails.size ?? 0,
                    code = dtoPurchaseOrderDetails.code,
                    meter = dtoPurchaseOrderDetails.meter ?? 0,
                    centi = Convert.ToDecimal(dtoPurchaseOrderDetails.centi),
                    qty = dtoPurchaseOrderDetails.quantity ?? 0,
                    priceSelling = dtoPurchaseOrderDetails.priceSelling ?? 0,
                    priceSupplier = dtoPurchaseOrderDetails.priceSupplier ?? 0,
                    type = "فاتورة مشتريات جديدة",
                    invoicesNo = dtoPurchaseOrderDetails.invoiceNo ,
                    serial = objDetails.Id.ToString()
                };

                _transactionProductSizeRepository.AddTransactionProductSize(dtoTransactionProductSize);

                dtoPurchaseOrderDetails.id = objDetails.Id;

                return dtoPurchaseOrderDetails;
            }
            else
            {
                //تسجيل منتج جديد

                DtoProductNumber dtoProductNumber = new DtoProductNumber()
                {
                    productId = dtoPurchaseOrderDetails.productId,
                    code = dtoPurchaseOrderDetails.code,
                    qty = dtoPurchaseOrderDetails.quantity
                };

                _productNumberRepository.AddNewQuantity(dtoProductNumber);

                //حركة أصناف
                DtoTransactionProductNumber dtoTransactionProductNumber = new DtoTransactionProductNumber()
                {
                    productId = dtoPurchaseOrderDetails.productId,
                    date = DateTime.Now,
                    code = dtoPurchaseOrderDetails.code,
                    qty = dtoPurchaseOrderDetails.quantity ?? 0,
                    priceSelling = dtoPurchaseOrderDetails.priceSelling ?? 0,
                    priceSupplier = dtoPurchaseOrderDetails.priceSupplier ?? 0,
                    type = "فاتورة مشتريات جديدة",
                    invoicesNo = dtoPurchaseOrderDetails.invoiceNo,
                    serial = objDetails.Id.ToString()
                };

                _transactionProductNumberRepository.AddTransactionProductNumber(dtoTransactionProductNumber);

                dtoPurchaseOrderDetails.id = objDetails.Id;
                
                return dtoPurchaseOrderDetails;
            }
        }

        public void UpdatePriceProductandTransaction(DtoPurchaseOrderDetails dtoPurchaseOrderDetails)
        {
            if (dtoPurchaseOrderDetails != null)
            {
                var isExist = FindBy(x => x.Id == dtoPurchaseOrderDetails.id).FirstOrDefault();

                if (isExist != null)
                {
                    isExist.PriceSelling = dtoPurchaseOrderDetails.priceSelling;
                    isExist.PriceSupplier = dtoPurchaseOrderDetails.priceSupplier;

                    Edit(isExist);
                    Save();

                    //تعديل الاسعار مع مدير النظام 
                    _productRepository.UpdatePrice(isExist.ProductId, isExist.PriceSupplier, isExist.PriceSelling);

                    if (isExist.Type == true)
                    {
                        _transactionProductSizeRepository.UpdateTransactionProductSize(dtoPurchaseOrderDetails.productId, dtoPurchaseOrderDetails.id.ToString(), dtoPurchaseOrderDetails.invoiceNo, dtoPurchaseOrderDetails.priceSelling, dtoPurchaseOrderDetails.priceSupplier);
                    }
                    else
                    {
                        _transactionProductNumberRepository.UpdateTransactionProductNumber(dtoPurchaseOrderDetails.productId, dtoPurchaseOrderDetails.id.ToString(), dtoPurchaseOrderDetails.invoiceNo, dtoPurchaseOrderDetails.priceSelling, dtoPurchaseOrderDetails.priceSupplier);
                    }
                }
            }
        }

        public void DeleteItemsFromPurchaseOrderDetails(int? InvoiceId, int? numberOfInvoiceBySystem)
        {
            var _productList = FindBy(x => x.InvoiceId == InvoiceId).ToList();

            var productList = FindBy(x => x.InvoiceId == InvoiceId).Select(x =>
            new DtoPurchaseOrderDetails
            {
                id = x.Id,
                productId = x.ProductId,
                width = x.Width,
                hight = x.Hight,
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
                item.invoiceNo = numberOfInvoiceBySystem;
                //لو المنتج مترمكعب
                if (item.type == true)
                {
                    _productSizeRepository.DeleteProductSizeFromPurchaseOrder(item);
                }
                //لو المنتج عدد
                else
                {
                    _productNumberRepository.DeleteQuantityFromPurchaseOrder(item);
                }
            }
        }

        public void DeleteOneItemFromPurchaseOrderDetails(int? Id, int? numberOfInvoiceBySystem)
        {
            var objItem = FindBy(x => x.Id == Id).Select(x => new DtoPurchaseOrderDetails
            {
                id = x.Id,
                productId = x.ProductId,
                width = x.Width,
                hight = x.Hight,
                size = x.Size,
                code = x.Code,
                quantity = x.Qty,
                meter = x.Meter,
                centi = x.Centi.ToString(),
                type = x.Type
            }).FirstOrDefault();


            if (objItem.type == true)
            {
                _productSizeRepository.DeleteProductSizeFromPurchaseOrder(objItem);
            }
            //لو المنتج عدد
            else
            {
                _productNumberRepository.DeleteQuantityFromPurchaseOrder(objItem);
            }
        }

        public void DeleteListItemFromPurchaseOrderDetails(string stringList, int? numberOfInvoiceBySystem)
        {
            var intList = stringList.Split(',').Select(Int32.Parse).ToList();

            foreach (var item in intList)
            {
                var objItem = FindBy(x => x.Id == item).Select(x => new DtoPurchaseOrderDetails
                {
                    id = x.Id,
                    productId = x.ProductId,
                    width = x.Width,
                    hight = x.Hight,
                    size = x.Size,
                    code = x.Code,
                    quantity = x.Qty,
                    meter = x.Meter,
                    centi = x.Centi.ToString(),
                    type = x.Type,
                    invoiceNo = numberOfInvoiceBySystem,
                    isDeleted = x.IsDeleted
                }).FirstOrDefault();

                var itemdeleted = FindBy(x => x.Id == item).FirstOrDefault();

                itemdeleted.IsDeleted = true;

                Edit(itemdeleted);
                Save();

                if (objItem.type == true)
                {
                    _productSizeRepository.DeleteProductSizeFromPurchaseOrder(objItem);
                }
                //لو المنتج عدد
                else
                {
                    _productNumberRepository.DeleteQuantityFromPurchaseOrder(objItem);
                }
            }
        }
    }
}

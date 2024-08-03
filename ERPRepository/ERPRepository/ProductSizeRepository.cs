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
    public class ProductSizeRepository : GenericRepository<ERPDBContext, TblProductSize>, IProductSizeRepository
    {
        private readonly ITransactionProductSizeRepository _transactionProductSizeRepository;

        public ProductSizeRepository(ITransactionProductSizeRepository transactionProductSizeRepository)
        {
            _transactionProductSizeRepository = transactionProductSizeRepository;
        }

        //تسجيل او تعديل منتج 
        public DtoProductSize AddEditProductSize(DtoProductSize dtoProductSize)
        {
            if (dtoProductSize != null)
            {
                var Productobj = Context.TblProducts.AsNoTracking().Where(x => x.Id == dtoProductSize.productId)
                  .Select(x => new { priceSelling = x.PriceSelling, priceSupplier = x.PriceSupplier }).FirstOrDefault();

                if (dtoProductSize.code == "")
                {
                    //التحقق من التخانة والعرض فى حالة انه موجود بيعمل تعديل عليه مش موجود بيضيف تخانة وعرض جديد
                    var isExist = FindBy(x => x.Code == null && x.Width == dtoProductSize.width && x.Height == dtoProductSize.height && x.Size == dtoProductSize.size && x.ProductId == dtoProductSize.productId && x.IsUsed == null).FirstOrDefault();//&& x.Size == dtoProductSize.size && x.Width == dtoProductSize.width && x.Height == dtoProductSize.height && x.IsUsed == null).FirstOrDefault();

                    if (isExist != null)
                    {
                        isExist.Width = dtoProductSize.width;
                        isExist.Height = dtoProductSize.height;
                        isExist.Size = dtoProductSize.size;
                        isExist.Code = dtoProductSize.code == "" ? null : dtoProductSize.code;
                        isExist.Meter = dtoProductSize.meter;
                        isExist.Centi = dtoProductSize.centi;
                        isExist.Qty = dtoProductSize.qty;

                        Edit(isExist);
                        Save();

                        DtoTransactionProductSize dtoTransactionProductSize = new DtoTransactionProductSize()
                        {
                            productId = dtoProductSize.productId,
                            date = DateTime.Now,
                            width = dtoProductSize.width,
                            height = dtoProductSize.height,
                            size = dtoProductSize.size,
                            code = dtoProductSize.code == "" ? null : dtoProductSize.code,
                            meter = dtoProductSize.meter,
                            centi = dtoProductSize.centi,
                            qty = dtoProductSize.qty ?? 0,
                            priceSelling = Productobj.priceSelling,
                            priceSupplier = Productobj.priceSupplier,
                            type = "تعديل كميات",
                            invoicesNo = 0
                        };

                        _transactionProductSizeRepository.AddTransactionProductSize(dtoTransactionProductSize);
                    }
                    else
                    {
                        //اضافة منتج جديد مع عرض وتخانة جديدة
                        var objProductSize = new TblProductSize()
                        {
                            ProductId = dtoProductSize.productId,
                            Width = dtoProductSize.width,
                            Height = dtoProductSize.height,
                            Size = dtoProductSize.size,
                            Code = dtoProductSize.code == "" ? null : dtoProductSize.code,
                            Meter = dtoProductSize.meter,
                            Centi = dtoProductSize.centi,
                            Qty = dtoProductSize.qty ?? 0
                        };

                        Add(objProductSize);
                        Save();

                        DtoTransactionProductSize dtoTransactionProductSize = new DtoTransactionProductSize()
                        {
                            productId = dtoProductSize.productId,
                            date = DateTime.Now,
                            width = dtoProductSize.width,
                            height = dtoProductSize.height,
                            size = dtoProductSize.size,
                            code = dtoProductSize.code == "" ? null : dtoProductSize.code,
                            meter = dtoProductSize.meter,
                            centi = dtoProductSize.centi,
                            qty = dtoProductSize.qty,
                            priceSelling = Productobj.priceSelling,
                            priceSupplier = Productobj.priceSupplier,
                            type = "تسجيل كميات جديدة",
                            invoicesNo = 0
                        };

                        _transactionProductSizeRepository.AddTransactionProductSize(dtoTransactionProductSize);
                    }
                }
                else if (dtoProductSize.code != "")
                {
                    var isExistCode = FindBy(x => x.Code == dtoProductSize.code && x.ProductId == dtoProductSize.productId && x.IsUsed == null).FirstOrDefault();

                    if (isExistCode != null)
                    {
                        isExistCode.Width = dtoProductSize.width;
                        isExistCode.Height = dtoProductSize.height;
                        isExistCode.Size = dtoProductSize.size;
                        isExistCode.Code = dtoProductSize.code == "" ? null : dtoProductSize.code;
                        isExistCode.Meter = dtoProductSize.meter;
                        isExistCode.Centi = dtoProductSize.centi;
                        isExistCode.Qty = dtoProductSize.qty;

                        Edit(isExistCode);
                        Save();

                        DtoTransactionProductSize dtoTransactionProductSize = new DtoTransactionProductSize()
                        {
                            productId = dtoProductSize.productId,
                            date = DateTime.Now,
                            width = dtoProductSize.width,
                            height = dtoProductSize.height,
                            size = dtoProductSize.size,
                            code = dtoProductSize.code == "" ? null : dtoProductSize.code,
                            meter = dtoProductSize.meter,
                            centi = dtoProductSize.centi,
                            qty = dtoProductSize.qty ?? 0,
                            priceSelling = Productobj.priceSelling,
                            priceSupplier = Productobj.priceSupplier,
                            type = "تعديل كميات",
                            invoicesNo = 0
                        };

                        _transactionProductSizeRepository.AddTransactionProductSize(dtoTransactionProductSize);
                    }
                    else
                    {
                        var objProductSize = new TblProductSize()
                        {
                            ProductId = dtoProductSize.productId,
                            Width = dtoProductSize.width,
                            Height = dtoProductSize.height,
                            Size = dtoProductSize.size,
                            Code = dtoProductSize.code == "" ? null : dtoProductSize.code,
                            Meter = dtoProductSize.meter,
                            Centi = dtoProductSize.centi,
                            Qty = dtoProductSize.qty ?? 0
                        };

                        Add(objProductSize);
                        Save();

                        DtoTransactionProductSize dtoTransactionProductSize = new DtoTransactionProductSize()
                        {
                            productId = dtoProductSize.productId,
                            date = DateTime.Now,
                            width = dtoProductSize.width,
                            height = dtoProductSize.height,
                            size = dtoProductSize.size,
                            code = dtoProductSize.code == "" ? null : dtoProductSize.code,
                            meter = dtoProductSize.meter,
                            centi = dtoProductSize.centi,
                            qty = dtoProductSize.qty,
                            priceSelling = Productobj.priceSelling,
                            priceSupplier = Productobj.priceSupplier,
                            type = "تسجيل كميات جديدة",
                            invoicesNo = 0
                        };

                        _transactionProductSizeRepository.AddTransactionProductSize(dtoTransactionProductSize);
                    }
                }
            }

            return dtoProductSize;
        }

        public void UpdateProduct(DtoProductSize dtoProductSize)
        {
            if (dtoProductSize != null)
            {
                if (dtoProductSize.code == "" || dtoProductSize.code == null)
                {
                    //لو المنتج ملوش سريال بيضيف على التكعيب والعدد
                    //التحقق من التخانة والعرض فى حالة انه موجود بيعمل تعديل عليه مش موجود بيضيف تخانة وعرض جديد

                    var productWithoutCode = FindBy(c => c.ProductId == dtoProductSize.productId && c.Width == dtoProductSize.width && c.Height == dtoProductSize.height && c.Size == dtoProductSize.size && c.Code == null && c.IsUsed == null).FirstOrDefault();

                    //لو موجود ضيف على القديم
                    if (productWithoutCode != null)
                    {
                        var lastTotal = productWithoutCode.Meter + Convert.ToDouble(productWithoutCode.Centi);

                        var currentTotal = dtoProductSize.meter + Convert.ToDouble(dtoProductSize.centi);

                        var total = (currentTotal + lastTotal).ToString();

                        string[] totalString = total.Split(".");

                        var totalQty = productWithoutCode.Qty <= 0 ? dtoProductSize.qty : (productWithoutCode.Qty + dtoProductSize.qty);

                        productWithoutCode.Meter = Convert.ToDouble(totalString[0]);
                        productWithoutCode.Centi = totalString.Length > 1 ? Convert.ToDecimal("." + totalString[1]) : 0;
                        productWithoutCode.Qty = totalQty ?? 0;

                        Edit(productWithoutCode);
                        Save();
                    }
                    //مش موجود سجل صنف جديد
                    else
                    {
                        var objProductSize = new TblProductSize()
                        {
                            ProductId = dtoProductSize.productId,
                            Width = dtoProductSize.width ?? 0,
                            Height = dtoProductSize.height ?? 0,
                            Size = dtoProductSize.size ?? 0,
                            Code = dtoProductSize.code == "" ? null : dtoProductSize.code,
                            Meter = dtoProductSize.meter ?? 0,
                            Centi = dtoProductSize.centi ?? 0,
                            Qty = dtoProductSize.qty ?? 0
                        };

                        Add(objProductSize);
                        Save();
                    }
                }
                else
                {
                    //فى حالة ان فاتورة الشراء نفس المنتج والكود مع الطول والعرض والتخانة اضيفة على القديم
                    var productWithCode = FindBy(c => c.ProductId == dtoProductSize.productId && c.Width == dtoProductSize.width && c.Height == dtoProductSize.height && c.Size == dtoProductSize.size && c.Code == dtoProductSize.code && c.IsUsed == null).FirstOrDefault();

                    if (productWithCode != null)
                    {
                        var lastTotal = productWithCode.Meter + Convert.ToDouble(productWithCode.Centi);

                        var currentTotal = dtoProductSize.meter + Convert.ToDouble(dtoProductSize.centi);

                        var total = (currentTotal + lastTotal).ToString();

                        string[] totalString = total.Split(".");

                        var totalQty = productWithCode.Qty <= 0 ? dtoProductSize.qty : (productWithCode.Qty + dtoProductSize.qty);

                        productWithCode.Meter = Convert.ToDouble(totalString[0]);
                        productWithCode.Centi = totalString.Length > 1 ? Convert.ToDecimal("." + totalString[1]) : 0;
                        productWithCode.Qty = totalQty ?? 0;

                        Edit(productWithCode);
                        Save();
                    }
                    else
                    {
                        var objProductSize = new TblProductSize()
                        {
                            ProductId = dtoProductSize.productId,
                            Width = dtoProductSize.width ?? 0,
                            Height = dtoProductSize.height ?? 0,
                            Size = dtoProductSize.size ?? 0,
                            Code = dtoProductSize.code,
                            Meter = dtoProductSize.meter ?? 0,
                            Centi = dtoProductSize.centi ?? 0,
                            Qty = dtoProductSize.qty ?? 0
                        };

                        Add(objProductSize);
                        Save();
                    }
                }
            }
        }

        public DtoProductSize AddNewProductFromPurchaseOrder(DtoProductSize dtoProductSize)
        {
            if (dtoProductSize != null)
            {
                if (dtoProductSize.code == "" || dtoProductSize.code == null)
                {
                    //لو المنتج ملوش سريال بيضيف على التكعيب والعدد
                    //التحقق من التخانة والعرض فى حالة انه موجود بيعمل تعديل عليه مش موجود بيضيف تخانة وعرض جديد

                    var productWithoutCode = FindBy(c => c.ProductId == dtoProductSize.productId && c.Width == dtoProductSize.width && c.Height == dtoProductSize.height && c.Size == dtoProductSize.size && c.Code == null && c.IsUsed == null).FirstOrDefault();//&& c.Size == dtoProductSize.size && c.Width == dtoProductSize.width && c.Height == dtoProductSize.height && c.Code == null && c.IsUsed == null).FirstOrDefault();

                    //لو موجود ضيف على القديم
                    if (productWithoutCode != null)
                    {
                        var lastTotal = productWithoutCode.Meter + Convert.ToDouble(productWithoutCode.Centi);

                        var currentTotal = dtoProductSize.meter + Convert.ToDouble(dtoProductSize.centi);

                        var total = (currentTotal + lastTotal).ToString();

                        string[] totalString = total.Split(".");

                        var totalQty = productWithoutCode.Qty <= 0 ? dtoProductSize.qty : (productWithoutCode.Qty + dtoProductSize.qty);

                        productWithoutCode.Meter = Convert.ToDouble(totalString[0]);
                        productWithoutCode.Centi = totalString.Length > 1 ? Convert.ToDecimal("." + totalString[1]) : 0;
                        productWithoutCode.Qty = totalQty ?? 0;


                        Edit(productWithoutCode);
                        Save();

                        dtoProductSize.id = productWithoutCode.Id;

                        DtoTransactionProductSize dtoTransactionProductSize = new DtoTransactionProductSize()
                        {
                            productId = dtoProductSize.productId,
                            date = DateTime.Now,
                            width = dtoProductSize.width,
                            height = dtoProductSize.height,
                            size = dtoProductSize.size,
                            code = dtoProductSize.code == "" ? null : dtoProductSize.code,
                            meter = dtoProductSize.meter,
                            centi = dtoProductSize.centi,
                            qty = dtoProductSize.qty ?? 0,
                            type = "تعديل كميات من فاتورة مشتريات",
                            invoicesNo = dtoProductSize.invoicesNo
                        };

                        _transactionProductSizeRepository.AddTransactionProductSize(dtoTransactionProductSize);


                        return dtoProductSize;
                    }
                    //مش موجود سجل صنف جديد
                    else
                    {
                        var objProductSize = new TblProductSize()
                        {
                            ProductId = dtoProductSize.productId,
                            Width = dtoProductSize.width ?? 0,
                            Height = dtoProductSize.height ?? 0,
                            Size = dtoProductSize.size ?? 0,
                            Code = dtoProductSize.code == "" ? null : dtoProductSize.code,
                            Meter = dtoProductSize.meter ?? 0,
                            Centi = dtoProductSize.centi ?? 0,
                            Qty = dtoProductSize.qty ?? 0
                        };

                        Add(objProductSize);
                        Save();

                        dtoProductSize.id = productWithoutCode.Id;


                        DtoTransactionProductSize dtoTransactionProductSize = new DtoTransactionProductSize()
                        {
                            productId = dtoProductSize.productId,
                            date = DateTime.Now,
                            width = dtoProductSize.width,
                            height = dtoProductSize.height,
                            size = dtoProductSize.size,
                            code = dtoProductSize.code == "" ? null : dtoProductSize.code,
                            meter = dtoProductSize.meter,
                            centi = dtoProductSize.centi,
                            qty = dtoProductSize.qty,
                            type = "تسجيل كميات جديدة من فاتورة مشتريات",
                            invoicesNo = dtoProductSize.invoicesNo
                        };

                        _transactionProductSizeRepository.AddTransactionProductSize(dtoTransactionProductSize);


                        return dtoProductSize;
                    }
                }
                else
                {
                    //فى حالة ان فاتورة الشراء نفس المنتج والكود اضيفة على القديم
                    var productWithCode = FindBy(c => c.ProductId == dtoProductSize.productId && c.Code == dtoProductSize.code && c.IsUsed == null).FirstOrDefault();

                    if (productWithCode != null)
                    {
                        var lastTotal = productWithCode.Meter + Convert.ToDouble(productWithCode.Centi);

                        var currentTotal = dtoProductSize.meter + Convert.ToDouble(dtoProductSize.centi);

                        var total = (currentTotal + lastTotal).ToString();

                        string[] totalString = total.Split(".");

                        var totalQty = productWithCode.Qty <= 0 ? dtoProductSize.qty : (productWithCode.Qty + dtoProductSize.qty);

                        productWithCode.Meter = Convert.ToDouble(totalString[0]);
                        productWithCode.Centi = totalString.Length > 1 ? Convert.ToDecimal("." + totalString[1]) : 0;
                        productWithCode.Qty = totalQty ?? 0;

                        Edit(productWithCode);
                        Save();

                        dtoProductSize.id = productWithCode.Id;


                        DtoTransactionProductSize dtoTransactionProductSize = new DtoTransactionProductSize()
                        {
                            productId = dtoProductSize.productId,
                            date = DateTime.Now,
                            width = dtoProductSize.width,
                            height = dtoProductSize.height,
                            size = dtoProductSize.size,
                            code = dtoProductSize.code == "" ? null : dtoProductSize.code,
                            meter = dtoProductSize.meter,
                            centi = dtoProductSize.centi,
                            qty = dtoProductSize.qty ?? 0,
                            type = "تعديل كميات من فاتورة مشتريات",
                            invoicesNo = dtoProductSize.invoicesNo
                        };

                        _transactionProductSizeRepository.AddTransactionProductSize(dtoTransactionProductSize);



                        return dtoProductSize;
                    }
                    else
                    {
                        var objProductSize = new TblProductSize()
                        {
                            ProductId = dtoProductSize.productId,
                            Width = dtoProductSize.width ?? 0,
                            Height = dtoProductSize.height ?? 0,
                            Size = dtoProductSize.size ?? 0,
                            Code = dtoProductSize.code,
                            Meter = dtoProductSize.meter ?? 0,
                            Centi = dtoProductSize.centi ?? 0,
                            Qty = dtoProductSize.qty ?? 0
                        };

                        Add(objProductSize);
                        Save();

                        dtoProductSize.id = productWithCode.Id;


                        DtoTransactionProductSize dtoTransactionProductSize = new DtoTransactionProductSize()
                        {
                            productId = dtoProductSize.productId,
                            date = DateTime.Now,
                            width = dtoProductSize.width,
                            height = dtoProductSize.height,
                            size = dtoProductSize.size,
                            code = dtoProductSize.code == "" ? null : dtoProductSize.code,
                            meter = dtoProductSize.meter,
                            centi = dtoProductSize.centi,
                            qty = dtoProductSize.qty,
                            type = "تسجيل كميات جديدة من فاتورة مشتريات",
                            invoicesNo = dtoProductSize.invoicesNo
                        };

                        _transactionProductSizeRepository.AddTransactionProductSize(dtoTransactionProductSize);

                        return dtoProductSize;
                    }
                }
            }

            return dtoProductSize;
        }


        //حذف الكميات من المخزن فى فاتورة المشتريات
        public void DeleteProductFromPurchaseOrder(DtoProductSize dtoProductSize)
        {
            if (dtoProductSize != null)
            {
                if (dtoProductSize.code == "" || dtoProductSize.code == null)
                {
                    //لو المنتج ملوش سريال بيضيف على التكعيب والعدد
                    //التحقق من التخانة والعرض فى حالة انه موجود بيعمل تعديل عليه مش موجود بيضيف تخانة وعرض جديد

                    var productWithoutCode = FindBy(c => c.ProductId == dtoProductSize.productId && c.Width == dtoProductSize.width && c.Height == dtoProductSize.height && c.Size == dtoProductSize.size && c.Code == null && c.IsUsed == null).FirstOrDefault();//&& c.Size == dtoProductSize.size && c.Width == dtoProductSize.width && c.Height == dtoProductSize.height && c.Code == null && c.IsUsed == null).FirstOrDefault();

                    //لو موجود خصم من القديم
                    if (productWithoutCode != null)
                    {
                        var lastTotal = productWithoutCode.Meter + Convert.ToDouble(productWithoutCode.Centi);

                        var currentTotal = dtoProductSize.meter + Convert.ToDouble(dtoProductSize.centi);

                        var total = (lastTotal - currentTotal).ToString();

                        string[] totalString = total.Split(".");

                        var totalQty = (productWithoutCode.Qty - dtoProductSize.qty);

                        productWithoutCode.Meter = Convert.ToDouble(totalString[0]);

                        if (totalString.Length == 1)
                        {
                            productWithoutCode.IsUsed = true;
                            productWithoutCode.Meter = 0;
                            productWithoutCode.Centi = 0;
                            productWithoutCode.Qty = 0;
                        }
                        else
                        {
                            productWithoutCode.Centi = totalString.Length > 1 ? Convert.ToDecimal("." + totalString[1]) : 0;
                            productWithoutCode.Qty = totalQty <= 0 ? 0 : totalQty;
                            if (productWithoutCode.Centi <= Convert.ToDecimal(0.0000))
                            {
                                productWithoutCode.IsUsed = true;
                            }
                        }

                        Edit(productWithoutCode);
                        Save();

                        DtoTransactionProductSize dtoTransactionProductSize = new DtoTransactionProductSize()
                        {
                            productId = dtoProductSize.productId,
                            date = DateTime.Now,
                            width = dtoProductSize.width,
                            height = dtoProductSize.height,
                            size = dtoProductSize.size,
                            code = dtoProductSize.code == "" ? null : dtoProductSize.code,
                            meter = dtoProductSize.meter,
                            centi = dtoProductSize.centi,
                            qty = dtoProductSize.qty ?? 0,
                            type = "حذف كميات من فاتورة مشتريات",
                            invoicesNo = dtoProductSize.invoicesNo
                        };

                        _transactionProductSizeRepository.AddTransactionProductSize(dtoTransactionProductSize);

                    }
                }
                else
                {
                    //فى حالة ان فاتورة الشراء نفس المنتج والكود اضيفة على القديم
                    var productWithCode = FindBy(c => c.ProductId == dtoProductSize.productId && c.Code == dtoProductSize.code && c.IsUsed == null).FirstOrDefault();

                    if (productWithCode != null)
                    {
                        var lastTotal = productWithCode.Meter + Convert.ToDouble(productWithCode.Centi);

                        var currentTotal = dtoProductSize.meter + Convert.ToDouble(dtoProductSize.centi);

                        var total = (lastTotal - currentTotal).ToString();

                        string[] totalString = total.Split(".");

                        var totalQty = (productWithCode.Qty - dtoProductSize.qty);

                        productWithCode.Meter = Convert.ToDouble(totalString[0]);

                        if (totalString.Length == 1)
                        {
                            productWithCode.IsUsed = true;
                            productWithCode.Meter = 0;
                            productWithCode.Centi = 0;
                            productWithCode.Qty = 0;
                        }
                        else
                        {
                            productWithCode.Centi = totalString.Length > 1 ? Convert.ToDecimal("." + totalString[1]) : 0;
                            productWithCode.Qty = totalQty <= 0 ? 0 : totalQty;
                            if (productWithCode.Centi <= Convert.ToDecimal(0.0000))
                            {
                                productWithCode.IsUsed = true;
                            }
                        }

                        Edit(productWithCode);
                        Save();

                        DtoTransactionProductSize dtoTransactionProductSize = new DtoTransactionProductSize()
                        {
                            productId = dtoProductSize.productId,
                            date = DateTime.Now,
                            width = dtoProductSize.width,
                            height = dtoProductSize.height,
                            size = dtoProductSize.size,
                            code = dtoProductSize.code == "" ? null : dtoProductSize.code,
                            meter = dtoProductSize.meter,
                            centi = dtoProductSize.centi,
                            qty = dtoProductSize.qty ?? 0,
                            type = "حذف كميات من فاتورة مشتريات",
                            invoicesNo = dtoProductSize.invoicesNo
                        };

                        _transactionProductSizeRepository.AddTransactionProductSize(dtoTransactionProductSize);

                    }
                }
            }
        }

        public void UpdateProductFromInvoices(DtoProductSize dtoProductSize)
        {
            if (dtoProductSize != null)
            {
                if (dtoProductSize.code == "" || dtoProductSize.code == null)
                {
                    var productWithoutCode = FindBy(c => c.ProductId == dtoProductSize.productId && c.Width == dtoProductSize.width && c.Height == dtoProductSize.height && c.Size == dtoProductSize.size && c.Code == null && c.IsUsed == null).FirstOrDefault();//&& c.Size == dtoProductSize.size && c.Width == dtoProductSize.width && c.Height == dtoProductSize.height && c.Code == null && c.IsUsed == null).FirstOrDefault();

                    //لو موجود ضيف على القديم
                    if (productWithoutCode != null)
                    {
                        var _lastTotal = productWithoutCode.Meter + Convert.ToDouble(productWithoutCode.Centi);

                        var _currentTotal = dtoProductSize.meter + Convert.ToDouble(dtoProductSize.centi);
                         
                        var lastTotal = productWithoutCode.Meter + Convert.ToDouble(productWithoutCode.Centi);

                        var currentTotal = dtoProductSize.meter + Convert.ToDouble(dtoProductSize.centi);

                        if (_currentTotal >= _lastTotal)
                        {
                            productWithoutCode.Meter = 0;
                            productWithoutCode.Centi = 0;
                            productWithoutCode.Qty = 0;
                            productWithoutCode.IsUsed = true;
                        }
                        else if (currentTotal < lastTotal)
                        {
                            var total = Math.Round((double)(lastTotal - currentTotal), 4);

                            var _total = total.ToString();

                            string[] totalString = _total.Split(".");

                            var totalQty = productWithoutCode.Qty - dtoProductSize.qty;

                            productWithoutCode.Meter = Convert.ToDouble(totalString[0]);

                            if (productWithoutCode.Meter > 0)
                            {
                                productWithoutCode.Qty = totalQty;
                                productWithoutCode.Centi = Convert.ToDecimal("." + totalString[1]);
                            }
                            else
                            { 
                                // التحقق من ان المنتج النهائى اقل من الصفر على افتراض ان المنتج دخل اول مرة وبعد كدا رجع تانى 
                                if (totalString.Length == 1)
                                {
                                    productWithoutCode.IsUsed = true;
                                    productWithoutCode.Meter = 0;
                                    productWithoutCode.Centi = 0;
                                    productWithoutCode.Qty = 0;
                                }
                                else
                                {
                                    productWithoutCode.Centi = totalString.Length > 1 ? Convert.ToDecimal("." + totalString[1]) : 0;
                                    productWithoutCode.Qty = totalQty <= 0 ? 0 : totalQty;
                                    if (productWithoutCode.Centi <= Convert.ToDecimal(0.0000))
                                    {
                                        productWithoutCode.IsUsed = true;
                                    }
                                }
                            }
                        }

                        Edit(productWithoutCode);
                        Save();
                    }
                }
                else
                {
                    //فى حالة ان المنتج له كود بيتم من اللممكن بيع جزء منه وليس كامل
                    var productWithoutCode = FindBy(c => c.ProductId == dtoProductSize.productId && c.Width == dtoProductSize.width && c.Height == dtoProductSize.height && c.Size == dtoProductSize.size && c.Code == dtoProductSize.code && c.IsUsed == null).FirstOrDefault();

                    //لو موجود ضيف على القديم
                    if (productWithoutCode != null)
                    {
                        if (dtoProductSize.meter >= productWithoutCode.Meter)
                        {
                            productWithoutCode.Meter = 0;
                            productWithoutCode.Centi = 0;
                            productWithoutCode.Qty = 0;
                            productWithoutCode.IsUsed = true;
                        }
                        else if (dtoProductSize.meter < productWithoutCode.Meter)
                        {
                            var lastTotal = productWithoutCode.Meter + Convert.ToDouble(productWithoutCode.Centi);

                            var currentTotal = dtoProductSize.meter + Convert.ToDouble(dtoProductSize.centi);

                            var total = (lastTotal - currentTotal).ToString();

                            string[] totalString = total.Split(".");

                            var totalQty = productWithoutCode.Qty - dtoProductSize.qty;

                            productWithoutCode.Meter = Convert.ToDouble(totalString[0]);

                            // التحقق من ان المنتج النهائى اقل من الصفر على افتراض ان المنتج دخل اول مرة وبعد كدا رجع تانى 
                            if (totalString.Length == 1)
                            {
                                productWithoutCode.IsUsed = true;
                                productWithoutCode.Meter = 0;
                                productWithoutCode.Centi = 0;
                                productWithoutCode.Qty = 0;
                            }
                            else
                            {
                                productWithoutCode.Centi = totalString.Length > 1 ? Convert.ToDecimal("." + totalString[1]) : 0;
                                productWithoutCode.Qty = totalQty <= 0 ? 0 : totalQty;
                                if (productWithoutCode.Centi <= Convert.ToDecimal(0.0000))
                                {
                                    productWithoutCode.IsUsed = true;
                                }
                            }
                        }

                        Edit(productWithoutCode);
                        Save();
                    }
                }
            }
        }

        public bool? checkQuantity(int? productId, int? Meter)
        {
            var isExist = FindBy(x => x.ProductId == productId && x.Code != null && x.IsUsed == null).FirstOrDefault();

            if (isExist != null)
            {
                if (isExist.Meter < Meter)
                {
                    return true;
                }

                return false;
            }

            return true;
        }

        public List<double?> selectDisticitSize()
        {

            var resultSize = (from x in Context.TblProductSizes.AsNoTracking().Where(x => x.Product.IsDelete == null && x.IsUsed == null && x.Code == null)
                              select new
                              {
                                  productId = x.ProductId,
                                  Size = x.Size,
                              }).GroupBy(x => x.productId).Select(x => x.First().Size).ToList();

            return resultSize;
        }

        public List<double?> selectDisticitwidth()
        {
            var resultwidth = (from x in Context.TblProductSizes.AsNoTracking().Where(x => x.Product.IsDelete == null && x.IsUsed == null && x.Code == null)
                               select new
                               {
                                   productId = x.ProductId,
                                   width = x.Width,
                               }).GroupBy(x => x.productId).Select(x => x.First().width).ToList();

            return resultwidth;
        }

        public void DeleteProductSizeFromPurchaseOrder(DtoPurchaseOrderDetails dtoProductSize)
        {
            if (dtoProductSize != null)
            {
                if (dtoProductSize.code == "" || dtoProductSize.code == null)
                {
                    var productWithoutCode = FindBy(c => c.ProductId == dtoProductSize.productId && c.Width == dtoProductSize.width && c.Height == dtoProductSize.hight && c.Size == dtoProductSize.size && c.Code == null && c.IsUsed == null).FirstOrDefault();//&& c.Size == dtoProductSize.size && c.Width == dtoProductSize.width && c.Height == dtoProductSize.height && c.Code == null && c.IsUsed == null).FirstOrDefault();

                    if (productWithoutCode != null)
                    {
                        var lastTotal = productWithoutCode.Meter + Convert.ToDouble(productWithoutCode.Centi);

                        var currentTotal = dtoProductSize.meter + Convert.ToDouble(dtoProductSize.centi);

                        var total = (lastTotal - currentTotal).ToString();

                        string[] totalString = total.Split(".");

                        var totalQty = productWithoutCode.Qty - dtoProductSize.quantity;

                        productWithoutCode.Meter = Convert.ToDouble(totalString[0]);

                        // التحقق من ان المنتج النهائى اقل من الصفر على افتراض ان المنتج دخل اول مرة وبعد كدا رجع تانى 
                        if (totalString.Length == 1)
                        {
                            productWithoutCode.IsUsed = true;
                            productWithoutCode.Meter = 0;
                            productWithoutCode.Centi = 0;
                            productWithoutCode.Qty = 0;
                        }
                        else
                        {
                            productWithoutCode.Centi = totalString.Length > 1 ? Convert.ToDecimal("." + totalString[1]) : 0;
                            productWithoutCode.Qty = totalQty <= 0 ? 0 : totalQty;
                            if (productWithoutCode.Centi <= Convert.ToDecimal(0.0000))
                            {
                                productWithoutCode.IsUsed = true;
                            }
                        }

                        //productWithoutCode.IsUsed = productWithoutCode.Meter < 0 ? true : false;

                        Edit(productWithoutCode);
                        Save();

                        DtoTransactionProductSize dtoTransactionProductSize = new DtoTransactionProductSize()
                        {
                            productId = dtoProductSize.productId,
                            date = DateTime.Now,
                            width = dtoProductSize.width,
                            height = dtoProductSize.hight,
                            size = dtoProductSize.size,
                            code = dtoProductSize.code == "" ? null : dtoProductSize.code,
                            meter = dtoProductSize.meter,
                            centi = Convert.ToDecimal(dtoProductSize.centi),
                            qty = dtoProductSize.quantity ?? 0,
                            type = "حذف كميات من فاتورة مشتريات",
                            invoicesNo = dtoProductSize.invoiceNo,
                            serial = dtoProductSize.id.ToString()
                        };

                        _transactionProductSizeRepository.AddTransactionProductSize(dtoTransactionProductSize);

                    }
                }
                else
                {
                    var productWithCode = FindBy(c => c.ProductId == dtoProductSize.productId && c.Code == dtoProductSize.code && c.IsUsed == null).FirstOrDefault();

                    if (productWithCode != null)
                    {
                        var lastTotal = productWithCode.Meter + Convert.ToDouble(productWithCode.Centi);

                        var currentTotal = dtoProductSize.meter + Convert.ToDouble(dtoProductSize.centi);

                        var total = (lastTotal - currentTotal).ToString();

                        string[] totalString = total.Split(".");

                        var totalQty = productWithCode.Qty - dtoProductSize.quantity;

                        // التحقق من ان المنتج النهائى اقل من الصفر على افتراض ان المنتج دخل اول مرة وبعد كدا رجع تانى 
                        if (totalString.Length == 1)
                        {
                            productWithCode.IsUsed = true;
                            productWithCode.Meter = 0;
                            productWithCode.Centi = 0;
                            productWithCode.Qty = 0;
                        }
                        else
                        {
                            productWithCode.Meter = Convert.ToDouble(totalString[0]);
                            productWithCode.Centi = totalString.Length > 1 ? Convert.ToDecimal("." + totalString[1]) : 0;
                            productWithCode.Qty = totalQty <= 0 ? 0 : totalQty;
                            if (productWithCode.Centi <= Convert.ToDecimal(0.0000))
                            {
                                productWithCode.IsUsed = true;
                            }
                        }
                        Edit(productWithCode);
                        Save();

                        DtoTransactionProductSize dtoTransactionProductSize = new DtoTransactionProductSize()
                        {
                            productId = dtoProductSize.productId,
                            date = DateTime.Now,
                            width = dtoProductSize.width,
                            height = dtoProductSize.hight,
                            size = dtoProductSize.size,
                            code = dtoProductSize.code == "" ? null : dtoProductSize.code,
                            meter = dtoProductSize.meter,
                            centi = Convert.ToDecimal(dtoProductSize.centi),
                            qty = dtoProductSize.quantity ?? 0,
                            type = "حذف كميات من فاتورة مشتريات",
                            invoicesNo = dtoProductSize.invoiceNo,
                            serial = dtoProductSize.id.ToString()
                        };

                        _transactionProductSizeRepository.AddTransactionProductSize(dtoTransactionProductSize);

                    }
                }
            }
        }

        public void DeleteProductSizeFromInvoices(DtoInvoicesDetails dtoInvoicesDetails)
        {
            if (dtoInvoicesDetails != null)
            {
                if (dtoInvoicesDetails.code == "" || dtoInvoicesDetails.code == null)
                {
                    var productWithoutCode = FindBy(c => c.ProductId == dtoInvoicesDetails.productId && c.Width == dtoInvoicesDetails.width && c.Height == dtoInvoicesDetails.hight && c.Size == dtoInvoicesDetails.size && c.Code == null && c.IsUsed == null).FirstOrDefault();//&& c.Size == dtoProductSize.size && c.Width == dtoProductSize.width && c.Height == dtoProductSize.height && c.Code == null && c.IsUsed == null).FirstOrDefault();

                    if (productWithoutCode != null)
                    {
                        var lastTotal = productWithoutCode.Meter + Convert.ToDouble(productWithoutCode.Centi);

                        var currentTotal = dtoInvoicesDetails.meter + Convert.ToDouble(dtoInvoicesDetails.centi);

                        var total = (lastTotal + currentTotal).ToString();

                        string[] totalString = total.Split(".");

                        var totalQty = productWithoutCode.Qty + dtoInvoicesDetails.quantity;

                        productWithoutCode.Meter = Convert.ToDouble(totalString[0]);
                        productWithoutCode.Centi = totalString.Length > 1 ? Convert.ToDecimal("." + totalString[1]) : 0;
                        productWithoutCode.Qty = totalQty <= 0 ? 0 : totalQty;

                        Edit(productWithoutCode);
                        Save();
                    }
                    else
                    {
                        var productWithoutCodeUsed = FindBy(c => c.ProductId == dtoInvoicesDetails.productId && c.Width == dtoInvoicesDetails.width && c.Height == dtoInvoicesDetails.hight && c.Size == dtoInvoicesDetails.size && c.Code == null && c.IsUsed == true).OrderByDescending(x => x.Id).FirstOrDefault();

                        if (productWithoutCodeUsed != null)
                        {
                            var lastTotal = productWithoutCodeUsed.Meter + Convert.ToDouble(productWithoutCodeUsed.Centi);

                            var currentTotal = dtoInvoicesDetails.meter + Convert.ToDouble(dtoInvoicesDetails.centi);

                            var total = (lastTotal + currentTotal).ToString();

                            string[] totalString = total.Split(".");

                            var totalQty = productWithoutCodeUsed.Qty + dtoInvoicesDetails.quantity;

                            productWithoutCodeUsed.Meter = Convert.ToDouble(totalString[0]);
                            productWithoutCodeUsed.Centi = totalString.Length > 1 ? Convert.ToDecimal("." + totalString[1]) : 0;
                            productWithoutCodeUsed.Qty = totalQty <= 0 ? 0 : totalQty;
                            productWithoutCodeUsed.IsUsed = null;

                            Edit(productWithoutCodeUsed);
                            Save();
                        }
                    }
                }
                else
                {
                    var productWithCode = FindBy(c => c.ProductId == dtoInvoicesDetails.productId && c.Width == dtoInvoicesDetails.width && c.Height == dtoInvoicesDetails.hight && c.Size == dtoInvoicesDetails.size && c.Code == dtoInvoicesDetails.code && c.IsUsed == null).FirstOrDefault();

                    if (productWithCode != null)
                    {
                        var lastTotal = productWithCode.Meter + Convert.ToDouble(productWithCode.Centi);

                        var currentTotal = dtoInvoicesDetails.meter + Convert.ToDouble(dtoInvoicesDetails.centi);

                        var total = (lastTotal + currentTotal).ToString();

                        string[] totalString = total.Split(".");

                        var totalQty = productWithCode.Qty + dtoInvoicesDetails.quantity;

                        productWithCode.Meter = Convert.ToDouble(totalString[0]);
                        productWithCode.Centi = totalString.Length > 1 ? Convert.ToDecimal("." + totalString[1]) : 0;
                        productWithCode.Qty = totalQty <= 0 ? 0 : totalQty;

                        Edit(productWithCode);
                        Save();
                    }
                    else
                    {
                        var productWithCodeIsUsed = FindBy(c => c.ProductId == dtoInvoicesDetails.productId && c.Width == dtoInvoicesDetails.width && c.Height == dtoInvoicesDetails.hight && c.Size == dtoInvoicesDetails.size && c.Code == dtoInvoicesDetails.code && c.IsUsed == true).OrderByDescending(x => x.Id).FirstOrDefault();

                        if (productWithCodeIsUsed != null)
                        {
                            var lastTotal = productWithCodeIsUsed.Meter + Convert.ToDouble(productWithCodeIsUsed.Centi);

                            var currentTotal = dtoInvoicesDetails.meter + Convert.ToDouble(dtoInvoicesDetails.centi);

                            var total = (lastTotal + currentTotal).ToString();

                            string[] totalString = total.Split(".");

                            var totalQty = productWithCodeIsUsed.Qty + dtoInvoicesDetails.quantity;

                            productWithCodeIsUsed.Meter = Convert.ToDouble(totalString[0]);
                            productWithCodeIsUsed.Centi = totalString.Length > 1 ? Convert.ToDecimal("." + totalString[1]) : 0;
                            productWithCodeIsUsed.Qty = totalQty <= 0 ? 0 : totalQty;
                            productWithCodeIsUsed.IsUsed = null;

                            Edit(productWithCodeIsUsed);
                            Save();
                        }
                    }
                }


                //حركة الصنف
                DtoTransactionProductSize dtoTransactionProductSize = new DtoTransactionProductSize()
                {
                    productId = dtoInvoicesDetails.productId,
                    date = DateTime.Now,
                    width = dtoInvoicesDetails.width ?? 0,
                    height = dtoInvoicesDetails.hight ?? 0,
                    size = dtoInvoicesDetails.size ?? 0,
                    code = dtoInvoicesDetails.code == "" ? null : dtoInvoicesDetails.code,
                    meter = dtoInvoicesDetails.meter ?? 0,
                    centi = Convert.ToDecimal(dtoInvoicesDetails.centi),
                    qty = dtoInvoicesDetails.quantity ?? 0,
                    type = "حذف من فاتورة مبيعات",
                    invoicesNo = dtoInvoicesDetails.invoiceId,
                    serial = dtoInvoicesDetails.id.ToString()
                };

                _transactionProductSizeRepository.AddTransactionProductSize(dtoTransactionProductSize);
            }
        }

        public List<DtoProductSize> GetProductDetails()
        {
            var resultlist = new List<DtoProductSize>();
            var result = (from q in Context.TblProductSizes.AsNoTracking().Where(x => x.IsUsed == null && x.Product.IsDelete == null)
                          select new DtoProductSize
                          {
                              id = q.Id,
                              productId = q.ProductId,
                              centi = q.Centi,
                              meter = q.Meter,
                              code = q.Code,
                              height = q.Height,
                              qty = q.Qty,
                              size = q.Size,
                              width = q.Width
                          }).ToList();

            foreach (var item in result)
            {
                bool total = ((item.meter + Convert.ToDouble(item.centi)) > 0) ? true : false;
                if (total == true)
                {
                    item.centiString = item.centi.ToString().Split(".")[1];

                    resultlist.Add(item);
                }
            }

            return resultlist;
        }

        public void ResetProductQty(int? ProductId)
        {
            var result = FindBy(x => x.ProductId == ProductId && x.IsUsed == null).ToList();

            foreach (var item in result)
            {
                item.IsUsed = true;

                Edit(item);
                Save();
            }
        }


        public void DeleteProductQty(int? Id)
        {
            var result = FindBy(x => x.Id == Id && x.IsUsed == null).FirstOrDefault();

            result.IsUsed = true;

            Edit(result);
            Save();
        }
    }
}

using ContextERP.Models;
using DtoERP.Dto;
using IERPRepository.IERPRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ERPRepository.ERPRepository
{
    public class ProductRepository : GenericRepository<ERPDBContext, TblProduct>, IProductRepository
    {
        private readonly IProductNumberRepository _productNumberRepository;

        public ProductRepository(IProductNumberRepository productNumberRepository)
        {
            _productNumberRepository = productNumberRepository;
        }

        public DtoProduct AddEditProduct(DtoProduct dtoProduct)
        {
            if (dtoProduct != null)
            {
                if (dtoProduct.id > 0)
                {
                    var isExist = FindBy(x => x.Id == dtoProduct.id).FirstOrDefault();

                    if (isExist != null)
                    {
                        isExist.CategoryId = dtoProduct.categoryId;
                        isExist.Name = dtoProduct.name;
                        isExist.PriceSupplier = dtoProduct.priceSupplier;
                        isExist.PriceSelling = dtoProduct.priceSelling;
                        isExist.Type = dtoProduct.type;

                        Edit(isExist);
                        Save();
                    }
                }
                else
                {
                    var objProduct = new TblProduct()
                    {
                        CategoryId = dtoProduct.categoryId,
                        Name = dtoProduct.name,
                        PriceSupplier = dtoProduct.priceSupplier,
                        PriceSelling = dtoProduct.priceSelling,
                        Type = dtoProduct.type
                    };
                    Add(objProduct);
                    Save();

                    dtoProduct.id = objProduct.Id;

                    return dtoProduct;
                }
            }

            return dtoProduct;
        }

        public List<DtoProduct> selectProduct()
        {
            var result = (from q in Context.TblProducts.AsNoTracking().Where(x => x.IsDelete == null)
                          select new DtoProduct
                          {
                              id = q.Id,
                              categoryId = q.CategoryId,
                              categoryName = q.Category.Name,
                              name = q.Name,
                              priceSelling = q.PriceSelling,
                              priceSupplier = q.PriceSupplier,
                              type = q.Type
                          }).OrderBy(x => x.name).ToList();

            return result;
        }

        public void deleteProduct(int? id)
        {
            var isExist = FindBy(x => x.Id == id).FirstOrDefault();

            if (isExist != null)
            {
                isExist.IsDelete = true;

                Edit(isExist);
                Save();

                //  _productNumberRepository.DeleteProductNumber(isExist.Id);
            }
        }

        public bool? CheckExistsProduct(string name, int? id = 0)
        {
            var isExist = FindBy(x => x.Id != id && x.Name == name && x.IsDelete == null).Any();

            return isExist;
        }

        public List<DtoProduct> selectProductForDrop()
        {
            var result = (from q in Context.TblProducts.AsNoTracking().Where(x => x.IsDelete == null)
                          select new DtoProduct
                          {
                              id = q.Id,
                              name = q.Name,
                              type = q.Type
                          }).OrderBy(x => x.name).ToList();

            return result;
        }

        public List<DtoProduct> selectProductForStore()
        {
            var result = new List<DtoProduct>();

            var resultProductNumber = (from q in Context.TblProductNumbers.AsNoTracking().Where(x => x.Product.IsDelete == null)//&& x.IsUsed == null)
                                       select new
                                       {
                                           productId = q.ProductId,
                                           name = q.Product.Name,
                                           priceSelling = q.Product.PriceSelling,
                                           priceSupplier = q.Product.PriceSupplier,
                                           qty = q.Qty
                                       }).GroupBy(x => new
                                       {
                                           x.productId,
                                           x.name,
                                           x.priceSelling,
                                           x.priceSupplier
                                       }).Select(x =>
                                       new DtoProduct
                                       {
                                           productId = x.Key.productId,
                                           name = x.Key.name,
                                           priceSelling = x.Key.priceSelling,
                                           priceSupplier = x.Key.priceSupplier,
                                           qty = x.Sum(z => z.qty) ?? 0,
                                           sumCenti = 0,
                                           sumMeter = 0,
                                           type = false,
                                           typeText = "النوع عدد"
                                       }).ToList();


            var resultProductSize = (from q in Context.TblProductSizes.AsNoTracking().Where(x => x.Product.IsDelete == null) //&& x.IsUsed == null)
                                     select new DtoProduct
                                     {
                                         productId = q.ProductId,
                                         name = q.Product.Name,
                                         priceSelling = q.Product.PriceSelling,
                                         priceSupplier = q.Product.PriceSupplier,
                                         qty = q.Qty,
                                         sumCenti = q.Centi,
                                         sumMeter = q.Meter
                                     }).GroupBy(x => new
                                     {
                                         x.productId,
                                         x.name,
                                         x.priceSelling,
                                         x.priceSupplier
                                     }).Select(x =>
                                     new DtoProduct
                                     {
                                         productId = x.Key.productId,
                                         name = x.Key.name,
                                         priceSelling = x.Key.priceSelling,
                                         priceSupplier = x.Key.priceSupplier,
                                         qty = x.Sum(z => z.qty) ?? 0,
                                         sumCenti = x.Sum(z => z.sumCenti) ?? 0,
                                         sumMeter = x.Sum(z => z.sumMeter) ?? 0,
                                         type = true,
                                         typeText = "النوع متر مكعب"
                                     }).ToList();

            result.AddRange(resultProductSize);

            result.AddRange(resultProductNumber);

            return result.OrderBy(x => x.name).ToList();
        }

        // عرض مجموع المخزن وتفاصيل المخزن
        public List<DtoProduct> selectProductForStores()
        {
            var result = (from q in Context.TblProducts.AsNoTracking().Where(x => x.IsDelete == null)
                          select new DtoProduct
                          {
                              productId = q.Id,
                              name = q.Type == true ? q.Name : (q.Name + " - " + q.TblProductNumbers.Where(x => x.IsUsed == null && x.ProductId == q.Id).Select(x => x.Code).FirstOrDefault()),
                              qty = q.Type == true ? q.TblProductSizes.Where(x => x.IsUsed == null).Sum(z => z.Qty) ?? 0 : q.TblProductNumbers.Where(x => x.IsUsed == null).Sum(z => z.Qty) ?? 0,
                              sumCenti = q.TblProductSizes.Where(x => x.IsUsed == null).Sum(z => z.Centi) ?? 0,
                              sumMeter = q.TblProductSizes.Where(x => x.IsUsed == null).Sum(z => z.Meter) ?? 0,
                              countMeter = q.TblProductSizes.Where(x => x.IsUsed == null).Count(),
                              countCenti = q.TblProductSizes.Where(x => x.IsUsed == null).Count(),
                              type = q.Type,
                              typeText = q.Type == true ? "النوع متر مكعب" : "النوع عدد",
                              listProductSize = q.TblProductSizes.Where(x => x.IsUsed == null).Select(x => new DtoProductSize
                              {
                                  code = x.Code,
                                  centi = x.Centi,
                                  _centiString = x.Centi.ToString(),
                                  meter = (int)x.Meter,
                                  qty = x.Qty,
                                  height = x.Height,
                                  width = x.Width,
                                  size = x.Size
                              }).ToList()
                          }
                          ).OrderByDescending(x => x.name).ToList();

            foreach (var item in result)
            {
                if (item.type == true && item.countMeter > 0)
                {
                    var total = (item.sumMeter + Convert.ToDouble(item.sumCenti));

                    total = Math.Round((double)total, 4);
                    string ss = total.ToString();
                    item.sumMeter = Convert.ToDouble(ss.Split(".")[0]);
                    item.sumCenti = Convert.ToDecimal(ss.Split(".")[1]);
                    item.sumCentiString = ss.Split(".")[1]== null ? "0" : ss.Split(".")[1];
                    item.sumCentiString = item.sumCentiString.Length == 4 ? item.sumCentiString : (item.sumCentiString.Length == 3 ? (item.sumCentiString +"0") : item.sumCentiString.Length == 2 ?(item.sumCentiString +"00") : (item.sumCentiString + "000"));
                }
            }

            return result;
        }

        public List<DtoProductSize> selectProductForDetails()
        {
            var result = (from q in Context.TblProductNumbers.AsNoTracking().Where(x => x.Product.IsDelete == null && x.IsUsed == null)
                          select new DtoProductSize
                          {
                              productId = q.ProductId,
                              productName = q.Product.Name,
                              width = 0,
                              height = 0,
                              size = 0,
                              meter = 0,
                              centi = 0,
                              qty = q.Qty,
                              typeText = "النوع عدد"
                          }).Concat(from q in Context.TblProductSizes.AsNoTracking().Where(x => x.Product.IsDelete == null && x.IsUsed == null)
                                    select new DtoProductSize
                                    {
                                        productId = q.ProductId,
                                        productName = q.Product.Name,
                                        width = q.Width,
                                        height = q.Height,
                                        size = q.Size,
                                        meter = (int)q.Meter,
                                        centi = (int)q.Centi,
                                        qty = q.Qty,
                                        typeText = "النوع متر مكعب"
                                    }).OrderBy(x => x.productId).ToList();

            return result;
        }

        public object selectTotalStore()
        {
            var totalQty = Context.TblProductNumbers.Where(x => x.Product.IsDelete == null && x.IsUsed == null).Sum(x => x.Qty);
            var totalMeter = Context.TblProductSizes.Where(x => x.Product.IsDelete == null && x.IsUsed == null).Sum(x => x.Meter);
            var totalCenti = Context.TblProductSizes.Where(x => x.Product.IsDelete == null && x.IsUsed == null).Sum(x => x.Centi);

            string totalCentiStr = totalCenti.ToString();

            string totalCentiStr1 = totalCentiStr.Split(".")[0];
            string totalCentiStr2 = totalCentiStr.Split(".")[1];

            int? totalCentiNum = Convert.ToInt32(totalCentiStr1);

            if (totalCentiNum > 0)
            {
                totalMeter = totalMeter + totalCentiNum;
                //totalCenti = Convert.ToDecimal(totalCentiStr2);
            }

            var total = new
            {
                totalQty,
                totalMeter,
                //totalCenti
                totalCentiStr2
            };

            return total;
        }

        public List<DtoTransactionProductSize> selectTransactionProduct()
        {
            var result = (from q in Context.TblTransactionProductSizes.AsNoTracking().Where(x => x.Product.IsDelete == null)

                          select new DtoTransactionProductSize
                          {
                              id = q.Id,
                              categoryName = q.Product.Category.Name,
                              productId = q.ProductId,
                              productName = q.Product.Name,
                              date = q.Date,
                              width = q.Width,
                              height = q.Height,
                              size = q.Size,
                              code = q.Code,
                              meter = q.Meter,
                              centi = q.Centi,
                              //centii =q.Centi.ToString().Split(".")[1],
                              qty = q.Qty ?? 0,
                              priceSelling = q.PriceSelling,
                              priceSupplier = q.PriceSupplier,
                              type = q.Type,
                              invoicesNo = q.InvoicesNo ?? 0
                          }).ToList();


            foreach (var item in result)
            {
                string centii = item.centi.ToString().Split(".")[1];
                item.centii = centii;
            }

            var listproductQTY = (from q in Context.TblTransactionProductNumbers.AsNoTracking().Where(x => x.Product.IsDelete == null)
                                  select new DtoTransactionProductSize
                                  {
                                      id = q.Id,
                                      categoryName = q.Product.Category.Name,
                                      productId = q.ProductId,
                                      productName = q.Product.Name,
                                      date = q.Date,
                                      width = 0,
                                      height = 0,
                                      size = 0,
                                      code = q.Code,
                                      meter = 0,
                                      centi = 0,
                                      qty = q.Qty ?? 0,
                                      priceSelling = q.PriceSelling,
                                      priceSupplier = q.PriceSupplier,
                                      type = q.Type,
                                      invoicesNo = q.InvoicesNo ?? 0
                                  }).ToList();

            result.AddRange(listproductQTY);

            return result.OrderByDescending(x=>x.id).ToList();
        }
        public List<DtoProduct> selectProductForTransaction()
        {
            var result = (from q in Context.TblProducts.AsNoTracking().Where(x => x.IsDelete == null)
                          select new DtoProduct
                          {
                              id = q.Id,
                              name = q.Name,
                              type = q.Type
                          }).OrderByDescending(x => x.id).ToList();

            return result;
        }

        public void UpdatePrice(int? productId, decimal? priceSupplier, decimal? priceSelling)
        {
            var isExist = FindBy(x => x.Id == productId && x.IsDelete == null).FirstOrDefault();

            if (isExist != null)
            {
                isExist.PriceSelling = priceSelling;
                isExist.PriceSupplier = priceSupplier;

                Edit(isExist);
                Save();
            }
        }

        public List<DtoNewProduct> selectProductForInvoices()
        {
            var result = (from q in Context.TblProducts.AsNoTracking().Where(x => x.IsDelete == null)
                          select new DtoNewProduct
                          {
                              id = q.Id,
                              name = q.Name,
                              type = q.Type,
                              priceSelling = q.PriceSelling,
                              listProductNumber = q.TblProductNumbers.Where(x => x.IsUsed == null).Select(x => new DtoProductNumber
                              {
                                  code = x.Code,
                                  qty = x.Qty
                              }).ToList(),
                              //listProductSize = q.TblProductSizes.Where(x => x.IsUsed == null).Select(x => new DtoProductSize
                              //{
                              //    width = x.Width,
                              //    height = x.Height,
                              //    size = x.Size,
                              //    code = x.Code,
                              //    meter = (int)x.Meter,
                              //    centi = x.Centi,
                              //    qty = x.Qty
                              //}).ToList()
                              listProductSize = q.TblProductSizes.Where(x => x.IsUsed == null).Select(x => new DtoNewProductSize
                              {
                                  width = x.Width.ToString(),
                                  height = x.Height.ToString(),
                                  size = x.Size.ToString(),
                                  code = x.Code,
                                  meter =  x.Meter.ToString(),
                                  centi = x.Centi.ToString(),
                                  qty = x.Qty
                              }).ToList()
                          }).OrderByDescending(x => x.id).ToList();

            foreach (var item in result)
            {
                foreach (var pro in item.listProductSize)
                {
                    pro.centi = pro.centi.Split(".")[1];
                }
            }

            return result;
        }
    }
}

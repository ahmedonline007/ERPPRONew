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
    public class TransactionSupplierCustomerRepository : GenericRepository<ERPDBContext, TblTransactionSupplierCustomer>, ITransactionSupplierCustomerRepository
    {
        public void AddTransactionSupplierCustomer(DtoTransactionSupplierCustomer dtoTransactionSupplierCustomer)
        {
            if (dtoTransactionSupplierCustomer != null)
            {
                var objTransaction = new TblTransactionSupplierCustomer()
                {
                    CustomerId = dtoTransactionSupplierCustomer.customerId,
                    Date = dtoTransactionSupplierCustomer.date,
                    InvoiceNumber = dtoTransactionSupplierCustomer.invoiceNumber,
                    Debit = dtoTransactionSupplierCustomer.debit,
                    Credit = dtoTransactionSupplierCustomer.credit,
                    Total = dtoTransactionSupplierCustomer.total,
                    Type = dtoTransactionSupplierCustomer.type,
                    Description = dtoTransactionSupplierCustomer.description
                };

                Add(objTransaction);
                Save();
            }
        }

        public List<DtoTransactionSupplierCustomer> SelectTransactionSupplierCustomer(bool? flag)
        {
            var result = (from q in Context.TblTransactionSupplierCustomers.AsNoTracking().Where(x => x.Customer.Flag == flag && x.Customer.IsDelete == null)
                          select new DtoTransactionSupplierCustomer
                          {
                              id = q.Id,
                              customerId = q.CustomerId,
                              customerName = q.Customer.Name,
                              date = q.Date,
                              invoiceNumber = q.InvoiceNumber,
                              debit = Math.Round((decimal)q.Debit, 2),
                              credit = Math.Round((decimal)q.Credit, 2),
                              total = Math.Round((decimal)q.Total, 2),
                              type = q.Type,
                              description = q.Description,
                              amount = q.Type == "تسجيل مرتجع مبيعات" ? Math.Round((decimal)q.Customer.Credit, 2) : 0,
                              listofItem = (q.InvoiceNumber != "0" && flag == true) ? Context.TblPurchaseOrderDetails
                                          .Where(x => x.Invoice.NumberOfInvoiceBySystem == Convert.ToInt32(q.InvoiceNumber)).Select(x => new DtoInvoicesDetails
                                          {
                                              id = x.Id,
                                              productId = x.ProductId,
                                              productName = x.Product.Name,
                                              width = x.Width ?? 0,
                                              hight = x.Hight ?? 0,
                                              size = x.Size ?? 0,
                                              code = x.Code,
                                              quantity = x.Qty ?? 0,
                                              meter = x.Meter ?? 0,
                                              centi = x.Centi.ToString(),
                                              type = x.Type,
                                              typeText = x.Type == true ? "متر مكعب" : "عدد",
                                              priceSelling = x.PriceSelling,
                                              priceSupplier = x.PriceSupplier
                                          }).ToList()
                                          :
                                         ((q.InvoiceNumber != "0" && flag == false && q.Type != "تسجيل مرتجع مبيعات") ?
                                           Context.TblInvoicesDetails
                                          .Where(x => x.Invoice.NumberOfInvoiceBySystem == Convert.ToInt32(q.InvoiceNumber)).Select(x => new DtoInvoicesDetails
                                          {
                                              id = x.Id,
                                              productId = x.ProductId,
                                              productName = x.Product.Name,
                                              width = x.Width,
                                              hight = x.Height,
                                              size = x.Size,
                                              code = x.Code,
                                              quantity = x.Qty,
                                              meter = x.Meter,
                                              centi = x.Centi.ToString(),
                                              type = x.Type,
                                              typeText = x.Type == true ? "متر مكعب" : "عدد",
                                              priceSelling = x.PriceSelling,
                                              priceSupplier = x.PriceSupplier
                                          }).ToList()
                                          :
                                          Context.TblReturnInvoicesDetails.Where(x => x.Invoice.NumberOfInvoiceBySystem == Convert.ToInt32(q.InvoiceNumber)).Select(x => new DtoInvoicesDetails
                                          {
                                              id = x.Id,
                                              productId = x.ProductId,
                                              productName = x.Product.Name,
                                              width = x.Width,
                                              hight = x.Hight,
                                              size = x.Size,
                                              code = x.Code,
                                              quantity = x.Quantity,
                                              meter = x.Meter,
                                              centi = x.Centi.ToString(),
                                              type = x.Type,
                                              typeText = x.Type == true ? "متر مكعب" : "عدد",
                                              priceSelling = x.PriceReturn
                                          }).ToList()
                                          )
                          }).OrderBy(x => x.id).ToList();

            foreach (var item in result)
            {
                if (item.type == "سداد مديونية")
                {
                    decimal? amount = Math.Round((decimal)(item.credit - item.total), 2);
                    item.amount = amount <= 0 ? 0 : Math.Round((decimal)amount, 2);
                }
            }

            return result;
        }

        public decimal? selectTotalTransactionToday(bool? flag, string date)
        {
            var result = FindBy(x => x.Customer.Flag == flag && x.Customer.IsDelete == null && x.Date == Convert.ToDateTime(date) && x.Type == "سداد مديونية").Sum(x => x.Credit);
            return result;
        }

        public List<DtoTransactionSupplierCustomer> SelectTransactionSupplierCustomerToDay(bool? flag, string date)
        {
            var result = (from q in Context.TblTransactionSupplierCustomers.AsNoTracking().Where(x => x.Customer.Flag == flag && x.Customer.IsDelete == null && x.Date == Convert.ToDateTime(date) && x.Type == " سداد مديونية")
                          select new DtoTransactionSupplierCustomer
                          {
                              id = q.Id,
                              customerId = q.CustomerId,
                              customerName = q.Customer.Name,
                              date = q.Date,
                              invoiceNumber = q.InvoiceNumber,
                              debit = Math.Round((decimal)q.Debit, 2),
                              credit = Math.Round((decimal)q.Credit,2 ),
                              total = Math.Round((decimal)q.Total, 2),
                              type = q.Type,
                              description = q.Description
                          }).OrderBy(x => x.id).ToList();

            return result;
        }
    }
}

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
    public class ReturnInvoicesRepository : GenericRepository<ERPDBContext, TblReturnInvoice>, IReturnInvoicesRepository
    {
        private readonly ITransactionSupplierCustomerRepository _transactionSupplierCustomerRepository;
        private readonly ISupplierCustomerRespository _supplierCustomerRespository;
        private readonly IPayoffaDebtRepository _payoffaDebtRepository;
        public ReturnInvoicesRepository(IPayoffaDebtRepository payoffaDebtRepository, ISupplierCustomerRespository supplierCustomerRespository, ITransactionSupplierCustomerRepository transactionSupplierCustomerRepository)
        {
            _payoffaDebtRepository = payoffaDebtRepository;
            _transactionSupplierCustomerRepository = transactionSupplierCustomerRepository;
            _supplierCustomerRespository = supplierCustomerRespository;
        }

        public object AddReturnInvoices(DtoReturnInvoices dtoReturnInvoices)
        {
            int? maxPurchaseOrder = Context.TblReturnInvoices.AsNoTracking().Max(x => x.NumberOfInvoiceBySystem) ?? 0;

            if (dtoReturnInvoices != null)
            {

                //تسجيل بيانات الفاتورة
                var objReturnInvoice = new TblReturnInvoice()
                {
                    NumberOfInvoiceSupplier = dtoReturnInvoices.numberOfInvoiceSupplier.ToString(),
                    NumberOfInvoiceBySystem = maxPurchaseOrder + 1,
                    ItemCount = dtoReturnInvoices.itemCount ?? 0,
                    Date = DateTime.Now,
                    TotalInvoice = dtoReturnInvoices.totalInvoice ?? 0,
                    //فى حالة انه عمل نعم هيتم اضافة مبلغ المتبقى فى المدفوع علشان يظهر للراجل انه دفع
                    Payed = dtoReturnInvoices.isPayed == true ? dtoReturnInvoices.amount : 0,
                    Amount = dtoReturnInvoices.isPayed == false ? dtoReturnInvoices.amount : 0,
                    CustomerId = dtoReturnInvoices.customerId
                };

                Add(objReturnInvoice);
                Save();

                //تسجيل حركة للعميل
                DtoTransactionSupplierCustomer objTransaction = new DtoTransactionSupplierCustomer()
                {
                    customerId = dtoReturnInvoices.customerId,
                    date = DateTime.Now,
                    invoiceNumber = objReturnInvoice.NumberOfInvoiceBySystem.ToString(),
                    debit = dtoReturnInvoices.isPayed == false ? dtoReturnInvoices.amount : 0,//dtoReturnInvoices.amount,
                    credit = dtoReturnInvoices.isPayed == true ? dtoReturnInvoices.amount : 0,// dtoReturnInvoices.payed,
                    total = dtoReturnInvoices.totalInvoice,
                    type = "تسجيل مرتجع مبيعات"
                };

                _transactionSupplierCustomerRepository.AddTransactionSupplierCustomer(objTransaction);

                // فى حالة استرداد الفلوس
                if (dtoReturnInvoices.isPayed == true)
                {
                    _supplierCustomerRespository.UpdateCreditDebitForReturnInvoices(dtoReturnInvoices.customerId, dtoReturnInvoices.totalInvoice);
                }
                //فى حالة ان لم يسترد الفلوس
                if (dtoReturnInvoices.isPayed == false)
                {
                    var objPayment = new DtoPayoffaDebt()
                    {
                        customerId = dtoReturnInvoices.customerId,
                        debtDate = DateTime.Now,
                        describtion = "سداد مديونية - مرتجع مبيعات",
                        isReturn = true,
                        debt = dtoReturnInvoices.amount
                    };

                    var objPayed = _payoffaDebtRepository.AddEditPayedOff(objPayment);
                }

                var obj = new
                {
                    id = objReturnInvoice.Id,
                    invoicesNo = objReturnInvoice.NumberOfInvoiceBySystem
                };

                return obj;
            }

            return 0;
        }

        
        public List<DtoReturnInvoices> selectAllReturnInvoices()
        {
            var result = (from q in Context.TblReturnInvoices.AsNoTracking().Where(x => x.IsDelate == null)
                          let customerNmae = Context.TblSupplierCustomers.Where(x => x.Id == q.CustomerId).FirstOrDefault().Name
                          select new DtoReturnInvoices
                          {
                              id = q.Id,
                              numberOfInvoiceSupplier = Convert.ToInt32(q.NumberOfInvoiceSupplier),
                              numberOfInvoiceBySystem = q.NumberOfInvoiceBySystem,
                              itemCount = q.ItemCount,
                              date = q.Date,
                              totalInvoice = Math.Round((decimal)q.TotalInvoice, 2),
                              payed = Math.Round((double)q.Payed, 2),
                              amount = Math.Round((decimal)q.Amount, 2),
                              customerId = q.CustomerId,
                              customerName = customerNmae,
                              listReturnInvoicesDetails = q.TblReturnInvoicesDetails.Select(x => new DtoReturnInvoicesDetails
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
                                  priceReturn = x.PriceReturn
                              }).ToList()
                          }).OrderByDescending(x => x.date).ToList();

            return result;
        }

        //جميع المبالغ الفواتير المرتجعات المدفوعات
        public decimal? selectAllReturnInvoicesToday(string date)
        {
            var result = Context.TblReturnInvoices.AsNoTracking().Where(x => x.IsDelate == null && x.Date == Convert.ToDateTime(date)).Sum(x => x.Payed);

            return result;
        }


        public decimal? selectAllTotalReturnInvoicesToday(string date)
        {
            var result = Context.TblReturnInvoices.AsNoTracking().Where(x => x.IsDelate == null && x.Date == Convert.ToDateTime(date)).Sum(x => x.TotalInvoice);

            return result;
        }
    }
}

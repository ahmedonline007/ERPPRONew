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
    public class InvoicesRepository : GenericRepository<ERPDBContext, TblInvoice>, IInvoicesRepository
    {
        private readonly ITransactionSupplierCustomerRepository _transactionSupplierCustomerRepository;
        private readonly ISupplierCustomerRespository _supplierCustomerRespository;
        private readonly ITransactionSupplierCustomerStoreRepository _transactionSupplierCustomerStoreRepository;
        private readonly IInvoicesDetailsRepository _invoicesDetailsRepository;

        public InvoicesRepository(ITransactionSupplierCustomerRepository transactionSupplierCustomerRepository,
                                  ISupplierCustomerRespository supplierCustomerRespository,
                                  ITransactionSupplierCustomerStoreRepository transactionSupplierCustomerStoreRepository,
                                  IInvoicesDetailsRepository invoicesDetailsRepository)
        {
            _transactionSupplierCustomerStoreRepository = transactionSupplierCustomerStoreRepository;
            _transactionSupplierCustomerRepository = transactionSupplierCustomerRepository;
            _supplierCustomerRespository = supplierCustomerRespository;
            _invoicesDetailsRepository = invoicesDetailsRepository;
        }

        public object AddNewInvoices(DtoInvoices dtoInvoices)
        {
            if (dtoInvoices != null)
            {
                //  تسجيل فاتورة مبيعات جديدة
                var objInvoices = new TblInvoice()
                {
                    NumberOfInvoiceBySystem = dtoInvoices.invoiceNumber, //maxInvoices + 1,
                    ItemCount = dtoInvoices.itemCount,
                    Date = dtoInvoices.date,
                    TotalInvoice = dtoInvoices.totalInvoice,
                    Payed = dtoInvoices.payed,
                    Amount = dtoInvoices.amount,
                    CustomerId = dtoInvoices.customerId,
                    Description = dtoInvoices.description,
                    Descount = dtoInvoices.descount,
                    ExpencesInvoices = dtoInvoices.expencesInvoices
                };

                Add(objInvoices);
                Save();

                // تسجيل حركة بيع للعميل
                DtoTransactionSupplierCustomer objTransaction = new DtoTransactionSupplierCustomer()
                {
                    customerId = dtoInvoices.customerId,
                    date = dtoInvoices.date,
                    invoiceNumber = objInvoices.NumberOfInvoiceBySystem.ToString(),
                    debit = dtoInvoices.amount,
                    credit = dtoInvoices.payed,
                    total = dtoInvoices.totalInvoice,
                    type = "تسجيل فاتورة مبيعات"
                };
                _transactionSupplierCustomerRepository.AddTransactionSupplierCustomer(objTransaction);

                //اضافة حركة ترصيد جديدة
                DtoTransactionSupplierCustomerStore store = new DtoTransactionSupplierCustomerStore()
                {
                    CustomerId = dtoInvoices.customerId,
                    Date = dtoInvoices.date, //DateTime.Now,
                    InvoiceNumber = objInvoices.NumberOfInvoiceBySystem.ToString(),
                    Total = dtoInvoices.totalInvoice ?? 0,
                    Credit = dtoInvoices.payed ?? 0,
                    Debit = dtoInvoices.amount ?? 0,
                    // فى حالة ان المدفوع اكبرمن الاجمالى
                    Amount = dtoInvoices.payed > dtoInvoices.totalInvoice ? Math.Round((decimal)(dtoInvoices.payed - dtoInvoices.totalInvoice), 2) : 0,
                    Type = "تسجيل فاتورة مبيعات"
                };

                _transactionSupplierCustomerStoreRepository.AddTransactionStore(store);


                //تعديل خزنة العميل مع تسجيل قيم الفلوس
                _supplierCustomerRespository.UpdateCreditDebit(dtoInvoices.customerId, dtoInvoices.payed, dtoInvoices.amount, dtoInvoices.totalInvoice, objInvoices.NumberOfInvoiceBySystem.ToString());

                var obj = new
                {
                    id = objInvoices.Id,
                    invoicesNo = objInvoices.NumberOfInvoiceBySystem
                };

                return obj;
            }

            return 0;
        }

        public DtoInvoices selectInvoicesById(int? id)
        {
            var result = (from q in Context.TblInvoices.AsNoTracking().Where(x => x.Id == id && x.IsDelete == null)
                          select new DtoInvoices
                          {
                              id = q.Id,
                              numberOfInvoiceBySystem = q.NumberOfInvoiceBySystem,
                              itemCount = q.ItemCount ?? 0,
                              date = q.Date,
                              descount = q.Descount,
                              totalInvoice = Math.Round((decimal)q.TotalInvoice, 2),
                              payed = Math.Round((decimal)q.Payed, 2),
                              amount = Math.Round((decimal)q.Amount, 2),
                              expencesInvoices = Math.Round((decimal)q.ExpencesInvoices, 2),
                              customerId = q.CustomerId,
                              customerName = q.Customer.Name,
                              description = q.Description,
                              listInvoicesDetails = q.TblInvoicesDetails.Where(z => z.IsDeleted == null).Select(x => new DtoInvoicesDetails
                              {
                                  id = x.Id,
                                  productId = x.ProductId,
                                  productName = x.Product.Name,
                                  width = x.Width ?? 0,
                                  hight = x.Height ?? 0,
                                  size = x.Size ?? 0,
                                  code = x.Code,
                                  quantity = x.Qty ?? 0,
                                  meter = x.Meter ?? 0,
                                  centi = x.Centi.ToString(),
                                  type = x.Type,
                                  typeText = x.Type == true ? "متر مكعب" : "عدد",
                                  priceSelling = x.PriceSelling,
                                  priceSupplier = x.PriceSupplier,
                                  total = 0
                              }).ToList()
                          }).FirstOrDefault();

            return result;
        }

        public List<DtoInvoices> selectAllInvoices()
        {
            var result = (from q in Context.TblInvoices.AsNoTracking().Where(x => x.IsDelete == null)
                          select new DtoInvoices
                          {
                              id = q.Id,
                              description = q.Description,
                              numberOfInvoiceBySystem = q.NumberOfInvoiceBySystem,
                              itemCount = q.ItemCount,
                              date = q.Date,
                              descount = q.Descount ?? 0,
                              totalInvoiceWithoutDescount = Math.Round((decimal)((q.TotalInvoice + q.Descount) - q.ExpencesInvoices), 2),
                              totalInvoice = Math.Round((decimal)q.TotalInvoice, 2),
                              payed = Math.Round((decimal)q.Payed, 2),
                              amount = Math.Round((decimal)q.Amount, 2),
                              expencesInvoices = q.ExpencesInvoices == null ? 0 : Math.Round((decimal)q.ExpencesInvoices, 2),
                              customerId = q.CustomerId,
                              customerName = q.Customer.Name,
                              listInvoicesDetails = q.TblInvoicesDetails.Where(x => x.IsDeleted == null).Select(x => new DtoInvoicesDetails
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
                                  priceSupplier = x.PriceSupplier,
                              }).ToList()
                          }).OrderByDescending(x => x.date).ThenByDescending(x => x.numberOfInvoiceBySystem).ToList();

            return result;
        }

        public List<DtoInvoices> selectAllInvoicesToday(string date)
        {
            var today = DateTime.Now.Date;

            var result = (from q in Context.TblInvoices.AsNoTracking().Where(x => x.IsDelete == null && x.Date == Convert.ToDateTime(date))
                          select new DtoInvoices
                          {
                              id = q.Id,
                              description = q.Description,
                              numberOfInvoiceBySystem = q.NumberOfInvoiceBySystem,
                              itemCount = q.ItemCount,
                              date = q.Date,
                              descount = q.Descount,
                              totalInvoiceWithoutDescount = Math.Round((decimal)(q.TotalInvoice + q.Descount), 2),
                              totalInvoice = Math.Round((decimal)q.TotalInvoice, 2),
                              payed = Math.Round((decimal)q.Payed, 2),
                              amount = Math.Round((decimal)q.Amount, 2),
                              expencesInvoices = Math.Round((decimal)q.ExpencesInvoices, 2),
                              customerId = q.CustomerId,
                              customerName = q.Customer.Name,
                              listInvoicesDetails = q.TblInvoicesDetails.Where(x => x.IsDeleted == null).Select(x => new DtoInvoicesDetails
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
                          }).OrderByDescending(x => x.id).ToList();

            return result;
        }

        public List<DtoInvoicesToday> selectAllNewInvoicesToday(string date)
        {
            var today = DateTime.Now.Date;

            var result = new List<DtoInvoicesToday>();

            var allInvoices = (from q in Context.TblInvoices.AsNoTracking().Where(x => x.IsDelete == null && x.Date == Convert.ToDateTime(date))
                               select new DtoInvoicesToday
                               {
                                   id = q.Id,
                                   invoicesNumber = q.NumberOfInvoiceBySystem.ToString(),
                                   totalInvoice = Math.Round((double)q.TotalInvoice, 2),
                                   payed = Math.Round((double)q.Payed, 2),
                                   amount = Math.Round((double)q.Amount, 2),
                                   //expencesInvoices = Math.Round((double)q.ExpencesInvoices, 2),
                                   customerName = q.Customer.Name,
                                   listInvoicesDetails = q.TblInvoicesDetails.Where(x => x.IsDeleted == null).Select(x => new DtoInvoicesDetails
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
                               }).OrderByDescending(x => x.id).ToList();

            //الفواتير المؤجله
            var listAmount = allInvoices.Where(x => x.payed < x.amount).Select(x =>
            new DtoInvoicesToday
            {
                id = x.id,
                invoicesNumber1 = x.invoicesNumber,
                totalInvoice1 = Math.Round((double)x.totalInvoice, 2),
                payed1 = Math.Round((double)x.payed, 2),
                amount1 = Math.Round((double)x.amount, 2),
                customerName1 = x.customerName,
                listInvoicesDetails1 = x.listInvoicesDetails
            }).ToList();

            //الفواتير النقدية
            var listPayed = allInvoices.Where(x => x.payed >= x.amount).Select(x =>
            new DtoInvoicesToday
            {
                id = x.id,
                invoicesNumber2 = x.invoicesNumber,
                totalInvoice2 = Math.Round((double)x.totalInvoice, 2),
                payed2 = Math.Round((double)x.payed, 2),
                amount2 = Math.Round((double)x.amount, 2),
                customerName2 = x.customerName,
                listInvoicesDetails2 = x.listInvoicesDetails
            }).ToList();

            //التحصيلات اليومية
            var listCredit = (from q in Context.TblTransactionSupplierCustomers.AsNoTracking().Where(x => x.Customer.Flag == false && x.Customer.IsDelete == null && x.Date == Convert.ToDateTime(date) && x.Type == " سداد مديونية")
                              select new DtoInvoicesToday
                              {
                                  id = q.Id,
                                  customerName3 = q.Customer.Name,
                                  payed3 = Math.Round((double)q.Credit, 2),
                              }).OrderBy(x => x.id).ToList();




            result.AddRange(listAmount);
            result.AddRange(listPayed);
            result.AddRange(listCredit);

            return result;
        }

        public List<DtoInvoicesToday> _selectAllNewInvoicesToday(string date)
        {
            var today = DateTime.Now.Date;

            var result = new List<DtoInvoicesToday>();

            var allInvoices = (from q in Context.TblInvoices.AsNoTracking().Where(x => x.IsDelete == null && x.Date == Convert.ToDateTime(date))
                               select new DtoInvoicesToday
                               {
                                   id = q.Id,
                                   invoicesNumber = q.NumberOfInvoiceBySystem.ToString(),
                                   totalInvoice = Math.Round((double)q.TotalInvoice, 2),
                                   payed = q.Payed >= q.Amount ? Math.Round((double)q.Payed, 2) : 0,
                                   amount = q.Payed < q.Amount ? Math.Round((double)q.Amount, 2) : 0,
                                   customerName = q.Customer.Name,
                                   date = q.Date.ToString(),
                                   listInvoicesDetails = q.TblInvoicesDetails.Where(x => x.IsDeleted == null).Select(x => new DtoInvoicesDetails
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
                               }).OrderBy(x => x.invoicesNumber).ToList();

            //التحصيلات اليومية
            var listCredit = (from q in Context.TblPayoffaDebts.AsNoTracking().Where(x => x.Customer.Flag == false && x.Customer.IsDelete == null && x.DebtDate == Convert.ToDateTime(date) && x.IsDeleted == null)
                              select new DtoInvoicesToday
                              {
                                  id = q.Id,
                                  customerName3 = q.Customer.Name,
                                  payed3 = Math.Round((double)q.Debt, 2),
                                  description = q.Describtion
                              }).OrderBy(x => x.id).ToList();


            //فى حالة ان الفواتير اكبر من او يساوى
            if (allInvoices.Count() >= listCredit.Count())
            {
                for (int i = 0; i < allInvoices.Count(); i++)
                {
                    if (i < listCredit.Count() && listCredit.Count() > 0)
                    {
                        result.Add(new DtoInvoicesToday
                        {
                            id = allInvoices[i].id,
                            invoicesNumber = allInvoices[i].invoicesNumber,
                            payed = allInvoices[i].payed,
                            amount = allInvoices[i].amount,
                            customerName = allInvoices[i].customerName,
                            listInvoicesDetails = allInvoices[i].listInvoicesDetails,
                            payed2 = listCredit[i].payed3,
                            customerName2 = listCredit[i].customerName3,
                            description = listCredit[i].description,
                            date = allInvoices[i].date
                        });
                    }
                    else //if (i > listCredit.Count())
                    {
                        result.Add(new DtoInvoicesToday
                        {
                            id = allInvoices[i].id,
                            invoicesNumber = allInvoices[i].invoicesNumber,
                            payed = allInvoices[i].payed,
                            amount = allInvoices[i].amount,
                            customerName = allInvoices[i].customerName,
                            listInvoicesDetails = allInvoices[i].listInvoicesDetails,
                            payed2 = 0,
                            customerName2 = "",
                            description = "",
                            date = allInvoices[i].date
                        });
                    }
                }
            }
            // فى حالة ان السداد اكبر من الفواتير
            else if (allInvoices.Count() < listCredit.Count())
            {
                for (int i = 0; i < listCredit.Count(); i++)
                {
                    if (i < allInvoices.Count() && allInvoices.Count() > 0)
                    {
                        result.Add(new DtoInvoicesToday
                        {
                            id = allInvoices[i].id,
                            invoicesNumber = allInvoices[i].invoicesNumber,
                            payed = allInvoices[i].payed,
                            amount = allInvoices[i].amount,
                            customerName = allInvoices[i].customerName,
                            listInvoicesDetails = allInvoices[i].listInvoicesDetails,
                            payed2 = listCredit[i].payed3,
                            customerName2 = listCredit[i].customerName3,
                            description = listCredit[i].description,
                            date = allInvoices[i].date
                        });
                    }
                    else //if (i > allInvoices.Count())
                    {
                        result.Add(new DtoInvoicesToday
                        {
                            invoicesNumber = "",
                            payed = 0,
                            amount = 0,
                            customerName = "",
                            listInvoicesDetails = new List<DtoInvoicesDetails>(),
                            payed2 = listCredit[i].payed3,
                            customerName2 = listCredit[i].customerName3,
                            description = listCredit[i].description,
                            date = ""
                        });
                    }
                }
            }

            return result;
        }

        public void DeletInvoices(int? id)
        {
            var isExist = FindBy(x => x.Id == id).FirstOrDefault();

            if (isExist != null)
            {
                //1- حذف الفاتورة
                isExist.IsDelete = true;

                Edit(isExist);
                Save();


                //2- حذف الاصناف من المخزن  وتعديل الكميات
                _invoicesDetailsRepository.DeleteItemsFromInvoicesDetails(isExist.Id, isExist.NumberOfInvoiceBySystem);

                //3-عمل حركة للعميل ان الفاتورة تم حذفها
                DtoTransactionSupplierCustomer objTransaction = new DtoTransactionSupplierCustomer()
                {
                    customerId = isExist.CustomerId,
                    date = DateTime.Now,
                    invoiceNumber = isExist.NumberOfInvoiceBySystem.ToString(),
                    debit = isExist.Amount ?? 0,
                    credit = isExist.Payed ?? 0,
                    total = isExist.TotalInvoice ?? 0,
                    type = "حذف فاتورة مبيعات"
                };
                _transactionSupplierCustomerRepository.AddTransactionSupplierCustomer(objTransaction);

                //4-حذف المبلغ من الترصيد                
                var _result = _transactionSupplierCustomerStoreRepository.DeleteTransactionStore(isExist.NumberOfInvoiceBySystem.ToString(), isExist.CustomerId, "تسجيل فاتورة مبيعات");
                _supplierCustomerRespository._UpdateSupplierCustomerWithNewStore(isExist.CustomerId, _result.Credit, _result.Debit);
            }
        }

        public void EditInvoice(DtoInvoices dtoInvoices)
        {
            if (dtoInvoices != null)
            {
                // تعديل على فاتورة المبيعات للاسعار
                var objCustomer = FindBy(x => x.Id == dtoInvoices.id).FirstOrDefault();
                int? lastCustomer = 0;
                decimal? lastTotalInvoice = 0;
                decimal? lastCredit = 0;
                decimal? lastAmount = 0;
                string lastInvoiceId = "";

                if (objCustomer != null)
                {
                    // بيانات الفاتورة السابقة من اجل تخصيمها فى حالة ان المورد اتغيير
                    lastCustomer = objCustomer.CustomerId;
                    lastTotalInvoice = objCustomer.TotalInvoice;
                    lastCredit = objCustomer.Payed;
                    lastAmount = objCustomer.Amount;
                    lastInvoiceId = objCustomer.NumberOfInvoiceBySystem.ToString();

                    objCustomer.NumberOfInvoiceBySystem = dtoInvoices.invoiceNumber;
                    objCustomer.TotalInvoice = dtoInvoices.totalInvoice ?? 0;
                    objCustomer.Payed = dtoInvoices.payed ?? 0;
                    objCustomer.Amount = dtoInvoices.amount ?? 0;
                    objCustomer.ExpencesInvoices = dtoInvoices.expencesInvoices ?? 0;
                    objCustomer.CustomerId = dtoInvoices.customerId;
                    objCustomer.ItemCount = dtoInvoices.itemCount;
                    objCustomer.ExpencesInvoices = dtoInvoices.expencesInvoices;
                    objCustomer.Descount = dtoInvoices.descount;

                    Edit(objCustomer);
                    Save();
                }

                // فى حالة تعديل الفاتورة

                DtoTransactionSupplierCustomer objTransaction = new DtoTransactionSupplierCustomer()
                {
                    customerId = dtoInvoices.customerId,
                    date = objCustomer.Date, // DateTime.Now,
                    invoiceNumber = objCustomer.NumberOfInvoiceBySystem.ToString(),
                    debit = dtoInvoices.amount ?? 0,
                    credit = dtoInvoices.payed ?? 0,
                    total = dtoInvoices.totalInvoice ?? 0,
                    type = "تعديل فاتورة مبيعات"
                };

                _transactionSupplierCustomerRepository.AddTransactionSupplierCustomer(objTransaction);

                //  فى حالة ان العميل اتغير
                if (lastCustomer != dtoInvoices.customerId)
                {
                    //حذف الترصيد من العميل القديم
                    var amount = _transactionSupplierCustomerStoreRepository.DeleteTransactionStore(objCustomer.NumberOfInvoiceBySystem.ToString(), lastCustomer, "تسجيل فاتورة مبيعات");

                    _supplierCustomerRespository._UpdateSupplierCustomerWithNewStore(lastCustomer, amount.Credit, amount.Debit);

                    // اضافة الترصيد على العميل الجديد
                    DtoTransactionSupplierCustomerStore store = new DtoTransactionSupplierCustomerStore()
                    {
                        CustomerId = dtoInvoices.customerId,
                        Date = objCustomer.Date, // DateTime.Now,
                        InvoiceNumber = objCustomer.NumberOfInvoiceBySystem.ToString(),
                        Total = dtoInvoices.totalInvoice ?? 0,
                        Credit = dtoInvoices.payed ?? 0,
                        Debit = dtoInvoices.amount ?? 0,
                        // فى حالة ان المدفوع اكبرمن الاجمالى
                        Amount = dtoInvoices.payed > dtoInvoices.totalInvoice ? Math.Round((decimal)(dtoInvoices.payed - dtoInvoices.totalInvoice), 2) : 0,
                        Type = "تسجيل فاتورة مبيعات"
                    };

                    _transactionSupplierCustomerStoreRepository.AddTransactionStore(store);
                }
                // فى حالة نفس العميل
                else
                {
                    //تسجيل حركة تعديل فاتورة
                    DtoTransactionSupplierCustomer _objTransaction = new DtoTransactionSupplierCustomer()
                    {
                        customerId = dtoInvoices.customerId,
                        date = objCustomer.Date,// DateTime.Now,
                        invoiceNumber = objCustomer.NumberOfInvoiceBySystem.ToString(),
                        debit = dtoInvoices.amount ?? 0,
                        credit = dtoInvoices.payed ?? 0,
                        total = dtoInvoices.totalInvoice ?? 0,
                        type = "تعديل فاتورة مبيعات"
                    };

                    _transactionSupplierCustomerRepository.AddTransactionSupplierCustomer(_objTransaction);

                    //اعادة ترصيد الحسابات من جديد

                    //تسجيل ترصيد الموردين والعملاء
                    DtoTransactionSupplierCustomerStore store = new DtoTransactionSupplierCustomerStore()
                    {
                        CustomerId = dtoInvoices.customerId,
                        Date = objCustomer.Date,// DateTime.Now,
                        InvoiceNumber = objCustomer.NumberOfInvoiceBySystem.ToString(),
                        Total = dtoInvoices.totalInvoice ?? 0,
                        Credit = dtoInvoices.payed ?? 0,
                        Debit = dtoInvoices.amount ?? 0,
                        Amount = 0,
                        Type = "تسجيل فاتورة مبيعات"
                    };

                    var amount = _transactionSupplierCustomerStoreRepository.EditTransactionStore(store);

                    _supplierCustomerRespository._UpdateSupplierCustomerWithNewStore(dtoInvoices.customerId, amount.Credit, amount.Debit);

                }
            }
        }
    }
}

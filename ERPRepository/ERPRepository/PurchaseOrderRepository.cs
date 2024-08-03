using ContextERP.Models;
using DtoERP.Dto;
using IERPRepository.IERPRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ERPRepository.ERPRepository
{
    public class PurchaseOrderRepository : GenericRepository<ERPDBContext, TblPurchaseOrder>, IPurchaseOrderRepository
    {
        private readonly ITransactionSupplierCustomerRepository _transactionSupplierCustomerRepository;
        private readonly ISupplierCustomerRespository _supplierCustomerRespository;
        private readonly ITransactionSupplierCustomerStoreRepository _transactionSupplierCustomerStoreRepository;
        private readonly IPurchaseOrderDetailsRepository _purchaseOrderDetailsRepository;

        public PurchaseOrderRepository(ITransactionSupplierCustomerRepository transactionSupplierCustomerRepository,
            ISupplierCustomerRespository supplierCustomerRespository,
            ITransactionSupplierCustomerStoreRepository transactionSupplierCustomerStoreRepository,
             IPurchaseOrderDetailsRepository purchaseOrderDetailsRepository)
        {
            _purchaseOrderDetailsRepository = purchaseOrderDetailsRepository;
            _transactionSupplierCustomerRepository = transactionSupplierCustomerRepository;
            _supplierCustomerRespository = supplierCustomerRespository;
            _transactionSupplierCustomerStoreRepository = transactionSupplierCustomerStoreRepository;
        }

        public int? AddNewPurchaseOrder(DtoPurchaseOrder dtoPurchaseOrder)
        {
            int? maxPurchaseOrder = Context.TblPurchaseOrders.AsNoTracking().Max(x => x.NumberOfInvoiceBySystem) ?? 0;

            if (dtoPurchaseOrder != null)
            {
                //تسجيل فاتورة جديدة
                var objPurchaseOrder = new TblPurchaseOrder()
                {
                    NumberOfInvoiceSupplier = dtoPurchaseOrder.numberOfInvoiceSupplier,
                    NumberOfInvoiceBySystem = maxPurchaseOrder + 1,
                    ItemCount = dtoPurchaseOrder.itemCount ?? 0,
                    Date = DateTime.Now,
                    TotalInvoice = dtoPurchaseOrder.totalInvoice ?? 0,
                    Payed = dtoPurchaseOrder.payed ?? 0,
                    Amount = dtoPurchaseOrder.amount ?? 0,
                    CustomerId = dtoPurchaseOrder.customerId,
                    Description = dtoPurchaseOrder.description
                };

                Add(objPurchaseOrder);
                Save();

                //حركة مشتريات جديدة
                DtoTransactionSupplierCustomer objTransaction = new DtoTransactionSupplierCustomer()
                {
                    customerId = dtoPurchaseOrder.customerId,
                    date = DateTime.Now,
                    invoiceNumber = objPurchaseOrder.NumberOfInvoiceBySystem.ToString(),
                    debit = dtoPurchaseOrder.amount,
                    credit = dtoPurchaseOrder.payed,
                    total = dtoPurchaseOrder.totalInvoice,
                    type = "تسجيل فاتورة مشتريات"
                };
                _transactionSupplierCustomerRepository.AddTransactionSupplierCustomer(objTransaction);
                //تعديل على الخزنة
                _supplierCustomerRespository.UpdateCreditDebit(dtoPurchaseOrder.customerId, dtoPurchaseOrder.payed, dtoPurchaseOrder.amount, dtoPurchaseOrder.totalInvoice, objPurchaseOrder.NumberOfInvoiceBySystem.ToString());

                return objPurchaseOrder.Id;
            }

            return 0;
        }
        public void EditPurchaseOrder(DtoPurchaseOrder dtoPurchaseOrder)
        {
            if (dtoPurchaseOrder != null)
            {
                // تعديل على فاتورة المشتريات للاسعار
                var objCustomer = FindBy(x => x.Id == dtoPurchaseOrder.id).FirstOrDefault();
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


                    objCustomer.TotalInvoice = dtoPurchaseOrder.totalInvoice ?? 0;
                    objCustomer.Payed = dtoPurchaseOrder.payed ?? 0;
                    objCustomer.Amount = dtoPurchaseOrder.amount ?? 0;
                    objCustomer.CustomerId = dtoPurchaseOrder.customerId;
                    objCustomer.ItemCount = dtoPurchaseOrder.itemCount;


                    Edit(objCustomer);
                    Save();
                }

                // تسجيل حركة فاتورة مشتريات جديدة

                if (dtoPurchaseOrder.type == false)
                {
                    DtoTransactionSupplierCustomer objTransaction = new DtoTransactionSupplierCustomer()
                    {
                        customerId = dtoPurchaseOrder.customerId,
                        date = DateTime.Now,
                        invoiceNumber = objCustomer.NumberOfInvoiceBySystem.ToString(),
                        debit = dtoPurchaseOrder.amount ?? 0,
                        credit = dtoPurchaseOrder.payed ?? 0,
                        total = dtoPurchaseOrder.totalInvoice ?? 0,
                        type = "تسجيل فاتورة مشتريات"
                    };

                    _transactionSupplierCustomerRepository.AddTransactionSupplierCustomer(objTransaction);

                    //اضافة حركة ترصيد جديدة
                    DtoTransactionSupplierCustomerStore store = new DtoTransactionSupplierCustomerStore()
                    {
                        CustomerId = dtoPurchaseOrder.customerId,
                        Date = DateTime.Now,
                        InvoiceNumber = objCustomer.NumberOfInvoiceBySystem.ToString(),
                        Total = dtoPurchaseOrder.totalInvoice ?? 0,
                        Credit = dtoPurchaseOrder.payed ?? 0,
                        Debit = dtoPurchaseOrder.amount ?? 0,
                        // فى حالة ان المدفوع اكبرمن الاجمالى
                        Amount = dtoPurchaseOrder.payed > dtoPurchaseOrder.totalInvoice ? Math.Round((decimal)(dtoPurchaseOrder.payed - dtoPurchaseOrder.totalInvoice), 2) : 0,
                        Type = "تسجيل فاتورة مشتريات",
                        describtion = dtoPurchaseOrder.describtion
                    };

                    var result = _transactionSupplierCustomerStoreRepository.AddTransactionStore(store);

                    //تعديل على الخزنة
                    _supplierCustomerRespository._UpdateSupplierCustomerWithNewStore(dtoPurchaseOrder.customerId, result.Credit, result.Debit);
                }
                // فى حالة تعديل الفاتورة
                else if (dtoPurchaseOrder.type == true)
                {
                    DtoTransactionSupplierCustomer objTransaction = new DtoTransactionSupplierCustomer()
                    {
                        customerId = dtoPurchaseOrder.customerId,
                        date = DateTime.Now,
                        invoiceNumber = objCustomer.NumberOfInvoiceBySystem.ToString(),
                        debit = dtoPurchaseOrder.amount ?? 0,
                        credit = dtoPurchaseOrder.payed ?? 0,
                        total = dtoPurchaseOrder.totalInvoice ?? 0,
                        type = "تعديل فاتورة مشتريات"
                    };

                    _transactionSupplierCustomerRepository.AddTransactionSupplierCustomer(objTransaction);

                    //  فى حالة ان المورد اتغير
                    if (lastCustomer != dtoPurchaseOrder.customerId)
                    {
                        //حذف الترصيد من المورد القديم
                        var amount = _transactionSupplierCustomerStoreRepository.DeleteTransactionStore(objCustomer.NumberOfInvoiceBySystem.ToString(), lastCustomer, "تسجيل فاتورة مشتريات");

                        _supplierCustomerRespository._UpdateSupplierCustomerWithNewStore(lastCustomer, amount.Credit, amount.Debit);

                        // اضافة الترصيد على المورد الجديد
                        DtoTransactionSupplierCustomerStore store = new DtoTransactionSupplierCustomerStore()
                        {
                            CustomerId = dtoPurchaseOrder.customerId,
                            Date = DateTime.Now,
                            InvoiceNumber = objCustomer.NumberOfInvoiceBySystem.ToString(),
                            Total = dtoPurchaseOrder.totalInvoice ?? 0,
                            Credit = dtoPurchaseOrder.payed ?? 0,
                            Debit = dtoPurchaseOrder.amount ?? 0,
                            // فى حالة ان المدفوع اكبرمن الاجمالى
                            Amount = dtoPurchaseOrder.payed > dtoPurchaseOrder.totalInvoice ? Math.Round((decimal)(dtoPurchaseOrder.payed - dtoPurchaseOrder.totalInvoice), 2) : 0,
                            Type = "تسجيل فاتورة مشتريات",
                            describtion = dtoPurchaseOrder.describtion
                        };

                        _transactionSupplierCustomerStoreRepository.AddTransactionStore(store);
                    }
                    // فى حالة نفس المورد
                    else
                    {
                        //تسجيل حركة تعديل فاتورة
                        DtoTransactionSupplierCustomer _objTransaction = new DtoTransactionSupplierCustomer()
                        {
                            customerId = dtoPurchaseOrder.customerId,
                            date = DateTime.Now,
                            invoiceNumber = objCustomer.NumberOfInvoiceBySystem.ToString(),
                            debit = dtoPurchaseOrder.amount ?? 0,
                            credit = dtoPurchaseOrder.payed ?? 0,
                            total = dtoPurchaseOrder.totalInvoice ?? 0,
                            type = "تعديل فاتورة مشتريات"
                        };

                        _transactionSupplierCustomerRepository.AddTransactionSupplierCustomer(_objTransaction);


                        //اعادة ترصيد الحسابات من جديد

                        //تسجيل ترصيد الموردين والعملاء
                        DtoTransactionSupplierCustomerStore store = new DtoTransactionSupplierCustomerStore()
                        {
                            CustomerId = dtoPurchaseOrder.customerId,
                            Date = DateTime.Now,
                            InvoiceNumber = objCustomer.NumberOfInvoiceBySystem.ToString(),
                            Total = dtoPurchaseOrder.totalInvoice ?? 0,
                            Credit = dtoPurchaseOrder.payed ?? 0,
                            Debit = dtoPurchaseOrder.amount ?? 0,
                            Amount = 0,
                            Type = "تسجيل فاتورة مشتريات",
                            describtion = dtoPurchaseOrder.describtion
                        };

                        var amount = _transactionSupplierCustomerStoreRepository.EditTransactionStore(store);

                        _supplierCustomerRespository._UpdateSupplierCustomerWithNewStore(dtoPurchaseOrder.customerId, amount.Credit, amount.Debit);

                    }
                }
            }
        }

        public object AddNewPurchaseOrderByClient(DtoPurchaseOrder dtoPurchaseOrder)
        {
            int? maxPurchaseOrder = Context.TblPurchaseOrders.AsNoTracking().Max(x => x.NumberOfInvoiceBySystem) ?? 0;

            if (dtoPurchaseOrder != null)
            {
                // تسجيل فاتورة مشتريات جديدة
                var objPurchaseOrder = new TblPurchaseOrder()
                {
                    NumberOfInvoiceSupplier = dtoPurchaseOrder.numberOfInvoiceSupplier,
                    NumberOfInvoiceBySystem = maxPurchaseOrder + 1,
                    ItemCount = dtoPurchaseOrder.itemCount ?? 0,
                    Date = dtoPurchaseOrder.date,
                    TotalInvoice = dtoPurchaseOrder.totalInvoice ?? 0,
                    Payed = dtoPurchaseOrder.payed ?? 0,
                    Amount = dtoPurchaseOrder.amount ?? 0,
                    CustomerId = dtoPurchaseOrder.customerId,
                    Description = dtoPurchaseOrder.description
                };

                Add(objPurchaseOrder);
                Save();

                var objReturnPurchaseOrder = new
                {
                    id = objPurchaseOrder.Id,
                    numberOfInvoiceBySystem = objPurchaseOrder.NumberOfInvoiceBySystem
                };

                return objReturnPurchaseOrder;
            }

            return dtoPurchaseOrder;
        }
        public void DeletPurchaseOrder(int? id)
        {
            var isExist = FindBy(x => x.Id == id).FirstOrDefault();

            if (isExist != null)
            {
                //1- حذف الفاتورة
                isExist.IsDelete = true;

                Edit(isExist);
                Save();

                //2- حذف الاصناف من المخزن  وتعديل الكميات
                _purchaseOrderDetailsRepository.DeleteItemsFromPurchaseOrderDetails(isExist.Id, isExist.NumberOfInvoiceBySystem);

                //3-عمل حركة للمورد ان الفاتورة تم حذفها
                DtoTransactionSupplierCustomer objTransaction = new DtoTransactionSupplierCustomer()
                {
                    customerId = isExist.CustomerId,
                    date = DateTime.Now,
                    invoiceNumber = isExist.NumberOfInvoiceBySystem.ToString(),
                    debit = isExist.Amount ?? 0,
                    credit = isExist.Payed ?? 0,
                    total = isExist.TotalInvoice ?? 0,
                    type = "حذف فاتورة مشتريات"
                };
                _transactionSupplierCustomerRepository.AddTransactionSupplierCustomer(objTransaction);

                //4-حذف المبلغ من الترصيد                
                var _result = _transactionSupplierCustomerStoreRepository.DeleteTransactionStore(isExist.NumberOfInvoiceBySystem.ToString(), isExist.CustomerId, "تسجيل فاتورة مشتريات");
                _supplierCustomerRespository._UpdateSupplierCustomerWithNewStore(isExist.CustomerId, _result.Credit, _result.Debit);

            }
        }
        public void DeletPurchaseOrderWithoutSupplier(int? id)
        {
            var isExist = FindBy(x => x.Id == id).FirstOrDefault();

            if (isExist != null)
            {
                //1- حذف الفاتورة
                isExist.IsDelete = true;

                Edit(isExist);
                Save();

                _purchaseOrderDetailsRepository.DeleteItemsFromPurchaseOrderDetails(isExist.Id, isExist.NumberOfInvoiceBySystem);

            }
        }
        public DtoPurchaseOrder selectPurchaseOrderById(int? id)
        {
            var result = (from q in Context.TblPurchaseOrders.AsNoTracking().Where(x => x.Id == id && x.IsDelete == null)
                          select new DtoPurchaseOrder
                          {
                              id = q.Id,
                              numberOfInvoiceBySystem = q.NumberOfInvoiceBySystem,
                              numberOfInvoiceSupplier = q.NumberOfInvoiceSupplier,
                              itemCount = q.ItemCount ?? 0,
                              date = q.Date,
                              totalInvoice = Math.Round((decimal)q.TotalInvoice, 2),
                              payed = Math.Round((decimal)q.Payed, 2),
                              amount = Math.Round((decimal)q.Amount, 2),
                              customerId = q.CustomerId,
                              customerName = q.Customer.Name,
                              description = q.Description,
                              listPurchaseOrderDetails = q.TblPurchaseOrderDetails.Where(z => z.IsDeleted == null).Select(x => new DtoPurchaseOrderDetails
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
                                  priceSupplier = x.PriceSupplier,
                                  total = 0
                              }).ToList()
                          }).FirstOrDefault();

            return result;
        }
        public List<DtoPurchaseOrder> selectAllPurchaseOrder()
        {
            var result = (from q in Context.TblPurchaseOrders.AsNoTracking().Where(x => x.IsDelete == null)
                          select new DtoPurchaseOrder
                          {
                              id = q.Id,
                              numberOfInvoiceBySystem = q.NumberOfInvoiceBySystem,
                              numberOfInvoiceSupplier = q.NumberOfInvoiceSupplier,
                              itemCount = q.ItemCount,
                              date = q.Date,
                              totalInvoice = Math.Round((decimal)q.TotalInvoice, 2),
                              payed = Math.Round((decimal)q.Payed, 2),
                              amount = Math.Round((decimal)q.Amount, 2),
                              customerId = q.CustomerId,
                              customerName = q.Customer.Name,
                              description = q.Description,
                              isPrice = q.CustomerId == null ? "لم تسعر" : "تم التسعير",
                              listPurchaseOrderDetails = q.TblPurchaseOrderDetails.Where(z => z.IsDeleted == null).Select(x => new DtoPurchaseOrderDetails
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
                                  centi = x.Centi.ToString() ?? "0",
                                  type = x.Type,
                                  typeText = x.Type == true ? "متر مكعب" : "عدد",
                                  priceSelling = x.PriceSelling,
                                  priceSupplier = x.PriceSupplier
                              }).ToList()
                          }).OrderByDescending(x => x.date).ThenByDescending(x => x.numberOfInvoiceSupplier).ToList();

            return result;
        }

        public void EditPurchaseOrderById(DtoPurchaseOrder dtoPurchaseOrder)
        {
            if (dtoPurchaseOrder != null)
            {
                var objCustomer = FindBy(x => x.Id == dtoPurchaseOrder.id).FirstOrDefault();

                if (objCustomer != null)
                {
                    // بيانات الفاتورة السابقة من اجل تخصيمها فى حالة ان المورد اتغيير
                    int? lastCustomer = objCustomer.CustomerId;
                    decimal? lastTotalInvoice = objCustomer.TotalInvoice;
                    decimal? lastCredit = objCustomer.Payed;
                    decimal? lastAmount = objCustomer.Amount;
                    string lastInvoiceId = objCustomer.NumberOfInvoiceBySystem.ToString();

                    //1-تعديل بيانات الفاتورة
                    if (objCustomer != null)
                    {
                        objCustomer.TotalInvoice = dtoPurchaseOrder.totalInvoice ?? 0;
                        objCustomer.Payed = dtoPurchaseOrder.payed ?? 0;
                        objCustomer.Amount = dtoPurchaseOrder.amount ?? 0;
                        objCustomer.CustomerId = dtoPurchaseOrder.customerId;
                    }

                    Edit(objCustomer);
                    Save();

                    //فى حالة ان المورد اتغيير لسةفيها شغل
                    if (lastCustomer != dtoPurchaseOrder.customerId)
                    {
                        var objLastCustomer = Context.TblSupplierCustomers.AsNoTracking().Where(x => x.Id == lastCustomer).FirstOrDefault();

                        if (objLastCustomer != null)
                        {
                            //فى حالة انه عليه فلوس
                            if (objLastCustomer.Debit > 0)
                            {
                                decimal? totalWithDebit = Math.Round((decimal)(objLastCustomer.Debit - lastAmount), 2);

                                if (totalWithDebit > 0)
                                {
                                    objLastCustomer.Debit = totalWithDebit;
                                    objLastCustomer.Credit = 0;
                                }
                                else
                                {
                                    objLastCustomer.Debit = 0;
                                    objLastCustomer.Credit = Math.Abs((decimal)totalWithDebit);
                                }
                                _supplierCustomerRespository.Edit(objLastCustomer);
                                _supplierCustomerRespository.Save();
                            }
                            //فى حالة ان له فلوس
                            else
                            {
                                decimal? totalWithCredit = Math.Round((decimal)(objLastCustomer.Credit + lastCredit), 2);


                                objLastCustomer.Credit = totalWithCredit;

                                _supplierCustomerRespository.Edit(objLastCustomer);
                                _supplierCustomerRespository.Save();
                            }

                            DtoTransactionSupplierCustomer objTransactionLastTransaction = new DtoTransactionSupplierCustomer()
                            {
                                customerId = lastCustomer,
                                date = DateTime.Now,
                                invoiceNumber = lastInvoiceId,
                                debit = lastAmount ?? 0,
                                credit = lastCredit ?? 0,
                                total = lastTotalInvoice ?? 0,
                                type = "حذف فاتورة مشتريات"
                            };
                            _transactionSupplierCustomerRepository.AddTransactionSupplierCustomer(objTransactionLastTransaction);
                           
                        }
                    }
                    //فى حالة نفس المورد
                    else if (lastCustomer == dtoPurchaseOrder.customerId)
                    {

                    }


                    DtoTransactionSupplierCustomer objTransaction = new DtoTransactionSupplierCustomer()
                    {
                        customerId = dtoPurchaseOrder.customerId,
                        date = DateTime.Now,
                        invoiceNumber = objCustomer.NumberOfInvoiceBySystem.ToString(),
                        debit = dtoPurchaseOrder.amount ?? 0,
                        credit = dtoPurchaseOrder.payed ?? 0,
                        total = dtoPurchaseOrder.totalInvoice ?? 0,
                        type = "تعديل فاتورة مشتريات"
                    };
                }
            }
        }
    }
}

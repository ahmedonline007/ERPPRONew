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
    public class SupplierCustomerRespository : GenericRepository<ERPDBContext, TblSupplierCustomer>, ISupplierCustomerRespository
    {
        private readonly ITransactionSupplierCustomerRepository _transactionSupplierCustomerRepository;
        private readonly IInstallmentRepository _installmentRepository;
        private readonly ITransactionSupplierCustomerStoreRepository _transactionSupplierCustomerStoreRepository;
        private readonly IPaymentScheduleRepository _paymentScheduleRepository;


        public SupplierCustomerRespository(IPaymentScheduleRepository paymentScheduleRepository, ITransactionSupplierCustomerRepository transactionSupplierCustomerRepository,
            IInstallmentRepository installmentRepository,
            ITransactionSupplierCustomerStoreRepository transactionSupplierCustomerStoreRepository)
        {
            _paymentScheduleRepository = paymentScheduleRepository;
            _installmentRepository = installmentRepository;
            _transactionSupplierCustomerRepository = transactionSupplierCustomerRepository;
            _transactionSupplierCustomerStoreRepository = transactionSupplierCustomerStoreRepository;
        }

        public DtoSupplierCustomer AddEditSupplierCustomer(DtoSupplierCustomer dtoSupplierCustomer)
        {
            if (dtoSupplierCustomer != null)
            {
                if (dtoSupplierCustomer.id > 0)
                {
                    var isExist = FindBy(x => x.Id == dtoSupplierCustomer.id).FirstOrDefault();

                    if (isExist != null)
                    {
                        // تعديل البيانات
                        isExist.Name = dtoSupplierCustomer.name;
                        isExist.Address = dtoSupplierCustomer.address;
                        isExist.Phone = dtoSupplierCustomer.phone;
                        //isExist.Flag = dtoSupplierCustomer.flag;
                        //isExist.Credit = dtoSupplierCustomer.credit ?? 0;
                        // isExist.Debit = dtoSupplierCustomer.debit ?? 0;

                        Edit(isExist);
                        Save();

                        // تسجيل حركة للعميل والمورد
                        //DtoTransactionSupplierCustomer objTransaction = new DtoTransactionSupplierCustomer()
                        //{
                        //    customerId = dtoSupplierCustomer.id,
                        //    date = DateTime.Now,
                        //    invoiceNumber = "0",
                        //    debit = dtoSupplierCustomer.debit ?? 0,
                        //    credit = dtoSupplierCustomer.credit ?? 0,
                        //    total = 0,
                        //    type = dtoSupplierCustomer.flag == true ? "تعديل بيانات المورد" : "تعديل بيانات العميل"
                        //};
                        //_transactionSupplierCustomerRepository.AddTransactionSupplierCustomer(objTransaction);


                        ////تسجيل ترصيد الموردين والعملاء
                        //DtoTransactionSupplierCustomerStore store = new DtoTransactionSupplierCustomerStore()
                        //{
                        //    CustomerId = dtoSupplierCustomer.id,
                        //    Date = DateTime.Now,
                        //    InvoiceNumber = "000",
                        //    Total = 0,
                        //    Credit = 0,
                        //    Debit = dtoSupplierCustomer.debit ?? 0,
                        //    Amount = dtoSupplierCustomer.credit ?? 0,
                        //    Type = dtoSupplierCustomer.flag == true ? "تسجيل بيانات مورد" : "تسجيل بيانات عميل"
                        //};
                        //var amount = _transactionSupplierCustomerStoreRepository.EditTransactionStore(store);

                        //isExist.Credit = amount.Credit ?? 0;
                        //isExist.Debit = amount.Debit ?? 0;

                        //Edit(isExist);
                        //Save();

                         dtoSupplierCustomer.credit = isExist.Credit;
                         dtoSupplierCustomer.debit = isExist.Debit;
                    }
                }
                else
                {
                    //تسجيل بيانات جديدة
                    var objSupCus = new TblSupplierCustomer()
                    {
                        Name = dtoSupplierCustomer.name,
                        Address = dtoSupplierCustomer.address,
                        Phone = dtoSupplierCustomer.phone,
                        Flag = dtoSupplierCustomer.flag,
                        Credit = dtoSupplierCustomer.credit ?? 0,
                        Debit = dtoSupplierCustomer.debit ?? 0
                    };

                    Add(objSupCus);
                    Save();

                    dtoSupplierCustomer.id = objSupCus.Id;

                    DtoTransactionSupplierCustomer objTransaction = new DtoTransactionSupplierCustomer()
                    {
                        customerId = dtoSupplierCustomer.id,
                        date = DateTime.Now,
                        invoiceNumber = "0",
                        debit = dtoSupplierCustomer.debit ?? 0,
                        credit = dtoSupplierCustomer.credit ?? 0,
                        total = 0,
                        type = dtoSupplierCustomer.flag == true ? "تسجيل بيانات المورد" : "تسجيل بيانات العميل"
                    };

                    _transactionSupplierCustomerRepository.AddTransactionSupplierCustomer(objTransaction);


                    //تسجيل ترصيد الموردين والعملاء
                    DtoTransactionSupplierCustomerStore store = new DtoTransactionSupplierCustomerStore()
                    {
                        CustomerId = dtoSupplierCustomer.id,
                        Date = DateTime.Now,
                        InvoiceNumber = "000",
                        Total = 0,
                        Credit = 0,
                        Debit = dtoSupplierCustomer.debit ?? 0,
                        Amount = dtoSupplierCustomer.credit ?? 0,
                        Type = dtoSupplierCustomer.flag == true ? "تسجيل بيانات مورد" : "تسجيل بيانات عميل"
                    };
                    _transactionSupplierCustomerStoreRepository.AddTransactionStore(store);

                    return dtoSupplierCustomer;
                }
            }

            return dtoSupplierCustomer;
        }

        public List<DtoSupplierCustomer> selectAllSupplierCustomerByFlag(bool? flag)
        {
            var result = (from q in Context.TblSupplierCustomers.AsNoTracking().Where(x => x.Flag == flag && x.IsDelete == null)
                          select new DtoSupplierCustomer
                          {
                              id = q.Id,
                              name = q.Name,
                              phone = q.Phone,
                              address = q.Address,
                              credit = Math.Round(q.Credit ?? 0, 2),
                              debit = Math.Round(q.Debit ?? 0, 2)
                          }).OrderBy(x => x.name).ToList();

            return result;
        }

        public void deleteSupplierCustomer(int? id)
        {
            var isExist = FindBy(x => x.Id == id).FirstOrDefault();

            if (isExist != null)
            {
                isExist.IsDelete = true;

                Edit(isExist);
                Save();
            }
        }

        public bool? CheckExistsSupplierCustomer(string name, bool? flag, int? id = 0)
        {
            var isExist = FindBy(x => x.Id != id && x.Name == name && x.Flag == flag && x.IsDelete == null).Any();

            return isExist;
        }

        public List<DtoSupplierCustomer> selectAllSupplierCustomerByFlagForDrop(bool? flag)
        {
            var result = (from q in Context.TblSupplierCustomers.AsNoTracking().Where(x => x.Flag == flag && x.IsDelete == null)
                          select new DtoSupplierCustomer
                          {
                              id = q.Id,
                              name = q.Name,
                              credit = Math.Round((decimal)q.Credit, 2),
                              debit = Math.Round((decimal)q.Debit, 2)
                          }).OrderBy(x => x.name).ToList();

            return result;
        }

        public void UpdateCreditDebit(int? customerId, decimal? credit, decimal? debit, decimal? total, string InvicesNumber)
        {
            var objCustomer = FindBy(x => x.Id == customerId && x.IsDelete == null).FirstOrDefault();

            bool? isCreditBank = false;
            decimal? creditBank = credit;
            decimal? debitBank = debit;
            decimal? _CreditBank = 0;

            if (objCustomer != null)
            {
                #region updateBankStore 

                //المدفوع اكبر من اجمالى الفاتورة
                if (credit > total)
                {
                    // طرح المدفوع من الاجمالى
                    decimal? amount = Math.Round((decimal)(credit - total), 2);

                    //التحقق من وجود مديونية
                    if (objCustomer.Debit > 0)
                    {
                        decimal? amountDebit = Math.Round((decimal)(amount - objCustomer.Debit), 2);

                        //لو المتبقى اكبر من صفر
                        if (amountDebit >= 0)
                        {
                            objCustomer.Credit += amountDebit;
                            objCustomer.Debit = 0;

                            // فى حالة ان المتبقى صفر
                            if (amountDebit == 0)
                            {
                                creditBank = amount;
                                debitBank = 0;
                                isCreditBank = false;
                            }
                            // فى حالة ان المتبقى اكبر من الصفر
                            else if (amountDebit > 0)
                            {
                                creditBank = amountDebit;
                                debitBank = 0;
                                isCreditBank = false;
                            }

                            Edit(objCustomer);
                            Save();
                        }
                        else
                        {
                            objCustomer.Debit = Math.Abs((decimal)amountDebit);

                            creditBank = credit; //Math.Abs((double)amountDebit);
                            debitBank = 0;
                            isCreditBank = false;

                            Edit(objCustomer);
                            Save();
                        }
                    }
                    else
                    {
                        objCustomer.Credit += amount;

                        // فى حالة انه معلهوش فلوس بيخش زى مهو
                        creditBank = credit;
                        debitBank = debit;
                        isCreditBank = false;

                        Edit(objCustomer);
                        Save();
                    }
                }
                // المدفوع اصغر من اجمالى الفاتورة
                else if (credit <= total)
                {
                    decimal? amount = Math.Round((decimal)(total - credit), 2);

                    //لو الشخص معندوش رصيد
                    if (objCustomer.Credit == 0)
                    {
                        objCustomer.Debit += amount;

                        //1-لو الشخص دفع مبلغ ومعهوش فلوس فى الخزنة
                        //3-فى حالة ان المدفوع رقم اقل من الاجمالى ومفيش رصيد
                        if (credit >= 0)
                        {
                            creditBank = credit;
                            debitBank = debit;
                            isCreditBank = false;
                        }

                        Edit(objCustomer);
                        Save();

                        _installmentRepository.UpdateInstallment(customerId, objCustomer.Debit);
                    }
                    // لو الرصيد اكبر من او يساوى المتبقى من الاجمالى والمدفوع هيخصم من الرصيد
                    else if (objCustomer.Credit >= amount)
                    {
                        decimal? _Credit = objCustomer.Credit;

                        objCustomer.Credit -= amount;

                        // لو المدفوع صفر وخصم من الرصيد
                        decimal? _debitBank = Math.Round((decimal)(debit - amount), 2);

                        creditBank = amount;
                        debitBank = _debitBank <= 0 ? 0 : _debitBank;
                        isCreditBank = true;
                        _CreditBank = amount;

                        Edit(objCustomer);
                        Save();
                    }
                    // لو الرصيد اصغر من المتبقى من الاجمالى والمدفوع  
                    else if (objCustomer.Credit < amount)
                    {
                        decimal? _Credit = objCustomer.Credit;

                        var depits = Math.Round((decimal)(amount - objCustomer.Credit), 2);

                        objCustomer.Credit = 0;
                        objCustomer.Debit = depits <= 0 ? 0 : depits;

                        decimal? _creditBank = credit;
                        decimal? _debitBank = depits;//Math.Round((double)(debit - _creditBank), 2);

                        creditBank = _creditBank;
                        debitBank = _debitBank <= 0 ? 0 : _debitBank;
                        isCreditBank = true;
                        _CreditBank = _Credit;

                        Edit(objCustomer);
                        Save();

                        _installmentRepository.UpdateInstallment(customerId, objCustomer.Debit);
                    }

                    //4-فى حالة ان المدفوع بيساوى المتبقى
                    if (credit == total)
                    {
                        creditBank = credit;
                        debitBank = debit;
                        isCreditBank = false;
                    }
                }
                #endregion updateBankStore

                #region addPaymentSchedule 
                DtoPaymentSchedule dtoPaymentSchedule = new DtoPaymentSchedule()
                {
                    CustomerId = customerId,
                    Credit = creditBank,
                    Debit = debitBank,
                    InvicesNumber = InvicesNumber,
                    Total = total,
                    IsCreditBank = isCreditBank,
                    CreditBank = _CreditBank
                };
                _paymentScheduleRepository.AddPaymentSchedule(dtoPaymentSchedule);
                #endregion addPaymentSchedule
            }
        }

        public void UpdateCreditDebitForReturnInvoices(int? customerId, decimal? total)
        {
            var objCustomer = FindBy(x => x.Id == customerId && x.IsDelete == null).FirstOrDefault();

            if (objCustomer != null)
            {
                //فى حالة ان عليه فلوس
                if (objCustomer.Debit > 0)
                {
                    //فى حالة ان المتبقى اكبر من الاجمالى
                    if (objCustomer.Debit > total)
                    {
                        decimal? amount = Math.Round((decimal)(objCustomer.Debit - total), 2);

                        objCustomer.Debit = amount;
                        objCustomer.Credit = 0;

                        Edit(objCustomer);
                        Save();

                        _installmentRepository.UpdateInstallment(customerId, objCustomer.Debit);

                    }
                    //فى حالة ان المتبقى اصغر من الاجمالى
                    else if (objCustomer.Debit < total)
                    {
                        decimal? amount = Math.Round((decimal)(total - objCustomer.Debit), 2);

                        objCustomer.Debit = 0;
                        objCustomer.Credit = amount;

                        Edit(objCustomer);
                        Save();

                        _installmentRepository.UpdateInstallment(customerId, objCustomer.Debit);

                    }
                    //فى حالة ان المتبقى بيساوى من الاجمالى
                    else if (objCustomer.Debit == total)
                    {
                        objCustomer.Credit = 0;
                        objCustomer.Debit = 0;

                        Edit(objCustomer);
                        Save();

                        _installmentRepository.UpdateInstallment(customerId, objCustomer.Debit);

                    }
                }
                //فى حالة انه معلهوش فلوس بيخش فى حسابة
                else
                {
                    decimal? amount = objCustomer.Credit + total;
                    objCustomer.Credit = amount;
                    objCustomer.Debit = 0;

                    Edit(objCustomer);
                    Save();
                }
            }
        }

        public DtoSupplierCustomer PayedCash(int? customerId, decimal? credit, DateTime? date)
        {
            var objCustomer = FindBy(x => x.Id == customerId && x.IsDelete == null).FirstOrDefault();

            decimal? currentTotal = 0;

            if (objCustomer != null)
            {
                currentTotal = objCustomer.Debit;

                var debit = Math.Round((decimal)objCustomer.Debit, 2);

                //لو المدفوع اصغر من المتبقى 
                if (debit > credit)
                {
                    objCustomer.Debit -= credit;

                    Edit(objCustomer);
                    Save();

                    _installmentRepository.UpdateInstallment(customerId, objCustomer.Debit);
                }
                //لو المدفوع اكبر من المتبقى
                else if (debit < credit)
                {
                    var amount = Math.Round((decimal)(credit - objCustomer.Debit), 2);

                    objCustomer.Debit = 0;
                    objCustomer.Credit += amount;

                    Edit(objCustomer);
                    Save();

                    _installmentRepository.UpdateInstallment(customerId, objCustomer.Debit);
                }
                // لو المدفوع بيساوى المتبقى
                else if (debit == credit)
                {
                    objCustomer.Debit = 0;

                    Edit(objCustomer);
                    Save();

                    _installmentRepository.UpdateInstallment(customerId, objCustomer.Debit);
                }
                // لو مفيش دين
                else if (debit == 0)
                {
                    objCustomer.Credit += credit;

                    Edit(objCustomer);
                    Save();
                }

                DtoTransactionSupplierCustomer objTransaction = new DtoTransactionSupplierCustomer()
                {
                    customerId = customerId,
                    date = date,
                    invoiceNumber = "0",
                    debit = Math.Round((decimal)objCustomer.Debit, 2),
                    credit = Math.Round((decimal)credit, 2),
                    total = currentTotal,
                    type = "سداد مديونية"
                };

                _transactionSupplierCustomerRepository.AddTransactionSupplierCustomer(objTransaction);

                DtoTransactionSupplierCustomerStore store = new DtoTransactionSupplierCustomerStore()
                {
                    CustomerId = customerId,
                    Date = DateTime.Now,
                    InvoiceNumber = "0",
                    Total = 0,
                    Credit = credit,
                    Debit = 0,
                    Amount = 0
                };

                _transactionSupplierCustomerStoreRepository.AddTransactionStore(store);

            }

            DtoSupplierCustomer dtoSupplierCustomer = new DtoSupplierCustomer()
            {
                id = objCustomer.Id,
                name = objCustomer.Name,
                credit = Math.Round((decimal)objCustomer.Credit, 2),
                debit = Math.Round((decimal)objCustomer.Debit, 2)
            };

            return dtoSupplierCustomer;
        }

        public List<DtoSupplierCustomer> selectSupplierCustomerHaveDebit(bool? flag)
        {
            var result = (from q in Context.TblSupplierCustomers.AsNoTracking().Where(x => x.Flag == flag && x.IsDelete == null && x.Debit > 0)
                          select new DtoSupplierCustomer
                          {
                              id = q.Id,
                              name = q.Name,
                              phone = q.Phone,
                              address = q.Address,
                              debit = q.Debit ?? 0
                          }).OrderBy(x => x.name).ToList();

            return result;
        }

        public DtoSupplierCustomer selectSupplierCustomerById(int? id)
        {
            var objSupplierCustomer = FindBy(x => x.Id == id).Select(x => new DtoSupplierCustomer
            {
                id = x.Id,
                credit = x.Credit,
                debit = x.Debit
            }).FirstOrDefault();

            return objSupplierCustomer;
        }

        public void DeleteCreditOrDebitById(string invoiceNumber, int? customerId)
        {
            var objCreditDebitCustomer = _paymentScheduleRepository.SelectInvoiceByCustomerId(invoiceNumber, customerId);

            var objCustomer = FindBy(x => x.Id == customerId).FirstOrDefault();

            //فى حالة انه ماخدش حاجة من الخزنة والمدين اكبر من الصفر
            if (objCreditDebitCustomer.CreditBank == 0 && objCustomer.Debit > 0)
            {
                var totalWithDebit = Math.Round((decimal)(objCustomer.Debit - objCreditDebitCustomer.Debit), 2);
                objCustomer.Debit = totalWithDebit <= 0 ? 0 : totalWithDebit;
                objCustomer.Credit = 0;
            }
            else if (objCreditDebitCustomer.CreditBank > 0)
            {
                //var totalWithCredit = Math.Round((double)(objCustomer.Credit + objCreditDebitCustomer.CreditBank), 2);
                //objCustomer.Credit = totalWithCredit <= 0 ? 0 : totalWithCredit;
                objCustomer.Debit = 0;
            }

            Edit(objCustomer);
            Save();

            _paymentScheduleRepository.DeletePaymentSchedule(invoiceNumber, customerId);
        }

        public void UpdateSupplierCustomerWithNewStore(int? customerId, decimal? credit, decimal? debit)
        {
            var objCustomer = FindBy(x => x.Id == customerId).FirstOrDefault();

            if (objCustomer != null)
            {
                // فى حالة ان لسة متبقى
                if (debit > 0)
                {
                    //لسة معاه فلوس فى الخزنة
                    if (objCustomer.Credit > 0)
                    {
                        decimal? totalWithDebit = Math.Round((decimal)(objCustomer.Credit - debit), 2);

                        if (totalWithDebit > 0)
                        {
                            objCustomer.Credit = totalWithDebit;
                            objCustomer.Debit = 0;
                        }
                        else
                        {
                            objCustomer.Credit = 0;
                            objCustomer.Debit = Math.Abs((decimal)totalWithDebit);
                        }
                    }
                    //ممعهوش فلوس
                    else
                    {
                        decimal? totalWithDebit = Math.Round((decimal)(objCustomer.Debit + debit), 2);

                        objCustomer.Credit = 0;
                        objCustomer.Debit = totalWithDebit;
                    }
                }
                //فى حالة انه معلهوش مديونية
                else
                {
                    // فى حالة انه عليه فلوس فى الخزنة
                    if (objCustomer.Debit > 0)
                    {
                        decimal? totalWithCredit = Math.Round((decimal)(credit - objCustomer.Debit), 2);

                        if (totalWithCredit > 0)
                        {
                            objCustomer.Credit = totalWithCredit;
                            objCustomer.Debit = 0;
                        }
                        else
                        {
                            objCustomer.Credit = 0;
                            objCustomer.Debit = Math.Abs((decimal)totalWithCredit);
                        }
                    }
                    else
                    {
                        decimal? totalWithCredit = Math.Round((decimal)(credit + objCustomer.Credit), 2);

                        objCustomer.Credit = totalWithCredit;
                        objCustomer.Debit = 0;
                    }
                }

                Edit(objCustomer);
                Save();
            }
        }

        public void _UpdateSupplierCustomerWithNewStore(int? customerId, decimal? credit, decimal? debit)
        {
            var objCustomer = FindBy(x => x.Id == customerId).FirstOrDefault();

            if (objCustomer != null)
            {
                objCustomer.Credit = credit;
                objCustomer.Debit = debit;

                Edit(objCustomer);
                Save();

                _installmentRepository.UpdateInstallment(customerId, objCustomer.Debit);

            }
        }

        public DtoSupplierCustomer UpdateCreditDebitOnly(DtoSupplierCustomer dtoSupplierCustomer)
        {
            var isExist = FindBy(x => x.Id == dtoSupplierCustomer.id).FirstOrDefault();

            if (isExist != null)
            {
                isExist.Credit = dtoSupplierCustomer.credit ?? 0;
                isExist.Debit = dtoSupplierCustomer.debit ?? 0;

                Edit(isExist);
                Save();

                // تسجيل حركة للعميل والمورد
                DtoTransactionSupplierCustomer objTransaction = new DtoTransactionSupplierCustomer()
                {
                    customerId = dtoSupplierCustomer.id,
                    date = DateTime.Now,
                    invoiceNumber = "0",
                    debit = dtoSupplierCustomer.debit ?? 0,
                    credit = dtoSupplierCustomer.credit ?? 0,
                    total = 0,
                    type = isExist.Flag == true ? "تعديل بيانات المورد" : "تعديل بيانات العميل"
                };
                _transactionSupplierCustomerRepository.AddTransactionSupplierCustomer(objTransaction);


                //تسجيل ترصيد الموردين والعملاء
                DtoTransactionSupplierCustomerStore store = new DtoTransactionSupplierCustomerStore()
                {
                    CustomerId = dtoSupplierCustomer.id,
                    Date = DateTime.Now,
                    InvoiceNumber = "000",
                    Total = 0,
                    Credit = 0,
                    Debit = dtoSupplierCustomer.debit ?? 0,
                    Amount = dtoSupplierCustomer.credit ?? 0,
                    Type = isExist.Flag == true ? "تسجيل بيانات مورد" : "تسجيل بيانات عميل"
                };
                var amount = _transactionSupplierCustomerStoreRepository.EditTransactionStore(store);

                isExist.Credit = amount.Credit ?? 0;
                isExist.Debit = amount.Debit ?? 0;

                Edit(isExist);
                Save();

                dtoSupplierCustomer.credit = isExist.Credit;
                dtoSupplierCustomer.debit = isExist.Debit;
            }

            return dtoSupplierCustomer;
        }

    }
}

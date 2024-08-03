using ContextERP.Models;
using DtoERP.Dto;
using IERPRepository.IERPRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;


namespace ERPRepository.ERPRepository
{
    public class TransactionSupplierCustomerStoreRepository : GenericRepository<ERPDBContext, TransactionSupplierCustomerStore>, ITransactionSupplierCustomerStoreRepository
    {

        //لاضافة مبلغ جديد وهيتم عمل الحسبة من الصفحة نفسها علشان تكون القيم جايه جاهزة للحساب سواء الصافى عليه او ليه
        public DtoReturnCreditDebit AddTransactionStore(DtoTransactionSupplierCustomerStore dtoTransactionSupplierCustomerStore)
        {
            if (dtoTransactionSupplierCustomerStore != null)
            {
                var lastDebit = FindBy(x => x.CustomerId == dtoTransactionSupplierCustomerStore.CustomerId).OrderByDescending(x => x.Id).FirstOrDefault();

                //فى حالة ان له سطر من قبل اجيب المديونية او الرصيد القديم
                if (lastDebit != null)
                {
                    //  فى حالة انه عندة مديونية قديمة
                    if (lastDebit.Debit >= 0 && lastDebit.Amount == 0)
                    {
                        decimal? newDebit = Math.Round((decimal)((lastDebit.Debit + dtoTransactionSupplierCustomerStore.Total) - dtoTransactionSupplierCustomerStore.Credit), 2);

                        if (newDebit > 0)
                        {
                            // فى حالة انه لسه عليه مديونية
                            var objTransaction = new TransactionSupplierCustomerStore()
                            {
                                CustomerId = dtoTransactionSupplierCustomerStore.CustomerId,
                                Date = dtoTransactionSupplierCustomerStore.Date,
                                InvoiceNumber = dtoTransactionSupplierCustomerStore.InvoiceNumber,
                                Total = dtoTransactionSupplierCustomerStore.Total ?? 0,
                                Credit = dtoTransactionSupplierCustomerStore.Credit ?? 0,
                                Debit = newDebit,
                                Amount = 0,
                                Type = dtoTransactionSupplierCustomerStore.Type,
                                Describtion = dtoTransactionSupplierCustomerStore.describtion
                            };

                            Add(objTransaction);
                            Save();

                            var result = new DtoReturnCreditDebit
                            {
                                Debit = objTransaction.Debit,
                                Credit = 0
                            };

                            return result;
                        }
                        else
                        {
                            // فى حالة انه طلع ليه فلوس
                            var objTransaction = new TransactionSupplierCustomerStore()
                            {
                                CustomerId = dtoTransactionSupplierCustomerStore.CustomerId,
                                Date = dtoTransactionSupplierCustomerStore.Date,
                                InvoiceNumber = dtoTransactionSupplierCustomerStore.InvoiceNumber,
                                Total = dtoTransactionSupplierCustomerStore.Total ?? 0,
                                Credit = dtoTransactionSupplierCustomerStore.Credit ?? 0,
                                Debit = 0,
                                Amount = Math.Abs((decimal)newDebit),
                                Type = dtoTransactionSupplierCustomerStore.Type,
                                Describtion = dtoTransactionSupplierCustomerStore.describtion
                            };

                            Add(objTransaction);
                            Save();


                            var result = new DtoReturnCreditDebit
                            {
                                Debit = 0,
                                Credit = objTransaction.Amount
                            };

                            return result;
                        }
                    }
                    // فى حالة ان ليه فلوس قديمة
                    else if (lastDebit.Amount > 0)
                    {
                        decimal? newCredit = Math.Round((decimal)((lastDebit.Amount + dtoTransactionSupplierCustomerStore.Credit) - dtoTransactionSupplierCustomerStore.Total), 2);

                        if (newCredit > 0)
                        {
                            // فى حالة انه طلع ليه فلوس
                            var objTransaction = new TransactionSupplierCustomerStore()
                            {
                                CustomerId = dtoTransactionSupplierCustomerStore.CustomerId,
                                Date = dtoTransactionSupplierCustomerStore.Date,
                                InvoiceNumber = dtoTransactionSupplierCustomerStore.InvoiceNumber,
                                Total = dtoTransactionSupplierCustomerStore.Total ?? 0,
                                Credit = dtoTransactionSupplierCustomerStore.Credit ?? 0,
                                Debit = 0,
                                Amount = newCredit ?? 0,
                                Type = dtoTransactionSupplierCustomerStore.Type,
                                Describtion = dtoTransactionSupplierCustomerStore.describtion
                            };

                            Add(objTransaction);
                            Save();

                            var result = new DtoReturnCreditDebit
                            {
                                Debit = 0,
                                Credit = objTransaction.Amount
                            };

                            return result;
                        }
                        else
                        {
                            // فى حالة انه لسه عليه مديونية
                            var objTransaction = new TransactionSupplierCustomerStore()
                            {
                                CustomerId = dtoTransactionSupplierCustomerStore.CustomerId,
                                Date = dtoTransactionSupplierCustomerStore.Date,
                                InvoiceNumber = dtoTransactionSupplierCustomerStore.InvoiceNumber,
                                Total = dtoTransactionSupplierCustomerStore.Total ?? 0,
                                Credit = dtoTransactionSupplierCustomerStore.Credit ?? 0,
                                Debit = Math.Abs((decimal)newCredit),
                                Amount = 0,
                                Type = dtoTransactionSupplierCustomerStore.Type,
                                Describtion = dtoTransactionSupplierCustomerStore.describtion
                            };

                            Add(objTransaction);
                            Save();

                            var result = new DtoReturnCreditDebit
                            {
                                Debit = objTransaction.Debit,
                                Credit = 0
                            };

                            return result;
                        }
                    }
                }
                else
                {
                    //تسجيل ترصيد جديد
                    var objTransaction = new TransactionSupplierCustomerStore()
                    {
                        CustomerId = dtoTransactionSupplierCustomerStore.CustomerId,
                        Date = dtoTransactionSupplierCustomerStore.Date,
                        InvoiceNumber = dtoTransactionSupplierCustomerStore.InvoiceNumber,
                        Total = dtoTransactionSupplierCustomerStore.Total ?? 0,
                        Credit = dtoTransactionSupplierCustomerStore.Credit ?? 0,
                        Debit = dtoTransactionSupplierCustomerStore.Debit ?? 0,
                        Amount = dtoTransactionSupplierCustomerStore.Amount ?? 0,
                        Type = dtoTransactionSupplierCustomerStore.Type,
                        Describtion = dtoTransactionSupplierCustomerStore.describtion
                    };

                    Add(objTransaction);
                    Save();

                    var result = new DtoReturnCreditDebit
                    {
                        Debit = objTransaction.Debit,
                        Credit = objTransaction.Amount
                    };

                    return result;
                }
            }

            var _result = new DtoReturnCreditDebit
            {
                Debit = 0,
                Credit = 0
            };

            return _result;
        }

        //تعديل القيم بناءا على رقم الفاتورة  والعميل او المورد ونوع الفاتورة
        public DtoReturnCreditDebit EditTransactionStore(DtoTransactionSupplierCustomerStore dtoTransactionSupplierCustomerStore)
        {
            //جلب السطر اللى هيتم تعديله
            var isExist = FindBy(x => x.InvoiceNumber == dtoTransactionSupplierCustomerStore.InvoiceNumber && x.CustomerId == dtoTransactionSupplierCustomerStore.CustomerId && x.Type == dtoTransactionSupplierCustomerStore.Type).FirstOrDefault();

            var __result = new DtoReturnCreditDebit();

            //التحقق من وجود رصيد قديم
            if (isExist != null)
            {
                // جلب السطر اللى قبله
                var lastDebit = FindBy(x => x.Id < isExist.Id && x.CustomerId == dtoTransactionSupplierCustomerStore.CustomerId).OrderByDescending(x => x.Id).FirstOrDefault();

                if (lastDebit != null)
                {
                    //  فى حالة انه عندة مديونية قديمة
                    if (lastDebit.Debit >= 0 && lastDebit.Amount == 0)
                    {
                        decimal? newDebit = Math.Round((decimal)((lastDebit.Debit + dtoTransactionSupplierCustomerStore.Total) - dtoTransactionSupplierCustomerStore.Credit), 2);

                        if (newDebit > 0)
                        {
                            // فى حالة انه لسه عليه مديونية 
                            isExist.Total = dtoTransactionSupplierCustomerStore.Total ?? 0;
                            isExist.Credit = dtoTransactionSupplierCustomerStore.Credit ?? 0;
                            isExist.Debit = newDebit ?? 0;
                            isExist.Amount = 0;
                            isExist.Date = dtoTransactionSupplierCustomerStore.Date;
                            isExist.Describtion = dtoTransactionSupplierCustomerStore.describtion;


                            Edit(isExist);
                            Save();

                            __result.Debit = isExist.Debit;
                            __result.Credit = isExist.Amount;
                        }
                        else
                        {
                            // فى حالة انه طلع ليه فلوس

                            isExist.Total = dtoTransactionSupplierCustomerStore.Total ?? 0;
                            isExist.Credit = dtoTransactionSupplierCustomerStore.Credit ?? 0;
                            isExist.Debit = 0;
                            isExist.Amount = Math.Abs((decimal)newDebit);
                            isExist.Date = dtoTransactionSupplierCustomerStore.Date;
                            isExist.Describtion = dtoTransactionSupplierCustomerStore.describtion;

                            Edit(isExist);
                            Save();

                            __result.Debit = isExist.Debit;
                            __result.Credit = isExist.Amount;
                        }
                    }
                    // فى حالة ان ليه فلوس قديمة
                    else if (lastDebit.Amount > 0)
                    {
                        decimal? newCredit = Math.Round((decimal)((lastDebit.Amount + dtoTransactionSupplierCustomerStore.Credit) - dtoTransactionSupplierCustomerStore.Total), 2);

                        if (newCredit > 0)
                        {
                            // فى حالة انه طلع ليه فلوس

                            isExist.Total = dtoTransactionSupplierCustomerStore.Total ?? 0;
                            isExist.Credit = dtoTransactionSupplierCustomerStore.Credit ?? 0;
                            isExist.Debit = 0;
                            isExist.Amount = newCredit ?? 0;
                            isExist.Date = dtoTransactionSupplierCustomerStore.Date;
                            isExist.Describtion = dtoTransactionSupplierCustomerStore.describtion;

                            Edit(isExist);
                            Save();

                            __result.Debit = isExist.Debit;
                            __result.Credit = isExist.Amount;
                        }
                        else
                        {
                            // فى حالة انه لسه عليه مديونية

                            isExist.Total = dtoTransactionSupplierCustomerStore.Total ?? 0;
                            isExist.Credit = dtoTransactionSupplierCustomerStore.Credit ?? 0;
                            isExist.Debit = Math.Abs((decimal)newCredit);
                            isExist.Amount = 0;
                            isExist.Date = dtoTransactionSupplierCustomerStore.Date;
                            isExist.Describtion = dtoTransactionSupplierCustomerStore.describtion;

                            Edit(isExist);
                            Save();

                            __result.Debit = isExist.Debit;
                            __result.Credit = isExist.Amount;
                        }
                    }
                }
                // فى حالة ان دا اول سطر للشخص
                else
                {
                    isExist.Total = dtoTransactionSupplierCustomerStore.Total ?? 0;
                    isExist.Credit = dtoTransactionSupplierCustomerStore.Credit ?? 0;
                    isExist.Debit = dtoTransactionSupplierCustomerStore.Debit ?? 0;
                    isExist.Amount = dtoTransactionSupplierCustomerStore.Amount ?? 0;
                    isExist.Describtion = dtoTransactionSupplierCustomerStore.describtion;

                    Edit(isExist);
                    Save();

                    __result.Debit = isExist.Debit;
                    __result.Credit = isExist.Amount;

                }

                var listofRows = FindBy(x => x.Id > isExist.Id && x.CustomerId == dtoTransactionSupplierCustomerStore.CustomerId).OrderBy(x => x.Id).ToList();

                if (listofRows.Count() > 0)
                {
                    decimal? Debit = 0;
                    decimal? Amount = 0;

                    for (int i = 0; i < listofRows.Count; i++)
                    {
                        //فى حالة ان المسحوبات اكبر من الصفر يعنى عمل فواتير
                        if (listofRows[i].Total > 0)
                        {
                            //دى علشان اول مرة بيجيب الرقم النهائى للتعديل وبعد كدا يخش على السطر اللى بعدة
                            if (i == 0)
                            {
                                // التحقق من ان اسطر اللى تم التعديل عليه طلع ليه رصيد 
                                if (isExist.Amount > 0)
                                {
                                    //جمع الرصيد مع المدفوع وطرح اجمالى الفاتورة
                                    decimal? totalWithAmount = Math.Round((decimal)((isExist.Amount + listofRows[i].Credit) - listofRows[i].Total), 2);

                                    if (totalWithAmount > 0)
                                    {
                                        listofRows[i].Amount = totalWithAmount;
                                        listofRows[i].Debit = 0;

                                        //تسجيل بيانات السطر القديم
                                        Debit = listofRows[i].Debit;
                                        Amount = listofRows[i].Amount;

                                        Edit(listofRows[i]);
                                        Save();
                                    }
                                    else
                                    {
                                        listofRows[i].Amount = 0;
                                        listofRows[i].Debit = Math.Abs((decimal)totalWithAmount);

                                        //تسجيل بيانات السطر القديم
                                        Debit = listofRows[i].Debit;
                                        Amount = listofRows[i].Amount;

                                        Edit(listofRows[i]);
                                        Save();
                                    }
                                }
                                //فى حالة ان السطر اللى تم التعديل ليس فيه رصيد
                                else
                                {
                                    decimal? totalWithAmountandDebit = ((isExist.Debit + listofRows[i].Total) - listofRows[i].Credit);

                                    if (totalWithAmountandDebit > 0)
                                    {
                                        listofRows[i].Debit = totalWithAmountandDebit;
                                        listofRows[i].Amount = 0;

                                        //تسجيل بيانات السطر القديم
                                        Debit = listofRows[i].Debit;
                                        Amount = listofRows[i].Amount;

                                        Edit(listofRows[i]);
                                        Save();
                                    }
                                    else
                                    {
                                        listofRows[i].Debit = 0;
                                        listofRows[i].Amount = Math.Abs((decimal)totalWithAmountandDebit);

                                        //تسجيل بيانات السطر القديم
                                        Debit = listofRows[i].Debit;
                                        Amount = listofRows[i].Amount;

                                        Edit(listofRows[i]);
                                        Save();
                                    }
                                }
                            }
                            // علشان يحسب كل سطر لواحدة
                            else
                            {
                                //فى حالة ان فيه متبقى من السطر السابق
                                if (Debit > 0)
                                {
                                    decimal? totalWithAmountandDebit = ((Debit + listofRows[i].Total) - listofRows[i].Credit);

                                    if (totalWithAmountandDebit > 0)
                                    {
                                        listofRows[i].Debit = totalWithAmountandDebit;
                                        listofRows[i].Amount = 0;

                                        //تسجيل بيانات السطر القديم
                                        Debit = listofRows[i].Debit;
                                        Amount = listofRows[i].Amount;

                                        Edit(listofRows[i]);
                                        Save();
                                    }
                                    else
                                    {
                                        listofRows[i].Debit = 0;
                                        listofRows[i].Amount = Math.Abs((decimal)totalWithAmountandDebit);

                                        //تسجيل بيانات السطر القديم
                                        Debit = listofRows[i].Debit;
                                        Amount = listofRows[i].Amount;

                                        Edit(listofRows[i]);
                                        Save();
                                    }
                                }
                                else
                                {
                                    //جمع الرصيد مع المدفوع
                                    decimal? totalWithAmount = Math.Round((decimal)((Amount + listofRows[i].Credit) - listofRows[i].Total), 2);

                                    if (totalWithAmount > 0)
                                    {
                                        listofRows[i].Amount = totalWithAmount;
                                        listofRows[i].Debit = 0;

                                        //تسجيل بيانات السطر القديم
                                        Debit = listofRows[i].Debit;
                                        Amount = listofRows[i].Amount;

                                        Edit(listofRows[i]);
                                        Save();
                                    }
                                    else
                                    {
                                        listofRows[i].Amount = 0;
                                        listofRows[i].Debit = Math.Abs((decimal)totalWithAmount);

                                        //تسجيل بيانات السطر القديم
                                        Debit = listofRows[i].Debit;
                                        Amount = listofRows[i].Amount;

                                        Edit(listofRows[i]);
                                        Save();
                                    }
                                }
                            }
                        }
                        //فى حالة ان المسحوبات بيساوى صفر يعنى عمل سداد للفواتير
                        else
                        {
                            //دى علشان اول مرة بيجيب الرقم النهائى للتعديل وبعد كدا يخش على السطر اللى بعدة
                            if (i == 0)
                            {
                                // التحقق من ان اسطر اللى تم التعديل عليه طلع ليه رصيد 
                                if (isExist.Amount > 0)
                                {
                                    //جمع الرصيد مع المدفوع
                                    decimal? totalWithAmount = Math.Round((decimal)(isExist.Amount + listofRows[i].Credit), 2);

                                    listofRows[i].Amount = totalWithAmount;
                                    listofRows[i].Debit = 0;

                                    //تسجيل بيانات السطر القديم
                                    Debit = listofRows[i].Debit;
                                    Amount = listofRows[i].Amount;

                                    Edit(listofRows[i]);
                                    Save();
                                }
                                //فى حالة ان السطر اللى تم التعديل ليس فيه رصيد
                                else
                                {
                                    decimal? totalWithAmountandDebit = ((isExist.Debit + listofRows[i].Total) - listofRows[i].Credit);

                                    if (totalWithAmountandDebit > 0)
                                    {
                                        listofRows[i].Debit = totalWithAmountandDebit;
                                        listofRows[i].Amount = 0;

                                        //تسجيل بيانات السطر القديم
                                        Debit = listofRows[i].Debit;
                                        Amount = listofRows[i].Amount;

                                        Edit(listofRows[i]);
                                        Save();
                                    }
                                    else
                                    {
                                        listofRows[i].Debit = 0;
                                        listofRows[i].Amount = Math.Abs((decimal)totalWithAmountandDebit);

                                        //تسجيل بيانات السطر القديم
                                        Debit = listofRows[i].Debit;
                                        Amount = listofRows[i].Amount;

                                        Edit(listofRows[i]);
                                        Save();
                                    }
                                }
                            }
                            // علشان يحسب كل سطر لواحدة
                            else
                            {
                                //فى حالة ان فيه متبقى من السطر السابق
                                if (Debit > 0)
                                {
                                    decimal? totalWithAmountandDebit = ((Debit + listofRows[i].Total) - listofRows[i].Credit);

                                    if (totalWithAmountandDebit > 0)
                                    {
                                        listofRows[i].Debit = totalWithAmountandDebit;
                                        listofRows[i].Amount = 0;

                                        //تسجيل بيانات السطر القديم
                                        Debit = listofRows[i].Debit;
                                        Amount = listofRows[i].Amount;

                                        Edit(listofRows[i]);
                                        Save();
                                    }
                                    else
                                    {
                                        listofRows[i].Debit = 0;
                                        listofRows[i].Amount = Math.Abs((decimal)totalWithAmountandDebit);

                                        //تسجيل بيانات السطر القديم
                                        Debit = listofRows[i].Debit;
                                        Amount = listofRows[i].Amount;

                                        Edit(listofRows[i]);
                                        Save();
                                    }
                                }
                                else
                                {
                                    //جمع الرصيد مع المدفوع
                                    decimal? totalWithAmount = Math.Round((decimal)(Amount + listofRows[i].Credit), 2);

                                    listofRows[i].Amount = totalWithAmount;
                                    listofRows[i].Debit = 0;

                                    //تسجيل بيانات السطر القديم
                                    Debit = listofRows[i].Debit;
                                    Amount = listofRows[i].Amount;

                                    Edit(listofRows[i]);
                                    Save();
                                }
                            }
                        }
                    }

                    __result.Debit = Debit;
                    __result.Credit = Amount;

                    return __result;
                }
                else
                {
                    return __result;
                }
            }
            else
            {
                if (dtoTransactionSupplierCustomerStore != null)
                {
                    var objTransaction = new TransactionSupplierCustomerStore()
                    {
                        CustomerId = dtoTransactionSupplierCustomerStore.CustomerId,
                        Date = dtoTransactionSupplierCustomerStore.Date,
                        InvoiceNumber = dtoTransactionSupplierCustomerStore.InvoiceNumber,
                        Total = dtoTransactionSupplierCustomerStore.Total ?? 0,
                        Credit = dtoTransactionSupplierCustomerStore.Credit ?? 0,
                        Debit = dtoTransactionSupplierCustomerStore.Debit ?? 0,
                        Amount = dtoTransactionSupplierCustomerStore.Amount ?? 0,
                        Type = dtoTransactionSupplierCustomerStore.Type,
                        Describtion = dtoTransactionSupplierCustomerStore.describtion
                    };

                    Add(objTransaction);
                    Save();

                    __result.Debit = objTransaction.Debit;
                    __result.Credit = objTransaction.Amount;

                    return __result;
                }
            }

            var _result = new DtoReturnCreditDebit
            {
                Debit = 0,
                Credit = 0
            };

            return _result;
        }

        //عند حذف الفاتورة بناءا على رقم الفاتورة والعميل او المورد ونوع الفاتورة
        public DtoReturnCreditDebit DeleteTransactionStore(string InvoiceNumber, int? CustomerId, string type)
        {
            var isExist = FindBy(x => x.InvoiceNumber == InvoiceNumber && x.CustomerId == CustomerId && x.Type == type).FirstOrDefault();

            if (isExist != null)
            {
                var lastDebit = FindBy(x => x.Id < isExist.Id && x.CustomerId == CustomerId).OrderByDescending(x => x.Id).FirstOrDefault();

                var listofRows = FindBy(x => x.Id > isExist.Id && x.CustomerId == CustomerId).OrderBy(x => x.Id).ToList();

                decimal? Debit = lastDebit.Debit;
                decimal? Amount = lastDebit.Amount;

                for (int i = 0; i < listofRows.Count(); i++)
                {
                    //if (i > 0)
                    // {
                    //فى حالة ان السطر اللى عليه الدور فاتورة
                    if (listofRows[i].Total > 0)
                    {
                        //فى حالة ان موجود متبقى
                        if (Debit > 0)
                        {
                            decimal? totalWithDebit = Math.Round((decimal)((Debit + listofRows[i].Total) - listofRows[i].Credit), 2);

                            if (totalWithDebit > 0)
                            {
                                listofRows[i].Debit = totalWithDebit;
                                listofRows[i].Amount = 0;

                                Debit = listofRows[i].Debit;
                                Amount = listofRows[i].Amount;

                                Edit(listofRows[i]);
                                Save();
                            }
                            else
                            {
                                listofRows[i].Debit = 0;
                                listofRows[i].Amount = Math.Abs((decimal)totalWithDebit);

                                Debit = listofRows[i].Debit;
                                Amount = listofRows[i].Amount;

                                Edit(listofRows[i]);
                                Save();
                            }
                        }
                        else
                        {
                            decimal? totalWithCredit = Math.Round((decimal)((Amount + listofRows[i].Credit) - listofRows[i].Total), 2);

                            if (totalWithCredit > 0)
                            {
                                listofRows[i].Debit = 0;
                                listofRows[i].Amount = totalWithCredit;

                                Debit = listofRows[i].Debit;
                                Amount = listofRows[i].Amount;

                                Edit(listofRows[i]);
                                Save();
                            }
                            else
                            {
                                listofRows[i].Debit = Math.Abs((decimal)totalWithCredit);
                                listofRows[i].Amount = 0;

                                Debit = listofRows[i].Debit;
                                Amount = listofRows[i].Amount;

                                Edit(listofRows[i]);
                                Save();
                            }
                        }
                    }
                    //فى حالة ان السطر اللى عليه الدور عبارة عن سداد مديونية
                    else
                    {
                        //فى حالة ان فى متبقى
                        if (Debit > 0)
                        {
                            decimal? totalWithDebit = Math.Round((decimal)(Debit - listofRows[i].Credit), 2);

                            if (totalWithDebit > 0)
                            {
                                listofRows[i].Debit = totalWithDebit;
                                listofRows[i].Amount = 0;

                                Debit = listofRows[i].Debit;
                                Amount = listofRows[i].Amount;

                                Edit(listofRows[i]);
                                Save();
                            }
                            else
                            {
                                listofRows[i].Debit = 0;
                                listofRows[i].Amount = Math.Abs((decimal)totalWithDebit);

                                Debit = listofRows[i].Debit;
                                Amount = listofRows[i].Amount;

                                Edit(listofRows[i]);
                                Save();
                            }
                        }
                        //فى حالة ان فى رصيد
                        else
                        {
                            decimal? totalWithCredit = Math.Round((decimal)(Amount + listofRows[i].Credit), 2);

                            listofRows[i].Debit = 0;
                            listofRows[i].Amount = totalWithCredit;

                            Debit = listofRows[i].Debit;
                            Amount = listofRows[i].Amount;

                            Edit(listofRows[i]);
                            Save();
                        }
                    }
                    //}
                    //else
                    //{
                    //    //جلب قيمة السطر ما قبل سطر الحذف

                    //    Debit = lastDebit.Debit;
                    //    Amount = lastDebit.Amount;
                    //}
                }

                //delete object of Rows
                Delete(isExist);
                Save();

                var result = new DtoReturnCreditDebit
                {
                    Debit = listofRows.Count() > 0 ? Debit : lastDebit.Debit,
                    Credit = listofRows.Count() > 0 ? Amount : lastDebit.Amount
                };

                return result;
            }

            var _result = new DtoReturnCreditDebit
            {
                Debit = 0,
                Credit = 0
            };

            return _result;
        }

        public List<DtoTransactionSupplierCustomerStore> selectTransactionStore(bool? flag)
        {
            var result = (from q in Context.TransactionSupplierCustomerStores.AsNoTracking().Where(x => x.Customer.Flag == flag && x.Customer.IsDelete == null)
                          select new DtoTransactionSupplierCustomerStore
                          {
                              Id = q.Id,
                              CustomerName = q.Customer.Name,
                              CustomerId = q.CustomerId,
                              InvoiceNumber = q.InvoiceNumber,
                              Date = q.Date,
                              Credit = q.Credit,
                              Debit = q.Debit,
                              Total = q.Total,
                              Amount = q.Amount,
                              Type = q.Type,
                              describtion = q.Describtion,
                              listPurchaseOrderDetails = q.Type == "تسجيل فاتورة مشتريات" ? Context.TblPurchaseOrderDetails.Where(z => z.IsDeleted == null && z.Invoice.NumberOfInvoiceBySystem == Convert.ToInt32(q.InvoiceNumber) && z.Invoice.CustomerId == q.CustomerId).Select(x => new DtoPurchaseOrderDetails
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
                              }).ToList() : (q.Type == "تسجيل فاتورة مبيعات" ?
                               Context.TblInvoicesDetails.Where(z => z.IsDeleted == null && z.Invoice.NumberOfInvoiceBySystem == Convert.ToInt32(q.InvoiceNumber) && z.Invoice.CustomerId == q.CustomerId).Select(x => new DtoPurchaseOrderDetails
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
                                   centi = x.Centi.ToString() ?? "0",
                                   type = x.Type,
                                   typeText = x.Type == true ? "متر مكعب" : "عدد",
                                   priceSelling = x.PriceSelling,
                                   priceSupplier = x.PriceSupplier
                               }).ToList()
                              : null)
                          }).OrderByDescending(x => x.Id).ToList();

            //foreach (var item in result)
            //{
            //    string iitem = "";
            //    foreach (var items in item.listPurchaseOrderDetails)
            //    {
            //        iitem += items.size + "/" + items.width + " -- "; 
            //    }

            //    item.itemss = iitem;
            //}

            return result;
        }
    }
}

using ContextERP.Models;
using DtoERP.Dto;
using IERPRepository.IERPRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq; 


namespace ERPRepository.ERPRepository
{
    public class PayoffaDebtRepository : GenericRepository<ERPDBContext, TblPayoffaDebt>, IPayoffaDebtRepository
    {
        private readonly ISupplierCustomerRespository _supplierCustomerRespository;
        private readonly ITransactionSupplierCustomerStoreRepository _transactionSupplierCustomerStoreRepository;
        private readonly ITransactionSupplierCustomerRepository _transactionSupplierCustomerRepository;
        public PayoffaDebtRepository(ITransactionSupplierCustomerStoreRepository transactionSupplierCustomerStoreRepository,
            ITransactionSupplierCustomerRepository transactionSupplierCustomerRepository, ISupplierCustomerRespository supplierCustomerRespository)
        {
            _supplierCustomerRespository = supplierCustomerRespository;
            _transactionSupplierCustomerRepository = transactionSupplierCustomerRepository;
            _transactionSupplierCustomerStoreRepository = transactionSupplierCustomerStoreRepository;
        }

        public DtoPayoffaDebt AddEditPayedOff(DtoPayoffaDebt dtoPayoffaDebt)
        {
            if (dtoPayoffaDebt != null)
            {
                if (dtoPayoffaDebt.id > 0)
                {
                    var obj = FindBy(x => x.Id == dtoPayoffaDebt.id).FirstOrDefault();

                    if (obj != null)
                    {
                        obj.Debt = dtoPayoffaDebt.debt;
                        obj.DebtDate = dtoPayoffaDebt.debtDate;
                        obj.Describtion = dtoPayoffaDebt.describtion;

                        Edit(obj);
                        Save();

                        //تسجيل ترصيد الموردين والعملاء
                        DtoTransactionSupplierCustomerStore store = new DtoTransactionSupplierCustomerStore()
                        {
                            CustomerId = dtoPayoffaDebt.customerId,
                            Date = dtoPayoffaDebt.debtDate,//DateTime.Now,
                            InvoiceNumber = dtoPayoffaDebt.id.ToString(),
                            Total = 0,
                            Credit = dtoPayoffaDebt.debt ?? 0,
                            Debit = 0,
                            Amount = 0,
                            Type = dtoPayoffaDebt.isReturn == true? "سداد مديونية - مرتجع مبيعات" : "سداد مديونية",
                            describtion = dtoPayoffaDebt.describtion
                        };
                        var amount = _transactionSupplierCustomerStoreRepository.EditTransactionStore(store);

                        _supplierCustomerRespository._UpdateSupplierCustomerWithNewStore(dtoPayoffaDebt.customerId, amount.Credit, amount.Debit);

                        //تسجيل حركة للموردين والعملاء 
                        DtoTransactionSupplierCustomer objTransaction = new DtoTransactionSupplierCustomer()
                        {
                            customerId = dtoPayoffaDebt.customerId,
                            date = DateTime.Now,
                            invoiceNumber = dtoPayoffaDebt.id.ToString(),
                            debit = 0,
                            credit = Math.Round((decimal)dtoPayoffaDebt.debt, 2),
                            total = 0,
                            type = dtoPayoffaDebt.isReturn == true ? "تعديل سداد مديونية - مرتجع مبيعات" : "تعديل سداد مديونية",
                            description = dtoPayoffaDebt.describtion
                        };

                        _transactionSupplierCustomerRepository.AddTransactionSupplierCustomer(objTransaction);

                        return dtoPayoffaDebt;
                    }
                }
                else
                {
                    var objDept = new TblPayoffaDebt()
                    {
                        CustomerId = dtoPayoffaDebt.customerId,
                        Debt = dtoPayoffaDebt.debt,
                        DebtDate = dtoPayoffaDebt.debtDate,
                        Describtion = dtoPayoffaDebt.describtion,
                        IsReturn = dtoPayoffaDebt.isReturn
                    };

                    Add(objDept);
                    Save();
                    dtoPayoffaDebt.id = objDept.Id;


                    //تسجيل ترصيد الموردين والعملاء
                    DtoTransactionSupplierCustomerStore store = new DtoTransactionSupplierCustomerStore()
                    {
                        CustomerId = dtoPayoffaDebt.customerId,
                        Date = dtoPayoffaDebt.debtDate,  //DateTime.Now,
                        InvoiceNumber = dtoPayoffaDebt.id.ToString(),
                        Total = 0,
                        Credit = dtoPayoffaDebt.debt ?? 0,
                        Debit = 0,
                        Amount = 0,
                        Type = dtoPayoffaDebt.isReturn == true ? "سداد مديونية - مرتجع مبيعات" : "سداد مديونية",
                        describtion = dtoPayoffaDebt.describtion
                    };
                    var amount = _transactionSupplierCustomerStoreRepository.AddTransactionStore(store);

                    _supplierCustomerRespository._UpdateSupplierCustomerWithNewStore(dtoPayoffaDebt.customerId, amount.Credit, amount.Debit);

                    DtoTransactionSupplierCustomer objTransaction = new DtoTransactionSupplierCustomer()
                    {
                        customerId = dtoPayoffaDebt.customerId,
                        date = DateTime.Now,
                        invoiceNumber = dtoPayoffaDebt.id.ToString(),
                        debit = 0,
                        credit = Math.Round((decimal)dtoPayoffaDebt.debt, 2),
                        total = 0,
                        type = dtoPayoffaDebt.isReturn == true ? "سداد مديونية - مرتجع مبيعات" : "سداد مديونية",
                        description = dtoPayoffaDebt.describtion
                    };

                    _transactionSupplierCustomerRepository.AddTransactionSupplierCustomer(objTransaction);


                    return dtoPayoffaDebt;
                }
            }

            return dtoPayoffaDebt;
        }

        public List<DtoPayoffaDebt> SelectAllDebets(bool? flag)
        {
            var result = (from q in Context.TblPayoffaDebts.AsNoTracking().Where(x => x.IsDeleted == null && x.Customer.Flag == flag && x.Customer.IsDelete == null)
                          select new DtoPayoffaDebt
                          {
                              id = q.Id,
                              customerId = q.CustomerId,
                              debtDate = q.DebtDate,
                              debt = q.Debt,
                              describtion = q.Describtion,
                              isReturn = q.IsReturn
                          }).OrderByDescending(x => x.debtDate).ToList();

            return result;
        }

        public List<DtoPayoffaDebt> SelectAllDebetsByDate(bool? flag, string date)
        {
            var result = (from q in Context.TblPayoffaDebts.AsNoTracking().Where(x => x.IsDeleted == null && x.Customer.Flag == flag && x.DebtDate == Convert.ToDateTime(date))
                          select new DtoPayoffaDebt
                          {
                              id = q.Id,
                              customerName = q.Customer.Name,
                              debtDate = q.DebtDate,
                              debt = q.Debt,
                              describtion = q.Describtion
                          }).OrderByDescending(x => x.id).ToList();

            return result;
        }

        public void DeletePayedOffDebt(int? id)
        {
            var objRow = FindBy(x => x.Id == id).FirstOrDefault();

            if (objRow != null)
            {
                objRow.IsDeleted = true;

                Edit(objRow);
                Save();

                var amount = _transactionSupplierCustomerStoreRepository.DeleteTransactionStore(id.ToString(), objRow.CustomerId, "سداد مديونية");

                _supplierCustomerRespository._UpdateSupplierCustomerWithNewStore(objRow.CustomerId, amount.Credit, amount.Debit);
            }
        }
    }
}

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
    public class CustomerIndebtednessesRepository : GenericRepository<ERPDBContext, TblCustomerIndebtedness>, ICustomerIndebtednessesRepository
    {
        private readonly ISupplierCustomerRespository _supplierCustomerRespository;
        private readonly ITransactionSupplierCustomerStoreRepository _transactionSupplierCustomerStoreRepository;
        private readonly ITransactionSupplierCustomerRepository _transactionSupplierCustomerRepository;
        public CustomerIndebtednessesRepository(ITransactionSupplierCustomerStoreRepository transactionSupplierCustomerStoreRepository,
            ITransactionSupplierCustomerRepository transactionSupplierCustomerRepository, ISupplierCustomerRespository supplierCustomerRespository)
        {
            _supplierCustomerRespository = supplierCustomerRespository;
            _transactionSupplierCustomerRepository = transactionSupplierCustomerRepository;
            _transactionSupplierCustomerStoreRepository = transactionSupplierCustomerStoreRepository;
        }

        public DtoIndebtness AddEditIndebtedness(DtoIndebtness dtoIndebtness)
        {
            if (dtoIndebtness != null)
            {
                if (dtoIndebtness.id > 0)
                {
                    var obj = FindBy(x => x.Id == dtoIndebtness.id).FirstOrDefault();

                    if (obj != null)
                    {
                        obj.Debt = dtoIndebtness.debt;
                        obj.DebtDate = dtoIndebtness.debtDate;
                        obj.Describtion = dtoIndebtness.describtion;

                        Edit(obj);
                        Save();

                        //تسجيل ترصيد الموردين والعملاء
                        DtoTransactionSupplierCustomerStore store = new DtoTransactionSupplierCustomerStore()
                        {
                            CustomerId = dtoIndebtness.customerId,
                            Date = dtoIndebtness.debtDate,//DateTime.Now,
                            InvoiceNumber = dtoIndebtness.id.ToString(),
                            Total = dtoIndebtness.debt ?? 0,
                            Credit = 0,
                            Debit = 0,
                            Amount = 0,
                            Type = "مديونية",
                            describtion = dtoIndebtness.describtion
                        };

                        var amount = _transactionSupplierCustomerStoreRepository.EditTransactionStore(store);

                        _supplierCustomerRespository._UpdateSupplierCustomerWithNewStore(dtoIndebtness.customerId, amount.Credit, amount.Debit);

                        //تسجيل حركة للموردين والعملاء 
                        DtoTransactionSupplierCustomer objTransaction = new DtoTransactionSupplierCustomer()
                        {
                            customerId = dtoIndebtness.customerId,
                            date = DateTime.Now,
                            invoiceNumber = dtoIndebtness.id.ToString(),
                            debit = 0,
                            credit = Math.Round((decimal)dtoIndebtness.debt, 2),
                            total = 0,
                            type = "تعديل مديونية",
                            description = dtoIndebtness.describtion
                        };

                        _transactionSupplierCustomerRepository.AddTransactionSupplierCustomer(objTransaction);

                        return dtoIndebtness;
                    }
                }
                else
                {
                    var objDept = new TblCustomerIndebtedness()
                    {
                        CustomerId = dtoIndebtness.customerId,
                        Debt = dtoIndebtness.debt,
                        DebtDate = dtoIndebtness.debtDate,
                        Describtion = dtoIndebtness.describtion
                    };

                    Add(objDept);
                    Save();
                    dtoIndebtness.id = objDept.Id;


                    //تسجيل ترصيد الموردين والعملاء
                    DtoTransactionSupplierCustomerStore store = new DtoTransactionSupplierCustomerStore()
                    {
                        CustomerId = dtoIndebtness.customerId,
                        Date = dtoIndebtness.debtDate,  //DateTime.Now,
                        InvoiceNumber = dtoIndebtness.id.ToString(),
                        Total = dtoIndebtness.debt ?? 0,
                        Credit = 0,
                        Debit = 0,
                        Amount = 0,
                        Type = "مديونية",
                        describtion = dtoIndebtness.describtion
                    };
                    var amount = _transactionSupplierCustomerStoreRepository.AddTransactionStore(store);

                    _supplierCustomerRespository._UpdateSupplierCustomerWithNewStore(dtoIndebtness.customerId, amount.Credit, amount.Debit);

                    DtoTransactionSupplierCustomer objTransaction = new DtoTransactionSupplierCustomer()
                    {
                        customerId = dtoIndebtness.customerId,
                        date = DateTime.Now,
                        invoiceNumber = dtoIndebtness.id.ToString(),
                        debit = Math.Round((decimal)dtoIndebtness.debt, 2),
                        credit = 0,
                        total = 0,
                        type = "مديونية",
                        description = dtoIndebtness.describtion
                    };

                    _transactionSupplierCustomerRepository.AddTransactionSupplierCustomer(objTransaction);


                    return dtoIndebtness;
                }
            }

            return dtoIndebtness;
        }

        public List<DtoIndebtness> SelectAllIndebtedness(bool? flag)
        {
            var result = (from q in Context.TblCustomerIndebtednesses.AsNoTracking().Where(x => x.IsDeleted == null && x.Customer.Flag == flag && x.Customer.IsDelete == null)
                          select new DtoIndebtness
                          {
                              id = q.Id,
                              customerId = q.CustomerId,
                              debtDate = q.DebtDate,
                              debt = q.Debt,
                              describtion = q.Describtion
                          }).OrderByDescending(x => x.debtDate).ToList();

            return result;
        }

        public List<DtoIndebtness> SelectAllIndebtednessByDate(bool? flag, string date)
        {
            var result = (from q in Context.TblPayoffaDebts.AsNoTracking().Where(x => x.IsDeleted == null && x.Customer.Flag == flag && x.DebtDate == Convert.ToDateTime(date))
                          select new DtoIndebtness
                          {
                              id = q.Id,
                              customerName = q.Customer.Name,
                              debtDate = q.DebtDate,
                              debt = q.Debt,
                              describtion = q.Describtion
                          }).OrderByDescending(x => x.id).ToList();

            return result;
        }

        public void DeleteIndebtedness(int? id)
        {
            var objRow = FindBy(x => x.Id == id).FirstOrDefault();

            if (objRow != null)
            {
                objRow.IsDeleted = true;

                Edit(objRow);
                Save();

                var amount = _transactionSupplierCustomerStoreRepository.DeleteTransactionStore(id.ToString(), objRow.CustomerId, "مديونية");

                _supplierCustomerRespository._UpdateSupplierCustomerWithNewStore(objRow.CustomerId, amount.Credit, amount.Debit);
            }
        }
    }
}

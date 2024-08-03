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
    public class CustomerSettlementRepository : GenericRepository<ERPDBContext, TblCustomerSettlement>, ICustomerSettlementRepository
    {
        private readonly ISupplierCustomerRespository _supplierCustomerRespository;
        private readonly ITransactionSupplierCustomerStoreRepository _transactionSupplierCustomerStoreRepository;
        private readonly ITransactionSupplierCustomerRepository _transactionSupplierCustomerRepository;
        public CustomerSettlementRepository(ITransactionSupplierCustomerStoreRepository transactionSupplierCustomerStoreRepository,
            ITransactionSupplierCustomerRepository transactionSupplierCustomerRepository, ISupplierCustomerRespository supplierCustomerRespository)
        {
            _supplierCustomerRespository = supplierCustomerRespository;
            _transactionSupplierCustomerRepository = transactionSupplierCustomerRepository;
            _transactionSupplierCustomerStoreRepository = transactionSupplierCustomerStoreRepository;
        }

        public DtoCustomerSettlement AddEditCustomerSettlement(DtoCustomerSettlement dtoIndebtness)
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
                            Total = 0,
                            Credit = dtoIndebtness.debt ?? 0,
                            Debit = 0,
                            Amount = 0,
                            Type = "تسوية مديونية",
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
                            type = "تسوية مديونية",
                            description = dtoIndebtness.describtion
                        };

                        _transactionSupplierCustomerRepository.AddTransactionSupplierCustomer(objTransaction);

                        return dtoIndebtness;
                    }
                }
                else
                {
                    var objDept = new TblCustomerSettlement()
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
                        Total = 0,
                        Credit = dtoIndebtness.debt ?? 0,
                        Debit = 0,
                        Amount = 0,
                        Type = "تسوية مديونية",
                        describtion = dtoIndebtness.describtion
                    };
                    var amount = _transactionSupplierCustomerStoreRepository.AddTransactionStore(store);

                    _supplierCustomerRespository._UpdateSupplierCustomerWithNewStore(dtoIndebtness.customerId, amount.Credit, amount.Debit);

                    DtoTransactionSupplierCustomer objTransaction = new DtoTransactionSupplierCustomer()
                    {
                        customerId = dtoIndebtness.customerId,
                        date = DateTime.Now,
                        invoiceNumber = dtoIndebtness.id.ToString(),
                        debit = 0,
                        credit = Math.Round((decimal)dtoIndebtness.debt, 2),
                        total = 0,
                        type = "تسوية مديونية",
                        description = dtoIndebtness.describtion
                    };

                    _transactionSupplierCustomerRepository.AddTransactionSupplierCustomer(objTransaction);


                    return dtoIndebtness;
                }
            }

            return dtoIndebtness;
        }

        public List<DtoCustomerSettlement> SelectAllCustomerSettlement(bool? flag)
        {
            var result = (from q in Context.TblCustomerSettlements.AsNoTracking().Where(x => x.IsDeleted == null && x.Customer.Flag == flag && x.Customer.IsDelete == null)
                          select new DtoCustomerSettlement
                          {
                              id = q.Id,
                              customerId = q.CustomerId,
                              debtDate = q.DebtDate,
                              debt = q.Debt,
                              describtion = q.Describtion
                          }).OrderByDescending(x => x.debtDate).ToList();

            return result;
        }

        public List<DtoCustomerSettlement> SelectAllCustomerSettlementByDate(bool? flag, string date)
        {
            var result = (from q in Context.TblPayoffaDebts.AsNoTracking().Where(x => x.IsDeleted == null && x.Customer.Flag == flag && x.DebtDate == Convert.ToDateTime(date))
                          select new DtoCustomerSettlement
                          {
                              id = q.Id,
                              customerName = q.Customer.Name,
                              debtDate = q.DebtDate,
                              debt = q.Debt,
                              describtion = q.Describtion
                          }).OrderByDescending(x => x.id).ToList();

            return result;
        }

        public void DeleteCustomerSettlement(int? id)
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

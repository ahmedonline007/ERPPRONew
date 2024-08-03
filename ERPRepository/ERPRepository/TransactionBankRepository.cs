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
    public class TransactionBankRepository : GenericRepository<ERPDBContext, TblTransactionBank>, ITransactionBankRepository
    {
        private readonly IBanksRepository _banksRepository;

        public TransactionBankRepository(IBanksRepository banksRepository)
        {
            _banksRepository = banksRepository;
        }

        public List<DtoTransactionBank> GetAllTransactionBank()
        {
            var result = (from q in Context.TblTransactionBanks.AsNoTracking().Where(x => x.IsDeleted == null)
                          select new DtoTransactionBank
                          {
                              id = q.Id,
                              bankId = q.BankId,
                              cost = q.Cost,
                              description = q.Describtion,
                              customerId = q.CustomerId,
                              transactionDate = q.TransactionDate,
                              transactionType = q.TransactionType,
                              transactionTypeName = q.TransactionType == 1 ? "إيداع" : "سحب"
                          }).OrderByDescending(x => x.transactionDate).ToList();

            return result;
        }


        public void DeleteTransactionBank(int id)
        {
            var obj = FindBy(x => x.Id == id).FirstOrDefault();

            if (obj != null)
            {
                var cost = _banksRepository.GetCostBank(obj.BankId) ?? 0;

                decimal? totalCost = 0;

                // ايداع
                if (obj.TransactionType == 1)
                {
                    totalCost = Math.Round((decimal)(cost - obj.Cost), 2);
                }
                // سحب
                else if (obj.TransactionType == 2)
                {
                    totalCost = Math.Round((decimal)(cost + obj.Cost), 2);
                }


                obj.IsDeleted = true;

                Edit(obj);
                Save();

                _banksRepository.UpdateBank(obj.BankId, totalCost);
            }
        }

        //تحتاج مراجعة
        public DtoTransactionBank AddEditTransactionBank(DtoTransactionBank dto)
        {
            if (dto != null)
            {
                if (dto.id > 0)
                {
                    var isExist = FindBy(x => x.Id == dto.id).FirstOrDefault();

                    if (isExist != null)
                    {
                        var cost = _banksRepository.GetCostBank(dto.bankId);

                        decimal? totalCost = 0;

                        //1- فى حالة تغيير الحالة من ايداع الى سحب او العكس
                        if (isExist.TransactionType != dto.transactionType && isExist.Cost == dto.cost)
                        {
                            decimal? _totalCost = (isExist.Cost * 2);

                            //ايداع
                            if (dto.transactionType == 1)
                            {
                                totalCost = Math.Round((decimal)(cost + isExist.Cost), 2);
                                _banksRepository.UpdateBank(dto.bankId, totalCost);
                            }
                            //سحب
                            else if (dto.transactionType == 2)
                            {
                                totalCost = Math.Round((decimal)(cost - isExist.Cost), 2);

                                _banksRepository.UpdateBank(dto.bankId, totalCost);
                            }
                        }
                        //2- فى حالة تغيير المبلغ والحالة 
                        else if (isExist.TransactionType != dto.transactionType && isExist.Cost != dto.cost)
                        {
                            // ايداع
                            if (dto.transactionType == 1)
                            {
                                // طرح المبلغ القديم من البنك
                                totalCost = Math.Round((decimal)(cost + isExist.Cost), 2);
                                // جمع المبلغ الجديد
                                totalCost = Math.Round((decimal)(totalCost + dto.cost), 2);

                                _banksRepository.UpdateBank(dto.bankId, totalCost);
                            }
                            //سحب
                            else if (dto.transactionType == 2)
                            {
                                // جمع المبلغ القديم من البنك
                                totalCost = Math.Round((decimal)(cost - isExist.Cost), 2);
                                //  المبلغ الجديد طرح
                                totalCost = Math.Round((decimal)(totalCost - dto.cost), 2);

                                _banksRepository.UpdateBank(dto.bankId, totalCost);
                            }
                        }
                        // فى حالة تغيير  البنك مع ثبات الحالة والمبلغ
                        else if (isExist.TransactionType == dto.transactionType && isExist.Cost != dto.cost)
                        {
                            // ايداع
                            if (isExist.TransactionType == 1)
                            {
                                // طرحت القيمة القديمة من البنك
                                decimal? dd = Math.Round((decimal)(cost - isExist.Cost), 2); 
                                decimal? gg = Math.Round((decimal)(cost + dto.cost), 2);
                                _banksRepository.UpdateBank(dto.bankId, gg);
                            }
                            //سحب
                            else if (isExist.TransactionType == 2)
                            {
                                // جمعت القيمة القديمة من البنك
                                decimal? dd = Math.Round((decimal)(cost + isExist.Cost), 2); 
                                decimal gg = Math.Round((decimal)(dd - dto.cost), 2);
                                _banksRepository.UpdateBank(dto.bankId, gg);
                            }
                        }
                       
                        isExist.Cost = dto.cost;
                        isExist.TransactionDate = dto.transactionDate;
                        isExist.Describtion = dto.description;
                        isExist.TransactionType = dto.transactionType;
                        isExist.BankId = dto.bankId;

                        Edit(isExist);
                        Save();
                    }
                }
                else
                {
                    var cost = _banksRepository.GetCostBank(dto.bankId) ?? 0;

                    decimal? totalCost = 0;
                    // ايداع
                    if (dto.transactionType == 1)
                    {
                        totalCost = Math.Round((decimal)(cost + dto.cost), 2);

                    }
                    else if (dto.transactionType == 2)
                    {
                        totalCost = Math.Round((decimal)(cost - dto.cost), 2);
                    }

                    var objTran = new TblTransactionBank()
                    {
                        BankId = dto.bankId,
                        Cost = dto.cost,
                        CustomerId = dto.customerId,
                        Describtion = dto.description,
                        TransactionDate = dto.transactionDate,
                        TransactionType = dto.transactionType
                    };

                    Add(objTran);
                    Save();
                    _banksRepository.UpdateBank(dto.bankId, totalCost);

                    dto.id = objTran.Id;
                }
            }

            return dto;
        }
    }
}

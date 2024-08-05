using DtoERP.Dto;
using IERPRepository.IERPRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace ERPPRONew.Controllers
{

    [ApiController]
    [Route("api/ERP")]
    public class ERPController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IExpencesRepository _expencesRepository;
        private readonly IInvoicesRepository _invoicesRepository;
        private readonly IInvoicesDetailsRepository _invoicesDetailsRepository;
        private readonly IPermissionsRepository _permissionsRepository;
        private readonly IProductRepository _productRepository;
        private readonly IProductNumberRepository _productNumberRepository;
        private readonly IProductSizeRepository _productSizeRepository;
        private readonly IPurchaseOrderRepository _purchaseOrderRepository;
        private readonly IPurchaseOrderDetailsRepository _purchaseOrderDetailsRepository;
        private readonly IReturnInvoicesRepository _returnInvoicesRepository;
        private readonly IReturnInvoicesDetailsRespository _returnInvoicesDetailsRespository;
        private readonly ISupplierCustomerRespository _supplierCustomerRespository;
        private readonly ITransactionProductSizeRepository _transactionProductSizeRepository;
        private readonly ITransactionSupplierCustomerRepository _transactionSupplierCustomerRepository;
        private readonly IUsersRepository _usersRepository;
        private readonly ILogger<ERPController> _logger;
        private readonly IInstallmentRepository _installmentRepository;
        private readonly IExpencesToRepository _expencesToRepository;
        private readonly ITransactionSupplierCustomerStoreRepository _transactionSupplierCustomerStoreRepository;
        private readonly IPayoffaDebtRepository _payoffaDebtRepository;
        private readonly ICustomerIndebtednessesRepository _customerIndebtednessesRepository;
        private readonly IBanksRepository _banksRepository;
        private readonly ITransactionBankRepository _transactionBankRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IFinancialAdvancesRepository _financialAdvancesRepository;
        private readonly IAddSalaryEmployeeRepository _addSalaryEmployeeRepository;
        private readonly IVacationRepository _vacationRepository;
        private readonly IBouneRepository _bouneRepository;
        private readonly ICustomerSettlementRepository _customerSettlementRepository;

        public ERPController(ILogger<ERPController> logger, ICategoryRepository categoryRepository,
           IExpencesRepository expencesRepository, IInvoicesRepository invoicesRepository,
           IInvoicesDetailsRepository invoicesDetailsRepository, IPermissionsRepository permissionsRepository,
           IProductRepository productRepository, IProductSizeRepository productSizeRepository,
           IPurchaseOrderRepository purchaseOrderRepository, IPurchaseOrderDetailsRepository purchaseOrderDetailsRepository,
           IReturnInvoicesRepository returnInvoicesRepository, IReturnInvoicesDetailsRespository returnInvoicesDetailsRespository,
           ISupplierCustomerRespository supplierCustomerRespository, ITransactionProductSizeRepository transactionProductSizeRepository,
           ITransactionSupplierCustomerRepository transactionSupplierCustomerRepository, IUsersRepository usersRepository,
           IProductNumberRepository productNumberRepository, IInstallmentRepository installmentRepository,
           IExpencesToRepository expencesToRepository, ITransactionSupplierCustomerStoreRepository transactionSupplierCustomerStoreRepository,
           IPayoffaDebtRepository payoffaDebtRepository, ICustomerIndebtednessesRepository customerIndebtednessesRepository,
           IBanksRepository banksRepository, ITransactionBankRepository transactionBankRepository, IEmployeeRepository employeeRepository,
           IFinancialAdvancesRepository financialAdvancesRepository, IAddSalaryEmployeeRepository addSalaryEmployeeRepository,
           IVacationRepository vacationRepository, IBouneRepository bouneRepository, ICustomerSettlementRepository customerSettlementRepository)
        {
            _customerSettlementRepository = customerSettlementRepository;
            _bouneRepository = bouneRepository;
            _vacationRepository = vacationRepository;
            _financialAdvancesRepository = financialAdvancesRepository;
            _addSalaryEmployeeRepository = addSalaryEmployeeRepository;
            _employeeRepository = employeeRepository;
            _transactionBankRepository = transactionBankRepository;
            _payoffaDebtRepository = payoffaDebtRepository;
            _expencesToRepository = expencesToRepository;
            _installmentRepository = installmentRepository;
            _logger = logger;
            _categoryRepository = categoryRepository;
            _expencesRepository = expencesRepository;
            _invoicesRepository = invoicesRepository;
            _invoicesDetailsRepository = invoicesDetailsRepository;
            _permissionsRepository = permissionsRepository;
            _productRepository = productRepository;
            _productSizeRepository = productSizeRepository;
            _purchaseOrderRepository = purchaseOrderRepository;
            _purchaseOrderDetailsRepository = purchaseOrderDetailsRepository;
            _returnInvoicesRepository = returnInvoicesRepository;
            _returnInvoicesDetailsRespository = returnInvoicesDetailsRespository;
            _supplierCustomerRespository = supplierCustomerRespository;
            _transactionProductSizeRepository = transactionProductSizeRepository;
            _transactionSupplierCustomerRepository = transactionSupplierCustomerRepository;
            _usersRepository = usersRepository;
            _productNumberRepository = productNumberRepository;
            _transactionSupplierCustomerStoreRepository = transactionSupplierCustomerStoreRepository;
            _customerIndebtednessesRepository = customerIndebtednessesRepository;
            _banksRepository = banksRepository;
        }


        #region SupplierCustomer

        [HttpGet]
        [Route("GetAllSupplierCustomer")]
        public ActionResult GetAllSupplierCustomer(bool? flag)
        {
            var result = _supplierCustomerRespository.selectAllSupplierCustomerByFlag(flag);

            return Ok(result);
        }

        [HttpGet]
        [Route("GetAllSupplierCustomerByFlagForDrop")]
        public ActionResult GetAllSupplierCustomerByFlagForDrop(bool? flag)
        {
            var result = _supplierCustomerRespository.selectAllSupplierCustomerByFlagForDrop(flag);

            return Ok(result);
        }

        [HttpGet]
        [Route("DeleteSupplierCustomer")]
        public ActionResult DeleteSupplierCustomer(int? id)
        {
            _supplierCustomerRespository.deleteSupplierCustomer(id);

            return Ok();
        }

        [HttpPost]
        [Route("AddEditSupplierCustomer")]
        public ActionResult AddEditSupplierCustomer(DtoSupplierCustomer dtoSupplierCustomer)
        {
            var result = _supplierCustomerRespository.AddEditSupplierCustomer(dtoSupplierCustomer);

            return Ok(result);
        }

        [HttpGet]
        [Route("CheckExistsSupplierCustomer")]
        public ActionResult CheckExistsSupplierCustomer(string name, bool? flag, int? id = 0)
        {
            var result = _supplierCustomerRespository.CheckExistsSupplierCustomer(name, flag, id);

            return Ok(result);
        }

        [HttpGet]
        [Route("PayedCash")]
        public ActionResult PayedCash(int? customerId, decimal? credit, DateTime? date)
        {
            var result = _supplierCustomerRespository.PayedCash(customerId, credit, date);

            return Ok(result);
        }

        [HttpGet]
        [Route("GetSupplierCustomerHaveDebit")]
        public ActionResult GetSupplierCustomerHaveDebit(bool? flag)
        {
            var result = _supplierCustomerRespository.selectSupplierCustomerHaveDebit(flag);

            return Ok(result);
        }

        [HttpGet]
        [Route("GetSupplierCustomerById")]
        public ActionResult GetSupplierCustomerById(int? id)
        {
            var result = _supplierCustomerRespository.selectSupplierCustomerById(id);

            return Ok(result);
        }

        [HttpPost]
        [Route("UpdateCreditDebit")]
        public ActionResult UpdateCreditDebitOnly(DtoSupplierCustomer dtoSupplierCustomer)
        {
            var result = _supplierCustomerRespository.UpdateCreditDebitOnly(dtoSupplierCustomer);

            return Ok(result);
        }

        #endregion SupplierCustomer

        #region Category

        [HttpGet]
        [Route("GetAllCategory")]
        public ActionResult GetAllCategory()
        {
            var result = _categoryRepository.selectAllCategory();

            return Ok(result);
        }

        [HttpGet]
        [Route("DeleteCategory")]
        public ActionResult DeleteCategory(int? id)
        {
            _categoryRepository.deleteCategory(id);

            return Ok();
        }

        [HttpGet]
        [Route("CheckExistsCategory")]
        public ActionResult CheckExistsCategory(string name, int? id = 0)
        {
            var result = _categoryRepository.CheckExistsCategory(name, id);

            return Ok(result);
        }

        [HttpPost]
        [Route("AddEditCategory")]
        public ActionResult AddEditCategory(DtoCategory dtoCategory)
        {
            var result = _categoryRepository.AddEditCategory(dtoCategory);

            return Ok(result);
        }

        #endregion Category

        #region Products

        [HttpGet]
        [Route("GetAllProducts")]
        public ActionResult GetAllProducts()
        {
            var result = _productRepository.selectProduct();

            return Ok(result);
        }

        [HttpGet]
        [Route("DeleteProducts")]
        public ActionResult DeleteProducts(int? id)
        {
            _productRepository.deleteProduct(id);

            return Ok();
        }

        [HttpGet]
        [Route("GetAllProductsForDrop")]
        public ActionResult GetAllProductsForDrop()
        {
            var result = _productRepository.selectProductForDrop();

            return Ok(result);
        }

        [HttpGet]
        [Route("GetProductForStore")]
        public ActionResult GetProductForStore()
        {
            // var result = _productRepository.selectProductForStore();
            var result = _productRepository.selectProductForStores();
            return Ok(result);
        }

        [HttpGet]
        [Route("GetProductForDetails")]
        public ActionResult GetProductForDetails()
        {
            var result = _productRepository.selectProductForDetails();

            return Ok(result);
        }

        [HttpGet]
        [Route("GetProductForInvoices")]
        public ActionResult GetProductForInvoices()
        {
            var result = _productRepository.selectProductForInvoices();

            return Ok(result);
        }

        [HttpGet]
        [Route("GetTransactionProduct")]
        public ActionResult GetTransactionProduct()
        {
            var result = _productRepository.selectTransactionProduct();

            return Ok(result);
        }

        [HttpGet]
        [Route("GetTotalStore")]
        public ActionResult GetTotalStore()
        {
            var result = _productRepository.selectTotalStore();

            return Ok(result);
        }

        [HttpGet]
        [Route("GetProductForTransaction")]
        public ActionResult GetProductForTransaction()
        {
            var result = _productRepository.selectProductForTransaction();

            return Ok(result);
        }

        [HttpGet]
        [Route("CheckExistsProduct")]
        public ActionResult CheckExistsProduct(string name, int? id = 0)
        {
            var result = _productRepository.CheckExistsProduct(name, id);

            return Ok(result);
        }

        [HttpPost]
        [Route("AddEditProducts")]
        public ActionResult AddEditProducts(DtoProduct dtoProduct)
        {
            var result = _productRepository.AddEditProduct(dtoProduct);

            return Ok(result);
        }

        #endregion Products

        #region productNumber

        [HttpPost]
        [Route("AddEditProductNumber")]
        public ActionResult AddEditProductNumber(DtoProductNumber dtoProductNumber)
        {
            var result = _productNumberRepository.AddEditProductNumber(dtoProductNumber);

            return Ok(result);
        }

        [HttpPost]
        [Route("AddNewQuantityFromPurshaceorder")]
        public ActionResult AddNewQuantityFromPurshaceorder(DtoProductNumber dtoProductNumber)
        {
            var result = _productNumberRepository.AddNewQuantityFromPurshaceorder(dtoProductNumber);

            return Ok(result);
        }

        [HttpGet]
        [Route("CheckProductNumberQuantity")]
        public ActionResult CheckProductNumberQuantity(int? productId, int? Qty)
        {
            var result = _productNumberRepository.checkQuantity(productId, Qty);

            return Ok(result);
        }

        #endregion productNumber

        #region productSize

        [HttpPost]
        [Route("AddEditProductSize")]
        public ActionResult AddEditProductSize(DtoProductSize dtoProductSize)
        {
            var result = _productSizeRepository.AddEditProductSize(dtoProductSize);
            return Ok(result);
        }


        [HttpPost]
        [Route("AddNewProductSizeFromPurchaseOrder")]
        public ActionResult AddNewProductSizeFromPurchaseOrder(DtoProductSize dtoProductSize)
        {
            var result = _productSizeRepository.AddNewProductFromPurchaseOrder(dtoProductSize);
            return Ok(result);
        }


        [HttpPost]
        [Route("DeleteProductFromPurchaseOrder")]
        public ActionResult DeleteProductFromPurchaseOrder(DtoProductSize dtoProductSize)
        {
            _productSizeRepository.DeleteProductFromPurchaseOrder(dtoProductSize);
            return Ok();
        }

        [HttpGet]
        [Route("CheckProductSizeQuantity")]
        public ActionResult CheckProductSizeQuantity(int? productId, int? Meter)
        {
            var result = _productSizeRepository.checkQuantity(productId, Meter);
            return Ok(result);
        }

        [HttpGet]
        [Route("GetProductDetails")]
        public ActionResult GetProductDetails()
        {
            var result = _productSizeRepository.GetProductDetails();
            return Ok(result);
        }

        [HttpGet]
        [Route("ResetProductQty")]
        public ActionResult ResetProductQty(int? productId)
        {
            _productSizeRepository.ResetProductQty(productId);
            return Ok();
        }

        [HttpGet]
        [Route("DeleteProductQty")]
        public ActionResult DeleteProductQty(int? Id)
        {
            _productSizeRepository.DeleteProductQty(Id);
            return Ok();
        }

        #endregion productSize

        #region transactionSupplierCustomer

        [HttpGet]
        [Route("GetTransactionSupplierCustomer")]
        public ActionResult GetTransactionSupplierCustomer(bool? flag)
        {
            var result = _transactionSupplierCustomerRepository.SelectTransactionSupplierCustomer(flag);

            return Ok(result);
        }

        [HttpGet]
        [Route("GetTotalTransactionToday")]
        public ActionResult GetTotalTransactionToday(bool? flag, string date)
        {
            var result = _transactionSupplierCustomerRepository.selectTotalTransactionToday(flag, date);
            return Ok(result);
        }



        #endregion transactionSupplierCustomer

        #region PurchaseOrder

        [HttpPost]
        [Route("AddPurchaseOrder")]
        public ActionResult AddPurchaseOrder(DtoPurchaseOrder dtoPurchaseOrder)
        {
            var result = _purchaseOrderRepository.AddNewPurchaseOrder(dtoPurchaseOrder);

            return Ok(result);
        }

        [HttpPost]
        [Route("EditPurchaseOrder")]
        public ActionResult EditPurchaseOrder(DtoPurchaseOrder dtoPurchaseOrder)
        {
            _purchaseOrderRepository.EditPurchaseOrder(dtoPurchaseOrder);

            return Ok();
        }

        [HttpPost]
        [Route("AddNewPurchaseOrderByClient")]
        public ActionResult AddNewPurchaseOrderByClient(DtoPurchaseOrder dtoPurchaseOrder)
        {
            var result = _purchaseOrderRepository.AddNewPurchaseOrderByClient(dtoPurchaseOrder);

            return Ok(result);
        }

        [HttpGet]
        [Route("GetPurchaseOrder")]
        public ActionResult GetPurchaseOrder()
        {
            var result = _purchaseOrderRepository.selectAllPurchaseOrder();

            return Ok(result);
        }

        [HttpGet]
        [Route("GetPurchaseOrderById")]
        public ActionResult GetPurchaseOrderById(int? id)
        {
            var result = _purchaseOrderRepository.selectPurchaseOrderById(id);

            return Ok(result);
        }

        [HttpGet]
        [Route("DeletPurchaseOrder")]
        public ActionResult DeletPurchaseOrder(int? id)
        {
            _purchaseOrderRepository.DeletPurchaseOrder(id);

            return Ok();
        }

        [HttpGet]
        [Route("DeletPurchaseOrderWithoutSupplier")]
        public ActionResult DeletPurchaseOrderWithoutSupplier(int? id)
        {
            _purchaseOrderRepository.DeletPurchaseOrderWithoutSupplier(id);

            return Ok();
        }

        #endregion PurchaseOrder

        #region PurchaseOrderDetails

        [HttpPost]
        [Route("AddPurchaseOrderDetails")]
        public ActionResult AddPurchaseOrderDetails(int? purchaseOrderId, int? invoicesNo, List<DtoPurchaseOrderDetails> dtoPurchaseOrderDetails)
        {
            _purchaseOrderDetailsRepository.AddPurchaseOrderDetails(purchaseOrderId, invoicesNo, dtoPurchaseOrderDetails);

            return Ok();
        }

        [HttpPost]
        [Route("AddNewItemFromPurchaseOrderByAdmin")]
        public ActionResult AddNewItemFromPurchaseOrderByAdmin(DtoPurchaseOrderDetails dtoPurchaseOrderDetails)
        {
            var result = _purchaseOrderDetailsRepository.AddNewItemFromPurchaseOrderByAdmin(dtoPurchaseOrderDetails);

            return Ok(result);
        }

        [HttpPost]
        [Route("UpdatePriceProductandTransaction")]
        public ActionResult UpdatePriceProductandTransaction(DtoPurchaseOrderDetails dtoPurchaseOrderDetails)
        {
            _purchaseOrderDetailsRepository.UpdatePriceProductandTransaction(dtoPurchaseOrderDetails);

            return Ok();
        }

        [HttpGet]
        [Route("DeleteOneItemFromPurchaseOrderDetails")]
        public ActionResult DeleteOneItemFromPurchaseOrderDetails(int? Id, int? numberOfInvoiceBySystem)
        {
            _purchaseOrderDetailsRepository.DeleteOneItemFromPurchaseOrderDetails(Id, numberOfInvoiceBySystem);

            return Ok();
        }

        [HttpGet]
        [Route("DeleteListItemFromPurchaseOrderDetails")]
        public ActionResult DeleteListItemFromPurchaseOrderDetails(string Id, int? numberOfInvoiceBySystem)
        {
            _purchaseOrderDetailsRepository.DeleteListItemFromPurchaseOrderDetails(Id, numberOfInvoiceBySystem);

            return Ok();
        }

        #endregion PurchaseOrder

        #region invoices

        [HttpPost]
        [Route("AddNewInvoices")]
        public ActionResult AddNewInvoices(DtoInvoices dtoInvoices)
        {
            var result = _invoicesRepository.AddNewInvoices(dtoInvoices);

            return Ok(result);
        }

        [HttpGet]
        [Route("GetInvoiceById")]
        public ActionResult GetInvoiceById(int? id)
        {
            var result = _invoicesRepository.selectInvoicesById(id);

            return Ok(result);
        }

        [HttpGet]
        [Route("GetAllInvoices")]
        public ActionResult GetAllInvoices()
        {
            var result = _invoicesRepository.selectAllInvoices();

            return Ok(result);
        }

        [HttpGet]
        [Route("GetAllInvoicesToday")]
        public ActionResult GetAllInvoicesToday(string date)
        {
            var result = _invoicesRepository.selectAllInvoicesToday(date);

            return Ok(result);
        }

        [HttpGet]
        [Route("GetAllNewInvoiceToday")]
        public ActionResult GetAllNewInvoiceToday(string date)
        {
            var result = _invoicesRepository.selectAllNewInvoicesToday(date);

            return Ok(result);
        }

        [HttpGet]
        [Route("GetAllNewInvoicesToday")]
        public ActionResult GetAllNewInvoicesToday(string date)
        {
            var result = _invoicesRepository._selectAllNewInvoicesToday(date);

            return Ok(result);
        }

        [HttpGet]
        [Route("DeletInvoices")]
        public ActionResult DeletInvoices(int? id)
        {
            _invoicesRepository.DeletInvoices(id);

            return Ok();
        }

        [HttpPost]
        [Route("EditInvoice")]
        public ActionResult EditInvoice(DtoInvoices dtoInvoices)
        {
            _invoicesRepository.EditInvoice(dtoInvoices);

            return Ok();
        }

        #endregion invoices

        #region invoicesDetails

        [HttpPost]
        [Route("AddInvoicesDetails")]
        public ActionResult AddInvoicesDetails(int? invoicesId, int? invoicesNo, List<DtoInvoicesDetails> dtoInvoicesDetails)
        {
            var result = _invoicesDetailsRepository.AddInvoicesDetails(invoicesId, invoicesNo, dtoInvoicesDetails);

            return Ok(result);
        }

        [HttpPost]
        [Route("AddNewItemFromEditInvoices")]
        public ActionResult AddNewItemFromEditInvoices(int? invoicesId, int? invoicesNo, DtoInvoicesDetails dtoInvoicesDetails)
        {
            var result = _invoicesDetailsRepository.AddNewItemFromEditInvoices(invoicesId, invoicesNo, dtoInvoicesDetails);

            return Ok(result);
        }

        [HttpPost]
        [Route("UpdatePriceProductandTransactionFromInvoices")]
        public ActionResult UpdatePriceProductandTransactionFromInvoices(DtoInvoicesDetails dtoInvoicesDetails)
        {
            _invoicesDetailsRepository.UpdatePriceProductandTransaction(dtoInvoicesDetails);

            return Ok();
        }

        [HttpGet]
        [Route("DeleteListItemFromInvoiceDetails")]
        public ActionResult DeleteListItemFromInvoiceDetails(string id, int? numberOfInvoiceBySystem)
        {
            _invoicesDetailsRepository.DeleteListItemFromInvoiceDetails(id, numberOfInvoiceBySystem);

            return Ok();
        }

        #endregion invoicesDetails

        #region installment

        [HttpGet]
        [Route("AddEditInstallment")]
        public ActionResult AddEditInstallment(int? customerId, DateTime? date, decimal? money)
        {
            _installmentRepository.AddInstallment(customerId, date, money);

            return Ok();
        }

        [HttpGet]
        [Route("UpdateDateInstallment")]
        public ActionResult UpdateDateInstallment(int? id, DateTime? date)
        {
            _installmentRepository.UpdateDateInstallment(id, date);

            return Ok();
        }

        [HttpGet]
        [Route("GetAllInstallment")]
        public ActionResult GetAllInstallment(bool? type)
        {
            var result = _installmentRepository.SelectAllInstallment(type);

            return Ok(result);
        }

        #endregion installment

        #region _usersRepository

        [HttpGet]
        [Route("CheckExistName")]
        public ActionResult CheckExistName(string name, string userName, int? id = 0)
        {
            var isExist = _usersRepository.checkExistName(name, userName, id);

            return Ok(isExist);
        }

        [HttpGet]
        [Route("GetAllUsers")]
        public ActionResult GetAllUsers()
        {
            var result = _usersRepository.selectAllUsers();

            return Ok(result);
        }

        [HttpGet]
        [Route("DeleteUser")]
        public ActionResult DeleteUser(int? id)
        {
            _usersRepository.deleteUser(id);

            return Ok();
        }

        [HttpPost]
        [Route("AddEditUsers")]
        public ActionResult AddEditUsers(DtoUsers dtoUsers)
        {
            var result = _usersRepository.AddEditUsers(dtoUsers);

            return Ok(result);
        }

        [HttpGet]
        [Route("Login")]
        public ActionResult Login(string userName, string password)
        {
            var result = _usersRepository.login(userName, password);

            return Ok(result);
        }

        [HttpGet]
        [Route("BackupDB")]
        public ActionResult BackupDB()
        {
            _usersRepository.BackupDB();

            return Ok();
        }

        #endregion _usersRepository

        #region Permission
        [HttpGet]
        [Route("SelectPermission")]
        public ActionResult SelectPermission(int? userId, int? PermissionId)
        {
            var isExist = _permissionsRepository.SelectPermission(userId, PermissionId);

            return Ok(isExist);
        }

        [HttpGet]
        [Route("AddEditPermissionUsers")]
        public ActionResult AddEditPermissionUsers(int? userId, int? PermissionId, bool? value)
        {
            _permissionsRepository.AddEditPermissionUsers(userId, PermissionId, value);

            return Ok();
        }


        [HttpGet]
        [Route("SelectPermissionByUserId")]
        public ActionResult SelectPermissionByUserId(int? userId)
        {
            var isExist = _permissionsRepository.selectPermissionByUserId(userId);

            return Ok(isExist);
        }

        #endregion Permission

        #region _expencesRepository

        [HttpPost]
        [Route("AddEditExpences")]
        public ActionResult AddEditExpences(DtoExpences dtoExpences)
        {
            var isExist = _expencesRepository.AddEditExpences(dtoExpences);

            return Ok(isExist);
        }


        [HttpGet]
        [Route("GetAllExpences")]
        public ActionResult GetAllExpences()
        {
            var isExist = _expencesRepository.selectAllExpences();

            return Ok(isExist);
        }

        [HttpGet]
        [Route("DeleteExpences")]
        public ActionResult DeleteExpences(int? id)
        {
            _expencesRepository.deleteExpences(id);

            return Ok();
        }


        [HttpGet]
        [Route("SelectTotalExpencesToday")]
        public ActionResult SelectTotalExpencesToday(string date)
        {
            var result = _expencesRepository.selectTotalExpencesToday(date);

            return Ok(result);
        }

        [HttpGet]
        [Route("SelectDetailsExpencesToday")]
        public ActionResult SelectDetailsExpencesToday(string date)
        {
            var result = _expencesRepository.selectDetailsExpencesToday(date);

            return Ok(result);
        }

        #endregion _expencesRepository

        #region returnInvoices

        [HttpPost]
        [Route("AddReturnInvoices")]
        public ActionResult AddReturnInvoices(DtoReturnInvoices dtoReturnInvoices)
        {
            var result = _returnInvoicesRepository.AddReturnInvoices(dtoReturnInvoices);

            return Ok(result);
        }

        [HttpGet]
        [Route("DeletReturnInvoices")]
        public ActionResult DeletReturnInvoices(int? id)
        {
            _returnInvoicesRepository.DeletReturnInvoices(id);

            return Ok();
        }

        [HttpGet]
        [Route("GetAllReturnInvoices")]
        public ActionResult GetAllReturnInvoices()
        {
            var result = _returnInvoicesRepository.selectAllReturnInvoices();

            return Ok(result);
        }

        [HttpGet]
        [Route("GetAllReturnInvoicesToday")]
        public ActionResult GetAllReturnInvoicesToday(string date)
        {
            var result = _returnInvoicesRepository.selectAllReturnInvoicesToday(date);

            return Ok(result);
        } 
        
        [HttpGet]
        [Route("GetAllTotalReturnInvoicesToday")]
        public ActionResult GetAllTotalReturnInvoicesToday(string date)
        {
            var result = _returnInvoicesRepository.selectAllTotalReturnInvoicesToday(date);

            return Ok(result);
        }

        #endregion returnInvoices

        #region returnInvoicesDetails

        [HttpPost]
        [Route("AddReturnInvoicesDetails")]
        public ActionResult AddReturnInvoicesDetails(int? invoicesId, int? invoicesNo, List<DtoReturnInvoicesDetails> dtoReturnInvoicesDetails)
        {
            _returnInvoicesDetailsRespository.AddReturnInvoicesDetails(invoicesId, invoicesNo, dtoReturnInvoicesDetails);

            return Ok();
        }


        #endregion returnInvoicesDetails

        #region _expencesToRepository

        [HttpPost]
        [Route("AddEditExpencesTo")]
        public ActionResult AddEditExpencesTo(DtoExpencesTo dtoExpencesTo)
        {
            var isExist = _expencesToRepository.AddEditExpences(dtoExpencesTo);

            return Ok(isExist);
        }


        [HttpGet]
        [Route("GetAllExpencesTo")]
        public ActionResult GetAllExpencesTo()
        {
            var isExist = _expencesToRepository.selectAllExpences();

            return Ok(isExist);
        }

        [HttpGet]
        [Route("DeleteExpencesTo")]
        public ActionResult DeleteExpencesTo(int? id)
        {
            _expencesToRepository.deleteExpences(id);

            return Ok();
        }


        [HttpGet]
        [Route("SelectTotalExpencesToToday")]
        public ActionResult SelectTotalExpencesToToday(string date)
        {
            var result = _expencesToRepository.selectTotalExpencesToday(date);

            return Ok(result);
        }

        [HttpGet]
        [Route("SelectDetailsExpencesToToday")]
        public ActionResult SelectDetailsExpencesToToday(string date)
        {
            var result = _expencesToRepository.selectDetailsExpencesToToday(date);

            return Ok(result);
        }

        #endregion _expencesToRepository

        #region transactionSupplierCustomerStoreRepository

        [HttpGet]
        [Route("GetTransactionSupplierCustomerStoreById")]
        public ActionResult GetTransactionSupplierCustomerStoreById(bool? flag)
        {
            var result = _transactionSupplierCustomerStoreRepository.selectTransactionStore(flag);

            return Ok(result);
        }

        #endregion transactionSupplierCustomerStoreRepository

        #region PayedoffDebt

        [HttpPost]
        [Route("AddEditPayedOfDebt")]
        public ActionResult AddEditPayedOfDebt(DtoPayoffaDebt dtoPayoffaDebt)
        {
            var result = _payoffaDebtRepository.AddEditPayedOff(dtoPayoffaDebt);

            return Ok(result);
        }

        [HttpGet]
        [Route("GetAllPayedOffDebet")]
        public ActionResult GetAllPayedOffDebet(bool? flag)
        {
            var result = _payoffaDebtRepository.SelectAllDebets(flag);

            return Ok(result);
        }

        [HttpGet]
        [Route("DeletePayedOffDebet")]
        public ActionResult DeletePayedOffDebet(int? id)
        {
            _payoffaDebtRepository.DeletePayedOffDebt(id);

            return Ok();
        }


        [HttpGet]
        [Route("GetTransactionSupplierCustomerToDay")]
        public ActionResult GetTransactionSupplierCustomerToDay(bool? flag, string date)
        {
            var result = _payoffaDebtRepository.SelectAllDebetsByDate(flag, date);
            return Ok(result);
        }


        #endregion PayedoffDebt

        #region IndebtednessesRepository

        [HttpGet]
        [Route("GetAllIndebtedness")]
        public ActionResult GetAllIndebtedness(bool? flag)
        {
            var result = _customerIndebtednessesRepository.SelectAllIndebtedness(flag);

            return Ok(result);
        }


        [HttpPost]
        [Route("AddEditIndebtedness")]
        public ActionResult AddEditIndebtedness(DtoIndebtness dtoIndebtness)
        {
            var result = _customerIndebtednessesRepository.AddEditIndebtedness(dtoIndebtness);

            return Ok(result);
        }

        [HttpGet]
        [Route("DeleteIndebtedness")]
        public ActionResult DeleteIndebtedness(int? id)
        {
            _customerIndebtednessesRepository.DeleteIndebtedness(id);

            return Ok();
        }

        #endregion IndebtednessesRepository

        #region Bank

        [HttpGet]
        [Route("GetAllBank")]
        public ActionResult GetAllBank()
        {
            var result = _banksRepository.GetAllBank();

            return Ok(result);
        }

        [HttpGet]
        [Route("DeleteBank")]
        public ActionResult DeleteBank(int id)
        {
            _banksRepository.DeleteBank(id);

            return Ok();
        }

        [HttpPost]
        [Route("AddEditBank")]
        public ActionResult AddEditBank(DtoBank dto)
        {
            var result = _banksRepository.AddEditBank(dto);

            return Ok(result);
        }

        [HttpGet]
        [Route("GetCostBank")]
        public ActionResult GetCostBank(int? Id)
        {
            var result = _banksRepository.GetCostBank(Id);

            return Ok(result);
        }

        #endregion Bank

        #region _transactionBankRepository

        [HttpGet]
        [Route("GetAllTransactionBank")]
        public ActionResult GetAllTransactionBank()
        {
            var result = _transactionBankRepository.GetAllTransactionBank();
            return Ok(result);
        }

        [HttpGet]
        [Route("DeleteTransactionBank")]
        public ActionResult DeleteTransactionBank(int id)
        {
            _transactionBankRepository.DeleteTransactionBank(id);
            return Ok();
        }

        [HttpPost]
        [Route("AddEditTransactionBank")]
        public ActionResult AddEditTransactionBank(DtoTransactionBank dto)
        {
            var result = _transactionBankRepository.AddEditTransactionBank(dto);

            result.transactionTypeName = result.transactionType == 1 ? "ايداع" : "سحب";

            return Ok(result);
        }

        #endregion _transactionBankRepository

        #region Employee

        [HttpGet]
        [Route("GetAllEmployee")]
        public ActionResult GetAllEmployee()
        {
            var result = _employeeRepository.GetAllEmployee();

            return Ok(result);
        }

        [HttpGet]
        [Route("GetAllEmployeeForDrop")]
        public ActionResult GetAllEmployeeForDrop()
        {
            var result = _employeeRepository.GetAllEmployeeForDrop();

            return Ok(result);
        }

        [HttpGet]
        [Route("DeleteEmployee")]
        public ActionResult DeleteEmployee(int? id)
        {
            _employeeRepository.DeleteEmployees(id);

            return Ok();
        }

        [HttpPost]
        [Route("AddEditEmployees")]
        public ActionResult AddEditEmployees(DtoEmployees dto)
        {
            var result = _employeeRepository.AddEditEmployees(dto);

            return Ok(result);
        }


        [HttpGet]
        [Route("GetEmployeeSalary")]
        public ActionResult GetEmployeeSalary()
        {
            var result = _employeeRepository.GetEmployeeSalary();

            return Ok(result);
        }

        #endregion Employee

        #region financialAdvance

        [HttpGet]
        [Route("GetAllFinancialAdvance")]
        public ActionResult GetAllFinancialAdvance()
        {
            var result = _financialAdvancesRepository.GetAllFinancialAdvance();

            return Ok(result);
        }

        [HttpGet]
        [Route("DeleteFinancialAdvance")]
        public ActionResult DeleteFinancialAdvance(int? id)
        {
            _financialAdvancesRepository.DeleteFinancialAdvance(id);

            return Ok();
        }

        [HttpGet]
        [Route("GetTotalFinancialAdvanceToday")]
        public ActionResult GetTotalFinancialAdvanceToday(string date)
        {
            var result = _financialAdvancesRepository.selectTotalFinancialAdvanceToday(date);

            return Ok(result);
        }

        [HttpPost]
        [Route("AddEditFinancialAdvance")]
        public ActionResult AddEditFinancialAdvance(DtoFinancialAdvance dto)
        {
            var result = _financialAdvancesRepository.AddEditFinancialAdvance(dto);

            return Ok(result);
        }


        #endregion financialAdvance

        #region AddSalary

        [HttpPost]
        [Route("AddSalaryEmployee")]
        public ActionResult AddSalaryEmployee(List<DtoSalary> dto)
        {
            var result = _addSalaryEmployeeRepository.AddSalary(dto);

            return Ok(result);
        }

        [HttpGet]
        [Route("GetAllSalary")]
        public ActionResult GetAllSalary()
        {
            var result = _addSalaryEmployeeRepository.GetAllSalary();

            return Ok(result);
        }

        [HttpGet]
        [Route("GetTotalSalaryToday")]
        public ActionResult GetTotalSalaryToday(string date)
        {
            var result = _addSalaryEmployeeRepository.GetTotalSalaryToday(date);

            return Ok(result);
        }


        #endregion AddSalary

        #region vacation

        [HttpGet]
        [Route("GetAllVacation")]
        public ActionResult GetAllVacation()
        {
            var result = _vacationRepository.GetAllVacation();

            return Ok(result);
        }

        [HttpGet]
        [Route("DeleteVacation")]
        public ActionResult DeleteVacation(int? id)
        {
            _vacationRepository.DeleteVacation(id);

            return Ok();
        }

        [HttpPost]
        [Route("AddEditVaction")]
        public ActionResult AddEditVaction(DtoVacation dto)
        {
            var result = _vacationRepository.AddEditVaction(dto);

            return Ok(result);
        }


        #endregion vacation

        #region Bounes

        [HttpGet]
        [Route("GetAllBounes")]
        public ActionResult GetAllBounes()
        {
            var result = _bouneRepository.GetAllBounes();

            return Ok(result);
        }

        [HttpGet]
        [Route("DeleteBounes")]
        public ActionResult DeleteBounes(int? id)
        {
            _bouneRepository.DeleteBounes(id);

            return Ok();
        }

        [HttpPost]
        [Route("AddEditBounes")]
        public ActionResult AddEditBounes(DtoBounes dto)
        {
            var result = _bouneRepository.AddEditBounes(dto);

            return Ok(result);
        }

        [HttpGet]
        [Route("GetTotalBounesToday")]
        public ActionResult GetTotalBounesToday(string date)
        {
            var result = _bouneRepository.selectTotalBounesToday(date);

            return Ok(result);
        }

        #endregion Bounes

        #region SettlementRepository

        [HttpGet]
        [Route("GetAllCustomerSettlement")]
        public ActionResult GetAllCustomerSettlement(bool? flag)
        {
            var result = _customerSettlementRepository.SelectAllCustomerSettlement(flag);

            return Ok(result);
        }


        [HttpPost]
        [Route("AddEditCustomerSettlement")]
        public ActionResult AddEditCustomerSettlement(DtoCustomerSettlement dtoIndebtness)
        {
            var result = _customerSettlementRepository.AddEditCustomerSettlement(dtoIndebtness);

            return Ok(result);
        }


        [HttpGet]
        [Route("DeleteCustomerSettlement")]
        public ActionResult DeleteCustomerSettlement(int? id)
        {
            _customerSettlementRepository.DeleteCustomerSettlement(id);

            return Ok();
        }

        #endregion SettlementRepository

    }
}

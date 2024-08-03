import initialState from './initialState';

export default function (state = initialState, action) {
    switch (action.type) {


        case 'LISTSUPPLIER':
            return {
                ...state,
                listSupplier: action.data,
                isAddedInstallment: ""
            };

        case 'ADDEDITSUPPLIER':

            let listSupplier = state.listSupplier;

            let indexobj = listSupplier.findIndex(x => x.id === action.data.id);

            if (indexobj > -1) {
                listSupplier.splice(indexobj, 1);
            }

            return {
                ...state,
                listSupplier: [...state.listSupplier, action.data]
            };

        case 'UPDATECREDITDEBITSUPPLIER':

            let _listSupplier = state.listSupplier;

            let _indexobjSupplier = _listSupplier.findIndex(x => x.id === action.data.id);

            _listSupplier[_indexobjSupplier]["credit"] = action.data["credit"];
            _listSupplier[_indexobjSupplier]["debit"] = action.data["debit"];

            return {
                ...state,
                listSupplier: [...state.listSupplier]
            };

        case 'DELETESUPPLIER':

            let listSuppliers = state.listSupplier;

            let indexobjDepartment = listSuppliers.findIndex(x => x.id === action.id);
            listSuppliers.splice(indexobjDepartment, 1);

            return {
                ...state,
                listSupplier: [...state.listSupplier]
            };

        case 'DELETEPAYMENTSUPPLIER':

            let _listPayedOffDebt = state.listPayedOffDebt;

            let indexobjPayedOffDebt = _listPayedOffDebt.findIndex(x => x.id === action.id);
            _listPayedOffDebt.splice(indexobjPayedOffDebt, 1);

            return {
                ...state,
                listPayedOffDebt: [...state.listPayedOffDebt],
                objCreditDebit: action.datacustomer
            };


        case 'DELETEPRODUCT':

            let _listProduct = state.listProduct;

            let indexobjlistProduct = _listProduct.findIndex(x => x.id === action.Id);
            _listProduct.splice(indexobjlistProduct, 1);

            return {
                ...state,
                listProduct: [...state.listProduct]
            };

        case 'LISTCUSTOMER':
            return {
                ...state,
                listCustomer: action.data
            };

        case 'ADDEDITCUSTOMER':

            let listCustomer = state.listCustomer;

            let indexobjCustomer = listCustomer.findIndex(x => x.id === action.data.id);

            if (indexobjCustomer > -1) {
                listCustomer.splice(indexobjCustomer, 1);
            }

            return {
                ...state,
                listCustomer: [...state.listCustomer, action.data]
            };

        case 'UPDATECREDITDEBITCUSTOMER':

            let _listCustomer = state.listCustomer;

            let _indexobjCustomer = _listCustomer.findIndex(x => x.id === action.data.id);

            _listCustomer[_indexobjCustomer]["credit"] = action.data["credit"];
            _listCustomer[_indexobjCustomer]["debit"] = action.data["debit"];

            return {
                ...state,
                listCustomer: [...state.listCustomer]
            };


        case 'DELETECUSTOMER':

            let listCustomers = state.listCustomer;

            let indexobjCustomers = listCustomers.findIndex(x => x.id === action.id);
            listCustomers.splice(indexobjCustomers, 1);

            return {
                ...state,
                listCustomer: [...state.listCustomer]
            };

        case 'LISTCATEGORY':
            return {
                ...state,
                listCategory: action.data
            };

        case 'ADDEDITCATEGORY':

            let listCategory = state.listCategory;

            let indexobjCategory = listCategory.findIndex(x => x.id === action.data.id);

            if (indexobjCategory > -1) {
                listCategory.splice(indexobjCategory, 1);
            }

            return {
                ...state,
                listCategory: [...state.listCategory, action.data]
            };

        case 'ADDBANK':

            let listBank = state.listBank;

            let indexobjBank = listBank.findIndex(x => x.id === action.data.id);

            if (indexobjBank > -1) {
                listBank.splice(indexobjBank, 1);
            }

            return {
                ...state,
                listBank: [...state.listBank, action.data]
            };

        case 'DELETECATEGORY':

            let listCategorys = state.listCategory;

            let indexobjCategorys = listCategorys.findIndex(x => x.id === action.id);
            listCategorys.splice(indexobjCategorys, 1);

            return {
                ...state,
                listCategory: [...state.listCategory]
            };

        case 'DELETEBANK':

            let listBanks = state.listBank;

            let indexobjBanks = listBanks.findIndex(x => x.id === action.id);
            listBanks.splice(indexobjBanks, 1);

            return {
                ...state,
                listBank: [...state.listBank]
            };

        case 'LISTCATEGORYFORDROP':

            let objCategory = [];
            action.data.forEach(item => {
                let objDept = {
                    value: item.id,
                    label: item.name
                }

                objCategory.push(objDept);
            });

            return {
                ...state,
                listCategoryForDrop: objCategory
            };

        case 'LISTOFPRODUCTS':

            return {
                ...state,
                listProducts: action.data
            };

        case 'ADDEDITPRODUCTS':

            let listProducts = state.listProducts;

            let indexobjProduct = listProducts.findIndex(x => x.id === action.data.id);

            if (indexobjProduct > -1) {
                listProducts.splice(indexobjProduct, 1);
            }

            return {
                ...state,
                listProducts: [...state.listProducts, action.data]
            };

        case 'DELETEPRODUCTS':

            let listProduct = state.listProducts;

            let _indexobjProduct = listProduct.findIndex(x => x.id === action.id);
            listProduct.splice(_indexobjProduct, 1);

            return {
                ...state,
                listProducts: [...state.listProducts]
            };

        case 'ADDEDITPRODUCTSNUMBER':
            return {
                ...state,
                listProducts: [...state.listProducts]
            };

        case 'ADDEDITPRODUCTSSIZE':
            return {
                ...state,
                listProducts: [...state.listProducts]
            };

        case 'GETPRODUCTFORSTORE':
            return {
                ...state,
                listProductsForStore: action.data
            };

        case 'LISTSUPPLIERCUSTOMER':

            let objSupCus = [];

            action.data.forEach(item => {
                let objDept = {
                    value: item.id,
                    label: item.name
                }

                objSupCus.push(objDept);
            });

            return {
                ...state,
                listSupplierCustomerForDrop: objSupCus,
                listCreditDebit: action.data
            };

        case 'LISTTRANSACTIONSUPPLIERCUSTOMER':

            return {
                ...state,
                listTransactionSupplierCustomer: action.data
            };

        case 'LISTPRODUCTSFORDROP':

            let objPro2 = [];

            action.data.forEach(item => {
                let objDept = {
                    value: item.id,
                    label: item.name
                }

                objPro2.push(objDept);
            });


            let objPro = [];
            action.data.filter(x => x.type == true).forEach(item => {
                let objDept = {
                    value: item.id,
                    label: item.name
                }

                objPro.push(objDept);
            });

            let objPro1 = [];
            action.data.filter(x => x.type == false).forEach(item => {
                let objDept = {
                    value: item.id,
                    label: item.name
                }

                objPro1.push(objDept);
            });

            return {
                ...state,
                listProductsForDrop: objPro,
                listProductsForDrop2: objPro,
                listProductsForDrop3: objPro1,
                listProductsForDrop4: objPro2,
            };

        case 'LISTPRODUCTSTRANSACTION':

            return {
                ...state,
                listProductsTransaction: action.data
            };

        case 'LISTPRODUCTSTRANSACTIONS':

            return {
                ...state,
                listProductsTransactions: action.data
            };

        case 'LISTPURCHASEOEDER':

            action.data.map(item => {
                item.date = item.date.split("T")[0]
            });

            return {
                ...state,
                listPurchaseOrder: action.data,
                isAdded: ""
            };

        case 'ADDPURCHASEORDER':

            return {
                ...state,
                isAdded: "Add"
            };

        case 'LISTPRODUCTFORINVOICES':

            return {
                ...state,
                listProductsForInvoices: action.data
            };

        case 'LISTINVOICES':
            action.data.map(item => {
                item.date = item.date.split("T")[0]
            });
            return {
                ...state,
                listInvoices: action.data,
                isAddedInvoices: "",
                objCustomer: ""
            };

        case 'LISTRETURNINVOICES':
            action.data.map(item => {
                item.date = item.date.split("T")[0]
            });
            return {
                ...state,
                listReturnInvoices: action.data,
                isAddedInvoices: "",
                objCustomer: ""
            };

        case 'ADDINVOICES':

            return {
                ...state,
                isAddedInvoices: "Add",
                objCustomer: action.data
            };

        case 'ADDRETURNINVOICES':

            return {
                ...state,
                isAddedReturnInvoices: "Add"
            };

        case 'NEWRETURNINVOICES':

            return {
                ...state,
                isAddedReturnInvoices: ""
            };

        case 'ADDEDITINSTALLMENT':

            return {
                ...state,
                isAddedInstallment: "Add"
            };

        case 'UPDATECREDITDEBIT':

            let listCreditDebit = state.listCreditDebit;

            let indexobjCreditDebit = listCreditDebit.findIndex(x => x.id === action.data.id);

            if (indexobjCreditDebit > -1) {
                listCreditDebit.splice(indexobjCreditDebit, 1);
            }

            return {
                ...state,
                listCreditDebit: [...state.listCreditDebit, action.data]
            };

        case 'TOTALSTORE':

            return {
                ...state,
                totalStore: action.data
            }

        case 'GETPURCHASEORDERBYID':

            return {
                ...state,
                objPurchaseOrder: action.data
            }
        case 'GETINVOICEBYID':

            return {
                ...state,
                objInvoice: action.data
            }
        case 'UPDATEITEM':
            return {
                ...state
            }
        case 'UPDATEITEMFROMINVOICE':
            return {
                ...state
            }
        case 'UPDATEPURCHASEORDER':
            return {
                ...state,
                isAdded: "Add"
            }

        case 'UPDATEINVOICE':
            return {
                ...state,
                isAdded: "Add"
            }

        case 'EDITINSTALLMENT':

            let listInstallment = state.listInstallment;

            let indexobjInstallment = listInstallment.findIndex(x => x.id === action.data.id);

            if (indexobjInstallment > -1) {
                listInstallment.splice(indexobjInstallment, 1);
            }

            return {
                ...state,
                listInstallment: [...state.listInstallment, action.data]
            }

        case 'GETALLINSTALLMENT':

            action.data.forEach(item => {
                item.date = item.date.split("T")[0];
            });

            return {
                ...state,
                listInstallment: action.data
            }

        case 'GETALLUSERS':

            return {
                ...state,
                listUsers: action.data
            }

        case 'GETINVOICESTODAY':

            return {
                ...state,
                listInvoices: action.data
            }

        case 'GETRETURNINVOICESTODAY':

            return {
                ...state,
                totalReturnInvoices: action.data
            }

        case 'ADDEDITUSERS':

            let listUsers = state.listUsers;

            let indexobjUsers = listUsers.findIndex(x => x.id === action.data.id);

            if (indexobjUsers > -1) {
                listUsers.splice(indexobjUsers, 1);
            }

            return {
                ...state,
                listUsers: [...state.listUsers, action.data]
            };

        case 'DELETEUSERS':

            let listUser = state.listUsers;

            let indexUserobj = listUser.findIndex(x => x.id === action.id);
            listUser.splice(indexUserobj, 1);

            return {
                ...state,
                listUsers: [...state.listUsers]
            };

        case 'GETALLEXPENCES':

            action.data.map(item => {
                item.date = item.date.split("T")[0]
            });

            return {
                ...state,
                listExpences: action.data
            }

        case 'DELETEEXPENCES':

            let listExpences = state.listExpences;

            let indexUserobj1 = listExpences.findIndex(x => x.id === action.id);
            listExpences.splice(indexUserobj1, 1);

            return {
                ...state,
                listExpences: [...state.listExpences]
            };

        case 'GETEXPENCESTODAY':

            return {
                ...state,
                totalExpences: action.data
            };

        case 'ADDEDITEXPENCES':

            let listExpences1 = state.listExpences;

            let indexobj11 = listExpences1.findIndex(x => x.id === action.data.id);

            if (indexobj11 > -1) {
                listExpences1.splice(indexobj11, 1);
            }

            action.data.date = action.data.date.split("T")[0]


            return {
                ...state,
                listExpences: [...state.listExpences, action.data]
            };

        case 'GETCREDITTODAY':

            return {
                ...state,
                totalCredit: action.data
            };

        case 'GETALLCREDITTODAY':

            return {
                ...state,
                listAllCreditToday: action.data
            };

        case 'GETALLEXPENCESTO':

            action.data.map(item => {
                item.date = item.date.split("T")[0]
            });

            return {
                ...state,
                listExpencesTo: action.data
            }

        case 'DELETEEXPENCESTO':

            let listExpencesTo = state.listExpencesTo;

            let indexExpencesTo = listExpencesTo.findIndex(x => x.id === action.id);
            listExpencesTo.splice(indexExpencesTo, 1);

            return {
                ...state,
                listExpencesTo: [...state.listExpencesTo]
            };

        case 'GETEXPENCESTOTODAY':

            return {
                ...state,
                totalExpencesTo: action.data
            };

        case 'ADDEDITEXPENCESTO':

            let listExpencesTo1 = state.listExpencesTo;

            let indexExpencesTo1 = listExpencesTo1.findIndex(x => x.id === action.data.id);

            if (indexExpencesTo1 > -1) {
                listExpencesTo1.splice(indexExpencesTo1, 1);
            }

            action.data.date = action.data.date.split("T")[0]

            return {
                ...state,
                listExpencesTo: [...state.listExpencesTo, action.data]
            };

        case 'LISTTRANSACTIONSUPPLIERCUSTOMERSTORE':
            return {
                ...state,
                listTransactionSupplierCustomerStore: action.data
            };

        case 'DELETEPURCHASEORDER':

            let _listPurchaseOrder = state.listPurchaseOrder;

            let _indexExpencesTo = _listPurchaseOrder.findIndex(x => x.id === action.id);
            _listPurchaseOrder.splice(_indexExpencesTo, 1);

            return {
                ...state,
                listPurchaseOrder: [...state.listPurchaseOrder]
            };

        case 'DELETEINVOICES':

            let _listInvoices = state.listInvoices;

            let _indexInvoices = _listInvoices.findIndex(x => x.id === action.id);
            _listInvoices.splice(_indexInvoices, 1);

            return {
                ...state,
                listInvoices: [...state.listInvoices]
            };


        case 'LISTPAYEDOFFDEBET':

            return {
                ...state,
                listPayedOffDebt: action.data
            }

        case 'ADDEDITPAYEDOFDEBT':
            let listPayedOffDebt = state.listPayedOffDebt;

            let indexPayedOffDebt = listPayedOffDebt.findIndex(x => x.id === action.data.id);

            if (indexPayedOffDebt > -1) {
                listPayedOffDebt.splice(indexPayedOffDebt, 1);
            }

            action.data.debtDate = action.data.debtDate.split("T")[0]

            return {
                ...state,
                listPayedOffDebt: [...state.listPayedOffDebt, action.data],
                objCreditDebit: action.dataCustomer
            };

        case 'DELETELISTITEM':

            let listItem = state.objPurchaseOrder

            action.id.map(xx => {
                listItem.listPurchaseOrderDetails = listItem.listPurchaseOrderDetails.filter(x => x.id !== xx);
            });

            return {
                ...state,
                objPurchaseOrder: { ...listItem }
            };

        case 'DELETELISTITEMFROMINVOICE':

            let listItemFromInvoice = state.objInvoice

            action.id.map(xx => {
                listItemFromInvoice.listInvoicesDetails = listItemFromInvoice.listInvoicesDetails.filter(x => x.id !== xx);
            });

            return {
                ...state,
                objInvoice: { ...listItemFromInvoice }
            };
        case 'ADDNEWITEM':

            let _listItem = state.objPurchaseOrder

            _listItem.listPurchaseOrderDetails = [...state.objPurchaseOrder.listPurchaseOrderDetails, action.data]

            return {
                ...state,
                objPurchaseOrder: { ..._listItem }
            };

        case 'ADDNEWITEMINVOICE':

            let _listItemInvoice = state.objInvoice

            _listItemInvoice.listInvoicesDetails = [...state.objInvoice.listInvoicesDetails, action.data]

            return {
                ...state,
                objInvoice: { ..._listItemInvoice }
            };

        case 'CREDITDEBIT':

            return {
                ...state,
                objCreditDebit: action.data
            };

        case 'GETINDEBTEDNESS':
            return {
                ...state,
                listIndebtednesses: action.data
            };

        case 'ADDEDITINDEBTEDNESSES':

            let listIndebtednesses = state.listIndebtednesses;

            let indexIndebtednesses = listIndebtednesses.findIndex(x => x.id === action.data.id);

            if (indexIndebtednesses > -1) {
                listIndebtednesses.splice(indexIndebtednesses, 1);
            }

            action.data.debtDate = action.data.debtDate.split("T")[0]

            return {
                ...state,
                listIndebtednesses: [...state.listPayedOffDebt, action.data]
            };

        case 'DELETEINDEBTEDNESSES':

            let _listIndebtednesses = state.listIndebtednesses;

            let indexobjIndebtednesses = _listIndebtednesses.findIndex(x => x.id === action.id);
            _listIndebtednesses.splice(indexobjIndebtednesses, 1);

            return {
                ...state,
                listIndebtednesses: [...state.listPayedOffDebt]
            };

        case 'LISTBANK':

            return {
                ...state,
                listBank: action.data
            };

        case 'LISTBANKFORDROP':

            let objbanks = [];
            action.data.forEach(item => {

                let objbank = {
                    value: item.id,
                    label: item.name
                }

                objbanks.push(objbank);
            });

            return {
                ...state,
                listBankForDrop: objbanks
            };

        case 'LISTTRANSACTIONBANK':

            return {
                ...state,
                listTransactionBank: action.data
            };

        case 'ADDEDITTRANSACTIONBANK':

            let _listTransactionBank = state.listTransactionBank;

            let indexTransactionBank = _listTransactionBank.findIndex(x => x.id === action.data.id);

            if (indexTransactionBank > -1) {
                _listTransactionBank.splice(indexTransactionBank, 1);
            }

            action.data.transactionDate = action.data.transactionDate.split("T")[0]

            return {
                ...state,
                listTransactionBank: [...state.listTransactionBank, action.data]
            };

        case 'DELETETRANSACTIONBANK':

            let listTransactionBankes = state.listTransactionBank;

            let indexobjTransactionBankes = listTransactionBankes.findIndex(x => x.id === action.id);
            listTransactionBankes.splice(indexobjTransactionBankes, 1);

            return {
                ...state,
                listTransactionBank: [...state.listTransactionBank]
            };

        case 'BANKCOST':

            return {
                ...state,
                objCreditDebitBank: action.data
            };

        case 'ADDEDITEMPLOYEE':

            let _listEmployee = state.listEmployee;

            let indexEmployee = _listEmployee.findIndex(x => x.id === action.data.id);

            if (indexEmployee > -1) {
                _listEmployee.splice(indexEmployee, 1);
            }

            return {
                ...state,
                listEmployee: [...state.listEmployee, action.data]
            };

        case 'DELETEEMPLOYEE':

            let listEmployees = state.listEmployee;

            let indexobjEmployees = listEmployees.findIndex(x => x.id === action.id);
            listEmployees.splice(indexobjEmployees, 1);

            return {
                ...state,
                listEmployee: [...state.listEmployee]
            };

        case 'GETALLEMPLOYEE':

            return {
                ...state,
                listEmployee: action.data
            };

        case 'GETALLEMPLOYEEBOUNES':

            action.data.map(item => {
                item.bounesDate = item.bounesDate.split("T")[0]
            });

            return {
                ...state,
                listEmployeeBounes: action.data
            };

        case 'GETALLEMPLOYEEFORDROP':

            let objEmployee = [];
            action.data.forEach(item => {
                let objDept = {
                    value: item.id,
                    label: item.employeeName
                }

                objEmployee.push(objDept);
            });

            return {
                ...state,
                listEmployeeforDrop: objEmployee
            };

        case 'ADDEDITEMPLOYEEBOUNES':

            let _listEmployeeBounes = state.listEmployeeBounes;

            let indexEmployeeBounes = _listEmployeeBounes.findIndex(x => x.id === action.data.id);

            if (indexEmployeeBounes > -1) {
                _listEmployeeBounes.splice(indexEmployeeBounes, 1);
            }

            action.data.bounesDate = action.data.bounesDate.split("T")[0];

            return {
                ...state,
                listEmployeeBounes: [...state.listEmployeeBounes, action.data]
            };


        case 'DELETEEMPLOYEEBOUNES':

            let listEmployeeBoune = state.listEmployeeBounes;

            let indexobjEmployeeBou = listEmployeeBoune.findIndex(x => x.id === action.id);
            listEmployeeBoune.splice(indexobjEmployeeBou, 1);

            return {
                ...state,
                listEmployeeBounes: [...state.listEmployeeBounes]
            };

        case 'GETALLEMPLOYEEVACATION':

            action.data.map(item => {
                item.startVacation = item.startVacation.split("T")[0];
                item.endVacation = item.endVacation.split("T")[0];
            });

            return {
                ...state,
                listEmployeeVacation: action.data
            };

        case 'ADDEDITEMPLOYEEVACATION':

            let _listEmployeeVacation = state.listEmployeeVacation;

            let indexEmployeeVacation = _listEmployeeVacation.findIndex(x => x.id === action.data.id);

            if (indexEmployeeVacation > -1) {
                _listEmployeeVacation.splice(indexEmployeeVacation, 1);
            }

            action.data.startVacation = action.data.startVacation.split("T")[0];
            action.data.endVacation = action.data.endVacation.split("T")[0];

            return {
                ...state,
                listEmployeeVacation: [...state.listEmployeeVacation, action.data]
            };


        case 'DELETEEMPLOYEEVACATION':

            let listEmployeeVacation = state.listEmployeeVacation;

            let indexobjEmployeVacation = listEmployeeVacation.findIndex(x => x.id === action.id);
            listEmployeeVacation.splice(indexobjEmployeVacation, 1);

            return {
                ...state,
                listEmployeeVacation: [...state.listEmployeeVacation]
            };


        case 'GETEMPLOYEESALARY':

            return {
                ...state,
                listEmployeeSalary: action.data
            };

        case 'ADDEDITSALARY':

            return {
                ...state 
            };



        case 'GETALLBOUNES':

            action.data.map(item => {
                item.bounesDate = item.bounesDate.split("T")[0]
            });

            return {
                ...state,
                listBounes: action.data
            };

        case 'ADDEDITBOUNES':

            let _listBounes = state.listBounes;

            let indexBounes = _listBounes.findIndex(x => x.id === action.data.id);

            if (indexBounes > -1) {
                _listBounes.splice(indexBounes, 1);
            }

            action.data.bounesDate = action.data.bounesDate.split("T")[0];

            return {
                ...state,
                listBounes: [...state.listBounes, action.data]
            };


        case 'DELETEBOUNES':

            let listBoune = state.listBounes;

            let indexobjBou = listBoune.findIndex(x => x.id === action.id);
            listBoune.splice(indexobjBou, 1);

            return {
                ...state,
                listBounes: [...state.listBounes]
            };



        case 'GETSETTLEMENT':
            return {
                ...state,
                listSettlement: action.data
            };

        case 'ADDEDITSETTLEMENT':

            let ListSettlement = state.listSettlement;

            let indexlistSettlement = ListSettlement.findIndex(x => x.id === action.data.id);

            if (indexlistSettlement > -1) {
                ListSettlement.splice(indexlistSettlement, 1);
            }

            action.data.debtDate = action.data.debtDate.split("T")[0]

            return {
                ...state,
                listSettlement: [...state.listSettlement, action.data]
            };

        case 'DELETESETTLEMENT':

            let _listSettlement = state.listSettlement;

            let indexobjlistSettleme = _listSettlement.findIndex(x => x.id === action.id);
            _listSettlement.splice(indexobjlistSettleme, 1);

            return {
                ...state,
                listSettlement: [...state.listSettlement]
            };


        case 'GETPRODUCTDETAILS':
            return {
                ...state,
                listProduct: action.data
            };
        case 'GETTOTALFINANCIALTODAY':
            return {
                ...state,
                totalFinancial: action.data
            };
        case 'TOTALSALARY':
            return {
                ...state,
                totalSalary: action.data
            };

        case 'GETTOTALVACATIONTODAY':
            return {
                ...state,
                totalVacations: action.data
            };


        case 'GETTOTALBOUNESTODAY':
            return {
                ...state,
                totalBounes: action.data
            };

        case 'RESETPRODUCT':
            return {
                ...state
            };
        default:
            return {
                ...state
            };
    }
}
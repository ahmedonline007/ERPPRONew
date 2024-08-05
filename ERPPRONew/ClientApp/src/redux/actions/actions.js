import * as types from './types';
import axiosDocs from '../../axios/axios';
import toastr from 'toastr';

// action of get all SupplierCustomer
export function getAllSupplierCustomer(flag) {
    return (dispatch) => {
        axiosDocs.get(`GetAllSupplierCustomer?flag=${flag}`).then(function (response) {

            dispatch({
                type: types.LISTSUPPLIER,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getAllSupplierCustomer: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

// action of get all SupplierCustomer
export function deleteSupplier(id) {
    return (dispatch) => {
        axiosDocs.get(`DeleteSupplierCustomer?id=${id}`).then(function (response) {
            toastr.success("تم الحذف بنجاح");
            dispatch({
                type: types.DELETESUPPLIER,
                id
            });

        }).catch(function (error) {
            console.log("deleteSupplier: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function DeletePaymentOffDebt(id, customerId) {
    return (dispatch) => {
        axiosDocs.get(`DeletePayedOffDebet?id=${id}`).then(function (response) {

            toastr.success("تم الحذف بنجاح");

            axiosDocs.get(`GetSupplierCustomerById?id=${customerId}`).then(function (datacustomer) {
                dispatch({
                    type: types.DELETEPAYMENTSUPPLIER,
                    id,
                    datacustomer: datacustomer.data
                });
            })
        }).catch(function (error) {
            console.log("DeletePaymentOffDebt: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

// action of get all SupplierCustomer
export function addEditSupplier(obj) {
    return (dispatch) => {
        axiosDocs.post(`AddEditSupplierCustomer`, obj).then(function (response) {
            toastr.success("تم الحفظ بنجاح");
            dispatch({
                type: types.ADDEDITSUPPLIER,
                data: response.data
            });

        }).catch(function (error) {
            console.log("addEditSupplier: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

// action of addEditCustomer
export function addEditCustomer(obj) {
    return (dispatch) => {
        axiosDocs.post(`AddEditSupplierCustomer`, obj).then(function (response) {
            toastr.success("تم الحفظ بنجاح");
            dispatch({
                type: types.ADDEDITCUSTOMER,
                data: response.data
            });

        }).catch(function (error) {
            console.log("addEditCustomer: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}



// action of addEditCustomer
export function updateCreditDebit(obj) {
    return (dispatch) => {
        axiosDocs.post(`UpdateCreditDebit`, obj).then(function (response) {
            toastr.success("تم الحفظ بنجاح");
            dispatch({
                type: types.UPDATECREDITDEBITSUPPLIER,
                data: response.data
            });

        }).catch(function (error) {
            console.log("updateCreditDebit: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function updateCreditDebitCustomer(obj) {
    return (dispatch) => {
        axiosDocs.post(`UpdateCreditDebit`, obj).then(function (response) {
            toastr.success("تم الحفظ بنجاح");
            dispatch({
                type: types.UPDATECREDITDEBITCUSTOMER,
                data: response.data
            });

        }).catch(function (error) {
            console.log("updateCreditDebit: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


// action of get all SupplierCustomer
export function getAllCustomer(flag) {
    return (dispatch) => {
        axiosDocs.get(`GetAllSupplierCustomer?flag=${flag}`).then(function (response) {

            dispatch({
                type: types.LISTCUSTOMER,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getAllCustomer: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

// action of get all deleteCustomer
export function deleteCustomer(id) {
    return (dispatch) => {
        axiosDocs.get(`DeleteSupplierCustomer?id=${id}`).then(function (response) {
            toastr.success("تم الحذف بنجاح");
            dispatch({
                type: types.DELETECUSTOMER,
                id
            });

        }).catch(function (error) {
            console.log("deleteSupplier: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


// action of addEditCustomer
export function addEditCategory(obj) {
    return (dispatch) => {
        axiosDocs.post(`AddEditCategory`, obj).then(function (response) {
            toastr.success("تم الحفظ بنجاح");
            dispatch({
                type: types.ADDEDITCATEGORY,
                data: response.data
            });

        }).catch(function (error) {
            console.log("addEditCategory: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


// action of get all SupplierCustomer
export function addEditBank(obj) {
    return (dispatch) => {
        axiosDocs.post(`AddEditBank`, obj).then(function (response) {

            dispatch({
                type: types.ADDBANK,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getAllCategory: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


export function getAllCategory() {
    return (dispatch) => {
        axiosDocs.get(`GetAllCategory`).then(function (response) {

            dispatch({
                type: types.LISTCATEGORY,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getAllBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function getAllBank() {
    return (dispatch) => {
        axiosDocs.get(`GetAllBank`).then(function (response) {

            dispatch({
                type: types.LISTBANK,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getAllBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function getAllBankForDrop() {
    return (dispatch) => {
        axiosDocs.get(`GetAllBank`).then(function (response) {

            dispatch({
                type: types.LISTBANKFORDROP,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getAllBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


// action of get all deleteCustomer
export function deleteCategory(id) {
    return (dispatch) => {
        axiosDocs.get(`DeleteCategory?id=${id}`).then(function (response) {
            toastr.success("تم الحذف بنجاح");
            dispatch({
                type: types.DELETECATEGORY,
                id
            });
        }).catch(function (error) {
            console.log("deleteCategory: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


// action of get all deleteCustomer
export function deleteBank(id) {
    return (dispatch) => {
        axiosDocs.get(`DeleteBank?id=${id}`).then(function (response) {
            toastr.success("تم الحذف بنجاح");
            dispatch({
                type: types.DELETEBANK,
                id
            });
        }).catch(function (error) {
            console.log("deleteBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

// action of get all SupplierCustomer
export function getAllCategoryforDrop() {
    return (dispatch) => {
        axiosDocs.get(`GetAllCategory`).then(function (response) {

            dispatch({
                type: types.LISTCATEGORYFORDROP,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getAllCategoryforDrop: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

// action of get all SupplierCustomer
export function getAllProduct() {
    return (dispatch) => {
        axiosDocs.get(`GetAllProducts`).then(function (response) {

            dispatch({
                type: types.LISTOFPRODUCTS,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getAllProduct: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

// action of addEditCustomer
export function addEditProduct(obj) {
    return (dispatch) => {
        axiosDocs.post(`AddEditProducts`, obj).then(function (response) {
            toastr.success("تم الحفظ بنجاح");
            dispatch({
                type: types.ADDEDITPRODUCTS,
                data: response.data
            });

        }).catch(function (error) {
            console.log("addEditCategory: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

// action of get all deleteCustomer
export function deleteProducts(id) {
    return (dispatch) => {
        axiosDocs.get(`DeleteProducts?id=${id}`).then(function (response) {
            toastr.success("تم الحذف بنجاح");
            dispatch({
                type: types.DELETEPRODUCTS,
                id
            });
        }).catch(function (error) {
            console.log("deleteCategory: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


// action of addEditProductNumber
export function addEditProductNumber(obj) {
    return (dispatch) => {
        axiosDocs.post(`AddEditProductNumber`, obj).then(function (response) {
            toastr.success("تم تسجيل الكمية بنجاح");
            dispatch({
                type: types.ADDEDITPRODUCTSNUMBER,
                data: response.data
            });

        }).catch(function (error) {
            console.log("addEditProductNumber: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

// action of addEditProductSize
export function addEditProductSize(obj) {
    return (dispatch) => {
        axiosDocs.post(`AddEditProductSize`, obj).then(function (response) {
            toastr.success("تم تسجيل الكمية بنجاح");
            dispatch({
                type: types.ADDEDITPRODUCTSSIZE,
                data: response.data
            });

        }).catch(function (error) {
            console.log("addEditProductSize: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


// action of addEditProductSize
export function getAllProductForStore() {
    return (dispatch) => {
        axiosDocs.get(`GetProductForStore`).then(function (response) {
            dispatch({
                type: types.GETPRODUCTFORSTORE,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getAllProductForStore: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

// action of addEditProductSize
export function getSupplierCustomerForDrop(type) {
    return (dispatch) => {
        axiosDocs.get(`GetAllSupplierCustomerByFlagForDrop?flag=${type}`).then(function (response) {
            dispatch({
                type: types.LISTSUPPLIERCUSTOMER,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getSupplierCustomerForDrop: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


// action of getPayedDebt
export function getPayedDebt(flag) {
    return (dispatch) => {
        axiosDocs.get(`GetAllPayedOffDebet?flag=${flag}`).then(function (response) {
            dispatch({
                type: types.LISTPAYEDOFFDEBET,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getPayedDebt: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function getCreditDepit(id) {
    return (dispatch) => {
        axiosDocs.get(`GetSupplierCustomerById?id=${id}`).then(function (response) {
            dispatch({
                type: types.CREDITDEBIT,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getCreditDepit: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

// action of addEditProductSize
export function getTransactionSupplierCustomer(type) {
    return (dispatch) => {
        axiosDocs.get(`GetTransactionSupplierCustomer?flag=${type}`).then(function (response) {
            dispatch({
                type: types.LISTTRANSACTIONSUPPLIERCUSTOMER,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getTransactionSupplierCustomer: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


export function getTransactionSupplierCustomerStore(type) {
    return (dispatch) => {
        axiosDocs.get(`GetTransactionSupplierCustomerStoreById?flag=${type}`).then(function (response) {
            dispatch({
                type: types.LISTTRANSACTIONSUPPLIERCUSTOMERSTORE,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getTransactionSupplierCustomerStore: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

// action of getProductForDrop
export function getProductForDrop() {
    return (dispatch) => {
        axiosDocs.get(`GetAllProductsForDrop`).then(function (response) {
            dispatch({
                type: types.LISTPRODUCTSFORDROP,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getProductForDrop: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

// action of getProductForDrop
export function getProductTransaction() {
    return (dispatch) => {
        axiosDocs.get(`GetTransactionProduct`).then(function (response) {
            dispatch({
                type: types.LISTPRODUCTSTRANSACTION,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getProductTransaction: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

// action of getProductForDrop
export function getProductForTransaction() {
    return (dispatch) => {
        axiosDocs.get(`GetProductForTransaction`).then(function (response) {
            dispatch({
                type: types.LISTPRODUCTSTRANSACTIONS,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getProductForTransaction: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function getAllPurchaseOrder() {
    return (dispatch) => {
        axiosDocs.get(`GetPurchaseOrder`).then(function (response) {
            dispatch({
                type: types.LISTPURCHASEOEDER,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getAllPurchaseOrder: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


export function addPurchaseOrder(main, item) {
    return (dispatch) => {
        axiosDocs.post(`AddPurchaseOrder`, main).then(function (response) {

            axiosDocs.post(`AddPurchaseOrderDetails?purchaseOrderId=${response.data}`, item).then(function (response) {
                toastr.success("تم تسجيل الفاتورة بنجاح");
                dispatch({
                    type: types.ADDPURCHASEORDER,
                    data: response.data
                });
            })

        }).catch(function (error) {
            console.log("addPurchaseOrder: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function addPurchaseOrderByClient(main, item) {
    return (dispatch) => {
        axiosDocs.post(`AddNewPurchaseOrderByClient`, main).then(function (response) {
            axiosDocs.post(`AddPurchaseOrderDetails?purchaseOrderId=${response.data.id}&invoicesNo=${main.numberOfInvoiceSupplier}`, item).then(function (response) {
                toastr.success("تم تسجيل الفاتورة بنجاح");
                dispatch({
                    type: types.ADDPURCHASEORDER,
                    data: response.data
                });
            })

        }).catch(function (error) {
            console.log("addPurchaseOrder: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function deletePurchaseOrderByAdmin(id) {
    return (dispatch) => {
        axiosDocs.get(`DeletPurchaseOrder?id=${id}`).then(function (response) {
            toastr.success("تم حذف الفاتورة بنجاح");
            dispatch({
                type: types.DELETEPURCHASEORDER,
                id
            });
        }).catch(function (error) {
            console.log("deletePurchaseOrderByAdmin: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function deletePurchaseOrderWithoutSupplier(id) {
    return (dispatch) => {
        axiosDocs.get(`DeletPurchaseOrderWithoutSupplier?id=${id}`).then(function (response) {
            toastr.success("تم حذف الفاتورة بنجاح");
            dispatch({
                type: types.DELETEPURCHASEORDER,
                id
            });
        }).catch(function (error) {
            console.log("deletePurchaseOrderWithoutSupplier: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


export function deleteInvoices(id) {
    return (dispatch) => {
        axiosDocs.get(`DeletInvoices?id=${id}`).then(function (response) {
            toastr.success("تم حذف الفاتورة بنجاح");
            dispatch({
                type: types.DELETEINVOICES,
                id
            });
        }).catch(function (error) {
            console.log("DELETERETURNINVOICES: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}
export function deleteReturnInvoices(id) {
    return (dispatch) => {
        axiosDocs.get(`DeletReturnInvoices?id=${id}`).then(function (response) {
            toastr.success("تم حذف الفاتورة بنجاح");
            dispatch({
                type: types.DELETERETURNINVOICES,
                id
            });
        }).catch(function (error) {
            console.log("deleteInvoices: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function getProductForInvoices() {
    return (dispatch) => {
        axiosDocs.get(`GetProductForInvoices`).then(function (response) {
            dispatch({
                type: types.LISTPRODUCTFORINVOICES,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getProductForInvoices: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function addInvoices(main, item) {
    return (dispatch) => {
        axiosDocs.post(`AddNewInvoices`, main).then(function (response) {
            axiosDocs.post(`AddInvoicesDetails?invoicesId=${response.data.id}&invoicesNo=${response.data.invoicesNo}`, item).then(function (response) {
                toastr.success("تم تسجيل الفاتورة بنجاح");
                dispatch({
                    type: types.ADDINVOICES,
                    data: response.data
                });
            })

        }).catch(function (error) {
            console.log("addInvoices: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


export function addReturnInvoices(main, item) {
    return (dispatch) => {
        axiosDocs.post(`AddReturnInvoices`, main).then(function (response) {
            axiosDocs.post(`AddReturnInvoicesDetails?invoicesId=${response.data.id}&invoicesNo=${response.data.invoicesNo}`, item).then(function (response) {
                toastr.success("تم تسجيل الفاتورة بنجاح");
                dispatch({
                    type: types.ADDRETURNINVOICES,
                    data: response.data
                });
            })

        }).catch(function (error) {
            console.log("addReturnInvoices: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function getAllInvoices() {
    return (dispatch) => {
        axiosDocs.get(`GetAllInvoices`).then(function (response) {
            dispatch({
                type: types.LISTINVOICES,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getAllPurchaseOrder: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function getAllReturnInvoices() {
    return (dispatch) => {
        axiosDocs.get(`GetAllReturnInvoices`).then(function (response) {
            dispatch({
                type: types.LISTRETURNINVOICES,
                data: response.data
            });

        }).catch(function (error) {
            console.log("GetAllReturnInvoices: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


export function editCreditDepit(obj) {
    return (dispatch) => {
        axiosDocs.get(`PayedCash?customerId=${obj.customerId}&credit=${obj.credit}&date=${obj.date}`).then(function (response) {

            toastr.success("تم سداد النقدية بنجاح");
            dispatch({
                type: types.UPDATECREDITDEBIT,
                data: response.data
            });

        }).catch(function (error) {
            console.log("editCreditDepit: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function getAllInvoicesToday(date) {
    return (dispatch) => {
        axiosDocs.get(`GetAllInvoicesToday?date=${date}`).then(function (response) {

            dispatch({
                type: types.GETINVOICESTODAY,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getAllInvoicesToday: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function getTotalSalaryToday(date) {
    return (dispatch) => {
        axiosDocs.get(`GetTotalSalaryToday?date=${date}`).then(function (response) {

            dispatch({
                type: types.TOTALSALARY,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getAllInvoicesToday: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}
export function getAllNewInvoicesToday(date) {
    return (dispatch) => {
        axiosDocs.get(`GetAllNewInvoicesToday?date=${date}`).then(function (response) {

            dispatch({
                type: types.GETINVOICESTODAY,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getAllNewInvoicesToday: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function getAllReturnInvoicesToday(date) {
    //return (dispatch) => {
    //    axiosDocs.get(`GetAllReturnInvoicesToday?date=${date}`).then(function (response) {

    //        dispatch({
    //            type: types.GETRETURNINVOICESTODAY,
    //            data: response.data
    //        });

    //    }).catch(function (error) {
    //        console.log("getAllReturnInvoicesToday: ", error);
    //        toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
    //    });
    //};

    return (dispatch) => {
        axiosDocs.get(`GetAllTotalReturnInvoicesToday?date=${date}`).then(function (response) {

            dispatch({
                type: types.GETRETURNINVOICESTODAY,
                data: response.data
            });

        }).catch(function (error) {
            console.log("GetAllTotalReturnInvoicesToday: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function getTotalStore() {
    return (dispatch) => {
        axiosDocs.get(`GetTotalStore`).then(function (response) {
            dispatch({
                type: types.TOTALSTORE,
                data: [response.data]
            });

        }).catch(function (error) {
            console.log("getTotalStore: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function getPurchaseOrderById(id) {
    return (dispatch) => {
        axiosDocs.get(`GetPurchaseOrderById?id=${id}`).then(function (response) {
            dispatch({
                type: types.GETPURCHASEORDERBYID,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getPurchaseOrderById: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function getInvoiceById(id) {
    return (dispatch) => {
        axiosDocs.get(`GetInvoiceById?id=${id}`).then(function (response) {
            dispatch({
                type: types.GETINVOICEBYID,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getInvoiceById: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function DeleteListItemFromPurchaseOrderDetails(id, invoicesNo) {
    return (dispatch) => {
        axiosDocs.get(`DeleteListItemFromPurchaseOrderDetails?Id=${id.toString()}&numberOfInvoiceBySystem=${invoicesNo}`).then(function (response) {

            toastr.success("تم الحذف بنجاح");

            dispatch({
                type: types.DELETELISTITEM,
                id
            });
        }).catch(function (error) {
            console.log("DeleteListItemFromPurchaseOrderDetails: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function DeleteListItemFromInvoiceDetails(id, invoicesNo) {
    return (dispatch) => {
        axiosDocs.get(`DeleteListItemFromInvoiceDetails?Id=${id.toString()}&numberOfInvoiceBySystem=${invoicesNo}`).then(function (response) {

            toastr.success("تم الحذف بنجاح");

            dispatch({
                type: types.DELETELISTITEMFROMINVOICE,
                id
            });
        }).catch(function (error) {
            console.log("DeleteListItemFromInvoiceDetails: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


export function editItems(obj) {
    return (dispatch) => {
        axiosDocs.post(`UpdatePriceProductandTransaction`, obj).then(function (response) {

            toastr.success("تم الحفظ بنجاح");
            dispatch({
                type: types.UPDATEITEM,
                data: response.data
            });

        }).catch(function (error) {
            console.log("editItems: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


export function editItemsFromInvoice(obj) {
    return (dispatch) => {
        axiosDocs.post(`UpdatePriceProductandTransactionFromInvoices`, obj).then(function (response) {

            toastr.success("تم الحفظ بنجاح");
            dispatch({
                type: types.UPDATEITEMFROMINVOICE,
                data: response.data
            });

        }).catch(function (error) {
            console.log("editItems: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function editPurchaseOrder(obj) {
    return (dispatch) => {
        axiosDocs.post(`EditPurchaseOrder`, obj).then(function (response) {

            toastr.success("تم الحفظ بنجاح");
            dispatch({
                type: types.UPDATEPURCHASEORDER
            });

        }).catch(function (error) {
            console.log("editPurchaseOrder: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function editInvoices(obj) {
    return (dispatch) => {
        axiosDocs.post(`EditInvoice`, obj).then(function (response) {

            toastr.success("تم الحفظ بنجاح");
            dispatch({
                type: types.UPDATEINVOICE
            });
        }).catch(function (error) {
            console.log("editInvoices: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

// action of addEditCustomer
export function addInstallment(obj) {
    return (dispatch) => {
        axiosDocs.get(`AddEditInstallment?customerId=${obj.customerId}&date=${obj.date}&money=${obj.money}`, obj).then(function (response) {
            toastr.success("تم الحفظ بنجاح");
            dispatch({
                type: types.ADDEDITINSTALLMENT
            });

        }).catch(function (error) {
            console.log("addInstallment: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

// action of addEditCustomer
export function updateInstallment(obj, objCustomer) {
    return (dispatch) => {
        axiosDocs.get(`UpdateDateInstallment?id=${obj.id}&date=${obj.date}`, obj).then(function (response) {
            toastr.success("تم الحفظ بنجاح");

            objCustomer.date = obj.date;

            dispatch({
                type: types.EDITINSTALLMENT,
                data: objCustomer
            });

        }).catch(function (error) {
            console.log("updateInstallment: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function getAllCustomerInstallment(obj) {
    return (dispatch) => {
        axiosDocs.get(`GetAllInstallment?type=${obj}`).then(function (response) {

            dispatch({
                type: types.GETALLINSTALLMENT,
                data: response.data
            });

        }).catch(function (error) {
            console.log("updateInstallment: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function getAllUsers() {
    return (dispatch) => {
        axiosDocs.get(`GetAllUsers`).then(function (response) {

            dispatch({
                type: types.GETALLUSERS,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getAllUsers: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function addEditUsers(obj) {
    return (dispatch) => {
        axiosDocs.post(`AddEditUsers`, obj).then(function (response) {
            toastr.success("تم الحفظ بنجاح");
            dispatch({
                type: types.ADDEDITUSERS,
                data: response.data
            });

        }).catch(function (error) {
            console.log("addEditSupplier: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

// action of get all SupplierCustomer
export function deleteUsers(id) {
    return (dispatch) => {
        axiosDocs.get(`DeleteUser?id=${id}`).then(function (response) {
            toastr.success("تم الحذف بنجاح");
            dispatch({
                type: types.DELETEUSERS,
                id
            });

        }).catch(function (error) {
            console.log("deleteUsers: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}



export function getAllExpences() {
    return (dispatch) => {
        axiosDocs.get(`GetAllExpences`).then(function (response) {

            dispatch({
                type: types.GETALLEXPENCES,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getAllExpences: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function AddEditExpences(obj) {
    return (dispatch) => {
        axiosDocs.post(`AddEditExpences`, obj).then(function (response) {
            toastr.success("تم الحفظ بنجاح");

            dispatch({
                type: types.ADDEDITEXPENCES,
                data: response.data
            });

        }).catch(function (error) {
            console.log("AddEditExpences: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function deleteExpences(id) {
    return (dispatch) => {
        axiosDocs.get(`DeleteExpences?id=${id}`).then(function (response) {
            toastr.success("تم الحذف بنجاح");
            dispatch({
                type: types.DELETEEXPENCES,
                id
            });

        }).catch(function (error) {
            console.log("deleteUsers: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function getTotalExpencesToday(date) {
    return (dispatch) => {
        axiosDocs.get(`SelectTotalExpencesToday?date=${date}`).then(function (response) {

            dispatch({
                type: types.GETEXPENCESTODAY,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getTotalExpencesToday: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


export function getAllTotalCreditToday(flag, date) {
    return (dispatch) => {
        axiosDocs.get(`GetTotalTransactionToday?flag=${flag}&date=${date}`).then(function (response) {

            dispatch({
                type: types.GETCREDITTODAY,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getAllTotalCreditToday: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function getAllCreditToday(flag, date) {
    return (dispatch) => {
        axiosDocs.get(`GetTransactionSupplierCustomerToDay?flag=${flag}&date=${date}`).then(function (response) {

            dispatch({
                type: types.GETALLCREDITTODAY,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getAllCreditToday: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}



export function getAllExpencesTo() {
    return (dispatch) => {
        axiosDocs.get(`GetAllExpencesTo`).then(function (response) {

            dispatch({
                type: types.GETALLEXPENCESTO,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getAllExpencesTo: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function AddEditExpencesTo(obj) {
    return (dispatch) => {
        axiosDocs.post(`AddEditExpencesTo`, obj).then(function (response) {
            toastr.success("تم الحفظ بنجاح");
            dispatch({
                type: types.ADDEDITEXPENCESTO,
                data: response.data
            });

        }).catch(function (error) {
            console.log("AddEditExpencesTo: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


export function AddEditPayedOfDebt(obj) {
    return (dispatch) => {
        axiosDocs.post(`AddEditPayedOfDebt`, obj).then(function (response) {
            toastr.success("تم الحفظ بنجاح");

            axiosDocs.get(`GetSupplierCustomerById?id=${obj.customerId}`).then(function (dataCustomer) {

                dispatch({
                    type: types.ADDEDITPAYEDOFDEBT,
                    data: response.data,
                    dataCustomer: dataCustomer.data
                });
            })
        }).catch(function (error) {
            console.log("AddEditPayedOfDebt: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


export function AddNewItemFromPurchaseOrderByAdmin(obj) {
    return (dispatch) => {
        axiosDocs.post(`AddNewItemFromPurchaseOrderByAdmin`, obj).then(function (response) {
            toastr.success("تم الحفظ بنجاح");
            dispatch({
                type: types.ADDNEWITEM,
                data: response.data
            });
        }).catch(function (error) {
            console.log("AddNewItemFromPurchaseOrderByAdmin: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function AddNewItemFromEditInvoices(invoicesId, invoicesNo, obj) {
    return (dispatch) => {
        axiosDocs.post(`AddNewItemFromEditInvoices?invoicesId=${invoicesId}&invoicesNo=${invoicesNo}`, obj).then(function (response) {
            toastr.success("تم الحفظ بنجاح");
            dispatch({
                type: types.ADDNEWITEMINVOICE,
                data: response.data
            });
        }).catch(function (error) {
            console.log("AddNewItemFromEditInvoices: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function deleteExpencesTo(id) {
    return (dispatch) => {
        axiosDocs.get(`DeleteExpencesTo?id=${id}`).then(function (response) {
            toastr.success("تم الحذف بنجاح");
            dispatch({
                type: types.DELETEEXPENCESTO,
                id
            });

        }).catch(function (error) {
            console.log("deleteExpencesTo: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function getTotalExpencesToToday(date) {
    return (dispatch) => {
        axiosDocs.get(`SelectTotalExpencesToToday?date=${date}`).then(function (response) {

            dispatch({
                type: types.GETEXPENCESTOTODAY,
                data: response.data
            });

        }).catch(function (error) {
            console.log("getTotalExpencesToToday: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


export function backup() {
    return (dispatch) => {
        axiosDocs.get(`BackupDB`).then(function () {

            toastr.success("تم أخذ النسخة الاحتياطية بنجاح");

        }).catch(function (error) {
            console.log("getTotalExpencesToToday: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function getAllIndebtedness(type) {
    return (dispatch) => {
        axiosDocs.get(`GetAllIndebtedness?flag=${type}`).then(function (response) {
            dispatch({
                type: types.GETINDEBTEDNESS,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getAllIndebtedness: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function AddEditIndebtednesses(obj) {
    return (dispatch) => {
        axiosDocs.post(`AddEditIndebtedness`, obj).then(function (response) {
            toastr.success("تم الحفظ بنجاح");
            dispatch({
                type: types.ADDEDITINDEBTEDNESSES,
                data: response.data
            });
        }).catch(function (error) {
            console.log("AddNewItemFromEditInvoices: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function DeleteIndebtedness(id, customerId) {
    return (dispatch) => {
        axiosDocs.get(`DeleteIndebtedness?id=${id}`).then(function (response) {

            toastr.success("تم الحذف بنجاح");

            dispatch({
                type: types.DELETEINDEBTEDNESSES,
                id
            });

        }).catch(function (error) {
            console.log("DeletePaymentOffDebt: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


export function AddEditTransactionBank(obj) {
    return (dispatch) => {
        axiosDocs.post(`AddEditTransactionBank`, obj).then(function (response) {
            toastr.success("تم الحفظ بنجاح");
            dispatch({
                type: types.ADDEDITTRANSACTIONBANK,
                data: response.data
            });
        }).catch(function (error) {
            console.log("AddNewItemFromEditInvoices: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


export function getTransactionBank() {
    return (dispatch) => {
        axiosDocs.get(`GetAllTransactionBank`).then(function (response) {
            dispatch({
                type: types.LISTTRANSACTIONBANK,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getTransactionBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}




export function DeleteTransactionBnk(id) {
    return (dispatch) => {
        axiosDocs.get(`DeleteTransactionBank?id=${id}`).then(function (response) {
            toastr.success("تم الحذف بنجاح");
            dispatch({
                type: types.DELETETRANSACTIONBANK,
                id
            });

        }).catch(function (error) {
            console.log("deleteExpencesTo: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}



export function getCostBank(id) {
    return (dispatch) => {
        axiosDocs.get(`GetCostBank?Id=${id}`).then(function (response) {
            dispatch({
                type: types.BANKCOST,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getCostBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


export function addEditEmployee(obj) {
    return (dispatch) => {
        axiosDocs.post(`AddEditEmployees`, obj).then(function (response) {
            toastr.success("تم الحفظ بنجاح");

            dispatch({
                type: types.ADDEDITEMPLOYEE,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getCostBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}




export function getAllEmployees() {
    return (dispatch) => {
        axiosDocs.get(`GetAllEmployee`).then(function (response) {
            dispatch({
                type: types.GETALLEMPLOYEE,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getCostBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


export function getAllEmployeeForDrop() {
    return (dispatch) => {
        axiosDocs.get(`GetAllEmployeeForDrop`).then(function (response) {
            dispatch({
                type: types.GETALLEMPLOYEEFORDROP,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getCostBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function deleteEmployees(id) {
    return (dispatch) => {
        axiosDocs.get(`DeleteEmployee?id=${id}`).then(function (response) {
            toastr.success("تم الحذف بنجاح");

            dispatch({
                type: types.DELETEEMPLOYEE,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getCostBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}



export function getAllEmployeesBounes() {
    return (dispatch) => {
        axiosDocs.get(`GetAllFinancialAdvance`).then(function (response) {
            dispatch({
                type: types.GETALLEMPLOYEEBOUNES,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getCostBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function getTotalFinancialAdvanceToday(today) {
    return (dispatch) => {
        axiosDocs.get(`GetTotalFinancialAdvanceToday?date=${today}`).then(function (response) {
            dispatch({
                type: types.GETTOTALFINANCIALTODAY,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getCostBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function getTotalVacationToToday(today) {
    return (dispatch) => {
        axiosDocs.get(`GetTotalFinancialAdvanceToday?date=${today}`).then(function (response) {
            dispatch({
                type: types.GETTOTALVACATIONTODAY,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getCostBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function getTotalBounesToToday(today) {
    return (dispatch) => {
        axiosDocs.get(`GetTotalBounesToday?date=${today}`).then(function (response) {
            dispatch({
                type: types.GETTOTALBOUNESTODAY,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getCostBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function addEditEmployeeBounes(obj) {
    return (dispatch) => {
        axiosDocs.post(`AddEditFinancialAdvance`, obj).then(function (response) {
            toastr.success("تم الحفظ بنجاح");

            dispatch({
                type: types.ADDEDITEMPLOYEEBOUNES,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getCostBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


export function deleteEmployeesBounes(id) {
    return (dispatch) => {
        axiosDocs.get(`DeleteFinancialAdvance?id=${id}`).then(function (response) {
            toastr.success("تم الحذف بنجاح");

            dispatch({
                type: types.DELETEEMPLOYEEBOUNES,
                id
            });
        }).catch(function (error) {
            console.log("getCostBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}



export function getAllEmployeesVacations() {
    return (dispatch) => {
        axiosDocs.get(`GetAllVacation`).then(function (response) {
            dispatch({
                type: types.GETALLEMPLOYEEVACATION,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getCostBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}



export function addEditEmployeeVacation(obj) {
    return (dispatch) => {
        axiosDocs.post(`AddEditVaction`, obj).then(function (response) {
            toastr.success("تم الحفظ بنجاح");

            dispatch({
                type: types.ADDEDITEMPLOYEEVACATION,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getCostBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


export function saveSalary(obj) {
    return (dispatch) => {
        axiosDocs.post(`AddSalaryEmployee`, obj).then(function (response) {
            if (response.data == true) {
                toastr.success("تم الحفظ بنجاح");
                dispatch({
                    type: types.ADDEDITSALARY
                });
            } else {
                toastr.error("تم تسجيل الرواتب من قبل");
            }
        }).catch(function (error) {
            console.log("getCostBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}



export function deleteEmployeesVacation(id) {
    return (dispatch) => {
        axiosDocs.get(`DeleteVacation?id=${id}`).then(function (response) {
            toastr.success("تم الحذف بنجاح");

            dispatch({
                type: types.DELETEEMPLOYEEVACATION,
                id
            });
        }).catch(function (error) {
            console.log("getCostBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


export function AddSalary() {
    return (dispatch) => {
        axiosDocs.get(`GetEmployeeSalary`).then(function (response) {
            dispatch({
                type: types.GETEMPLOYEESALARY,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getCostBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}








export function getAllBounes() {
    return (dispatch) => {
        axiosDocs.get(`GetAllBounes`).then(function (response) {
            dispatch({
                type: types.GETALLBOUNES,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getCostBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


export function addEditBounes(obj) {
    return (dispatch) => {
        axiosDocs.post(`AddEditBounes`, obj).then(function (response) {
            toastr.success("تم الحفظ بنجاح");

            dispatch({
                type: types.ADDEDITBOUNES,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getCostBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


export function deleteBounes(id) {
    return (dispatch) => {
        axiosDocs.get(`DeleteBounes?id=${id}`).then(function (response) {
            toastr.success("تم الحذف بنجاح");

            dispatch({
                type: types.DELETEBOUNES,
                id
            });
        }).catch(function (error) {
            console.log("getCostBank: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}




export function getProductDetails() {
    return (dispatch) => {
        axiosDocs.get(`GetProductDetails`).then(function (response) {
            dispatch({
                type: types.GETPRODUCTDETAILS,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getAllIndebtedness: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


export function getAllSettlement(type) {
    return (dispatch) => {
        axiosDocs.get(`GetAllCustomerSettlement?flag=${type}`).then(function (response) {
            dispatch({
                type: types.GETSETTLEMENT,
                data: response.data
            });
        }).catch(function (error) {
            console.log("getAllIndebtedness: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function AddEditSettlement(obj) {
    return (dispatch) => {
        axiosDocs.post(`AddEditCustomerSettlement`, obj).then(function (response) {
            toastr.success("تم الحفظ بنجاح");
            dispatch({
                type: types.ADDEDITSETTLEMENT,
                data: response.data
            });
        }).catch(function (error) {
            console.log("AddNewItemFromEditInvoices: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function DeleteSettlement(id, customerId) {
    return (dispatch) => {
        axiosDocs.get(`DeleteCustomerSettlement?id=${id}`).then(function (response) {

            toastr.success("تم الحذف بنجاح");

            dispatch({
                type: types.DELETESETTLEMENT,
                id
            });

        }).catch(function (error) {
            console.log("DeletePaymentOffDebt: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}


export function ResetProduct(productId) {
    return (dispatch) => {
        axiosDocs.get(`ResetProductQty?productId=${productId}`).then(function (response) {

            toastr.success("تم الحذف بنجاح");

            dispatch({
                type: types.RESETPRODUCT
            });

        }).catch(function (error) {
            console.log("DeletePaymentOffDebt: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function DeleteProductQty(Id) {
    return (dispatch) => {
        axiosDocs.get(`DeleteProductQty?Id=${Id}`).then(function (response) {

            toastr.success("تم الحذف بنجاح");

            dispatch({
                type: types.DELETEPRODUCT,
                Id
            });

        }).catch(function (error) {
            console.log("DeletePaymentOffDebt: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    };
}

export function isAddReturnInvoices() {
    return (dispatch) => {
        dispatch({
            type: types.NEWRETURNINVOICES
        });
    };
}
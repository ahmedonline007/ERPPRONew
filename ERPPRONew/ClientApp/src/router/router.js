import React, { lazy, Suspense } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Loading from '../screens/LoadingPage/LoadingPage';

//layOut
const LayOut = lazy(() => import("../screens/LayOut/LayOut"));

// pages
const DashBoard = lazy(() => import("../screens/LayOut/DashBoard"));
const Suppliers = lazy(() => import("../screens/Suppliers/Suppliers"));
const PaymentSupplier = lazy(() => import("../screens/Suppliers/paymentSupplier"));
const Customers = lazy(() => import("../screens/Customers/Customers"));
const PaymentCustomers = lazy(() => import("../screens/Customers/PaymentCustomers"));
const Category = lazy(() => import("../screens/Product/Category"));
const Product = lazy(() => import("../screens/Product/Products"));
const Stores = lazy(() => import("../screens/Product/Stores"));
const TransactionProducts = lazy(() => import("../screens/Product/TransactionProduct"));
const PurchaseOrder = lazy(() => import("../screens/PurchaseOrder/PurchaseOrder"));
const PurchaseOrderAddEdit = lazy(() => import("../screens/PurchaseOrder/PurchaseOrderAddEdit"));
const PurchaseOrderBySupplier = lazy(() => import("../screens/PurchaseOrder/PurchaseOrderBySupplier"));
const Invoices = lazy(() => import("../screens/Invoices/Invoices"));
const InvoicesAddEdit = lazy(() => import("../screens/Invoices/InvoicesAddEdit"));
const InvoicesByCustomer = lazy(() => import("../screens/Invoices/InvoicesByCustomer"));
const InvoicesToday = lazy(() => import("../screens/Invoices/InvoicesToday"));
const TransactionSupplier = lazy(() => import("../screens/Suppliers/TransactionSupplier"));
const TransactionCustomers = lazy(() => import("../screens/Customers/TransactionCustomers"));
const StoresDetails = lazy(() => import("../screens/Product/StoresDetails"));
const PurchaseOrderClient = lazy(() => import("../screens/PurchaseOrder/PurchaseOrderClient"));
const PurchaseOrderAddEditClient = lazy(() => import("../screens/PurchaseOrder/PurchaseOrderAddEditClient"));
const InstallmentCustomer = lazy(() => import("../screens/Customers/InstallmentCustomer"));
const CustomerIndebtednesses = lazy(() => import("../screens/Customers/CustomerIndebtednesses"));
const InstallmentSupplier = lazy(() => import("../screens/Suppliers/InstallmentSupplier"));
const Users = lazy(() => import("../screens/users/Users"));
const Login = lazy(() => import("../components/Login/Login"));
const ReturnInvoices = lazy(() => import("../screens/Invoices/returnInvoices"));
const ReturnInvoicesAddEdit = lazy(() => import("../screens/Invoices/returnInvoicesAddEdit"));
const Expences = lazy(() => import("../screens/Invoices/Expences"));
const TotalCreditToday = lazy(() => import("../screens/Invoices/totalCreditToday"));
const ExpencesTo = lazy(() => import("../screens/Invoices/ExpencesTo"));
const TransactionCustomersStore = lazy(() => import("../screens/Customers/TransactionCustomersStore"));
const TransactionSupplierStore = lazy(() => import("../screens/Suppliers/TransactionSuppliersStore"));
const InvoicesEdit = lazy(() => import("../screens/Invoices/InvoicesEdit"));
const Bank = lazy(() => import("../screens/Bank/Bank"));
const TransactionBank = lazy(() => import("../screens/Bank/TransactionBank"));
const Employees = lazy(() => import("../screens/Employees/Employees"));
const EmployeeBounes = lazy(() => import("../screens/Employees/EmployeeBounes"));
const EmployeeVacations = lazy(() => import("../screens/Employees/EmployeeVacations"));
const AddSalary = lazy(() => import("../screens/Employees/AddSalary"));
const Bounes = lazy(() => import("../screens/Employees/Bounes"));
const CustomerSettlement = lazy(() => import("../screens/Customers/CustomerSettlement"));
const ProductListDetails = lazy(() => import("../screens/Product/ProductListDetails"));
const SupplirerIndebtednesses = lazy(() => import("../screens/Suppliers/SuppliersIndebtednesses"));
const SupplierSettlement = lazy(() => import("../screens/Suppliers/SupplierSettlement"));



const RouterDocument = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Router>
                <Switch>
                    <Route path="/" component={Login} exact />
                    <LayOut>
                        <Switch>
                            <Route path="/DashBoard" component={DashBoard} />
                            <Route path="/Suppliers" component={Suppliers} />
                            <Route path="/PaymentSupplier" component={PaymentSupplier} />
                            <Route path="/Customers" component={Customers} />
                            <Route path="/PaymentCustomers" component={PaymentCustomers} />
                            <Route path="/Category" component={Category} />
                            <Route path="/Product" component={Product} />
                            <Route path="/Stores" component={Stores} />
                            <Route path="/TransactionProducts" component={TransactionProducts} />
                            <Route path="/PurchaseOrder" component={PurchaseOrder} />
                            <Route path="/PurchaseOrderAddEdit/:id/:isEdit" component={PurchaseOrderAddEdit} />
                            <Route path="/PurchaseOrderBySupplier" component={PurchaseOrderBySupplier} />
                            <Route path="/Invoices" component={Invoices} />
                            <Route path="/InvoicesAddEdit/:id" component={InvoicesAddEdit} />
                            <Route path="/InvoicesEdit/:id" component={InvoicesEdit} />
                            <Route path="/InvoicesByCustomer" component={InvoicesByCustomer} />
                            <Route path="/InvoicesToday" component={InvoicesToday} />
                            <Route path="/TransactionSupplier" component={TransactionSupplier} />
                            <Route path="/TransactionCustomers" component={TransactionCustomers} />
                            <Route path="/StoresDetails" component={StoresDetails} />
                            <Route path="/PurchaseOrderClient" component={PurchaseOrderClient} />
                            <Route path="/PurchaseOrderAddEditClient" component={PurchaseOrderAddEditClient} />
                            <Route path="/InstallmentCustomer" component={InstallmentCustomer} />
                            <Route path="/CustomerIndebtednesses" component={CustomerIndebtednesses} />
                            <Route path="/InstallmentSupplier" component={InstallmentSupplier} />
                            <Route path="/Users" component={Users} />
                            <Route path="/Expences" component={Expences} />
                            <Route path="/ReturnInvoices" component={ReturnInvoices} />
                            <Route path="/ReturnInvoicesAddEdit" component={ReturnInvoicesAddEdit} />
                            <Route path="/TotalCreditToday" component={TotalCreditToday} />
                            <Route path="/ExpencesTo" component={ExpencesTo} />
                            <Route path="/TransactionCustomersStore" component={TransactionCustomersStore} />
                            <Route path="/TransactionSupplierStore" component={TransactionSupplierStore} />
                            <Route path="/Bank" component={Bank} />
                            <Route path="/TransactionBank" component={TransactionBank} />
                            <Route path="/Employees" component={Employees} />
                            <Route path="/EmployeeBounes" component={EmployeeBounes} />
                            <Route path="/EmployeeVacations" component={EmployeeVacations} />
                            <Route path="/AddSalary" component={AddSalary} />
                            <Route path="/Bounes" component={Bounes} />
                            <Route path="/CustomerSettlement" component={CustomerSettlement} />
                            <Route path="/ProductListDetails" component={ProductListDetails} />
                            <Route path="/SupplirerIndebtednesses" component={SupplirerIndebtednesses} />
                            <Route path="/SupplierSettlement" component={SupplierSettlement} />
                        </Switch>
                    </LayOut>
                </Switch>
            </Router>
        </Suspense>
    );
};

export default RouterDocument;
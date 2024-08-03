import React, { Component, Fragment } from 'react';
import Config from '../../Config/Config';
import User from "../../Design/img/avatar.svg";
import { NavLink } from "react-router-dom";

class RightMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLang: window.localStorage.getItem("lang") || "ar",
            fullName: "Ahmed Salah",
            employeeId: 1,
            isOpen: false,
            currentLink: 0
        }
    }


    handleClick = (e) => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleLink = (currentLink) => {
        this.setState({
            currentLink
        });
    }

    render() {

        return (
            <Fragment>
                <div className="row container_section">
                    <div className={this.state.isOpen === true ? "user_details bring_left" : "user_details bring_left close_user_details"}>
                        <div className="user_area">
                            <img className="img-thumbnail img-rounded bring_right" src={User} />

                            <h1 className="h3"> </h1>

                            <p><a href="">بيانات المستخدم</a></p>

                            <p><a href="">تغيير كلمة المرور</a></p>

                            <p><a href="">المساعدة</a></p>
                        </div>
                        <div className="who_is_online">
                            <h3>العامليين حاليا علي النظام</h3>

                            <div className="employee_online">
                                <img src={User} className="img-circle bring_right" />

                                <p> </p>

                                <p> </p>
                            </div>
                            <div className="employee_online">
                                <img src={User} className="img-circle bring_right" />

                                <p> </p>

                                <p> </p>
                            </div>
                            <div className="employee_online">
                                <img src={User} className="img-circle bring_right" />

                                <p> </p>

                                <p> </p>
                            </div>
                            <div className="employee_online">
                                <img src={User} className="img-circle bring_right" />

                                <p> </p>

                                <p> </p>
                            </div>
                            <div className="employee_online">
                                <img src={User} className="img-circle bring_right" />

                                <p> </p>

                                <p> </p>
                            </div>
                        </div>
                    </div>
                    <div className="main_sidebar bring_right" style={{ width: '18%' }}>
                        <div className="main_sidebar_wrapper" style={{ cursor: "pointer" }}>
                            <ul>
                                <li><span className="glyphicon glyphicon-home"></span>
                                    <NavLink to="/DashBoard">
                                        الصفحة الرئيسية
                                    </NavLink>
                                </li>
                                <li onClick={() => this.handleLink(1)}><span className="glyphicon glyphicon-user"></span>
                                    <a>بيانات الموردين</a>
                                    <ul className={this.state.currentLink === 1 ? "drop_main_menu opened" : "drop_main_menu"} style={{ display: this.state.currentLink === 1 ? "block" : "none" }}>
                                        {Config.IsAllow(51) ?
                                            <li>
                                                <NavLink to="/Suppliers">
                                                    عرض الموردين
                                            </NavLink>
                                            </li> : null}
                                        {Config.IsAllow(52) ? <li>
                                            <NavLink to="/PaymentSupplier">
                                                سداد الموردين
                                            </NavLink>
                                        </li> : null} 
                                        {Config.IsAllow(54) ?
                                            <li>
                                                <NavLink to="/InstallmentSupplier">
                                                    تاريخ دفع الأقساط للمورد
                                            </NavLink>
                                            </li> : null}
                                        {Config.IsAllow(76) ?
                                            <li>
                                                <NavLink to="/TransactionSupplierStore">
                                                    عرض حركة ترصيد الموردين
                                            </NavLink>
                                            </li> : null}
                                        {Config.IsAllow(82) ?
                                            <li>
                                                <NavLink to="/Bank">
                                                    عرض البنوك
                                            </NavLink>
                                            </li> : null}
                                        {Config.IsAllow(83) ?
                                            <li>
                                                <NavLink to="/TransactionBank">
                                                    عرض حركة البنوك
                                            </NavLink>
                                            </li> : null}
                                        {Config.IsAllow(95) ? <li>
                                            <NavLink to="/SupplirerIndebtednesses">
                                                تسوية مديونية المورد بالزيادة
                                            </NavLink>
                                        </li> : null}
                                        {Config.IsAllow(97) ? <li>
                                            <NavLink to="/SupplierSettlement">
                                                تسوية مديونية المورد بالنقصان
                                            </NavLink>
                                        </li> : null}
                                    </ul>
                                </li>
                                <li onClick={() => this.handleLink(2)}><span className="glyphicon glyphicon-user"></span>
                                    <a>بيانات العملاء</a>
                                    <ul className={this.state.currentLink === 2 ? "drop_main_menu opened" : "drop_main_menu"} style={{ display: this.state.currentLink === 2 ? "block" : "none" }}>
                                        {Config.IsAllow(55) ? <li>
                                            <NavLink to="/Customers">
                                                عرض العملاء
                                            </NavLink>
                                        </li> : null}
                                        {Config.IsAllow(56) ? <li>
                                            <NavLink to="/PaymentCustomers">
                                                سداد العملاء
                                            </NavLink>
                                        </li> : null} 
                                        {Config.IsAllow(58) ? <li>
                                            <NavLink to="/InstallmentCustomer">
                                                تاريخ دفع الأقساط للعملاء
                                            </NavLink>
                                        </li> : null}
                                        {Config.IsAllow(75) ? <li>
                                            <NavLink to="/TransactionCustomersStore">
                                                عرض حركة ترصيد للعملاء
                                            </NavLink>
                                        </li> : null}
                                        {Config.IsAllow(81) ? <li>
                                            <NavLink to="/CustomerIndebtednesses">
                                                تسوية مديونية العملاء بالزيادة
                                            </NavLink>
                                        </li> : null}
                                        {Config.IsAllow(88) ? <li>
                                            <NavLink to="/CustomerSettlement">
                                                تسوية  العملاء بالنقصان
                                            </NavLink>
                                        </li> : null}
                                    </ul>
                                </li>
                                <li onClick={() => this.handleLink(3)}><span className="glyphicon glyphicon-shopping-cart"></span><a>المنتجات</a>
                                    <ul className={this.state.currentLink === 3 ? "drop_main_menu opened" : "drop_main_menu"} style={{ display: this.state.currentLink === 3 ? "block" : "none" }}>
                                        {Config.IsAllow(59) ? <li>
                                            <NavLink to="/Category">
                                                الأقسام
                                            </NavLink>
                                        </li> : null}
                                        {Config.IsAllow(60) ? <li>
                                            <NavLink to="/Product">
                                                المنتجات
                                            </NavLink>
                                        </li> : null}
                                        {Config.IsAllow(61) ? <li>
                                            <NavLink to="/Stores">
                                                المخزن
                                            </NavLink>
                                        </li> : null}
                                        {Config.IsAllow(62) ? <li>
                                            <NavLink to="/StoresDetails">
                                                تفاصيل المخزن
                                            </NavLink>
                                        </li> : null}
                                        {Config.IsAllow(63) ? <li>
                                            <NavLink to="/TransactionProducts">
                                                حركة الأصناف
                                            </NavLink>
                                        </li> : null}
                                        {Config.IsAllow(89) ? <li>
                                            <NavLink to="/ProductListDetails">
                                                أطوال الخشب
                                            </NavLink>
                                        </li> : null}
                                    </ul>
                                </li>
                                <li onClick={() => this.handleLink(4)}>
                                    <span className="glyphicon glyphicon-plus"></span><a>مشتريات</a>
                                    <ul className={this.state.currentLink === 4 ? "drop_main_menu opened" : "drop_main_menu"} style={{ display: this.state.currentLink === 4 ? "block" : "none" }}>
                                        {Config.IsAllow(64) ? <li>
                                            <NavLink to="/PurchaseOrder">
                                                فاتورة مشتريات
                                            </NavLink>
                                        </li> : null}
                                        {Config.IsAllow(65) ? <li>
                                            <NavLink to="/PurchaseOrderClient">
                                                فاتورة مشتريات للموظفين
                                            </NavLink>
                                        </li> : null}
                                        {Config.IsAllow(66) ? <li>
                                            <NavLink to="/PurchaseOrderBySupplier">
                                                فاتورة مشتريات لموردين
                                            </NavLink>
                                        </li> : null}
                                    </ul>
                                </li>
                                <li onClick={() => this.handleLink(5)}>
                                    <span className="glyphicon glyphicon-plus"></span><a>المبيعات</a>
                                    <ul className={this.state.currentLink === 5 ? "drop_main_menu opened" : "drop_main_menu"} style={{ display: this.state.currentLink === 5 ? "block" : "none" }}>
                                        {Config.IsAllow(67) ? <li>
                                            <NavLink to="/Invoices">
                                                فاتورة البيع
                                            </NavLink>
                                        </li> : null}
                                        {Config.IsAllow(68) ? <li>
                                            <NavLink to="/InvoicesByCustomer">
                                                فاتورة البيع للعملاء
                                            </NavLink>
                                        </li> : null}
                                        {Config.IsAllow(70) ? <li>
                                            <NavLink to="/InvoicesToday">
                                                إجمالى اليوميه
                                                </NavLink>
                                        </li> : null}
                                        {Config.IsAllow(71) ? <li>
                                            <NavLink to="/Expences">
                                                المصاريف اليومية
                                                </NavLink>
                                        </li> : null}
                                        {Config.IsAllow(72) ? <li>
                                            <NavLink to="/ReturnInvoices">
                                                مرتجع المبيعات
                                                </NavLink>
                                        </li> : null}
                                        {Config.IsAllow(73) ? <li>
                                            <NavLink to="/TotalCreditToday">
                                                إجمالى التحصيل اليومية
                                                </NavLink>
                                        </li> : null}
                                        {Config.IsAllow(74) ? <li>
                                            <NavLink to="/ExpencesTo">
                                                إجمالى التحصيل المدخلات اليومية
                                                </NavLink>
                                        </li> : null}
                                    </ul>
                                </li>
                                <li onClick={() => this.handleLink(6)}>
                                    <span className="glyphicon glyphicon-plus"></span><a>صلاحيات المستخدمين</a>
                                    <ul className={this.state.currentLink === 6 ? "drop_main_menu opened" : "drop_main_menu"} style={{ display: this.state.currentLink === 6 ? "block" : "none" }}>
                                        {Config.IsAllow(69) ? <li>
                                            <NavLink to="/Users">
                                                تسجيل مستخدم جديد
                                            </NavLink>
                                        </li> : null}
                                    </ul>
                                </li>
                                <li onClick={() => this.handleLink(7)}>
                                    <span className="glyphicon glyphicon-plus"></span><a>شئون الموظفين</a>
                                    <ul className={this.state.currentLink === 7 ? "drop_main_menu opened" : "drop_main_menu"} style={{ display: this.state.currentLink === 7 ? "block" : "none" }}>
                                        {Config.IsAllow(84) ? <li>
                                            <NavLink to="/Employees">
                                                تسجيل الموظفين
                                            </NavLink>
                                        </li> : null}
                                        {Config.IsAllow(85) ? <li>
                                            <NavLink to="/EmployeeBounes">
                                                تسجيل السلف الموظفين
                                            </NavLink>
                                        </li> : null}
                                        {Config.IsAllow(86) ? <li>
                                            <NavLink to="/EmployeeVacations">
                                                تسجيل أجازات الموظفين
                                            </NavLink>
                                        </li> : null}
                                        {Config.IsAllow(87) ? <li>
                                            <NavLink to="/AddSalary">
                                                عرض المرتبات الموظفين
                                            </NavLink>
                                        </li> : null}
                                        {Config.IsAllow(88) ? <li>
                                            <NavLink to="/Bounes">
                                                تسجيل حوافز الموظفين
                                            </NavLink>
                                        </li> : null}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Fragment>);
    }

}

export default RightMenu;
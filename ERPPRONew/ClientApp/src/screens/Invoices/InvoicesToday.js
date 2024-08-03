import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { bindActionCreators } from "redux";
import ReactTable from '../renderData/renderData';
import Config from "../../Config/Config";
import toastr from 'toastr';
import { Form, Modal, Button, Table, Spinner } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

class InvoicesToday extends Component {

    constructor(props) {

        super(props);
        if (!Config.IsAllow(70)) {
            toastr.error("عفوا ليس لديك صلاحية لهذة الصفحة");
            this.props.history.push("/DashBoard");
        }
        // this is columns of Department

        this.newCellGrouping = [
            {
                Header: 'مبيعات بالأجل ',
                headerClassName: 'my-favorites-column-header-group',
                columns: [
                    {
                        Header: <strong> جنية </strong>,
                        //id: "money1",
                        accessor: "amount"
                        //width: 90
                    }, {
                        Header: <strong> العميل </strong>,
                        accessor: 'customerName',
                        //width: 200
                    }]
            },
            {
                Header: 'مبيعات بالنقد ',
                headerClassName: 'my-favorites-column-header-group',
                columns: [

                    {
                        Header: <strong> جنية </strong>,
                        accessor: 'payed'
                    },
                    {
                        Header: <strong> رقم الفاتورة </strong>,
                        accessor: 'invoicesNumber',
                        //width: 200
                    }]
            },
            {
                Header: 'متحصلات ',
                headerClassName: 'my-favorites-column-header-group',
                columns: [{
                    Header: <strong> جنية </strong>,
                    accessor: 'payed2',
                    width: 90
                }, {
                    Header: <strong> العميل </strong>,
                    accessor: 'customerName2',
                    width: 200
                }, {
                    Header: <strong> الملاحظات </strong>,
                    accessor: 'description',
                    width: 200
                }]
            }];

        this.cells = [
            {
                Header: <strong> رقم الفاتورة </strong>,
                accessor: 'numberOfInvoiceBySystem',
                width: 90,
                filterable: true,
            }, {
                Header: <strong> العميل </strong>,
                accessor: 'customerName',
                width: 200,
                filterable: true,
            }, {
                Header: <strong> عدد أصناف الفاتورة </strong>,
                accessor: 'itemCount',
                width: 100,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> الأجمالى قبل الخصم </strong>,
                accessor: 'totalInvoiceWithoutDescount',
                width: 100,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong>   الخصم </strong>,
                accessor: 'descount',
                width: 100,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            },
            {
                Header: <strong> الأجمالى </strong>,
                accessor: 'totalInvoice',
                width: 100,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> المدفوع </strong>,
                accessor: 'payed',
                width: 100,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> المتبقى </strong>,
                accessor: 'amount',
                width: 100,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> الملاحظات </strong>,
                accessor: 'description',
                width: 200
            }
        ];

        this.cellsItems = [
            {
                Header: <strong> المنتح </strong>,
                accessor: 'productName',
                width: 150,
                filterable: true
            }, {
                Header: <strong> التخانة </strong>,
                accessor: 'size',
                width: 80,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> العرض </strong>,
                accessor: 'width',
                width: 80,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> الطول </strong>,
                accessor: 'hight',
                width: 80,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> سم </strong>,
                accessor: 'centi',
                width: 80,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> المتر </strong>,
                accessor: 'meter',
                width: 80,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> الكود </strong>,
                accessor: 'code',
                width: 80,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> الكمية </strong>,
                accessor: 'quantity',
                width: 70,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            },
            {
                Header: <strong> سعر البيع </strong>,
                accessor: 'priceSelling',
                width: 80,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            },
            {
                Header: <strong> الأجمالى </strong>,
                accessor: 'totalPrice',
                width: 100,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> النوع </strong>,
                accessor: 'typeText'
            }
        ];

        this.cellsExpenses = [
            {
                Header: <strong> الأسم </strong>,
                accessor: 'expencesName',
                width: 100
            }, {
                Header: <strong> التكلفة </strong>,
                accessor: 'cost',
                width: 80,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> التاريخ </strong>,
                accessor: 'date',
                width: 80,
            }, {
                Header: <strong> الملاحظات </strong>,
                accessor: 'description',
                width: 80,
            }
        ];


        this.cellsExpensesTo = [
            {
                Header: <strong> الأسم </strong>,
                accessor: 'expencesName',
                width: 100
            }, {
                Header: <strong> التكلفة </strong>,
                accessor: 'cost',
                width: 80,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> التاريخ </strong>,
                accessor: 'date',
                width: 80,
            }, {
                Header: <strong> الملاحظات </strong>,
                accessor: 'description',
                width: 80,
            }
        ];

        // initial value of state
        this.state = {
            show: false,
            listItems: [],
            listInvoices: [],
            isLoading: false,
            showConfirme: false,
            type: "",
            total: 0,
            totalPayed: 0,
            totalinstallment: 0,
            totalSize1: 0,
            totalQty1: 0,
            totalSize2: 0,
            totalQty2: 0,
            totalQty3: 0,
            objCustomer: {},
            today: "",
            startDate: new Date(),
            totalCredit: 0,
            showExpenses: false,
            showExpensesTo: false,
            ListExpenses: [],
            ListExpensesTo: [],
        }
        this.ExpenseDetails = this.ExpenseDetails.bind(this);
        this.ExpenseToDetails = this.ExpenseToDetails.bind(this);

    }

    // life cycle of react calling when any change of props
    componentWillReceiveProps(nextState, prevState) {
        this.setState({
            isLoading: false
        });
    };

    // life cycle of react calling when page is loading
    componentDidMount() {
        var now = new Date();
        var dayNow = ("0" + now.getDate()).slice(-2);
        var monthNow = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear() + "-" + (monthNow) + "-" + (dayNow);

        this.setState({ today: today });

        //this.props.actions.getAllInvoicesToday(today);
        this.props.actions.getAllNewInvoicesToday(today);
        this.props.actions.getTotalExpencesToday(today);
        this.props.actions.getAllReturnInvoicesToday(today);
        this.props.actions.getTotalFinancialAdvanceToday(today);
        this.props.actions.getTotalExpencesToToday(today);
        //this.props.actions.getTotalVacationToToday(today);
        this.props.actions.getTotalBounesToToday(today);
        this.props.actions.getTotalSalaryToday(today);
    }

    // this function when close modal
    handleClose() {
        this.setState({
            showConfirme: false,
            show: false,
            showExpenses: false,
            showExpensesTo: false,
        });
    }

    // this function when get value from grid to edit feild
    editDepartment = (state, rowInfo, column, instance) => {

        const { selection } = this.state;
        return {
            onClick: (e, handleOriginal) => {
                if (this.props.listInvoices.find(x => x.id === rowInfo.original.id).listInvoicesDetails.length > 0) {

                    let items = this.props.listInvoices.find(x => x.id === rowInfo.original.id).listInvoicesDetails;

                    let totalSize1 = items.length > 0 ? items.filter(x => x.code == "" && x.type === true) : 0;
                    if (totalSize1.length > 0) {
                        totalSize1 = totalSize1.map(x => {
                            let centi = x.centi.includes(".") ? x.centi.split('.')[1].toString() : x.centi
                            return parseFloat(x.meter.toString() + "." + centi)
                        }).reduce((a, c) => { return a + c })
                    } else {
                        totalSize1 = 0;
                    }

                    let totalSize2 = items.length > 0 ? items.filter(x => x.code != "" && x.type === true) : 0;
                    if (totalSize2.length > 0) {
                        totalSize2 = totalSize2.map(x => {
                            let centi = x.centi.includes(".") ? x.centi.split('.')[1].toString() : x.centi
                            return parseFloat(x.meter.toString() + "." + centi)
                        }).reduce((a, c) => { return a + c })
                    } else {
                        totalSize2 = 0;
                    }

                    let totalQty1 = items.length > 0 ? items.filter(x => x.code == "" && x.type === true) : 0;
                    if (totalQty1.length > 0) {
                        totalQty1 = totalQty1.map(x => x.quantity).reduce((a, c) => { return a + c });
                    } else {
                        totalQty1 = 0;
                    }

                    let totalQty2 = items.length > 0 ? items.filter(x => x.code != "" && x.type === true) : 0;
                    if (totalQty2.length > 0) {
                        totalQty2 = totalQty2.map(x => x.quantity).reduce((a, c) => { return a + c })
                    } else {
                        totalQty2 = 0;
                    }

                    let totalQty3 = items.length > 0 ? items.filter(x => x.type === false) : 0;
                    if (totalQty3.length > 0) {
                        totalQty3 = totalQty3.map(x => x.quantity).reduce((a, c) => { return a + c })
                    } else {
                        totalQty3 = 0;
                    }

                    items.forEach(i => {
                        i.centi = i.centi.includes(".") ? i.centi.split('.')[1].toString() : i.centi;
                        i.totalPrice = i.type === true ? (i.priceSelling * (i.meter + "." + i.centi)).toFixed(0) : (i.priceSelling * i.quantity).toFixed(0)
                    });

                    rowInfo.original.date = rowInfo.original.date.split("T")[0];

                    this.setState({
                        totalSize1,
                        totalSize2,
                        totalQty1,
                        totalQty2,
                        totalQty3,
                        show: true,
                        listItems: items,
                        objCustomer: rowInfo.original
                    });
                }
            }
        };
    };

    printcontent(el) {

        var restorepage = document.body.innerHTML;

        var printcontent = document.getElementById("DivPrint").innerHTML;
        document.body.innerHTML = printcontent;

        //var css = '@page { size: landscape; }',
        //    head = document.head || document.getElementsByTagName('head')[0],
        //    style = document.createElement('style');

        //style.type = 'text/css';
        //style.media = 'print';

        //if (style.styleSheet) {
        //    style.styleSheet.cssText = css;
        //} else {
        //    style.appendChild(document.createTextNode(css));
        //}

        //head.appendChild(style);

        window.print();
        document.body.innerHTML = restorepage;
        window.location.reload();
        //var mywindow = window.open('', 'PRINT', 'height=400,width=600');

        //mywindow.document.write('<html><head><title>' + document.title + '</title>');
        //mywindow.document.write('</head><body >');
        //mywindow.document.write('<h1>' + document.title + '</h1>');
        //mywindow.document.write(document.getElementById("DivPrint").innerHTML);
        //mywindow.document.write('</body></html>');

        //mywindow.document.close(); // necessary for IE >= 10
        //mywindow.focus(); // necessary for IE >= 10*/

        //mywindow.print();
        //mywindow.close();

        //return true;

        document.getElementById("DivPrint").style.display = "none";
    }

    printcontent1(el) {

        var restorepage = document.body.innerHTML;

        var printcontent = document.getElementById("DivPrint1").innerHTML;
        document.body.innerHTML = printcontent;

        var css = '.cell{color:red} ',
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';
        style.media = 'print';

        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        //head.appendChild(style);

        window.print();
        document.body.innerHTML = restorepage;
        window.location.reload();

        document.getElementById("DivPrint").style.display = "none";
    }

    handleSearch = () => {

        this.setState({
            isLoading: true
        });

        var date = new Date(this.state.startDate);

        var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];

        this.props.actions.getAllNewInvoicesToday(dateString);
        this.props.actions.getTotalExpencesToday(dateString);
        this.props.actions.getAllReturnInvoicesToday(dateString);
        this.props.actions.getTotalFinancialAdvanceToday(dateString);
        this.props.actions.getTotalExpencesToToday(dateString);
        this.props.actions.getTotalBounesToToday(dateString);
        this.props.actions.getTotalSalaryToday(dateString);

        this.setState({
            today: dateString
        });
    }

    ExpenseDetails() {
        var date = new Date(this.state.startDate);

        var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];

        axios.get(`api/ERP/SelectDetailsExpencesToday?date=${dateString}`).then(function (response) {
            this.setState({
                showExpenses: true,
                ListExpenses: response.data
            });
        }).catch(function (error) {
            console.log("getAllSupplierCustomer: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    }

    ExpenseToDetails() {
        var date = new Date(this.state.startDate);

        var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];

        axios.get(`api/ERP/SelectDetailsExpencesToToday?date=${dateString}`).then(function (response) {
            this.setState({
                showExpensesTo: true,
                ListExpensesTo: response.data
            });
        }).catch(function (error) {
            console.log("getAllSupplierCustomer: ", error);
            toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
        });
    }


    render() {

        const total = this.props.listInvoices.length > 0 ? this.props.listInvoices.map(o => o.payed).reduce((a, c) => { return a + c }).toFixed(0) : 0;

        const totalCredit = this.props.listInvoices.length > 0 ? this.props.listInvoices.map(x => x.payed2).reduce((a, c) => { return a + c }).toFixed(0) : 0;


        const totalWithInvoices = ((parseFloat(this.props.totalExpencesTo) + parseFloat(totalCredit) + parseFloat(total)) - (parseFloat(this.props.totalSalary) + parseFloat(this.props.totalReturnInvoices) + parseFloat(this.props.totalExpences) + parseFloat(this.props.totalFinancial) + parseFloat(this.props.totalBounes)));
        const totalWithoutInvoices = ((parseFloat(totalCredit) + parseFloat(this.props.totalExpencesTo)) - (parseFloat(this.props.totalSalary) + parseFloat(this.props.totalReturnInvoices) + parseFloat(this.props.totalExpences) + parseFloat(this.props.totalFinancial) + parseFloat(this.props.totalBounes)));


        return (
            <Fragment>
                <div className="main_content_container">
                    <div className="page_content">
                        <br />
                        <br />
                        <h1 className="heading_title">فواتير بيع للعملاء اليومية</h1>
                        {/* Button of Add new Document and delete Row in Grid */}
                        <br />
                        <div className="row">
                            <div className="col-md-6">
                                {this.state.isLoading === false ?
                                    <Button size="lg" style={{ width: '80px', height: '35px' }} onClick={this.handleSearch}>بحث</Button>
                                    :
                                    <Button disabled size="lg" >
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                      تحميل
                                    </Button>
                                }
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng">
                                    <Form.Label>اليوم</Form.Label>
                                    <DatePicker
                                        selected={this.state.startDate}
                                        dateFormat="yyyy/MM/dd"
                                        todayButton="اليوم"
                                        onChange={date => this.setState({
                                            startDate: date
                                        })} />
                                </Form.Group>
                            </div>
                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                        {/* List Of Data */}
                        <ReactTable
                            getTrProps={this.editDepartment}
                            data={this.props.listInvoices}
                            columns={this.newCellGrouping}
                            defaultPageSize={20}
                        />
                        <br />
                        <br />
                        <br />
                        <div>
                            <h1 className="heading_title ">اجمالى يومية {this.state.today} </h1>
                            <div className="row">
                                <div className="col-md-4">
                                    <Form.Group controlId="backendPageNameEng">
                                        <Form.Label>سلف الموظفين</Form.Label>
                                        <Form.Control type="number"
                                            style={{ height: "50px" }}
                                            placeholder="سلف الموظفين"
                                            autoComplete="off"
                                            readOnly
                                            value={this.props.totalFinancial.toFixed(0)}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group controlId="backendPageNameEng">
                                        <Form.Label>مبيعات الأجلة</Form.Label>
                                        <Form.Control type="number"
                                            style={{ height: "50px" }}
                                            placeholder="مبيعات الأجلة"
                                            autoComplete="off"
                                            readOnly
                                            value={this.props.listInvoices.length > 0 ? this.props.listInvoices.map(o => o.amount).reduce((a, c) => { return a + c }).toFixed(0) : 0}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group controlId="backendPageNameEng">
                                        <Form.Label>مبيعات نقدية</Form.Label>
                                        <Form.Control type="number"
                                            style={{ height: "50px" }}
                                            placeholder="مبيعات نقدية"
                                            autoComplete="off"
                                            readOnly
                                            value={this.props.listInvoices.length > 0 ? this.props.listInvoices.map(o => o.payed).reduce((a, c) => { return a + c }).toFixed(0) : 0}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <Form.Group controlId="backendPageNameEng">
                                        <Form.Label>اجمالى فواتير المرتجعات </Form.Label>
                                        <Form.Control type="number"
                                            style={{ height: "50px" }}
                                            placeholder="اجمالى فواتير المرتجعات"
                                            autoComplete="off"
                                            readOnly
                                            value={this.props.totalReturnInvoices.toFixed(0)}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group controlId="backendPageNameEng">
                                        <Form.Label>اجمالى متحصلات العملاء</Form.Label>
                                        <Form.Control type="number"
                                            style={{ height: "50px" }}
                                            autoComplete="off"
                                            readOnly
                                            placeholder="اجمالى متحصلات العملاء"
                                            value={totalCredit}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group controlId="backendPageNameEng">
                                        <Form.Label>المصروفات اليومية</Form.Label>
                                        <Form.Control type="number"
                                            style={{ height: "50px" }}
                                            autoComplete="off"
                                            readOnly
                                            placeholder="اجمالى المصاريف اليومية"
                                            value={this.props.totalExpences.toFixed(0)}
                                            onClick={this.ExpenseDetails}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <Form.Group controlId="backendPageNameEng">
                                        <Form.Label>إجمالى الرواتب</Form.Label>
                                        <Form.Control type="number"
                                            style={{ height: "50px" }}
                                            placeholder="إجمالى الرواتب"
                                            autoComplete="off"
                                            readOnly
                                            value={this.props.totalSalary}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group controlId="backendPageNameEng">
                                        <Form.Label>المدخلات اليومية</Form.Label>
                                        <Form.Control type="number"
                                            style={{ height: "50px" }}
                                            autoComplete="off"
                                            readOnly
                                            placeholder="المدخلات اليومية"
                                            value={this.props.totalExpencesTo.toFixed(0)}
                                            onClick={this.ExpenseToDetails}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group controlId="backendPageNameEng">
                                        <Form.Label>اجمالى الحوافز للموظفين</Form.Label>
                                        <Form.Control type="number"
                                            style={{ height: "50px" }}
                                            autoComplete="off"
                                            readOnly
                                            placeholder="اجمالى الحوافز للموظفين"
                                            value={this.props.totalBounes.toFixed(0)}
                                        />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">

                                </div>
                                <div className="col-md-4">

                                </div>
                                <div className="col-md-4">
                                    <Form.Group controlId="backendPageNameEng">
                                        <Form.Label>صافى اليومية</Form.Label>
                                        <Form.Control type="number"
                                            style={{ height: "50px" }}
                                            placeholder="صافى اليومية"
                                            autoComplete="off"
                                            readOnly
                                            value={this.props.listInvoices.length > 0 ? totalWithInvoices.toFixed(0) : totalWithoutInvoices.toFixed(0)}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                        </div>

                        <div className="row" id="DivPrint1" style={{ display: "none" }}>
                            <h1 className="heading_title ">اجمالى يومية {this.state.today} </h1>
                            <hr />
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th colSpan="2">مبيعات بالأجل</th>
                                        <th colSpan="2">مبيعات بالنقد</th>
                                        <th colSpan="3">متحصلات</th>
                                    </tr>
                                    <tr>
                                        <th>جنية</th>
                                        <th>العميل</th>
                                        <th>جنية</th>
                                        <th>رقم الفاتورة</th>
                                        <th>جنية</th>
                                        <th>العميل</th>
                                        <th>الملاحظات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.listInvoices.length > 0 ? this.props.listInvoices.map((item, i) => {
                                        return (<tr key={i}>
                                            <td>{item.amount}</td>
                                            <td>{item.customerName}</td>
                                            <td>{item.payed}</td>
                                            <td> {item.invoicesNumber}</td>
                                            <td> {item.payed2}</td>
                                            <td> {item.customerName2}</td>
                                            <td> {item.description}</td>
                                        </tr>)
                                    }) : null}
                                </tbody>
                            </Table>
                            <hr />
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>مبيعات نقدية</th>
                                        <th>مبيعات الأجلة</th>
                                        <th>المصروفات اليومية</th>
                                        <th>اجمالى متحصلات العملاء</th>
                                        <th>اجمالى فواتير المرتجعات</th>
                                        <th>اجمالى السلف الموظفين</th>
                                        <th>اجمالى الحوافز للموظفين</th>
                                        <th>المدخلات اليومية</th>
                                        <th>إجمالى الرواتب</th>
                                        <th>صافى اليومية</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>{this.props.listInvoices.length > 0 ? this.props.listInvoices.map(o => o.payed).reduce((a, c) => { return a + c }).toFixed(0) : 0}</td>
                                    <td>{this.props.listInvoices.length > 0 ? this.props.listInvoices.map(o => o.amount).reduce((a, c) => { return a + c }).toFixed(0) : 0}</td>
                                    <td> {this.props.totalExpences.toFixed(0)}</td>
                                    <td> {totalCredit}</td>
                                    <td> {this.props.totalReturnInvoices.toFixed(0)}</td>
                                    <td> {this.props.totalFinancial.toFixed(0)}</td>
                                    <td> {this.props.totalBounes.toFixed(0)}</td>
                                    <td> {this.props.totalExpencesTo.toFixed(0)}</td>
                                    <td> {this.props.totalSalary.toFixed(0)}</td>
                                    <td> {this.props.listInvoices.length > 0 ? totalWithInvoices.toFixed(0) : totalWithoutInvoices.toFixed(0)}</td>
                                </tbody>
                            </Table>
                        </div>

                        <Button size="lg" onClick={this.printcontent1.bind(this)}>طباعة</Button>

                    </div>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose.bind(this)} style={{ opacity: 1, marginTop: '10%', fontWeight: "bold", fontSize: "25px" }}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className="modal-header" style={{ marginTop: '55%' }}>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng">
                                    <Form.Label>إجمالى المتر المكعب</Form.Label>
                                    <Form.Control type="number"
                                        style={{ height: "50px" }}
                                        placeholder="إجمالى المتر المكعب"
                                        autoComplete="off"
                                        readOnly
                                        value={this.state.totalSize1.toFixed(4)}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng">
                                    <Form.Label>المتر المكعب إجمالى العدد</Form.Label>
                                    <Form.Control type="number"
                                        style={{ height: "50px" }}
                                        autoComplete="off"
                                        placeholder=" المتر المكعب إجمالى العدد"
                                        readOnly
                                        value={this.state.totalQty1}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng">
                                    <Form.Label>إجمالى المتر المكعب لرقم الرابطة</Form.Label>
                                    <Form.Control type="number"
                                        style={{ height: "50px" }}
                                        placeholder="إجمالى المتر المكعب لرقم الرابطة "
                                        autoComplete="off"
                                        readOnly
                                        value={this.state.totalSize2.toFixed(4)}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng">
                                    <Form.Label>إجمالى العدد لرقم الرابطة</Form.Label>
                                    <Form.Control type="number"
                                        style={{ height: "50px" }}
                                        autoComplete="off"
                                        placeholder="إجمالى العدد لرقم الرابطة"
                                        readOnly
                                        value={this.state.totalQty2}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Button size="lg" onClick={this.printcontent.bind(this)}>طباعة</Button>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng">
                                    <Form.Label>إجمالى العدد</Form.Label>
                                    <Form.Control type="number"
                                        autoComplete="off"
                                        style={{ height: "50px" }}
                                        placeholder="إجمالى العدد"
                                        readOnly
                                        value={this.state.totalQty3}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <ReactTable
                            data={this.state.listItems}
                            columns={this.cellsItems}
                            defaultPageSize={20}
                        />
                    </Modal.Body>
                </Modal>

                <div id="DivPrint" style={{ display: "none" }}>
                    <div style={{ border: "10px solid black", padding: "20px", borderRadius: "20px 120px" }}>
                        <h1 style={{ textAlign: "center" }}>شركة أولاد غانم لتجارة الأخشاب  </h1>
                        <h4 style={{ textAlign: "center" }}>بلقاس : حى السلام - أمام قاعة الأفراح  </h4>
                        <h4 style={{ textAlign: "center" }}>ت : 01277571918 - 01226265747 - 01094988815 - 01221134090  </h4>
                        <hr />
                        <h2 style={{ textAlign: "center" }}> فاتورة بيع </h2>
                        <div className="row">
                            <div className="col-md-6">
                                <span>إسم العميل :  {this.state.objCustomer.customerName}</span>
                            </div>
                            <div className="col-md-6">
                                <span>عدد أصناف الفاتورة : {this.state.listItems.length}</span>
                            </div>
                            <div className="col-md-6">
                                <span>تاريخ الفاتورة : {this.state.objCustomer.date}</span>
                            </div>
                            <div className="col-md-6">
                                <span>ملاحظات : {this.state.objCustomer.description}</span>
                            </div>
                        </div>

                        <h2 style={{ textAlign: "center" }}> تفاصيل الفاتورة  </h2>

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>إسم المنتج</th>
                                    <th>التخانة</th>
                                    <th>العرض</th>
                                    <th>الطول</th>
                                    <th>الكمية</th>
                                    <th>سم</th>
                                    <th>المتر</th>
                                    <th>الكود</th>
                                    <th>السعر</th>
                                    <th>الأجمالى</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.listItems.length > 0 ?
                                    this.state.listItems.map((item, i) => {
                                        return (<tr key={i}>
                                            <td>{item.productName}</td>
                                            <td>{item.size}</td>
                                            <td>{item.width}</td>
                                            <td> {item.hight}</td>
                                            <td> {item.quantity}</td>
                                            <td> {item.centi}</td>
                                            <td> {item.meter}</td>
                                            <td> {item.code}</td>
                                            <td> {item.priceSelling}</td>
                                            <td> {item.totalPrice}</td>
                                        </tr>)
                                    })
                                    : <tr></tr>}
                            </tbody>
                        </Table>

                        <h2 style={{ textAlign: "center" }}> إجمالى التكعيب والعدد </h2>

                        <div className="row">
                            <div className="col-md-6">
                                <span>المتر المكعب إجمالى العدد : {this.state.totalQty1}</span>
                            </div>
                            <div className="col-md-6">
                                <span>إجمالى المتر المكعب : {this.state.totalSize1.toFixed(4)}</span>
                            </div>

                            <div className="col-md-6">
                                <span>إجمالى العدد لرقم الرابطة : {this.state.totalQty2}</span>
                            </div>
                            <div className="col-md-6">
                                <span>إجمالى المتر المكعب لرقم الرابطة : {this.state.totalSize2.toFixed(4)}</span>
                            </div>

                            <div className="col-md-6"></div>
                            <div className="col-md-6">
                                <span>إجمالى العدد : {this.state.totalQty3}</span>
                            </div>
                        </div>

                        <h2 style={{ textAlign: "center" }}>  تفاصيل المدفوعات </h2>

                        <div className="row">
                            <div className="col-md-6">
                                <span>إجمالى الفاتورة قبل الخصم  : {this.state.objCustomer.totalInvoiceWithoutDescount}</span>
                            </div>
                            <div className="col-md-6">
                                <span>  الخصم  : {this.state.objCustomer.descount}</span>
                            </div>
                            <div className="col-md-6">
                            </div>
                            <div className="col-md-6">
                                <span>إجمالى الفاتورة : {this.state.objCustomer.totalInvoice}</span>
                            </div>
                            <div className="col-md-6">
                                <span>المدفوع : {this.state.objCustomer.payed}</span>
                            </div>
                            <div className="col-md-6">
                                <span>المتبقى : {this.state.objCustomer.amount}</span>
                            </div>
                        </div>
                        <hr />
                        <br /><br />
                        <h4 style={{ textAlign: "center" }}><u>تصميم وبرمجة م/ أحمد صلاح الدين 01009615946 </u></h4>
                    </div>
                </div>

                <Modal show={this.state.showExpenses} onHide={this.handleClose.bind(this)} style={{ opacity: 1, marginTop: '10%', fontWeight: "bold", fontSize: "25px" }}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className="modal-header" style={{ marginTop: '55%' }}>
                        <ReactTable
                            data={this.state.listItems}
                            columns={this.cellsExpenses}
                            defaultPageSize={20}
                        />
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showExpensesTo} onHide={this.handleClose.bind(this)} style={{ opacity: 1, marginTop: '10%', fontWeight: "bold", fontSize: "25px" }}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className="modal-header" style={{ marginTop: '55%' }}>
                        <ReactTable
                            data={this.state.ListExpensesTo}
                            columns={this.cellsExpensesTo}
                            defaultPageSize={20}
                        />
                    </Modal.Body>
                </Modal>
            </Fragment>
        );
    }
}


const mapStateToProps = (state, ownProps) => ({
    listInvoices: state.reduces.listInvoices,
    totalExpences: state.reduces.totalExpences,
    totalReturnInvoices: state.reduces.totalReturnInvoices,
    totalCredit: state.reduces.totalCredit,
    totalExpencesTo: state.reduces.totalExpencesTo,
    totalFinancial: state.reduces.totalFinancial,
    totalBounes: state.reduces.totalBounes,
    totalVacations: state.reduces.totalVacations,
    totalSalary: state.reduces.totalSalary
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesToday);

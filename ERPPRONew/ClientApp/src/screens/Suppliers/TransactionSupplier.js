import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { bindActionCreators } from "redux";
import { Form, Button, Table, Modal } from 'react-bootstrap';
import ReactTable from '../renderData/renderData';
import toastr from 'toastr';
import Select from "react-select";
import Config from "../../Config/Config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class TransactionSupplier extends Component {

    constructor(props) {

        super(props);
        if (!Config.IsAllow(53)) {
            toastr.error("عفوا ليس لديك صلاحية لهذة الصفحة");
            this.props.history.push("/DashBoard");
        }
        // this is columns of Department
        this.cells = [
            {
                Header: <strong>التاريخ</strong>,
                accessor: 'date',
                width: 170,
            },
            {
                Header: <strong>رقم الفاتورة</strong>,
                accessor: 'invoiceNumber',
                width: 100,
                filterable: true,
            },
            {
                Header: <strong>المسحوبات</strong>,
                accessor: 'total',
                // Cell: props => <span style={{ color: "red" }}>{props.value}</span>,
                width: 120,
            },
            {
                Header: <strong>مدفوع</strong>,
                accessor: 'credit',
                //Cell: props => <span style={{ color: "red" }}>{props.value}</span>,
                width: 120,
            },
            {
                Header: <strong>رصيد مدين</strong>,
                accessor: 'debit',
                //Cell: props => <span style={{ color: "red" }}>{props.value}</span>,
                width: 120,
            },
            {
                Header: <strong>رصيد دائن</strong>,
                accessor: 'amount',
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>,
                width: 120,
            },
            {
                Header: <strong>النوع</strong>,
                accessor: 'type',
                width: 250,
                filterable: true,
            }
        ];


        this.cellsItems = [
            {
                Header: <strong> المنتح </strong>,
                accessor: 'productName',
                width: 150
            }, {
                Header: <strong> التخانة </strong>,
                accessor: 'size',
                width: 70,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> العرض </strong>,
                accessor: 'width',
                width: 70,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> الطول </strong>,
                accessor: 'hight',
                width: 70,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> الكمية </strong>,
                accessor: 'quantity',
                width: 70,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> سم </strong>,
                accessor: 'centi',
                width: 80,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> المتر </strong>,
                accessor: 'meter',
                width: 70,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> الكود </strong>,
                accessor: 'code',
                width: 85,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            },
            //{
            //    Header: <strong> سعر الشراء </strong>,
            //    accessor: 'priceSupplier',
            //    Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            //},
            {
                Header: <strong> سعر الشراء </strong>,
                accessor: 'priceSupplier',
                width: 80,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            },{
                Header: <strong> الأجمالى </strong>,
                accessor: 'totalPrice',
                width: 100,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> النوع </strong>,
                accessor: 'typeText'
            }
        ];

        // initial value of state

        this.state = {
            show: false,
            isLoading: false,
            listTransaction: [],
            startDate: new Date(),
            finishDate: new Date(),
            supplierId: "",
            objCustomer: {},
            totalSize1: 0,
            totalQty1: 0,
            totalSize2: 0,
            totalQty2: 0,
            totalQty3: 0, 
            listItems: []
        }
    }

    // life cycle of react calling when any change of props
    componentWillReceiveProps(nextState, prevState) {
        if (nextState.listSupplierCustomerForDrop && nextState.listSupplierCustomerForDrop.length > 0) {

            this.setState({
                isLoading: false,
                show: false,
                selected: []
            });
        } else {
            this.setState({
                isLoading: false
            });
        }
    };

    // life cycle of react calling when page is loading
    componentDidMount() {
        this.props.actions.getSupplierCustomerForDrop(true);
        this.props.actions.getTransactionSupplierCustomer(true);
    }

    // this function when write any value  
    handleChange(value) {

        let listTransaction = this.props.listTransactionSupplierCustomer.filter(x => x.customerId === value);

        listTransaction.map(item => {
            item.date = item.date.split("T")[0]
        });

        this.setState({
            listTransaction: listTransaction,
            supplierId: value
        });
    }

    handleSearch = () => {
        if (this.state.supplierId != "") {
            var date = new Date(this.state.startDate);
            var date2 = new Date(this.state.finishDate);

            var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).getTime()//.toISOString()//.split("T")[0];
            var dateString2 = new Date(date2.getTime() - (date2.getTimezoneOffset() * 60000)).getTime()//.toISOString()//.split("T")[0];

            let result = this.props.listTransactionSupplierCustomer.filter(d => {
                var time = new Date(d.date).getTime();
                return (dateString <= time && time <= dateString2);
            });

            this.setState({
                listTransaction: result
            });
        } else {
            toastr.error("برجاء مراجعة البيانات");
        }
    }

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

        document.getElementById("DivPrint1").style.display = "none";
    }

    // this function when get value from grid to edit feild
    viewDetails = (state, rowInfo, column, instance) => {

        const { selection } = this.state;
        return {
            onClick: (e, handleOriginal) => {

                const invoicesNumber = this.state.listTransaction.find(x => x.id === rowInfo.original.id).invoiceNumber;

                if (invoicesNumber != "0") {
                     
                    let items = this.state.listTransaction.find(x => x.id === rowInfo.original.id).listofItem;

                    let totalSize1 = items.length > 0 ? items.filter(x => x.code == "" && x.type === true) : 0;
                    if (totalSize1.length > 0) {
                        totalSize1 = totalSize1.map(x => {
                            let centi = x.centi.includes(".") ? x.centi.split('.')[1].toString() : x.centi
                            return parseFloat(x.meter.toString() + "." + centi)
                        }).reduce((a, c) => { return a + c })
                    }
                    else {
                        totalSize1 = 0;
                    }

                    let totalSize2 = items.length > 0 ? items.filter(x => x.code != "" && x.type === true) : 0;
                    if (totalSize2.length > 0) {
                        totalSize2 = totalSize2.map(x => {
                            let centi = x.centi.includes(".") ? x.centi.split('.')[1].toString() : x.centi
                            return parseFloat(x.meter.toString() + "." + centi)
                        }).reduce((a, c) => { return a + c })
                    }
                    else {
                        totalSize2 = 0;
                    }

                    let totalQty1 = items.length > 0 ? items.filter(x => x.code == "" && x.type === true) : 0;
                    if (totalQty1.length > 0) {
                        totalQty1 = totalQty1.map(x => x.quantity).reduce((a, c) => { return a + c });
                    }
                    else {
                        totalQty1 = 0;
                    }

                    let totalQty2 = items.length > 0 ? items.filter(x => x.code != "" && x.type === true) : 0;
                    if (totalQty2.length > 0) {
                        totalQty2 = totalQty2.map(x => x.quantity).reduce((a, c) => { return a + c })
                    }
                    else {
                        totalQty2 = 0;
                    }

                    let totalQty3 = items.length > 0 ? items.filter(x => x.type === false) : 0;
                    if (totalQty3.length > 0) {
                        totalQty3 = totalQty3.map(x => x.quantity).reduce((a, c) => { return a + c })
                    }
                    else {
                        totalQty3 = 0;
                    }

                    items.forEach(i => {
                        i.centi = i.centi.includes(".") ? i.centi.split('.')[1].toString() : i.centi;

                        i.totalPrice = i.type === true ? (i.priceSupplier * (i.meter + "." + parseFloat(i.centi))).toFixed(0) : (i.priceSupplier * i.quantity).toFixed(0)
                    });

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

    // this function when close modal
    handleClose() {
        this.setState({
            show: false
        });
    }

    render() {
        return (
            <Fragment>
                <div className="main_content_container">
                    <div className="page_content">
                        <br />
                        <br />
                        <h1 className="heading_title">عرض حركة الموردين</h1>
                        <div className="page-title-actions">
                            <Form.Group controlId="supplier">
                                <Form.Label>الموردين</Form.Label>
                                <Select
                                    name="supplier"
                                    id="supplier"
                                    onChange={(opt) => { this.handleChange(opt.value) }}
                                    options={this.props.listSupplierCustomerForDrop}
                                />
                            </Form.Group>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng">
                                    <Form.Label>الى</Form.Label>
                                    <DatePicker
                                        selected={this.state.finishDate}
                                        dateFormat="yyyy/MM/dd"
                                        todayButton="اليوم"
                                        onChange={date => this.setState({
                                            finishDate: date
                                        })} />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng">
                                    <Form.Label>من</Form.Label>
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
                        <br />  <br />  <br />  <br />  <br />  <br />  <br />
                        <div className="page-title-actions">
                            <Button size="lg" style={{ width: '80px', height: '35px' }} onClick={this.handleSearch}>بحث</Button>
                            <Button size="lg" style={{ width: '80px', height: '35px' }} onClick={this.printcontent.bind(this)}>طباعة</Button>
                        </div>
                        <br />
                        {/* List Of Data */}
                        <ReactTable
                            data={this.state.listTransaction}
                            columns={this.cells}
                            getTrProps={this.viewDetails}
                            defaultPageSize={1000}
                            />
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
                                        placeholder="إجمالى المتر المكعب"
                                        autoComplete="off"
                                        readOnly
                                        style={{ height: "50px" }}
                                        value={this.state.totalSize1.toFixed(4)}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng">
                                    <Form.Label>المتر المكعب إجمالى العدد</Form.Label>
                                    <Form.Control type="number"
                                        autoComplete="off"
                                        placeholder=" المتر المكعب إجمالى العدد"
                                        readOnly
                                        style={{ height: "50px" }}
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
                                        placeholder="إجمالى المتر المكعب لرقم الرابطة "
                                        autoComplete="off"
                                        readOnly
                                        style={{ height: "50px" }}
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
                                <Button size="lg" onClick={this.printcontent1.bind(this)}>طباعة</Button>
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
                            defaultPageSize={20}
                            columns={this.cellsItems}
                        />
                    </Modal.Body>
                </Modal>


                <div id="DivPrint1" style={{ display: "none" }}>
                    <div style={{ border: "10px solid black", padding: "20px", borderRadius: "20px 120px" }}>
                        <h1 style={{ textAlign: "center" }}>شركة أولاد غانم لتجارة الأخشاب  </h1>
                        <h4 style={{ textAlign: "center" }}>بلقاس : حى السلام - أمام قاعة الأفراح  </h4>
                        <h4 style={{ textAlign: "center" }}>ت : 01277571918 - 01226265747 - 01094988815 - 01221134090  </h4>
                        <hr />
                        <h2 style={{ textAlign: "center" }}> فاتورة مشتريات </h2>

                        <div className="row">
                            <div className="col-md-6">
                                <span>إسم المورد :  {this.state.objCustomer.customerName}</span>
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
                                            <td> {item.priceSupplier}</td>
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
                            <div className="col-md-6"></div>
                            <div className="col-md-6">
                                <span>إجمالى الفاتورة : {this.state.objCustomer.total}</span>
                            </div>
                            <div className="col-md-6">
                                <span>المدفوع : {this.state.objCustomer.credit}</span>
                            </div>
                            <div className="col-md-6">
                                <span>المتبقى : {this.state.objCustomer.debit}</span>
                            </div>
                        </div>
                        <hr />
                        <br /><br />
                        <h4 style={{ textAlign: "center" }}><u>تصميم وبرمجة م/ أحمد صلاح الدين 01009615946 </u></h4>
                    </div>
                </div>

                <div id="DivPrint" style={{ display: "none" }}>
                    <h1 className="heading_title">عرض حركة الموردين</h1>
                    <br />
                    <br />
                    <h1>إسم المورد : {this.state.listTransaction.length > 0 ? this.state.listTransaction[0].customerName : ""}</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>التاريخ</th>
                                <th>رقم الفاتورة</th>
                                <th>المسحوبات</th>
                                <th>مدفوع</th>
                                <th>رصيد مدين</th>
                                <th>رصيد دائن</th>
                                <th>النوع</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.listTransaction.length > 0 ?
                                    this.state.listTransaction.map((item, i) => {
                                        return (<tr key={i}>
                                            <td>{item.date}</td>
                                            <td>{item.invoiceNumber}</td>
                                            <td> {item.total}</td>
                                            <td> {item.credit}</td>
                                            <td> {item.debit}</td>
                                            <td> {item.amount}</td>
                                            <td> {item.type}</td>
                                        </tr>)
                                    })
                                    : <tr></tr>
                            }
                        </tbody>
                    </Table>
                    <hr />
                    <br /><br />
                    <h4 style={{ textAlign: "center" }}><u>تصميم وبرمجة م/ أحمد صلاح الدين 01009615946 </u></h4>
                </div>
            </Fragment>
        );
    }
}


const mapStateToProps = (state, ownProps) => ({
    listSupplierCustomerForDrop: state.reduces.listSupplierCustomerForDrop,
    listTransactionSupplierCustomer: state.reduces.listTransactionSupplierCustomer
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionSupplier);


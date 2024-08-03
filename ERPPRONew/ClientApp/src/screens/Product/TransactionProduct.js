import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { bindActionCreators } from "redux";
import { Form, Button, Table } from 'react-bootstrap';
import ReactTable from '../renderData/renderData';
import toastr from 'toastr';
import Select from "react-select";
import Config from "../../Config/Config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class TransactionProduct extends Component {

    constructor(props) {

        super(props);
        if (!Config.IsAllow(63)) {
            toastr.error("عفوا ليس لديك صلاحية لهذة الصفحة");
            this.props.history.push("/DashBoard");
        }
        // this is columns of Department
        this.cells = [
            //{
            //    Header: <strong> القسم </strong>,
            //    accessor: 'categoryName',
            //    width: 140,
            //    filterable: true,
            //},
            //{
            //    Header: <strong> إسم المنتج </strong>,
            //    accessor: 'productName',
            //    width: 150,
            //    filterable: true,
            //},
            {
                Header: <strong> رقم الفاتورة </strong>,
                accessor: 'invoicesNo',
                width: 70,
                filterable: true,
            },
            {
                Header: <strong> التاريخ </strong>,
                accessor: 'date',
                width: 120, 
            },
            //{
            //    Header: <strong> سعر الشراء </strong>,
            //    accessor: 'priceSupplier',
            //    width: 100, 
            //    Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            //},
            //{
            //    Header: <strong> سعر البيع </strong>,
            //    accessor: 'priceSelling',
            //    width: 100, 
            //    Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            //},
            {
                Header: <strong> التخانة</strong>,
                accessor: 'size',
                width: 70,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> العرض</strong>,
                accessor: 'width',
                width: 70,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            },
            {
                Header: <strong> الطول </strong>,
                accessor: 'height',
                width: 70,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> سم</strong>,
                accessor: 'centii',
                width: 70,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> المتر</strong>,
                accessor: 'meter',
                width: 70,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> الكود</strong>,
                accessor: 'code',
                width: 100,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> الكمية</strong>,
                accessor: 'qty',
                width: 70,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> الحالة</strong>,
                accessor: 'type',
                width: 250,
                filterable: true,
            } 
        ];

        // initial value of state

        this.state = {
            show: false,
            isLoading: false,
            listTransaction: [],
            startDate: new Date(),
            finishDate: new Date(),
            productId: ""
        }
    }

    // life cycle of react calling when page is loading
    componentDidMount() {
        this.props.actions.getProductForDrop();
        this.props.actions.getProductTransaction();
    }

    // this function when write any value  

    // this function when write any value  
    handleChange(value) {

        let listTransaction = this.props.listProductsTransaction.filter(x => x.productId === value);

        listTransaction.map(item => {
            item.date = item.date.split("T")[0]
        });

        if (listTransaction.length > 0) {
            this.setState({
                listTransaction: listTransaction,
                productId:value
            });
        } else {
            toastr.warning("عفوا لاتوجد حركات على هذا الصنف !!");
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

        document.getElementById("DivPrint").style.display = "none";
    }


    handleSearch = () => {
        if (this.state.productId != "") {
            var date = new Date(this.state.startDate);
            var date2 = new Date(this.state.finishDate);

            var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).getTime()//.toISOString()//.split("T")[0];
            var dateString2 = new Date(date2.getTime() - (date2.getTimezoneOffset() * 60000)).getTime()//.toISOString()//.split("T")[0];

            let result = this.props.listProductsTransaction.filter(d => {
                var time = new Date(d.date).getTime();
                return (dateString <= time && time <= dateString2);
            });

            if (result.length > 0) {
                result = result.map(c => {
                    c.date = c.date.split("T")[0];
                });
            }


            this.setState({
                listTransaction: result
            });
        } else {
            toastr.error("برجاء مراجعة البيانات");
        }
    }


    render() {

        return (
            <Fragment>
                <div className="main_content_container">
                    <div className="page_content">
                        <br />
                        <br />
                        <h1 className="heading_title">حركة الأصناف</h1>
                        <br/>
                       
                        <br />
                        {/* Button of Add new Document and delete Row in Grid */}
                        <div className="page-title-actions">
                            <Form.Group controlId="jobs">
                                <Form.Label>المنتج</Form.Label>
                                <Select
                                    name="employeePagingSetting"
                                    id="employeePagingSetting"
                                    onChange={(opt) => { this.handleChange(opt.value) }}
                                    options={this.props.listProductsForDrop4}
                                />
                            </Form.Group>
                        </div>
                        <br />
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
                            defaultPageSize={this.state.pageSize}
                            defaultPageSize={200}
                        />
                    </div>
                </div>
                <div id="DivPrint" style={{ display: "none" }}>
                    <h1 className="heading_title">حركة الأصناف</h1>
                    <br /> <br />
                    <h1>إسم المنتج : {this.state.listTransaction.length > 0 ? this.state.listTransaction[0].productName : ""}</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr> 
                                <th>رقم الفاتورة</th>
                                <th>التاريخ</th>
                                <th>التخانة</th> 
                                <th>العرض</th> 
                                <th>الطول</th> 
                                <th>الكمية</th>  
                                <th>سم</th> 
                                <th>المتر</th> 
                                <th>الكود</th>  
                                <th>الحالة</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {
                                 this.state.listTransaction.length > 0 ?
                                     this.state.listTransaction.map((item, i) => {
                                        return (<tr key={i}> 
                                            <td>{item.invoicesNo}</td>
                                            <td> {item.date}</td>
                                            <td> {item.size}</td> 
                                            <td> {item.width}</td>
                                            <td> {item.height}</td>
                                            <td> {item.qty}</td>
                                            <td> {item.centi}</td>
                                            <td> {item.meter}</td>
                                            <td> {item.code}</td> 
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
    listProductsForDrop4: state.reduces.listProductsForDrop4,
    listProductsTransaction: state.reduces.listProductsTransaction
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionProduct);


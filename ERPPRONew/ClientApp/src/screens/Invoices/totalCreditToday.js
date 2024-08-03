import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { bindActionCreators } from "redux";
import ReactTable from '../renderData/renderData';
import Config from "../../Config/Config";
import toastr from 'toastr';
import { Button, Table, Form, Spinner } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class TotalCreditToday extends Component {

    constructor(props) {

        super(props);
        if (!Config.IsAllow(73)) {
            toastr.error("عفوا ليس لديك صلاحية لهذة الصفحة");
            this.props.history.push("/DashBoard");
        }
        // this is columns of Department
        this.cells = [
            {
                Header: <strong> العميل </strong>,
                accessor: 'customerName',
                width: 200
            }, {
                Header: <strong> المدفوع </strong>,
                accessor: 'debt',
                width: 100,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
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
            startDate: new Date()
        }
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

        this.props.actions.getAllCreditToday(false, today);
    }

    // this function when close modal
    handleClose() {
        this.setState({
            showConfirme: false,
            show: false
        });
    }

    printcontent(el) {

        var restorepage = document.body.innerHTML;

        var printcontent = document.getElementById("DivPrint").innerHTML;
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

        this.props.actions.getAllCreditToday(false, dateString);


        this.setState({
            today: dateString
        });

    }

    render() {

        return (
            <Fragment>
                <div className="main_content_container">
                    <div className="page_content">
                        <br />
                        <br />
                        <h1 className="heading_title">التحصيلات اليومية</h1>
                        {/* Button of Add new Document and delete Row in Grid */}
                        <br />

                        <div className="row">
                            <div className="col-md-6">
                                {this.state.isLoading === false ?

                                    <div className="page-title-actions">
                                        <Button size="lg" style={{ width: '80px', height: '35px' }} onClick={this.handleSearch}>بحث</Button>
                                        <Button size="lg" style={{ width: '80px', height: '35px' }} onClick={this.printcontent.bind(this)}>طباعة</Button>
                                    </div>
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

                        <div className="row"> 
                            <div className="col-md-4">
                            </div>
                            <div className="col-md-4">
                            </div>
                            <div className="col-md-4">
                                <Form.Group controlId="backendPageNameEng">
                                    <Form.Label>إجمالى التحصيلات</Form.Label>
                                    <Form.Control type="number"
                                        style={{ height: "50px" }}
                                        placeholder="إجمالى التحصيلات"
                                        autoComplete="off"
                                        readOnly
                                        value={this.props.listAllCreditToday.length > 0 ? this.props.listAllCreditToday.map(o => o.debt).reduce((a, c) => { return a + c }).toFixed(0) : 0}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <br />
                        <br />
                        {/* List Of Data */}
                        <ReactTable
                            //getTrProps={this.editDepartment}
                            data={this.props.listAllCreditToday}
                            columns={this.cells}
                            defaultPageSize={20}
                        />
                        <br />
                    </div>
                </div>

                <div id="DivPrint" style={{ display: "none" }}>
                    <h1 className="heading_title">عرض كل التحصيلات</h1>
                    <br />
                    <br />
                    <div>
                        <span>إجمالى التحصيلات :  {this.props.listAllCreditToday.length > 0 ? this.props.listAllCreditToday.map(o => o.debt).reduce((a, c) => { return a + c }).toFixed(0) : 0}</span>
                    </div>
                    <br />
                    <br />
                    <br />

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>العميل</th>
                                <th> المدفوع</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.listAllCreditToday.length > 0 ?
                                    this.props.listAllCreditToday.map((item, i) => {
                                        return (<tr key={i}>
                                            <td>{item.customerName}</td>
                                            <td>{item.debt}</td>
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
    listAllCreditToday: state.reduces.listAllCreditToday
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TotalCreditToday);

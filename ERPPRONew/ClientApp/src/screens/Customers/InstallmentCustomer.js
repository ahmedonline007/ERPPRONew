import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { bindActionCreators } from "redux";
import { Form, Spinner, Button, Table, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ReactTable from '../renderData/renderData';
import toastr from 'toastr';
import Edit from '../../Design/img/edit.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Config from "../../Config/Config";


class InstallmentCustomer extends Component {

    constructor(props) {

        super(props);

        if (!Config.IsAllow(58)) {
            toastr.error("عفوا ليس لديك صلاحية لهذة الصفحة");
            this.props.history.push("/DashBoard");
        }
        // this is columns of Department
        this.cells = [
            {
                Header: <strong> إسم العميل </strong>,
                accessor: 'customerName',
                filterable: true,
                width: 250,
            },
            {
                Header: <strong>العنوان</strong>,
                accessor: 'address',
                filterable: true,
                width: 200,
            },
            {
                Header: <strong>رقم الهاتف</strong>,
                accessor: 'phone',
                filterable: true,
                width: 170,
            }, {
                Header: <strong>التاريخ</strong>,
                accessor: 'date',
                width: 120,
            }, {
                Header: <strong>المبلغ</strong>,
                accessor: 'money',
                width: 130,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            },
            {
                Header: "",
                id: "checkbox",
                accessor: "",
                Cell: (rowInfo) => {
                    return (
                        <div>
                            <OverlayTrigger
                                key={`topEdit-${rowInfo.original.id}`}
                                placement={'top'}
                                overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        <strong>تعديل</strong>.
                             </Tooltip>
                                }>
                                <img src={Edit} className="Edit"
                                    onClick={() => this.editDepartment(rowInfo)}
                                    style={{ width: "25px", cursor: 'pointer' }} />
                            </OverlayTrigger>

                        </div>
                    );
                },
                sortable: false,
                width: 80
            }
        ];

        // initial value of state

        this.state = {
            objCusromer: {},
            show: false,
            textModal: "إضافة",
            id: 0,
            selected: [],
            selectedRow: 0,
            isLoading: false,
            showConfirme: false,
            type: "",
            startDate: new Date(),
            lastDate: new Date(),
            firstDate: new Date(),
            listInstallment: []
        }
    }

    // life cycle of react calling when any change of props
    componentWillReceiveProps(nextState, prevState) {
        if (nextState.listInstallment && nextState.listInstallment.length > 0) {

            this.setState({
                isLoading: false,
                show: false,
                showInstallment: false,
                selected: [],
                listInstallment: nextState.listInstallment
            });
        } else {
            this.setState({
                isLoading: false,
                showInstallment: false
            });
        }
    };

    // life cycle of react calling when page is loading
    componentDidMount() {
        this.props.actions.getAllCustomerInstallment(false);
    }

    // this function when close modal
    handleClose() {
        this.setState({
            showConfirme: false,
            show: false,
            showInstallment: false
        });
    }

    // this function when leave from page
    componentWillUnmont() {
        this.setState({
            show: false,
            textModal: "إضافة",
            objSupplier: {
                id: 0,
                name: '',
                address: '',
                phone: ''
            },
            isLoading: false,
            showConfirme: false
        });
    }

    // this function when get value from grid to edit feild
    editDepartment = (state, rowInfo, column, instance) => {

        const { selection } = this.state;
        return {
            onClick: (e, handleOriginal) => {
                this.setState({
                    objCusromer: rowInfo.original,
                    showInstallment: !this.state.showInstallment,
                    id: rowInfo.original.id,
                    startDate: new Date(rowInfo.original.date + "T00:00:00")
                });
            }
        };
    };

    addInstallment = () => {

        this.setState({
            isLoading: true
        });

        var date = new Date(this.state.startDate);
        var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
            .toISOString()
            .split("T")[0];

        var newObj = {
            date: dateString,
            id: this.state.id
        }

        this.props.actions.updateInstallment(newObj, this.state.objCusromer);
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

        var date = new Date(this.state.firstDate);
        var date2 = new Date(this.state.lastDate);

        var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).getTime()//.toISOString()//.split("T")[0];
        var dateString2 = new Date(date2.getTime() - (date2.getTimezoneOffset() * 60000)).getTime()//.toISOString()//.split("T")[0];

        let result = this.props.listInstallment.filter(d => {
            var time = new Date(d.date).getTime();
            return (dateString <= time && time <= dateString2);
        });

        this.setState({
            listInstallment: result
        });
    }

    handleResetSearch = () => {
        this.setState({
            listInstallment: this.props.listInstallment
        });
    }

    render() {

        return (
            <Fragment>
                <div className="main_content_container">
                    <div className="page_content">
                        <br />
                        <br />
                        <h1 className="heading_title">تاريخ دفع الأقساط العملاء  </h1>

                        <br />
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng">
                                    <Form.Label>الى</Form.Label>
                                    <DatePicker
                                        selected={this.state.lastDate}
                                        dateFormat="yyyy/MM/dd"
                                        todayButton="اليوم"
                                        onChange={date => this.setState({
                                            lastDate: date
                                        })} />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng">
                                    <Form.Label>من</Form.Label>
                                    <DatePicker
                                        selected={this.state.firstDate}
                                        dateFormat="yyyy/MM/dd"
                                        todayButton="اليوم"
                                        onChange={date => this.setState({
                                            firstDate: date
                                        })} />
                                </Form.Group>
                            </div>
                        </div>
                        <br />
                        <br />  <br />
                        <div className="page-title-actions">
                            <Button size="lg" style={{ width: '80px', height: '35px' }} onClick={this.printcontent.bind(this)}>طباعة</Button>
                            <Button size="lg" style={{ width: '80px', height: '35px' }} onClick={this.handleSearch}>بحث</Button>
                            <Button size="lg" style={{ width: '120px', height: '35px' }} onClick={this.handleResetSearch}>عرض الكل</Button>
                        </div>
                        <br />
                        {/* List Of Data */}
                        <ReactTable
                            data={this.state.listInstallment}
                            columns={this.cells}
                            getTrProps={this.editDepartment}
                            defaultPageSize={this.state.pageSize}
                            defaultPageSize={20}
                        />
                    </div>
                </div>

                <Modal show={this.state.showInstallment} onHide={this.handleClose.bind(this)} style={{ opacity: 1, marginTop: '10%' }}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className="modal-header" >

                        <Form>
                            <Form.Group controlId="date" style={{ marginRight: '50%' }}>
                                <Form.Label>التاريخ</Form.Label>
                                <DatePicker selected={this.state.startDate}
                                    dateFormat="yyyy/MM/dd"
                                    todayButton="اليوم"
                                    onChange={date => this.setState({
                                        startDate: date
                                    })} />
                            </Form.Group>
                            <div style={{ direction: "ltr" }}>
                                <Button size="lg"  onClick={this.handleClose.bind(this)} style={{ width: '80px', height: '35px', marginRight: '10px' }}>
                                    غلق
                                                </Button>
                                {this.state.isLoading ? <Button size="lg"  disabled style={{ width: '100px', height: '35px' }}>
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                                   تحميل
                                                </Button> :
                                    <Button size="lg"  variant="success" type="button" onClick={this.addInstallment} style={{ width: '80px', height: '35px' }}>

                                        حفظ
                                            </Button>
                                }
                            </div>
                        </Form>

                    </Modal.Body>
                </Modal>

                <div id="DivPrint" style={{ display: "none" }}>
                    <h1 className="heading_title">تاريخ دفع الأقساط العملاء</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>إسم العميل</th>
                                <th>العنوان</th>
                                <th>رقم الهاتف</th>
                                <th>التاريخ</th>
                                <th>المبلغ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.listInstallment.length > 0 ?
                                    this.props.listInstallment.map((item, i) => {
                                        return (<tr key={i}>
                                            <td>{item.customerName}</td>
                                            <td>{item.address}</td>
                                            <td>{item.phone}</td>
                                            <td> {item.date}</td>
                                            <td> {item.money}</td>
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
    listInstallment: state.reduces.listInstallment
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(InstallmentCustomer); 
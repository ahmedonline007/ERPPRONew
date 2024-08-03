﻿import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { bindActionCreators } from "redux";
import Select from "react-select";
import { Form, Spinner, Button, Modal, OverlayTrigger, Tooltip, Table } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from "yup";
import ReactTable from '../renderData/renderData';
import toastr from 'toastr';
import Config from "../../Config/Config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Delete from '../../Design/img/delete.png';
import Edit from '../../Design/img/edit.png';
import Confirme from '../Confirme/Confirme';


// validation of field
const schema = Yup.object({
    debt: Yup.number().required("برجاء قيمة السداد").min(0, "عفوا برجاء دفع قيمة السداد أكبر من صفر")
});

class CustomerSettlement extends Component {

    constructor(props) {

        super(props);

        if (!Config.IsAllow(81)) {
            toastr.error("عفوا ليس لديك صلاحية لهذة الصفحة");
            this.props.history.push("/DashBoard");
        }

        this.cells = [
            {
                Header: <strong> المبلغ </strong>,
                accessor: 'debt',
                width: 250,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            },
            {
                Header: <strong>التاريخ</strong>,
                accessor: 'debtDate',
                width: 250
            }, {
                Header: <strong>ملاحظات</strong>,
                accessor: 'describtion',
                width: 250
            },
            {
                Header: "",
                id: "checkbox",
                accessor: "",
                width: 100,
                Cell: (rowInfo) => {
                    return (
                        <div>
                            {Config.IsAllow(79) ? <OverlayTrigger
                                key={`topDelete-${rowInfo.original.id}`}
                                placement={'top'}
                                overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        <strong>حذف</strong>.
                                   </Tooltip>
                                }>
                                <img src={Delete} className="Delete"
                                    onClick={() => this.viewConfimeRowDelete(rowInfo.original.id)}
                                    style={{ width: "25px", cursor: 'pointer', marginRight: '15px' }} />
                            </OverlayTrigger> : null}
                            {Config.IsAllow(80) ? <OverlayTrigger
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
                            </OverlayTrigger> : null}
                        </div>
                    );
                },
                sortable: false
            }
        ];

        // initial value of state
        this.state = {
            show: false,
            objSupplier: {
                customerId: 0,
                debt: 0,
                describtion: ''
            },
            listSettlement: [],
            isLoading: false,
            customerId: '',
            startDate: new Date(),
            finishDate: new Date(),
            showConfirme: false,
            selected: ''
        }
    }

    // life cycle of react calling when any change of props
    componentWillReceiveProps(nextState, prevState) {
        if (nextState.listSettlement && nextState.listSettlement.length > 0) {
            if (this.state.customerId != "") {

                let ListPayed = nextState.listSettlement.filter(x => x.customerId == this.state.customerId.value);

                this.setState({
                    isLoading: false,
                    show: false,
                    listSettlement: ListPayed
                });
            } else {
                this.setState({
                    isLoading: false,
                    show: false,
                    customerId: '',
                    listSettlement: []
                });
            }
        } else {
            this.setState({
                isLoading: false,
                show: false,
                customerId: '',
                listSettlement: []
            });
        }
    };

    // life cycle of react calling when page is loading
    componentDidMount() {
        this.props.actions.getSupplierCustomerForDrop(false);
        this.props.actions.getAllSettlement(false);
    }

    // this function when close modal
    handleClose() {
        this.setState({
            showConfirme: false,
            show: false
        });
    }

    // this function when get value from grid to edit feild
    editDepartment = (state, rowInfo, column, instance) => {

        const { selection } = this.state;

        return {
            onClick: (e, handleOriginal) => {
                if ((e.target.className === "Edit" || e.target.className === "rt-td")) {

                    let originalSup = this.state.objSupplier;

                    originalSup.customerId = rowInfo.original.customerId;
                    originalSup.debt = rowInfo.original.debt;
                    originalSup.describtion = rowInfo.original.describtion;

                    this.setState({
                        objSupplier: originalSup,
                        show: true,
                        id: rowInfo.original.id,
                        startDate: new Date(rowInfo.original.debtDate)
                    });
                }
            }
        };
    };

    handleChange(value) {
        let objRow = this.props.listSettlement.filter(x => x.customerId == value.value);

        if (objRow.length > 0) {

            objRow.forEach(item => {
                item.debtDate = item.debtDate.split("T")[0]
            });

            this.setState({
                listSettlement: objRow,
                customerId: value
            });
        } else {
            toastr.error("لا يوجد بيانات");

            this.setState({
                customerId: value,
                listSettlement: []
            });
        }
    }

    EditCreditDepit(value) {

        if (value.debt <= 0) {
            toastr.error("عفوا برجاء دفع قيمة السداد أكبر من صفر ");
        } else {
            this.setState({
                isLoading: true
            });

            var date = new Date(this.state.startDate);

            var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
                .toISOString()
                .split("T")[0];

            value.DebtDate = dateString;
            value.debt = value.debt;
            value.id = this.state.id;
            value.customerId = this.state.customerId.value;
            value.describtion = value.describtion;

            this.props.actions.AddEditSettlement(value);
        }
    }

    viewConfimeRowDelete = (id) => {

        this.setState({
            showConfirme: true,
            selected: id
        });
    }

    handleDelete = () => {

        this.props.actions.DeleteSettlement(this.state.selected);

        this.setState({
            show: false,
            showConfirme: false,
        });
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
        if (this.state.customerId != "") {
            var date = new Date(this.state.startDate);
            var date2 = new Date(this.state.finishDate);

            var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).getTime()//.toISOString()//.split("T")[0];
            var dateString2 = new Date(date2.getTime() - (date2.getTimezoneOffset() * 60000)).getTime()//.toISOString()//.split("T")[0];

            let result = this.props.listSettlement.filter(d => {
                var time = new Date(d.debtDate).getTime();
                return (dateString <= time && time <= dateString2 && d.customerId === this.state.customerId.value);
            });

            this.setState({
                listSettlement: result
            });
        } else {
            toastr.error("برجاء مراجعة البيانات");
        }
    }

    handleResetSearch = () => {
        let listTransaction = this.props.listSettlement.filter(x => x.customerId === this.state.customerId.value);

        listTransaction.map(item => {
            item.date = item.debtDate.split("T")[0]
        });

        this.setState({
            listSettlement: listTransaction
        });
    }

    render() {
        return (
            <Fragment>
                <div className="main_content_container">
                    <div className="page_content">
                        <br />
                        <br />
                        <h1 className="heading_title"> تسوية  العملاء بالنقصان</h1>
                        {/* Button of Add new Document and delete Row in Grid */}
                        <div className="page-title-actions">
                            <Form.Group controlId="jobs">
                                <Form.Label>العملاء</Form.Label>
                                <Select
                                    name="employeePagingSetting"
                                    id="employeePagingSetting"
                                    value={this.state.customerId}
                                    onChange={(opt) => { this.handleChange(opt) }}
                                    options={this.props.listSupplierCustomerForDrop}
                                />
                            </Form.Group>
                        </div>
                        {this.state.customerId != '' ? < div className="page-title-actions">
                            <Button size="lg" style={{ width: '80px', height: '35px' }} onClick={() => {
                                let objSupplier = this.state.objSupplier;
                                objSupplier["debt"] = '';
                                objSupplier["describtion"] = '';

                                this.setState({ show: true, objSupplier, selected: '', id: 0 })
                            }}>إضافة</Button>
                        </div> : null}
                        <br />
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
                        <Button size="lg" style={{ width: '80px', height: '35px' }} onClick={this.printcontent1.bind(this)}>طباعة</Button>
                        <Button size="lg" style={{ width: '80px', height: '35px' }} onClick={this.handleSearch}>بحث</Button>
                        <Button size="lg" style={{ width: '120px', height: '35px' }} onClick={this.handleResetSearch}>عرض الكل</Button>
                        <br />
                        <br />
                        <br />
                        {/* List Of Data */}
                        <ReactTable
                            data={this.state.listSettlement}
                            columns={this.cells}
                            getTrProps={this.editDepartment}
                            defaultPageSize={this.state.pageSize}
                            defaultPageSize={20}
                        />
                    </div>
                </div>

                {/* Add or Edit Field */}
                <Modal show={this.state.show} onHide={this.handleClose.bind(this)} style={{ opacity: 1, marginTop: '10%' }}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className="modal-header" style={{ marginTop: '50px' }}>
                        <Formik validationSchema={schema} onSubmit={(values) => { this.EditCreditDepit(values) }}
                            initialValues={{
                                customerId: this.state.objSupplier.customerId,
                                debt: this.state.objSupplier.debt,
                                describtion: this.state.objSupplier.describtion
                            }}>
                            {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, }) => (
                                <Form noValidate onSubmit={handleSubmit} style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <Form.Group controlId="debt" >
                                        <Form.Label>قيمة المبلغ</Form.Label>
                                        <Form.Control type="text"
                                            style={{ height: "50px" }}
                                            placeholder="قيمة المبلغ"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="debt"
                                            value={values.debt}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.debt}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                                            {errors.debt}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="date" >
                                        <Form.Label>التاريخ</Form.Label>
                                        <DatePicker selected={this.state.startDate}
                                            dateFormat="yyyy/MM/dd"
                                            todayButton="اليوم"
                                            style={{ fontSize: "20px" }}
                                            onChange={date => this.setState({
                                                startDate: date
                                            })} />
                                    </Form.Group>
                                    <Form.Group controlId="describtion" >
                                        <Form.Label>ملاحظات</Form.Label>
                                        <Form.Control type="text"
                                            style={{ height: "50px" }}
                                            placeholder="ملاحظات"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="describtion"
                                            value={values.describtion}
                                        />
                                    </Form.Group>
                                    <div style={{ direction: "ltr" }}>
                                        <Button size="lg" onClick={this.handleClose.bind(this)} style={{ width: '80px', height: '35px', marginRight: '10px' }}>
                                            غلق
                                                </Button>
                                        {this.state.isLoading ? <Button size="lg" disabled style={{ width: '100px', height: '35px' }}>
                                            <Spinner
                                                as="span"
                                                animation="grow"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                                   تحميل
                                                </Button> :
                                            <Button size="lg" variant="success" type="submit" style={{ width: '80px', height: '35px' }}>
                                                حفظ
                                                    </Button>}
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal>
                <Confirme show={this.state.showConfirme} handleClose={this.handleClose.bind(this)} handleDelete={this.handleDelete} />

                <div className="row" id="DivPrint1" style={{ display: "none" }}>
                    <h1 className="heading_title ">سداد العملاء </h1>
                    <div> العميل :  {this.state.customerId.label}</div>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>المبلغ</th>
                                <th>التاريخ</th>
                                <th>ملاحظات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.listSettlement.length > 0 ?
                                this.state.listSettlement.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{item.debt}</td>
                                            <td>{item.debtDate}</td>
                                            <td>{item.describtion}</td>
                                        </tr>
                                    )
                                }) : null}
                        </tbody>
                    </Table>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    listSupplierCustomerForDrop: state.reduces.listSupplierCustomerForDrop,
    listSettlement: state.reduces.listSettlement
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSettlement);
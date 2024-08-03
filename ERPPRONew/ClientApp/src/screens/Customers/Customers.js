import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { bindActionCreators } from "redux";
import { Form, Spinner, Button, Modal, OverlayTrigger, Tooltip, Table } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from "yup";
import Confirme from '../Confirme/Confirme';
import ReactTable from '../renderData/renderData';
import toastr from 'toastr';
import axios from '../../axios/axios';
import Delete from '../../Design/img/delete.png';
import Edit from '../../Design/img/edit.png';
import Add from '../../Design/img/add.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Config from "../../Config/Config";

// validation of field
const schema = Yup.object({
    name: Yup.string().required("برجاء إدخال إسم العميل").max(200, "الحد الاقصى للكتابة 200 حرف فقط"),
    address: Yup.string().required("برجاء إدخال العنوان").max(200, "الحد الاقصى للكتابة 200 حرف فقط"),
    phone: Yup.string().required("برجاء إدخال رقم الهاتف").max(20, "الحد الاقصى للكتابة 20 حرف فقط"),
    credit: Yup.number().required("برجاء إدخال مبلغ الدائن"),
    debit: Yup.number().required("برجاء إدخال المدين"),
});


const schemaEdit = Yup.object({
    name: Yup.string().required("برجاء إدخال إسم العميل").max(200, "الحد الاقصى للكتابة 200 حرف فقط"),
    address: Yup.string().required("برجاء إدخال العنوان").max(200, "الحد الاقصى للكتابة 200 حرف فقط"),
    phone: Yup.string().required("برجاء إدخال رقم الهاتف").max(20, "الحد الاقصى للكتابة 20 حرف فقط"),
});


const schemaCredit = Yup.object({
    credit: Yup.number().required("برجاء إدخال مبلغ الدائن"),
    debit: Yup.number().required("برجاء إدخال المدين")
});


class Customers extends Component {

    constructor(props) {

        super(props);

        if (!Config.IsAllow(55)) {
            toastr.error("عفوا ليس لديك صلاحية لهذة الصفحة");
            this.props.history.push("/DashBoard");
        }
        // this is columns of Department
        this.cells = [
            {
                Header: "",
                id: "checkbox",
                accessor: "",
                Cell: (rowInfo) => {
                    return (
                        <div>
                            {rowInfo.original.debit > 0 ? <OverlayTrigger
                                key={`topAdd-${rowInfo.original.id}`}
                                placement={'top'}
                                overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        <strong>إضافة كميات</strong>.
                             </Tooltip>
                                }>
                                <img src={Add} className="Add"
                                    onClick={() => this.editDepartment(rowInfo)}
                                    style={{ width: "25px", cursor: 'pointer' }} />
                            </OverlayTrigger> : null
                            }
                            <OverlayTrigger
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
                            </OverlayTrigger>
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
                            <OverlayTrigger
                                key={`topupdate-${rowInfo.original.id}`}
                                placement={'top'}
                                overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        <strong>تعديل</strong>.
                             </Tooltip>
                                }>
                                <Button variant="danger" onClick={() => this.editDepartment(rowInfo)} className="EditCredit" style={{ cursor: 'pointer' }}>تعديل الرصيد</Button>
                            </OverlayTrigger>
                        </div>
                    );
                },
                sortable: false,
                width: 200
            },
            {
                Header: <strong> إسم العميل </strong>,
                accessor: 'name',
                width: 220,
                filterable: true,
            },
            {
                Header: <strong>العنوان</strong>,
                accessor: 'address',
                width: 150,
                filterable: true,
            },
            {
                Header: <strong>رقم الهاتف</strong>,
                accessor: 'phone',
                width: 150,
                filterable: true,
            }, {
                Header: <strong>له / دائن</strong>,
                accessor: 'credit',
                width: 150,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong>عليه / مدين</strong>,
                accessor: 'debit',
                width: 150,
                //Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }
        ];

        // initial value of state

        this.state = {
            show: false,
            textModal: "إضافة",
            objInstallment: {
                id: 0,
                customerId: 0,
                number: 0,
                money: 0
            },
            objSupplier: {
                id: 0,
                name: '',
                address: '',
                phone: '',
                credit: 0,
                debit: 0
            },
            selected: [],
            selectedRow: 0,
            isLoading: false,
            showConfirme: false,
            type: "",
            startDate: new Date(),
            showSupplierInfo: false
        }
    }

    // life cycle of react calling when any change of props
    componentWillReceiveProps(nextState, prevState) {
        if (nextState.listCustomer && nextState.listCustomer.length > 0) {

            this.setState({
                isLoading: false,
                show: false,
                showInstallment: false,
                showSupplierInfo: false,
                showCreditDebit: false,
                selected: []
            });
        } else {
            this.setState({
                isLoading: false,
                showInstallment: false,
                showSupplierInfo: false,
                showCreditDebit: false,
            });
        }
    };

    // life cycle of react calling when page is loading
    componentDidMount() {
        this.props.actions.getAllCustomer(false);
    }

    // this function when add new data and view modal
    showModal() {
        this.setState({
            show: true,
            textModal: "إضافة",
            objSupplier: {
                id: 0,
                name: '',
                address: '',
                phone: '',
                credit: 0,
                debit: 0
            }
        });
    }

    // this function when close modal
    handleClose() {
        this.setState({
            showConfirme: false,
            show: false,
            showInstallment: false,
            showSupplierInfo: false,
            showCreditDebit: false
        });
    }

    // this function when write any value  

    handleChange(e, feild) {

        let originalSup = this.state.objSupplier;
        originalSup[feild] = e.target.value;

        this.setState({
            objSupplier: originalSup
        });
    }

    // this function when submit value to calling api
    addEditCustomer = (values) => {
        this.setState({
            isLoading: true
        });
        axios.get(`CheckExistsSupplierCustomer?name=${values.name}&flag=${true}&id=${values.id}`).then(result => {
            if (result.data === true) {
                toastr.error("البيانات موجودة من قبل");
                this.setState({
                    isLoading: false
                });
            } else {
                values.credit = parseFloat(values.credit);
                values.debit = parseFloat(values.debit);

                this.props.actions.addEditCustomer(values);
            }
        });
    }

    updateCreditDepit = (values) => {
        this.setState({
            isLoading: true
        });

        values.credit = parseFloat(values.credit);
        values.debit = parseFloat(values.debit);

        this.props.actions.updateCreditDebitCustomer(values);
    }

    // this function when Delete item
    viewConfimeDelete = () => {
        this.setState({
            showConfirme: true,
            type: "List"
        });
    }

    // this function when Delete one item
    viewConfimeRowDelete = (id) => {

        let selectedRows = this.state.selected;

        if (selectedRows.length > 0) {
            selectedRows = []
        }

        selectedRows.push(id);

        this.setState({
            showConfirme: true,
            selected: selectedRows,
            type: "Row"
        });
    }

    // this function when submit Delete item
    handleDelete = () => {

        this.props.actions.deleteCustomer(this.state.selected[0]);

        this.setState({
            show: false,
            showConfirme: false,
            selected: []
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
                if (e.target.type !== "checkbox" && (e.target.className === "Edit" || e.target.className === "rt-td")) {

                    let originalSup = this.state.objSupplier;

                    originalSup.id = rowInfo.original.id;
                    originalSup.name = rowInfo.original.name;
                    originalSup.address = rowInfo.original.address;
                    originalSup.phone = rowInfo.original.phone;
                    //originalSup.credit = rowInfo.original.credit;
                    //originalSup.debit = rowInfo.original.debit;

                    this.setState({
                        objSupplier: originalSup,
                        textModal: "تعديل",
                        showSupplierInfo: true
                    });
                } else if (e.target.className === "Add") {

                    let rowInstallment = this.state.objInstallment;
                    rowInstallment["customerId"] = rowInfo.original.id
                    rowInstallment["money"] = rowInfo.original.debit

                    this.setState({
                        showInstallment: !this.state.showInstallment,
                        objInstallment: rowInstallment
                    });
                }
                else if (e.target.type === "button") {

                    let originalSup = this.state.objSupplier;

                    originalSup.id = rowInfo.original.id;
                    originalSup.credit = rowInfo.original.credit;
                    originalSup.debit = rowInfo.original.debit;


                    this.setState({
                        objSupplier: originalSup,
                        showCreditDebit: true
                    });
                }
            }
        };
    };

    //#region  this function when checked from checkbox to delete items

    toggleRow(id) {
        const isAdd = this.state.selected.indexOf(id);

        let newSelected = this.state.selected;

        if (isAdd > -1) {
            newSelected.splice(isAdd, 1);
        } else {

            newSelected.push(id);
        }

        this.setState({
            selected: newSelected
        });
    }

    //#endregion

    addInstallment = (value) => {

        this.setState({
            isLoading: true
        });

        var date = new Date(this.state.startDate);
        var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
            .toISOString()
            .split("T")[0];

        var newObj = {
            date: dateString,
            customerId: value.customerId,
            money: value.money
        }

        this.props.actions.addInstallment(newObj);
    }

    printcontent(el) {

        var restorepage = document.body.innerHTML;

        var printcontent = document.getElementById("DivPrint").innerHTML;
        document.body.innerHTML = printcontent;

        var css = '.cell{color:red}',
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';
        style.media = 'print';

        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.innerHTML = css; //.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);

        window.print();
        document.body.innerHTML = restorepage;


        document.getElementById("DivPrint").style.display = "none";
        window.location.reload();
    }

    render() {

        let sumCredit = this.props.listCustomer.length > 0 ? this.props.listCustomer.map(x => x.credit).reduce((a, c) => { return a + c }) : 0
        let sumDebit = this.props.listCustomer.length > 0 ? this.props.listCustomer.map(x => x.debit).reduce((a, c) => { return a + c }) : 0

        return (
            <Fragment>
                <div className="main_content_container">
                    <div className="page_content">
                        <br />
                        <br />
                        <h1 className="heading_title">عرض كل العملاء</h1>
                        {/* Button of Add new Document and delete Row in Grid */}
                        <div className="page-title-actions">
                            <Button size="lg" style={{ width: '80px', height: '35px' }} onClick={this.showModal.bind(this)}>إضافة</Button>
                            <Button size="lg" style={{ width: '80px', height: '35px' }} onClick={this.printcontent.bind(this)}>طباعة</Button>
                        </div>
                        <br />
                        <br />
                        <div className="page-title-actions">
                            <label>مجموع له / دائن : {sumCredit.toFixed(2)}</label>
                            <br />
                            <label> مجموع عليه / مدين : {sumDebit.toFixed(2)} </label>
                        </div>
                        <br />
                        <br />
                        {/* List Of Data */}
                        <ReactTable
                            data={this.props.listCustomer}
                            columns={this.cells}
                            getTrProps={this.editDepartment}
                            defaultPageSize={this.state.pageSize}
                            defaultPageSize={40}
                        />

                    </div>
                    <Confirme show={this.state.showConfirme} handleClose={this.handleClose.bind(this)} handleDelete={this.handleDelete} />
                </div>

                {/* Add or Edit Field */}
                <Modal show={this.state.show} onHide={this.handleClose.bind(this)} style={{ opacity: 1, marginTop: '10%' }}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className="modal-header" style={{ marginTop: '105px' }}>
                        <Formik validationSchema={schema} onSubmit={(values) => { this.addEditCustomer(values) }}
                            initialValues={{
                                id: this.state.objSupplier.id,
                                name: this.state.objSupplier.name,
                                address: this.state.objSupplier.address,
                                phone: this.state.objSupplier.phone,
                                credit: this.state.objSupplier.credit,
                                debit: this.state.objSupplier.debit,
                                flag: false
                            }}>
                            {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, }) => (
                                <Form noValidate onSubmit={handleSubmit} style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <Form.Group controlId="name" >
                                        <Form.Label>إسم العميل</Form.Label>
                                        <Form.Control type="text"
                                            style={{ height: "50px" }}
                                            placeholder="إسم العميل"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="name"
                                            value={values.name}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.name}
                                            autoComplete="off"
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="address">
                                        <Form.Label>العنوان</Form.Label>
                                        <Form.Control
                                            style={{ height: "50px" }}
                                            type="text"
                                            placeholder="العنوان"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="address"
                                            value={values.address}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.address}
                                            autoComplete="off"
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                                            {errors.address}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="phone">
                                        <Form.Label>الهاتف</Form.Label>
                                        <Form.Control
                                            style={{ height: "50px" }}
                                            type="text"
                                            placeholder="الهاتف"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="phone"
                                            value={values.phone}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.phone}
                                            autoComplete="off"
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                                            {errors.phone}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="credit">
                                        <Form.Label>دائن / له</Form.Label>
                                        <Form.Control
                                            style={{ height: "50px" }}
                                            type="text"
                                            placeholder="دائن / له"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="credit"
                                            value={values.credit}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.credit}
                                            autoComplete="off"
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                                            {errors.credit}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="phone">
                                        <Form.Label>مدين / عليه</Form.Label>
                                        <Form.Control
                                            style={{ height: "50px" }}
                                            type="text"
                                            placeholder="مدين / عليه"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="debit"
                                            value={values.debit}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.debit}
                                            autoComplete="off"
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                                            {errors.debit}
                                        </Form.Control.Feedback>
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
                                                    </Button>
                                        }
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showSupplierInfo} onHide={this.handleClose.bind(this)} style={{ opacity: 1, marginTop: '10%' }}>
                    <Modal.Header closeButton style={{ marginTop: '15%' }}>
                        إضافة أو تعديل عميل
                    </Modal.Header>
                    <Modal.Body className="modal-header">
                        <Formik validationSchema={schemaEdit} onSubmit={(values) => { this.addEditCustomer(values) }}
                            initialValues={{
                                id: this.state.objSupplier.id,
                                name: this.state.objSupplier.name,
                                address: this.state.objSupplier.address,
                                phone: this.state.objSupplier.phone,
                                flag: true
                            }}>
                            {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, }) => (
                                <Form noValidate onSubmit={handleSubmit} style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <Form.Group controlId="name">
                                        <Form.Label>إسم العميل</Form.Label>
                                        <Form.Control type="text"
                                            style={{ height: "50px" }}
                                            placeholder="إسم العميل"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="name"
                                            autoComplete="off"
                                            value={values.name}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.name}

                                        />
                                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="address">
                                        <Form.Label>العنوان</Form.Label>
                                        <Form.Control
                                            style={{ height: "50px" }}
                                            type="text"
                                            placeholder="العنوان"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="address"
                                            autoComplete="off"
                                            value={values.address}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.address}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                                            {errors.address}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="phone">
                                        <Form.Label>الهاتف</Form.Label>
                                        <Form.Control
                                            style={{ height: "50px" }}
                                            type="text"
                                            placeholder="الهاتف"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="phone"
                                            autoComplete="off"
                                            value={values.phone}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.phone}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                                            {errors.phone}
                                        </Form.Control.Feedback>
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

                <Modal show={this.state.showCreditDebit} onHide={this.handleClose.bind(this)} style={{ opacity: 1, marginTop: '10%' }}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className="modal-header" >
                        <Formik validationSchema={schemaCredit} onSubmit={(values) => { this.updateCreditDepit(values) }}
                            initialValues={{
                                id: this.state.objSupplier.id,
                                credit: this.state.objSupplier.credit,
                                debit: this.state.objSupplier.debit,
                            }}>
                            {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, setFieldTouched, errors, setFieldValue }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group controlId="credit">
                                        <Form.Label>دائن / له</Form.Label>
                                        <Form.Control
                                            style={{ height: "50px" }}
                                            type="text"
                                            placeholder="دائن / له"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="credit"
                                            autoComplete="off"
                                            value={values.credit}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.credit}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                                            {errors.credit}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="phone">
                                        <Form.Label>مدين / عليه</Form.Label>
                                        <Form.Control
                                            style={{ height: "50px" }}
                                            type="text"
                                            placeholder="مدين / عليه"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="debit"
                                            autoComplete="off"
                                            value={values.debit}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.debit}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                                            {errors.debit}
                                        </Form.Control.Feedback>
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
                                            </Button>
                                        }
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showInstallment} onHide={this.handleClose.bind(this)} style={{ opacity: 1, marginTop: '10%' }}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className="modal-header" >
                        <Formik onSubmit={(values) => { this.addInstallment(values) }}
                            initialValues={{
                                id: this.state.objInstallment.id,
                                customerId: this.state.objInstallment.customerId,
                                money: this.state.objInstallment.money
                            }}>
                            {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, setFieldTouched, errors, setFieldValue }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group controlId="date" style={{ marginRight: '50%' }}>
                                        <Form.Label>التاريخ</Form.Label>
                                        <DatePicker selected={this.state.startDate}
                                            dateFormat="yyyy/MM/dd"
                                            todayButton="اليوم"
                                            style={{ fontSize: "20px" }}
                                            onChange={date => this.setState({
                                                startDate: date
                                            })} />
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
                                            </Button>
                                        }
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal>

                <div id="DivPrint" style={{ display: "none" }}>
                    <h1 className="heading_title">عرض كل العملاء</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>إسم العميل</th>
                                <th>العنوان</th>
                                <th>رقم الهاتف</th>
                                <th>له / دائن</th>
                                <th>عليه / مدين</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.listCustomer.length > 0 ?
                                    this.props.listCustomer.map((item, i) => {
                                        return (<tr key={i}>
                                            <td>{item.name}</td>
                                            <td>{item.address}</td>
                                            <td>{item.phone}</td>
                                            <td> {item.credit}</td>
                                            <td> {item.debit}</td>
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
    listCustomer: state.reduces.listCustomer,
    isAddedInstallment: state.reduces.isAddedInstallment
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
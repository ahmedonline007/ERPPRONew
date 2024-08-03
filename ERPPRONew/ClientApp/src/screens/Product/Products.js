import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { bindActionCreators } from "redux";
import { Form, Spinner, Button, Modal, Table, OverlayTrigger, Tooltip, Col } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from "yup";
import Confirme from '../Confirme/Confirme';
import ReactTable from '../renderData/renderData';
import toastr from 'toastr';
import axios from '../../axios/axios';
import Delete from '../../Design/img/delete.png';
import Edit from '../../Design/img/edit.png';
import Add from '../../Design/img/add.png';
import Select from "react-select";
import Config from "../../Config/Config";

// validation of field
const schema = Yup.object({
    name: Yup.string().required("برجاء إدخال إسم المنتج").max(200, "الحد الاقصى للكتابة 200 حرف فقط"),
    // categoryId: Yup.string().required("برجاء إدخال القسم") 
});

// validation of field
const schemaProductNumber = Yup.object({
    code: Yup.string().required("برجاء إدخال كود الصنف").max(20, "الحد الاقصى للكتابة 20  حرف فقط"),
    qty: Yup.number().required("برجاء إدخال الكمية")
});

// validation of field
const schemaProductSize = Yup.object({
    width: Yup.number().required("برجاء إدخال العرض الصنف"),
    height: Yup.number("يجب إدخال أرقام").required("برجاء إدخال طول الصنف"),
    size: Yup.number().required("برجاء إدخال التخانة الصنف"),
    meter: Yup.number().required("برجاء إدخال المتر"),
    centi: Yup.number().required("برجاء إدخال سم"),
    qty: Yup.number().required("برجاء إدخال الكمية"),
});

class Products extends Component {

    constructor(props) {

        super(props);
        if (!Config.IsAllow(60)) {
            toastr.error("عفوا ليس لديك صلاحية لهذة الصفحة");
            this.props.history.push("/DashBoard");
        }
        // this is columns of Department
        this.cells = [
            {
                Header: <strong> القسم </strong>,
                accessor: 'categoryName',
                width: 150,
                filterable: true,
            },
            {
                Header: <strong> إسم المنتج </strong>,
                accessor: 'name',
                width: 180,
                filterable: true,
            },
            {
                Header: <strong> النوع </strong>,
                accessor: 'type',
                width: 140,
                Cell: (rowInfo) => {
                    return (
                        <div>
                            {rowInfo.original.type === true ?
                                "متر مكعب" : "عدد"}
                        </div>
                    );
                }
            },
            {
                Header: "",
                id: "checkbox",
                accessor: "",
                width: 100,
                Cell: (rowInfo) => {
                    return (
                        <div>
                            <OverlayTrigger
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
                                key={`topDelete-${rowInfo.original.id}`}
                                placement={'top'}
                                overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        <strong>حذف</strong>.
                                   </Tooltip>
                                }>
                                <img src={Delete} className="Delete"
                                    onClick={() => this.viewConfimeRowDelete(rowInfo.original.id)}
                                    style={{ width: "25px", cursor: 'pointer' }} />
                            </OverlayTrigger>
                        </div>
                    );
                },
                sortable: false
            }
        ];

        // initial value of state

        this.state = {
            show: false,
            textModal: "إضافة",
            objProduct: {
                id: 0,
                categoryId: '',
                name: '',
                priceSupplier: '',
                priceSelling: '',
                type: "true"
            },
            objProductNumber: {
                id: 0,
                productId: '',
                code: '',
                qty: ''
            },
            objProductSize: {
                id: 0,
                productId: '',
                code: '',
                qty: '',
                width: '',
                height: '',
                size: '',
                meter: '',
                centi: ''
            },
            selected: [],
            selectedRow: 0,
            isLoading: false,
            showConfirme: false,
            showProductNumber: false,
            showProductSize: false,
            type: ""
        }
    }

    // life cycle of react calling when any change of props
    componentWillReceiveProps(nextState, prevState) {
        if (nextState.listProducts && nextState.listProducts.length > 0) {

            this.setState({
                isLoading: false,
                show: false,
                selected: [],
                showProductNumber: false,
                showProductSize: false
            });
        } else {
            this.setState({
                isLoading: false
            });
        }
    };

    // life cycle of react calling when page is loading
    componentDidMount() {
        this.props.actions.getAllCategoryforDrop();
        this.props.actions.getAllProduct();
    }

    // this function when add new data and view modal
    showModal() {
        this.setState({
            show: true,
            textModal: "إضافة",
            objProduct: {
                id: 0,
                categoryId: '',
                name: '',
                priceSupplier: '',
                priceSelling: '',
                type: "true"
            }
        });
    }

    // this function when close modal
    handleClose() {
        this.setState({
            showConfirme: false,
            show: false,
            showProductNumber: false,
            showProductSize: false
        });
    }

    // this function when write any value  

    handleChange(e, feild) {

        let originalSup = this.state.objProduct;
        originalSup[feild] = e.target.value;

        this.setState({
            objProduct: originalSup
        });
    }

    // this function when submit value to calling api
    addEditDocument = (values) => {
        if (values.categoryId === "") {
            toastr.error("برجاء إختيار القسم");
            return false;
        } else {
            this.setState({
                isLoading: true
            });
            axios.get(`CheckExistsProduct?name=${values.name}&id=${values.id}`).then(result => {
                if (result.data === true) {
                    toastr.error("البيانات موجودة من قبل");
                    this.setState({
                        isLoading: false
                    });
                } else {
                    values.priceSelling = parseFloat(values.priceSelling);
                    values.priceSupplier = parseFloat(values.priceSupplier);
                    values.categoryName = values.categoryId.label;
                    values.categoryId = values.categoryId.value;
                    values.type = this.state.objProduct.type === "true" ? true : false;

                    this.props.actions.addEditProduct(values);
                }
            });
        }
    }

    addEditProductNumber = (values) => {
        this.setState({
            isLoading: true
        });

        values.qty = parseInt(values.qty);

        this.props.actions.addEditProductNumber(values);
    }

    addEditProductSize = (values) => {
        this.setState({
            isLoading: true
        });

        values.height = parseFloat(values.height);
        values.width = parseFloat(values.width);
        values.size = parseFloat(values.size);
        values.meter = parseFloat(values.meter);
        values.centi = parseFloat("." + values.centi);
        values.qty = parseInt(values.qty);

        this.props.actions.addEditProductSize(values);
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
        this.props.actions.deleteProducts(this.state.selected[0]);

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
            objProduct: {
                id: 0,
                categoryId: '',
                name: '',
                priceSupplier: '',
                priceSelling: '',
                type: "true"
            },
            isLoading: false,
            showConfirme: false,
            showProductNumber: false,
            showProductSize: false
        });
    }

    // this function when get value from grid to edit feild
    editDepartment = (state, rowInfo, column, instance) => {

        const { selection } = this.state;
        return {
            onClick: (e, handleOriginal) => {
                // if (objReadWrite.writeDoc || this.state.objUserInfo.isAdmin) {
                if ((e.target.className === "Edit" || e.target.className === "rt-td") && e.target.className !== "Add") {
                    let originalSup = this.state.objProduct;

                    originalSup.id = rowInfo.original.id;
                    originalSup.name = rowInfo.original.name;
                    originalSup.categoryId = { label: rowInfo.original.categoryName, value: rowInfo.original.categoryId };
                    originalSup.priceSupplier = rowInfo.original.priceSupplier;
                    originalSup.priceSelling = rowInfo.original.priceSelling;
                    originalSup.type = rowInfo.original.type === true ? "true" : "false";

                    this.setState({
                        objProduct: originalSup,
                        textModal: "تعديل",
                        show: true
                    });
                }
                else if (e.target.className === "Add") {

                    if (rowInfo.original.type === true) {

                        let rowProduct = this.state.objProductSize;
                        rowProduct["productId"] = rowInfo.original.id

                        this.setState({
                            showProductSize: !this.state.showProductSize,
                            objProductSize: rowProduct
                        });
                    } else {

                        let rowProduct = this.state.objProductNumber;
                        rowProduct["productId"] = rowInfo.original.id

                        this.setState({
                            showProductNumber: !this.state.showProductNumber,
                            objProductNumber: rowProduct
                        });
                    }
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

    // this function when checked from redio button
    handleChangeCheck = (e) => {
        let originalProduct = this.state.objProduct;

        originalProduct.type = e.target.value;

        this.setState({
            objProduct: originalProduct
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

    render() {

        return (
            <Fragment>
                <div className="main_content_container">
                    <div className="page_content">
                        <br />
                        <br />
                        <h1 className="heading_title">عرض كل المنتجات</h1>
                        {/* Button of Add new Document and delete Row in Grid */}
                        <div className="page-title-actions">
                            <Button size="lg" style={{ width: '80px', height: '35px' }} onClick={this.showModal.bind(this)}>إضافة</Button>
                            <Button size="lg"  style={{ width: '80px', height: '35px' }} onClick={this.printcontent.bind(this)}>طباعة</Button>
                        </div>
                        <br />
                        <br />
                        {/* List Of Data */}
                        <ReactTable
                            data={this.props.listProducts}
                            columns={this.cells}
                            getTrProps={this.editDepartment}
                            defaultPageSize={this.state.pageSize}
                            defaultPageSize={200}
                        />
                    </div>
                    <Confirme show={this.state.showConfirme} handleClose={this.handleClose.bind(this)} handleDelete={this.handleDelete} />
                </div>

                {/* Add or Edit Field */}
                <Modal show={this.state.show} onHide={this.handleClose.bind(this)} style={{ opacity: 1, marginTop: '10%' }}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className="modal-header" style={{ marginTop: '150px' }}>
                        <Formik validationSchema={schema} onSubmit={(values) => { this.addEditDocument(values) }}
                            initialValues={{
                                id: this.state.objProduct.id,
                                name: this.state.objProduct.name,
                                categoryId: this.state.objProduct.categoryId,
                                priceSupplier: this.state.objProduct.priceSupplier || 0,
                                priceSelling: this.state.objProduct.priceSelling || 0
                            }}>
                            {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, setFieldTouched, errors, setFieldValue }) => (
                                <Form noValidate onSubmit={handleSubmit} style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <Form.Group controlId="categoryId">
                                        <Form.Label>القسم</Form.Label>
                                        <Select
                                            name="categoryId"
                                            id="categoryId"
                                            value={values.categoryId}
                                            onChange={(opt) => {
                                                setFieldValue("categoryId", opt);
                                            }}
                                            options={this.props.listCategoryForDrop}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="name" >
                                        <Form.Label>إسم المنتج</Form.Label>
                                        <Form.Control type="text"
                                            placeholder="إسم المنتج"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="name"
                                            value={values.name}
                                            onBlur={handleBlur}
                                            autoComplete="off"
                                            isInvalid={!!errors.name}
                                            style={{ height: "50px" }}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ display: 'inline-block', color: '#d92550' }}>
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="priceSupplier" >
                                        <Form.Label>سعر الشراء</Form.Label>
                                        <Form.Control type="text"
                                            placeholder="سعر الشراء"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="priceSupplier"
                                            value={values.priceSupplier}
                                            onBlur={handleBlur}
                                            autoComplete="off"
                                            isInvalid={!!errors.priceSupplier}
                                            style={{ height: "50px" }}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ display: 'inline-block', color: '#d92550' }}>
                                            {errors.priceSupplier}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="priceSelling" >
                                        <Form.Label>سعر البيع</Form.Label>
                                        <Form.Control type="text"
                                            placeholder="سعر البيع"
                                            style={{ height: "50px" }}
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="priceSelling"
                                            value={values.priceSelling}
                                            onBlur={handleBlur}
                                            autoComplete="off"
                                            isInvalid={!!errors.priceSelling}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ display: 'inline-block', color: '#d92550' }}>
                                            {errors.priceSelling}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label as="legend" column xs={12}>
                                                النوع
                                            </Form.Label>
                                            <Col sm={10}>
                                                <Form.Check inline
                                                    type="radio"
                                                    value={"true"}
                                                    defaultChecked={this.state.objProduct.type === "true"}
                                                    label="متر مكعب"
                                                    name="isActive"
                                                    onChange={this.handleChangeCheck}
                                                />
                                                <Form.Check inline
                                                    type="radio"
                                                    value={"false"}
                                                    defaultChecked={this.state.objProduct.type === "false"}
                                                    label="عدد"
                                                    name="isActive"
                                                    onChange={this.handleChangeCheck}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <br />
                                    <br />
                                    <br />
                                    <Col>
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
                                    </Col>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal>

                {/* Add or Edit ProductNumber */}
                <Modal show={this.state.showProductNumber} onHide={this.handleClose.bind(this)} style={{ opacity: 1, marginTop: '10%' }}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className="modal-header" style={{ marginTop: '100px' }}>
                        <Formik validationSchema={schemaProductNumber} onSubmit={(values) => { this.addEditProductNumber(values) }}
                            initialValues={{
                                id: this.state.objProductNumber.id,
                                qty: this.state.objProductNumber.qty,
                                productId: this.state.objProductNumber.productId,
                                code: this.state.objProductNumber.code
                            }}>
                            {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, setFieldTouched, errors, setFieldValue }) => (
                                <Form noValidate onSubmit={handleSubmit} style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <Form.Group controlId="code" >
                                        <Form.Label>الكود</Form.Label>
                                        <Form.Control type="text"
                                            style={{ height: "50px" }}
                                            placeholder="الكود"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="code"
                                            autoComplete="off"
                                            value={values.code}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.code}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ display: 'inline-block', color: '#d92550' }}>
                                            {errors.code}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="qty" >
                                        <Form.Label>الكمية</Form.Label>
                                        <Form.Control type="text"
                                            style={{ height: "50px" }}
                                            placeholder="الكمية"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="qty"
                                            autoComplete="off"
                                            value={values.qty}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.qty}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ display: 'inline-block', color: '#d92550' }}>
                                            {errors.qty}
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

                {/* Add or Edit ProductSize */}
                <Modal show={this.state.showProductSize} onHide={this.handleClose.bind(this)} style={{ opacity: 1, marginTop: '10%' }}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className="modal-header" style={{ marginTop: '50%' }}>
                        <Formik validationSchema={schemaProductSize} onSubmit={(values) => { this.addEditProductSize(values) }}
                            initialValues={{
                                id: this.state.objProductSize.id,
                                qty: this.state.objProductSize.qty,
                                productId: this.state.objProductSize.productId,
                                code: this.state.objProductSize.code,
                                width: this.state.objProductSize.width,
                                height: this.state.objProductSize.height,
                                size: this.state.objProductSize.size,
                                meter: this.state.objProductSize.meter,
                                centi: this.state.objProductSize.centi
                            }}>
                            {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, setFieldTouched, errors, setFieldValue }) => (
                                <Form noValidate onSubmit={handleSubmit} style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <Form.Group controlId="size" >
                                        <Form.Label>التخانة</Form.Label>
                                        <Form.Control type="text"
                                            style={{ height: "50px" }}
                                            placeholder="التخانة"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="size"
                                            autoComplete="off"
                                            value={values.size}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.size}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ display: 'inline-block', color: '#d92550' }}>
                                            {errors.size}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="width">
                                        <Form.Label>العرض</Form.Label>
                                        <Form.Control type="text"
                                            style={{ height: "50px" }}
                                            placeholder="العرض"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="width"
                                            autoComplete="off"
                                            value={values.width}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.width}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ display: 'inline-block', color: '#d92550' }}>
                                            {errors.width}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="height" >
                                        <Form.Label>الطول</Form.Label>
                                        <Form.Control type="text"
                                            style={{ height: "50px" }}
                                            placeholder="الطول"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="height"
                                            autoComplete="off"
                                            value={values.height}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.height}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ display: 'inline-block', color: '#d92550' }}>
                                            {errors.height}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="centi" >
                                        <Form.Label>سم</Form.Label>
                                        <Form.Control type="text"
                                            style={{ height: "50px" }}
                                            placeholder="سم"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="centi"
                                            autoComplete="off"
                                            value={values.centi}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.centi}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ display: 'inline-block', color: '#d92550' }}>
                                            {errors.centi}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="meter" >
                                        <Form.Label>المتر</Form.Label>
                                        <Form.Control type="text"
                                            style={{ height: "50px" }}
                                            placeholder="المتر"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="meter"
                                            autoComplete="off"
                                            value={values.meter}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.meter}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ display: 'inline-block', color: '#d92550' }}>
                                            {errors.meter}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="code" >
                                        <Form.Label>الكود</Form.Label>
                                        <Form.Control type="text"
                                            style={{ height: "50px" }}
                                            placeholder="الكود"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="code"
                                            autoComplete="off"
                                            value={values.code}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="qty">
                                        <Form.Label>الكمية</Form.Label>
                                        <Form.Control type="text"
                                            style={{ height: "50px" }}
                                            placeholder="الكمية"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="qty"
                                            autoComplete="off"
                                            value={values.qty}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.qty}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ display: 'inline-block', color: '#d92550' }}>
                                            {errors.qty}
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

                <div id="DivPrint" style={{ display: "none" }}>
                    <h1 className="heading_title">عرض كل المنتجات</h1>
                    <br />
                    <br />

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>القسم</th>
                                <th>إسم المنتج</th>
                                <th>النوع</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.listProducts.length > 0 ?
                                    this.props.listProducts.map((item, i) => {
                                        return (<tr key={i}>
                                            <td>{item.categoryName}</td>
                                            <td>{item.name}</td>
                                            <td>{item.type === true ?
                                                "متر مكعب" : "عدد"}</td>
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
    listCategoryForDrop: state.reduces.listCategoryForDrop,
    listProducts: state.reduces.listProducts
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);

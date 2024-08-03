import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { bindActionCreators } from "redux";
import { Form, Spinner, Button, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from "yup";
import Confirme from '../Confirme/Confirme';
import ReactTable from '../renderData/renderData';
import toastr from 'toastr';
import axios from '../../axios/axios';
import Delete from '../../Design/img/delete.png';
import Edit from '../../Design/img/edit.png';
import Add from '../../Design/img/add.png';
import Permission from "../users/Permissions.js";
import Select from "react-select";
import Config from "../../Config/Config";
// validation of field
const schema = Yup.object({
    name: Yup.string().required("برجاء إدخال إسم المورد").max(200, "الحد الاقصى للكتابة 200 حرف فقط"),
    userName: Yup.string().required("برجاء إدخال اسم المستخدم").max(200, "الحد الاقصى للكتابة 200 حرف فقط"),
    password: Yup.string().required("برجاء إدخال الرقم السرى").max(20, "الحد الاقصى للكتابة 20 حرف فقط")
});

// validation of field
const schemaPermission = Yup.object({
    moduleID: Yup.string().required("برجاء اختيار الموديل"),
    pagesId: Yup.string().required("برجاء اختيار الفحة"),
});


class Users extends Component {

    constructor(props) {

        super(props);
        if (!Config.IsAllow(69)) {
            toastr.error("عفوا ليس لديك صلاحية لهذة الصفحة");
            this.props.history.push("/DashBoard");
        }

        const rootPermissions = Permission.Modules.map(item => {
            return { label: item.title, value: item.value }
        });

        // this is columns of Department
        this.cells = [
            {
                Header: <strong> الأسم </strong>,
                accessor: 'name',
                width: 200
            },
            {
                Header: <strong>إسم المستخدم</strong>,
                accessor: 'userName',
                width: 150
            },
            {
                Header: <strong>الرقم السرى</strong>,
                accessor: 'password',
                width: 150
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
                                        <strong>إضافة صلاحيات المستخدمين</strong>.
                             </Tooltip>
                                }>
                                <img src={Add} className="Add"
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

                        </div>
                    );
                },
                sortable: false
            }
        ];

        // initial value of state

        this.state = {
            showInstallment: false,
            modules: rootPermissions,
            show: false,
            textModal: "إضافة",
            objUsers: {
                id: 0,
                name: '',
                userName: '',
                password: ''
            },
            selected: [],
            selectedRow: 0,
            isLoading: false,
            showConfirme: false,
            type: "",
            moduleID: '',
            pagesId: '',
            pages: [],
            viewAction: false,
            userId: '',
            permissionValue: false,
            PermissionId:0
        }
    }

    // life cycle of react calling when any change of props
    componentWillReceiveProps(nextState, prevState) {
        if ((nextState.listUsers && nextState.listUsers.length > 0)) {

            this.setState({
                isLoading: false,
                show: false,
                showInstallment: false,
                selected: []
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
        this.props.actions.getAllUsers();
    }

    // this function when add new data and view modal
    showModal() {
        this.setState({
            show: true,
            textModal: "إضافة",
            objUsers: {
                id: 0,
                name: '',
                userName: '',
                password: ''
            }
        });
    }

    backup() {
        this.props.actions.backup();
    }


    // this function when close modal
    handleClose() {
        this.setState({
            showConfirme: false,
            show: false,
            showInstallment: false
        });
    }

    // this function when write any value  
    handleChange(e, feild) {

        let originalSup = this.state.objUsers;
        originalSup[feild] = e.target.value;

        this.setState({
            objUsers: originalSup
        });
    }

    // this function when submit value to calling api
    addEditDocument = (values) => {
        this.setState({
            isLoading: true
        });
        axios.get(`CheckExistName?name=${values.name}&flag=${true}&id=${values.id}`).then(result => {
            if (result.data === true) {
                toastr.error("البيانات موجودة من قبل");
                this.setState({
                    isLoading: false
                });
            } else {
                this.props.actions.addEditUsers(values);
            }
        });
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

        this.props.actions.deleteUsers(this.state.selected[0]);

        this.setState({
            show: false,
            showConfirme: false,
            selected: []
        });
    }


    // this function when get value from grid to edit feild
    editDepartment = (state, rowInfo, column, instance) => {

        const { selection } = this.state;

        return {
            onClick: (e, handleOriginal) => {
                if (e.target.type !== "checkbox" && (e.target.className === "Edit" || e.target.className === "rt-td")) {

                    let originalSup = this.state.objUsers;

                    originalSup.id = rowInfo.original.id;
                    originalSup.name = rowInfo.original.name;
                    originalSup.userName = rowInfo.original.userName;
                    originalSup.password = rowInfo.original.password;

                    this.setState({
                        objUsers: originalSup,
                        textModal: "تعديل",
                        show: true
                    });
                } else if (e.target.className === "Add") {

                    this.setState({
                        showInstallment: !this.state.showInstallment,
                        userId: rowInfo.original.id
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

    handleChangeDropDown(moduleID) {

        const pages = Permission.Modules.find(x => x.value === moduleID.value).page.map(item => {
            return { label: item.title, value: item.value }
        });


        this.setState({
            pages: pages,
            moduleID: moduleID
        });
    }

    handleAction(pagesId) {

        let listPermission = Permission.Modules.find(x => x.value === this.state.moduleID.value);

        if (listPermission !== undefined) {

            const PermissionId = listPermission.page.find(x => x.value === pagesId.value).action.value;

            axios.get(`SelectPermission?userId=${this.state.userId}&PermissionId=${PermissionId}`).then(result => {

                this.setState({
                    pagesId: pagesId, 
                    viewAction: true,
                    permissionValue: result.data || false,
                    PermissionId: PermissionId
                });
            });
        }
    }

    toggleRowSelected = () => {
        this.setState({
            permissionValue: !this.state.permissionValue
        });
    }


    addEditPermissions = (values) => {
        if (this.state.moduleID != "" && this.state.pagesId != "") {

            this.setState({
                isLoading: true
            });

            axios.get(`AddEditPermissionUsers?userId=${this.state.userId}&PermissionId=${this.state.PermissionId}&value=${this.state.permissionValue}`).then(result => {
                toastr.success("تم الحفظ بنجاح");
                this.setState({
                    moduleID: '',
                    pagesId: '',
                    selected: [],
                    pages: [],
                    viewAction: false,
                    isLoading: false
                });
            }).catch(function (error) {
                this.setState({
                    moduleID: '',
                    pagesId: '',
                    selected: [],
                    pages: [],
                    viewAction: false,
                    isLoading: false
                });
                toastr.error("يوجد مشكلة برجاء الاتصال بالمسؤول");
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
                        <h1 className="heading_title">عرض كل المستخدمين</h1>
                        {/* Button of Add new Document and delete Row in Grid */}
                        <div className="page-title-actions">
                            <Button size="lg"  style={{ width: '80px', height: '35px' }} onClick={this.showModal.bind(this)}>إضافة</Button>
                            <Button size="lg" style={{ width: '80px', height: '35px' }} onClick={this.backup.bind(this)} style={{ width: '210', height: '40px' }}> إنشاء نسخة احتياطية</Button>
                        </div>
                        <br />
                        <br />
                        {/* List Of Data */}
                        <ReactTable
                            defaultPageSize={20}
                            data={this.props.listUsers}
                            columns={this.cells}
                            getTrProps={this.editDepartment} />
                    </div>
                    <Confirme show={this.state.showConfirme} handleClose={this.handleClose.bind(this)} handleDelete={this.handleDelete} />
                </div>

                {/* Add or Edit Field */}
                <Modal show={this.state.show} onHide={this.handleClose.bind(this)} style={{ opacity: 1, marginTop: '10%' }}>
                    <Modal.Header closeButton style={{ marginTop: '15%' }}>
                        إضافة أو تعديل مستخدم جديد
                    </Modal.Header>
                    <Modal.Body className="modal-header" style={{ marginTop: '50px' }}>
                        <Formik validationSchema={schema} onSubmit={(values) => { this.addEditDocument(values) }}
                            initialValues={{
                                id: this.state.objUsers.id,
                                name: this.state.objUsers.name,
                                userName: this.state.objUsers.userName,
                                password: this.state.objUsers.password
                            }}>
                            {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
                                <Form noValidate onSubmit={handleSubmit} style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <Form.Group controlId="name">
                                        <Form.Label>الأسم</Form.Label>
                                        <Form.Control type="text"
                                            style={{ height: "50px" }}
                                            placeholder="الأسم"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="name"
                                            value={values.name}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="userName">
                                        <Form.Label>إسم المستخدم</Form.Label>
                                        <Form.Control
                                            style={{ height: "50px" }}
                                            type="text"
                                            placeholder="إسم المستخدم"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="userName"
                                            value={values.userName}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.userName}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                                            {errors.userName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Label>الرقم السرى</Form.Label>
                                        <Form.Control
                                            style={{ height: "50px" }}
                                            type="text"
                                            placeholder=" الرقم السرى"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="password"
                                            value={values.password}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                                            {errors.password}
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

                <Modal show={this.state.showInstallment} onHide={this.handleClose.bind(this)} style={{ opacity: 1, marginTop: '10%' }}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className="modal-header" style={{ marginTop: '50px' }}>
                        <Formik   onSubmit={this.addEditPermissions} enableReinitialize={true}
                            initialValues={{
                                moduleID: this.state.moduleID,
                                pagesId: this.state.pagesId
                            }}>
                            {({ handleSubmit, values, touched, setFieldTouched, errors, setFieldValue }) => (
                                <Form noValidate onSubmit={handleSubmit} style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <Form.Group controlId="modules">
                                        <Form.Label>الموديل</Form.Label>
                                        <Select
                                            name="moduleID"
                                            id="moduleID"
                                            value={this.state.moduleID}
                                            onChange={(opt) => {
                                                this.handleChangeDropDown(opt);
                                            }}
                                            onBlur={setFieldTouched}
                                            options={this.state.modules}
                                            error={errors.moduleID}
                                            touched={touched.moduleID}
                                        />
                                        <Form.Control.Feedback style={{ display: 'inline-block', color: '#d92550' }}>
                                            {errors.moduleID}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="pages">
                                        <Form.Label>الصفحة</Form.Label>
                                        <Select
                                            name="pagesId"
                                            id="pagesId"
                                            value={this.state.pagesId}
                                            onChange={(opt) => {
                                                this.handleAction(opt);
                                            }}
                                            onBlur={setFieldTouched}
                                            options={this.state.pages}
                                            error={errors.pagesId}
                                            touched={touched.pagesId}
                                        />
                                        <Form.Control.Feedback style={{ display: 'inline-block', color: '#d92550' }}>
                                            {errors.pagesId}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    {this.state.viewAction ?
                                        <div key={`inline-1`} className="mb-3">
                                            <Form.Group id="formGridCheckbox">
                                                <Form.Check type="checkbox" label="عرض"
                                                    checked={this.state.permissionValue}
                                                    onChange={this.toggleRowSelected} />
                                            </Form.Group>
                                        </div>
                                        : null}

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
            </Fragment>
        );
    }
}


const mapStateToProps = (state, ownProps) => ({
    listUsers: state.reduces.listUsers
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);


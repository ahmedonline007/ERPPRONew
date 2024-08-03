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
import Delete from '../../Design/img/delete.png';
import Edit from '../../Design/img/edit.png'; 
import "react-datepicker/dist/react-datepicker.css";
import Config from "../../Config/Config";

// validation of field
const schema = Yup.object({
    employeeName: Yup.string().required("برجاء إدخال إسم الموظف").max(200, "الحد الاقصى للكتابة 200 حرف فقط"),
    employeeAddress: Yup.string().required("برجاء إدخال العنوان").max(200, "الحد الاقصى للكتابة 200 حرف فقط"),
    employeePhone: Yup.string().required("برجاء إدخال رقم الهاتف").max(20, "الحد الاقصى للكتابة 20 حرف فقط"),
    salary: Yup.number().required("برجاء إدخال المرتب"),

});


class Employees extends Component {

    constructor(props) {

        super(props);

        if (!Config.IsAllow(84)) {
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
                    return ( <div>
                        {
                            Config.IsAllow(90) ?<div>
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
                            </div> : null}</div> 
                    );
                },
                sortable: false,
                width: 150
            },
            {
                Header: <strong> إسم الموظف </strong>,
                accessor: 'employeeName',
                width: 220,
                filterable: true,
            },
            {
                Header: <strong>العنوان</strong>,
                accessor: 'employeeAddress',
                width: 200,
                filterable: true,
            },
            {
                Header: <strong>رقم الهاتف</strong>,
                accessor: 'employeePhone',
                width: 150,
                filterable: true,
            }, {
                Header: <strong>المرتب</strong>,
                accessor: 'salary',
                width: 180,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }
        ];

        // initial value of state

        this.state = {
            show: false,
            textModal: "إضافة",
            objEmployee: {
                id: 0,
                employeeName: '',
                employeeAddress: '',
                employeePhone: '',
                salary: 0
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
        if (nextState.listEmployee && nextState.listEmployee.length > 0) {

            this.setState({
                isLoading: false,
                show: false,
                showConfirme: false,
                selected: []
            });
        } else {
            this.setState({
                isLoading: false,
                show: false,
                showConfirme: false,
            });
        }
    };

    // life cycle of react calling when page is loading
    componentDidMount() {
        this.props.actions.getAllEmployees();
    }

    // this function when add new data and view modal
    showModal() {
        this.setState({
            show: true,
            textModal: "إضافة",
            objEmployee: {
                id: 0,
                employeeName: '',
                employeeAddress: '',
                employeePhone: '',
                salary: 0
            }
        });
    }

    // this function when close modal
    handleClose() {
        this.setState({
            showConfirme: false,
            show: false, 
        });
    }

    // this function when write any value  

    handleChange(e, feild) {

        let originalSup = this.state.objEmployee;
        originalSup[feild] = e.target.value;

        this.setState({
            objEmployee: originalSup
        });
    }

    // this function when submit value to calling api
    addEditEmployee = (values) => {
        this.setState({
            isLoading: true
        });
        this.props.actions.addEditEmployee(values);

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

        this.props.actions.deleteEmployees(this.state.selected[0]);

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
            objEmployee: {
                id: 0,
                employeeName: '',
                employeeAddress: '',
                employeePhone: '',
                salary: 0
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

                    let originalSup = this.state.objEmployee;

                    originalSup.id = rowInfo.original.id;
                    originalSup.employeeName = rowInfo.original.employeeName;
                    originalSup.employeeAddress = rowInfo.original.employeeAddress;
                    originalSup.employeePhone = rowInfo.original.employeePhone;
                    originalSup.salary = rowInfo.original.salary;
                    

                    this.setState({
                        objEmployee: originalSup,
                        textModal: "تعديل",
                        show: true
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
        return (
            <Fragment>
                <div className="main_content_container">
                    <div className="page_content">
                        <br />
                        <br />
                        <h1 className="heading_title">عرض كل الموظفين</h1>
                        {/* Button of Add new Document and delete Row in Grid */}
                        <div className="page-title-actions">
                            <Button size="lg" style={{ width: '80px', height: '35px' }} onClick={this.showModal.bind(this)}>إضافة</Button>
                            <Button size="lg" style={{ width: '80px', height: '35px' }} onClick={this.printcontent.bind(this)}>طباعة</Button>
                        </div>
                        <br /> 
                        <br />
                        <br />
                        {/* List Of Data */}
                        <ReactTable
                            data={this.props.listEmployee}
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
                        <Formik validationSchema={schema} onSubmit={(values) => { this.addEditEmployee(values) }}
                            initialValues={{
                                id: this.state.objEmployee.id,
                                employeeName: this.state.objEmployee.employeeName,
                                employeeAddress: this.state.objEmployee.employeeAddress,
                                employeePhone: this.state.objEmployee.employeePhone,
                                salary: this.state.objEmployee.salary
                            }}>
                            {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, }) => (
                                <Form noValidate onSubmit={handleSubmit} style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <Form.Group controlId="employeeName" >
                                        <Form.Label>إسم الموظف</Form.Label>
                                        <Form.Control type="text"
                                            style={{ height: "50px" }}
                                            placeholder="إسم الموظف"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="employeeName"
                                            value={values.employeeName}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.employeeName}
                                            autoComplete="off"
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                                            {errors.employeeName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="employeeAddress">
                                        <Form.Label>العنوان</Form.Label>
                                        <Form.Control
                                            style={{ height: "50px" }}
                                            type="text"
                                            placeholder="العنوان"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="employeeAddress"
                                            value={values.employeeAddress}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.employeeAddress}
                                            autoComplete="off"
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                                            {errors.employeeAddress}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="employeePhone">
                                        <Form.Label>الهاتف</Form.Label>
                                        <Form.Control
                                            style={{ height: "50px" }}
                                            type="text"
                                            placeholder="الهاتف"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="employeePhone"
                                            value={values.employeePhone}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.employeePhone}
                                            autoComplete="off"
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                                            {errors.employeePhone}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="salary">
                                        <Form.Label>المرتب</Form.Label>
                                        <Form.Control
                                            style={{ height: "50px" }}
                                            type="text"
                                            placeholder="المرتب"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="salary"
                                            value={values.salary}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.salary}
                                            autoComplete="off"
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                                            {errors.salary}
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
                  
                <div id="DivPrint" style={{ display: "none" }}>
                    <h1 className="heading_title">عرض كل الموظفين</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>إسم الموظف</th>
                                <th>العنوان</th>
                                <th>رقم الهاتف</th>
                                <th>المرتب</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.listEmployee.length > 0 ?
                                    this.props.listEmployee.map((item, i) => {
                                        return (<tr key={i}>
                                            <td>{item.employeeName}</td>
                                            <td>{item.employeeAddress}</td>
                                            <td>{item.employeePhone}</td>
                                            <td> {item.salary}</td> 
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
    listEmployee: state.reduces.listEmployee 
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
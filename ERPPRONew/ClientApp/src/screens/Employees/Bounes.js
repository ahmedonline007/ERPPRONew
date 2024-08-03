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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";


// validation of field
const schema = Yup.object({
    employeeName: Yup.string().required("برجاء إدخال إسم الموظف").max(200, "الحد الاقصى للكتابة 200 حرف فقط"),
    salary: Yup.string().required("برجاء إدخال الحوافز").max(200, "الحد الاقصى للكتابة 200 حرف فقط")
});


class Bounes extends Component {

    constructor(props) {

        super(props);

        if (!Config.IsAllow(88)) {
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
                            {
                                Config.IsAllow(93) ?
                                    <div>
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
                                    : null}
                        </div>
                    );
                },
                sortable: false,
                width: 100
            },
            {
                Header: <strong> إسم الموظف </strong>,
                accessor: 'employeeName',
                width: 200,
                filterable: true,
            },
            {
                Header: <strong>التاريخ</strong>,
                accessor: 'bounesDate',
                width: 150,
                filterable: true,
            },
            {
                Header: <strong>الحوافز</strong>,
                accessor: 'salary',
                width: 80,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong>الملاحظات</strong>,
                accessor: 'describtion',
                width: 180,
            }
        ];

        // initial value of state

        this.state = {
            show: false,
            textModal: "إضافة",
            objBounes: {
                id: 0,
                employeeName: '',
                bounesDate: '',
                describtion: '',
                salary: 0
            },
            employeeName: '',
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
        if (nextState.listBounes && nextState.listBounes.length > 0) {

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
        this.props.actions.getAllBounes();
        this.props.actions.getAllEmployeeForDrop();
    }

    // this function when add new data and view modal
    showModal() {
        this.setState({
            show: true,
            textModal: "إضافة",
            employeeName: '',
            startDate: new Date(),
            objBounes: {
                id: 0,
                employeeName: '',
                bounesDate: '',
                describtion: '',
                salary: 0
            },
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

        let originalSup = this.state.objBounes;
        originalSup[feild] = e.target.value;

        this.setState({
            objBounes: originalSup
        });
    }

    // this function when submit value to calling api
    addEditEmployee = (values) => {
        if (this.state.employeeName.value > 0) {

            this.setState({
                isLoading: true
            });

            var date = new Date(this.state.startDate);

            var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
                .toISOString()
                .split("T")[0];

            values.employeeId = this.state.employeeName.value;
            values.employeeName = this.state.employeeName.label;
            values.BounesDate = dateString;

            this.props.actions.addEditBounes(values);
        } else {
            toastr.error("برجاء اختيار موظف");
        }
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

        this.props.actions.deleteBounes(this.state.selected[0]);

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
            objBounes: {
                id: 0,
                employeeName: '',
                bounesDate: '',
                describtion: '',
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

                    let originalSup = this.state.objBounes;

                    originalSup.id = rowInfo.original.id;
                    originalSup.bounesDate = new Date(rowInfo.original.bounesDate);
                    originalSup.describtion = rowInfo.original.describtion;
                    originalSup.salary = rowInfo.original.salary;
                    originalSup.employeeName = { label: rowInfo.original.employeeName, value: rowInfo.original.employeeId };

                    this.setState({
                        objBounes: originalSup,
                        textModal: "تعديل",
                        employeeName: { label: rowInfo.original.employeeName, value: rowInfo.original.employeeId },
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

    handleChange(value) {
        let originalCategory = this.state.objBounes;
        originalCategory["employeeName"] = value;

        this.setState({
            objBounes: originalCategory,
            employeeName: value
        });
    }

    render() {
        return (
            <Fragment>
                <div className="main_content_container">
                    <div className="page_content">
                        <br />
                        <br />
                        <h1 className="heading_title">عرض الحوافز الموظفين</h1>
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
                            data={this.props.listBounes}
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
                        <Formik
                            onSubmit={(values) => { this.addEditEmployee(values) }}
                            initialValues={{
                                id: this.state.objBounes.id,
                                // employeeName: this.state.employeeName,
                                describtion: this.state.objBounes.describtion,
                                salary: this.state.objBounes.salary
                            }}>
                            {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, }) => (
                                <Form noValidate onSubmit={handleSubmit} style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <Form.Group controlId="employeeName">
                                        <Form.Label>الموظفين </Form.Label>
                                        <Select
                                            name="employeeName"
                                            id="employeeName"
                                            value={this.state.employeeName}
                                            onChange={(opt) => { this.handleChange(opt) }}
                                            options={this.props.listEmployeeforDrop}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="backendPageNameEng">
                                        <Form.Label>التاريخ</Form.Label>
                                        <DatePicker
                                            selected={this.state.startDate}
                                            dateFormat="yyyy/MM/dd"
                                            todayButton="اليوم"
                                            onChange={date => this.setState({
                                                startDate: date
                                            })} />
                                    </Form.Group>
                                    <Form.Group controlId="describtion">
                                        <Form.Label>الملاحظات</Form.Label>
                                        <Form.Control
                                            style={{ height: "50px" }}
                                            type="text"
                                            placeholder="الملاحظات"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="describtion"
                                            value={values.describtion}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.describtion}
                                            autoComplete="off"
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                                            {errors.describtion}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="salary">
                                        <Form.Label>قيمة الحوافز</Form.Label>
                                        <Form.Control
                                            style={{ height: "50px" }}
                                            type="text"
                                            placeholder="قيمة الحوافز"
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
                                <th>التاريخ</th>
                                <th>الملاحظات</th>
                                <th>قيمة السلف</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.listBounes.length > 0 ?
                                    this.props.listBounes.map((item, i) => {
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
    listBounes: state.reduces.listBounes,
    listEmployeeforDrop: state.reduces.listEmployeeforDrop,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Bounes);
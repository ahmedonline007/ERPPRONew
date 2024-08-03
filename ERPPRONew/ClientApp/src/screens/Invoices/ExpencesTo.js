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
import Delete from '../../Design/img/delete.png';
import Edit from '../../Design/img/edit.png';
import Config from "../../Config/Config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// validation of field
const schema = Yup.object({
    expencesToName: Yup.string().required("برجاء إدخال إسم المدخلات").max(200, "الحد الاقصى للكتابة 200 حرف فقط"),
    cost: Yup.number().required("برجاء إدخال التكلفة").min(0, "عفوا برجاء دفع قيمة التكلفة أكبر من صفر")
});

class ExpencesTo extends Component {

    constructor(props) {

        super(props);
        if (!Config.IsAllow(74)) {
            toastr.error("عفوا ليس لديك صلاحية لهذة الصفحة");
            this.props.history.push("/DashBoard");
        }
        // this is columns of Department
        this.cells = [
            {
                Header: "",
                id: "checkbox",
                accessor: "",
                width: 100,
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
            },
            {
                Header: <strong> المدخلات </strong>,
                accessor: 'expencesToName',
                width: 150,
                filterable: true,
            },
            {
                Header: <strong> التكاليف </strong>,
                accessor: 'cost',
                width: 180,
                filterable: true,
            },
            {
                Header: <strong> الملاحظات </strong>,
                accessor: 'description',
                width: 180,
                filterable: true,
            },
            {
                Header: <strong> التاريخ </strong>,
                accessor: 'date',
                width: 140
            } 
        ];

        // initial value of state

        this.state = {
            show: false,
            textModal: "إضافة",
            objExpences: {
                id: 0,
                description: '',
                cost: '',
                expencesToName: ''
            },
            selected: [],
            selectedRow: 0,
            isLoading: false,
            showConfirme: false,
            type: "",
            startDate: new Date(),
            lastDate: new Date(),
            firstDate: new Date(),
            listExpencesTo:[]
        }
    }

    // life cycle of react calling when any change of props
    componentWillReceiveProps(nextState, prevState) {
        if (nextState.listExpencesTo && nextState.listExpencesTo.length > 0) {

            this.setState({
                isLoading: false,
                show: false,
                selected: [],
                listExpencesTo: nextState.listExpencesTo
            });
        } else {
            this.setState({
                isLoading: false
            });
        }
    };

    // life cycle of react calling when page is loading
    componentDidMount() {
        this.props.actions.getAllExpencesTo();
    }

    // this function when add new data and view modal
    showModal() {
        this.setState({
            show: true,
            textModal: "إضافة",
            objExpences: {
                id: 0,
                description: '',
                cost: '',
                expencesToName: ''
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

        let originalSup = this.state.objExpences;
        originalSup[feild] = e.target.value;

        this.setState({
            objExpences: originalSup
        });
    }

    // this function when submit value to calling api
    addEditDocument = (values) => {

        this.setState({
            isLoading: true
        });

        values.expencesToName = values.expencesToName ;
        values.cost = parseFloat(values.cost);
        values.description = values.description;
        values.date = this.state.startDate ; 

        this.props.actions.AddEditExpencesTo(values);

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
            selected: selectedRows
        });
    }

    // this function when submit Delete item
    handleDelete = () => {
        this.props.actions.deleteExpencesTo(this.state.selected[0]);

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
                // if (objReadWrite.writeDoc || this.state.objUserInfo.isAdmin) {
                if ((e.target.className === "Edit" || e.target.className === "rt-td") && e.target.className !== "Add") {
                    let originalSup = this.state.objExpences;

                    originalSup.id = rowInfo.original.id;
                    originalSup.description = rowInfo.original.description;
                    originalSup.cost = rowInfo.original.cost;
                    originalSup.expencesToName = rowInfo.original.expencesToName;

                    this.setState({
                        objExpences: originalSup,
                        date: rowInfo.original.date,
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

        var date = new Date(this.state.firstDate);
        var date2 = new Date(this.state.lastDate);

        var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).getTime()//.toISOString()//.split("T")[0];
        var dateString2 = new Date(date2.getTime() - (date2.getTimezoneOffset() * 60000)).getTime()//.toISOString()//.split("T")[0];

        let result = this.props.listExpencesTo.filter(d => {
            var time = new Date(d.date).getTime();
            return (dateString <= time && time <= dateString2);
        });

        this.setState({
            listExpencesTo: result
        });
    }

    handleResetSearch = () => {
        this.setState({
            listExpencesTo: this.props.listExpencesTo
        });
    }
     

    render() {

        return (
            <Fragment>
                <div className="main_content_container">
                    <div className="page_content">
                        <br />
                        <br />
                        <h1 className="heading_title">عرض كل المدخلات</h1>

                        <br /><br />
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
                        <br /><br /> 
                        {/* Button of Add new Document and delete Row in Grid */}
                        <div className="page-title-actions">
                            <Button size="lg" style={{ width: '80px', height: '35px' }} onClick={this.showModal.bind(this)}>إضافة</Button>
                            <Button size="lg" style={{ width: '80px', height: '35px' }} onClick={this.printcontent.bind(this)}>طباعة</Button>
                            <Button size="lg" style={{ width: '80px', height: '35px' }} onClick={this.handleSearch}>بحث</Button>
                            <Button size="lg" style={{ width: '120px', height: '35px' }} onClick={this.handleResetSearch}>عرض الكل</Button>
                        </div>
                        <br />
                       
                        {/* List Of Data */}
                        <ReactTable
                            data={this.state.listExpencesTo}
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
                    <Modal.Body className="modal-header" style={{ marginTop: '110px' }}>
                        <Formik validationSchema={schema} onSubmit={(values) => { this.addEditDocument(values) }}
                            initialValues={{
                                id: this.state.objExpences.id,
                                description: this.state.objExpences.description,
                                expencesToName: this.state.objExpences.expencesToName,
                                cost: this.state.objExpences.cost || 0
                            }}>
                            {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
                                <Form noValidate onSubmit={handleSubmit} style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <Form.Group controlId="expencesToName" >
                                        <Form.Label>المدخلات</Form.Label>
                                        <Form.Control type="text"
                                            style={{ height: "50px" }}
                                            placeholder="المدخلات"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="expencesToName"
                                            value={values.expencesToName}
                                            onBlur={handleBlur}
                                            autoComplete="off"
                                            isInvalid={!!errors.expencesToName}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ display: 'inline-block', color: '#d92550' }}>
                                            {errors.expencesToName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="cost" >
                                        <Form.Label>التكاليف</Form.Label>
                                        <Form.Control type="text"
                                            placeholder="التكاليف"
                                            style={{ height: "50px" }}
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="cost"
                                            value={values.cost}
                                            onBlur={handleBlur}
                                            autoComplete="off"
                                            isInvalid={!!errors.cost}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ display: 'inline-block', color: '#d92550' }}>
                                            {errors.cost}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="description" >
                                        <Form.Label>الملاحظات</Form.Label>
                                        <Form.Control type="text"
                                            placeholder="الملاحظات"
                                            style={{ height: "50px" }}
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="description"
                                            value={values.description}
                                            onBlur={handleBlur}
                                            autoComplete="off"
                                            isInvalid={!!errors.description}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ display: 'inline-block', color: '#d92550' }}>
                                            {errors.description}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="priceSelling" >
                                        <Form.Label>التاريخ</Form.Label>
                                        <DatePicker
                                            selected={this.state.startDate}
                                            dateFormat="yyyy/MM/dd"
                                            //className="red-border"
                                            //minDate={new Date()}
                                            //showDisabledMonthNavigation
                                            todayButton="اليوم"
                                            onChange={date => this.setState({
                                                startDate: date
                                            })}  
                                        />
                                    </Form.Group>
                                    <br />
                                    <br />
                                    <br />
                                    <Col>
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
                                                <Button size="lg"  variant="success" type="submit" style={{ width: '80px', height: '35px' }}>
                                                    حفظ
                                                    </Button>}
                                        </div>
                                    </Col>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal>

                <div id="DivPrint" style={{ display: "none" }}>
                    <h1 className="heading_title">عرض كل المصاريف</h1>
                    <br />
                    <br />
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>المدخلات</th>
                                <th> التكاليف</th>
                                <th> الملاحظات</th>
                                <th>التاريخ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.listExpencesTo.length > 0 ?
                                    this.state.listExpencesTo.map((item, i) => {
                                        return (<tr key={i}>
                                            <td>{item.expencesToName}</td>
                                            <td>{item.cost}</td>
                                            <td>{item.description}</td>
                                            <td>{item.date}</td>
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
    listExpencesTo: state.reduces.listExpencesTo
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpencesTo);

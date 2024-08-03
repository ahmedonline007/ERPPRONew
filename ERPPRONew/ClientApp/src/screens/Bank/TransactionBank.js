import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { bindActionCreators } from "redux";
import Select from "react-select";
import { Form, Spinner, Button, Modal, OverlayTrigger, Tooltip, Table, Col } from 'react-bootstrap';
import ReactTable from '../renderData/renderData';
import { Formik } from "formik";
import * as Yup from "yup";
import toastr from 'toastr';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Config from "../../Config/Config";
import Delete from '../../Design/img/delete.png';
import Edit from '../../Design/img/edit.png';
import Confirme from '../Confirme/Confirme';


// validation of field
const schema = Yup.object({
    cost: Yup.number().required("برجاء قيمة السداد").min(0, "عفوا برجاء دفع قيمة السداد أكبر من صفر")
});


class TransactionBank extends Component {

    constructor(props) {

        super(props);

        if (!Config.IsAllow(82)) {
            toastr.error("عفوا ليس لديك صلاحية لهذة الصفحة");
            this.props.history.push("/DashBoard");
        }

        this.cells = [
            {
                Header: <strong> المبلغ </strong>,
                accessor: 'cost',
                width: 150,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            },
            {
                Header: <strong>التاريخ</strong>,
                accessor: 'transactionDate',
                width: 150
            }, {
                Header: <strong>ملاحظات</strong>,
                accessor: 'description',
                width: 250
            }, {
                Header: <strong>الحالة</strong>,
                accessor: 'transactionTypeName',
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
            show: false,
            objTransactionBank: {
                bankId: 0,
                cost: '',
                description: '',
                transactionType: 0
            },
            transactionDate: new Date(),
            id: 0,
            listTransactionBank: [],
            isLoading: false,
            showConfirme: false,
            selected: '',
            startDate: new Date(),
            finishDate: new Date(),
            bankId: '',
            transactionType: 0
        }
    }

    // life cycle of react calling when any change of props
    componentWillReceiveProps(nextState, prevState) {
        if (nextState.listTransactionBank && nextState.listTransactionBank.length > 0) {
            if (this.state.bankId != "") {

                this.props.actions.getCostBank(this.state.bankId.value);

                let ListPayed = nextState.listTransactionBank.filter(x => x.bankId == this.state.bankId.value);

                this.setState({
                    isLoading: false,
                    show: false,
                    listTransactionBank: ListPayed
                });
            } else {
                this.setState({
                    isLoading: false,
                    show: false,
                    bankId: '',
                    listTransactionBank: []
                });
            }
        } else {
            this.setState({
                isLoading: false,
                show: false,
                bankId: '',
                listTransactionBank: []
            });
        }
    };

    // life cycle of react calling when page is loading
    componentDidMount() {
        this.props.actions.getAllBankForDrop();
        this.props.actions.getTransactionBank();
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

                    let originalSup = this.state.objTransactionBank;

                    originalSup.cost = rowInfo.original.cost;
                    originalSup.description = rowInfo.original.description;
                    originalSup.transactionType = rowInfo.original.transactionType;

                    this.setState({
                        objTransactionBank: originalSup,
                        show: true,
                        id: rowInfo.original.id,
                        transactionType: rowInfo.original.transactionType,
                        transactionDate: new Date(rowInfo.original.transactionDate)
                    });
                }
            }
        };
    };

    handleChange(value) {
        let objRow = this.props.listTransactionBank.filter(x => x.bankId == value.value);

        if (objRow.length > 0) {

            objRow.forEach(item => {
                item.transactionDate = item.transactionDate.split("T")[0]
            });

            this.setState({
                listTransactionBank: objRow,
                bankId: value
            });

            this.props.actions.getCostBank(value.value);
        } else {
            toastr.error("لا يوجد بيانات");

            this.setState({
                bankId: value,
                listTransactionBank: []
            });
        }
    }

    EditCreditDepit(value) {
        if (this.state.transactionType === 0) {

            toastr.error("برجاء اختيار سحب ام ايداع ");

            return false;
        }

        value.cost = parseFloat(value.cost);

        if (value.cost <= 0) {
            toastr.error("عفوا برجاء دفع قيمة السداد أكبر من صفر ");
        } else {
            this.setState({
                isLoading: true
            });

            var date = new Date(this.state.transactionDate);

            var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
                .toISOString()
                .split("T")[0];

            value.transactionDate = dateString;
            value.cost = value.cost;
            value.id = this.state.id;
            value.bankId = this.state.bankId.value;
            value.description = value.description;
            value.transactionType = parseInt(this.state.transactionType);

            this.props.actions.AddEditTransactionBank(value);
        }
    }

    viewConfimeRowDelete = (id) => {

        this.setState({
            showConfirme: true,
            selected: id
        });
    }

    handleDelete = () => {
        this.props.actions.DeleteTransactionBnk(this.state.selected);

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
        if (this.state.bankId != "") {
            var date = new Date(this.state.startDate);
            var date2 = new Date(this.state.finishDate);

            var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).getTime()//.toISOString()//.split("T")[0];
            var dateString2 = new Date(date2.getTime() - (date2.getTimezoneOffset() * 60000)).getTime()//.toISOString()//.split("T")[0];

            let result = this.props.listTransactionBank.filter(d => {
                var time = new Date(d.transactionDate).getTime();
                return (dateString <= time && time <= dateString2 && d.bankId === this.state.bankId.value);
            });

            this.setState({
                listTransactionBank: result
            });
        } else {
            toastr.error("برجاء مراجعة البيانات");
        }
    }

    handleResetSearch = () => {
        let listTransaction = this.props.listTransactionBank.filter(x => x.customerId === this.state.customerId.value);

        listTransaction.map(item => {
            item.date = item.debtDate.split("T")[0]
        });

        this.setState({
            listTransactionBank: listTransaction
        });
    }

    handleChangeCheck = (e) => {
        let originalType = this.state.transactionType;

        originalType = e.target.value;

        this.setState({
            transactionType: originalType
        });
    }

    render() {
        return (
            <Fragment>
                <div className="main_content_container">
                    <div className="page_content">
                        <br />
                        <br />
                        <h1 className="heading_title">حركة البنك</h1>
                        {/* Button of Add new Document and delete Row in Grid */}
                        <div className="page-title-actions">
                            <Form.Group controlId="jobs">
                                <Form.Label>البنك</Form.Label>
                                <Select
                                    name="bankId"
                                    id="bankId"
                                    value={this.state.bankId}
                                    onChange={(opt) => { this.handleChange(opt) }}
                                    options={this.props.listBankForDrop}
                                />
                            </Form.Group>
                        </div>
                        {this.state.bankId != '' ?
                            <div className="page-title-actions">
                                <Button size="lg" style={{ width: '80px', height: '35px' }} onClick={() => {
                                    let objSupplier = this.state.objTransactionBank;
                                    objSupplier["cost"] = "";
                                    objSupplier["description"] = "";
                                    objSupplier["transactionType"] = 0;
                                    this.setState({ show: true, objTransactionBank: objSupplier, selected: '', id: 0, transactionDate: new Date() })
                                }}>إضافة</Button>
                            </div>
                            : null}
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
                        <br />  <br />   
                        <Button size="lg" style={{ width: '80px', height: '35px' }} onClick={this.printcontent1.bind(this)}>طباعة</Button>
                        <Button size="lg" style={{ width: '80px', height: '35px' }} onClick={this.handleSearch}>بحث</Button>
                        <Button size="lg" style={{ width: '120px', height: '35px' }} onClick={this.handleResetSearch}>عرض الكل</Button>
                        <br />
                        <br />
                        <div>
                            <Form.Group controlId="credit">
                                <Form.Label>رصيد البنك : </Form.Label>
                                <Form.Label>{this.props.objCreditDebitBank}</Form.Label>
                            </Form.Group>
                        </div>
                        <br />
                        <br />
                        {/* List Of Data */}
                        <ReactTable
                            data={this.state.listTransactionBank}
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
                                bankId: this.state.objTransactionBank.bankId,
                                cost: this.state.objTransactionBank.cost,
                                description: this.state.objTransactionBank.description
                            }}>
                            {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, }) => (
                                <Form noValidate onSubmit={handleSubmit} style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <Form.Group controlId="cost" >
                                        <Form.Label>قيمة السداد</Form.Label>
                                        <Form.Control type="text"
                                            style={{ height: "50px" }}
                                            placeholder="قيمة السداد"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="cost"
                                            value={values.cost}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.cost}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                                            {errors.cost}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="date" >
                                        <Form.Label>التاريخ</Form.Label>
                                        <DatePicker selected={this.state.transactionDate}
                                            dateFormat="yyyy/MM/dd"
                                            todayButton="اليوم"
                                            style={{ fontSize: "20px" }}
                                            onChange={date => this.setState({
                                                transactionDate: date
                                            })} />
                                    </Form.Group>
                                    <Form.Group controlId="description">
                                        <Form.Label>ملاحظات</Form.Label>
                                        <Form.Control type="text"
                                            style={{ height: "50px" }}
                                            placeholder="ملاحظات"
                                            onChange={handleChange}
                                            aria-describedby="inputGroupPrepend"
                                            name="description"
                                            value={values.description}
                                        />
                                    </Form.Group>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label as="legend" column xs={12}>
                                                النوع
                                            </Form.Label>
                                            <Col sm={10}>
                                                <Form.Check inline
                                                    type="radio"
                                                    value={1}
                                                    defaultChecked={this.state.transactionType === 1}
                                                    label="ايداع"
                                                    name="transactionType"
                                                    onChange={this.handleChangeCheck}
                                                />
                                                <Form.Check inline
                                                    type="radio"
                                                    value={2}
                                                    defaultChecked={this.state.transactionType === 2}
                                                    label="سحب"
                                                    name="transactionType"
                                                    onChange={this.handleChangeCheck}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Col>
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

                <Confirme show={this.state.showConfirme} handleClose={this.handleClose.bind(this)} handleDelete={this.handleDelete} />
              
                <div className="row" id="DivPrint1" style={{ display: "none" }}>
                    <h1 className="heading_title ">سداد الموردين </h1>
                    <div> البنك :  {this.state.bankId.label}</div>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>المبلغ</th>
                                <th>التاريخ</th>
                                <th>ملاحظات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*{this.state.listPayedOffDebt.length > 0 ?*/}
                            {/*    this.state.listPayedOffDebt.map((item, i) => {*/}
                            {/*        return (*/}
                            {/*            <tr key={i}>*/}
                            {/*                <td>{item.debt}</td>*/}
                            {/*                <td>{item.debtDate}</td>*/}
                            {/*                <td>{item.describtion}</td>*/}
                            {/*            </tr>*/}
                            {/*        )*/}
                            {/*    }) : null}*/}
                        </tbody>
                    </Table>
                </div>
            </Fragment>
        );
    }
}


const mapStateToProps = (state, ownProps) => ({
    listBankForDrop: state.reduces.listBankForDrop,
    listTransactionBank: state.reduces.listTransactionBank, 
    objCreditDebitBank: state.reduces.objCreditDebitBank,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionBank);

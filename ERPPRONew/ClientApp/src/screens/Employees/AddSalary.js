import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { bindActionCreators } from "redux";
import { Button, Table } from 'react-bootstrap';
import ReactTable from '../renderData/renderData';
import toastr from 'toastr';
import "react-datepicker/dist/react-datepicker.css";
import Config from "../../Config/Config";

class AddSalary extends Component {

    constructor(props) {

        super(props);

        if (!Config.IsAllow(87)) {
            toastr.error("عفوا ليس لديك صلاحية لهذة الصفحة");
            this.props.history.push("/DashBoard");
        }

        // this is columns of Department
        this.cells = [
            {
                Header: <strong> إسم الموظف </strong>,
                accessor: 'employeeName',
                width: 200,
                filterable: true,
            },
            {
                Header: <strong>المرتب</strong>,
                accessor: 'salary',
                width: 150,
                filterable: true,
            },
            {
                Header: <strong>الخصومات</strong>,
                accessor: 'descount',
                width: 150,
            },
            {
                Header: <strong>السلف</strong>,
                accessor: 'financialAdvance',
                width: 150,
            },
            {
                Header: <strong>صافى الراتب</strong>,
                accessor: 'actualSalary',
                width: 180,
            }
        ];

        // initial value of state

        this.state = {
            show: false,
            textModal: "إضافة",
            objVacations: {
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
            finishDate: new Date(),
            showSupplierInfo: false
        }
    }

    // life cycle of react calling when any change of props
    componentWillReceiveProps(nextState, prevState) {
        if (nextState.listEmployeeVacation && nextState.listEmployeeVacation.length > 0) {

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

    componentDidMount() {
        this.props.actions.AddSalary();
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
     
    saveSalary() {
        this.props.actions.saveSalary(this.props.listEmployeeSalary);
    }

    render() {

        let sumCredit = this.props.listEmployeeSalary.length > 0 ? this.props.listEmployeeSalary.map(x => x.actualSalary).reduce((a, c) => { return a + c }) : 0
        return (
            <Fragment>
                <div className="main_content_container">
                    <div className="page_content">
                        <br />
                        <br />
                        <h1 className="heading_title">عرض مرتبات الموظفين</h1>
                        {/* Button of Add new Document and delete Row in Grid */}
                        <br />
                        <br />
                        <br />
                        <br />
                        <div className="page-title-actions">
                            <label>مجموع المرتبات: {sumCredit.toFixed(2)}</label>
                        </div>
                        <br /> 
                        <br />
                        <div className="page-title-actions">
                            {/*<Button size="lg" style={{ width: '150px', height: '55px' }} onClick={this.handleSearch.bind(this)}>عرض المترتبات</Button>*/}
                            {this.props.listEmployeeSalary.length > 0 ? <Button size="lg" style={{ width: '80px', height: '55px' }} onClick={this.saveSalary.bind(this)}>حفظ</Button> : null}
                        </div>

                        <br />
                        {/* List Of Data */}
                        <ReactTable
                            data={this.props.listEmployeeSalary}
                            columns={this.cells}
                            defaultPageSize={40}
                        />
                    </div>
                </div>

                <div id="DivPrint" style={{ display: "none" }}>
                    <h1 className="heading_title">عرض كل أجازات الموظفين</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>إسم الموظف</th>
                                <th>تاريخ البداية</th>
                                <th>تاريخ النهاية</th>
                                <th>الملاحظات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*{*/}
                            {/*    this.props.listEmployeeSalary.length > 0 ?*/}
                            {/*        this.props.listEmployeeSalary.map((item, i) => {*/}
                            {/*            return (<tr key={i}>*/}
                            {/*                <td>{item.employeeName}</td>*/}
                            {/*                <td>{item.startVacation}</td>*/}
                            {/*                <td>{item.endVacation}</td>*/}
                            {/*                <td> {item.describtion}</td>*/}
                            {/*            </tr>)*/}
                            {/*        })*/}
                            {/*        : <tr></tr>*/}
                            {/*}*/}
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
    listEmployeeSalary: state.reduces.listEmployeeSalary
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSalary);
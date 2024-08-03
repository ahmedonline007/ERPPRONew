import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { bindActionCreators } from "redux";
import ReactTable from '../renderData/renderData';
import Config from "../../Config/Config";
import toastr from 'toastr';
import { Form, Button, Table, Modal } from 'react-bootstrap';
import Select from "react-select";

class Store extends Component {

    constructor(props) {

        super(props);
        if (!Config.IsAllow(61)) {
            toastr.error("عفوا ليس لديك صلاحية لهذة الصفحة");
            this.props.history.push("/DashBoard");
        }
        // this is columns of Department
        this.cells = [
            {
                Header: <strong> إسم المنتج </strong>,
                accessor: 'name',
                filterable: true,
                width: 250,
            },
            //{
            //    Header: <strong> سعر الشراء </strong>,
            //    accessor: 'priceSupplier',
            //    width: 120,
            //    Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            //}, {
            //    Header: <strong> سعر البيع </strong>,
            //    accessor: 'priceSelling',
            //    width: 120,
            //    Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            //},
            {
                Header: <strong> الكمية </strong>,
                accessor: 'qty',
                width: 120,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> سم</strong>,
                accessor: 'sumCentiString',
                width: 120,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> متر</strong>,
                accessor: 'sumMeter',
                width: 120,
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> النوع</strong>,
                accessor: 'typeText',
                filterable: true,
                width: 180,
            }
        ];

        this.cellsItems = [
            {
                Header: <strong> التخانة </strong>,
                accessor: 'size',
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> العرض </strong>,
                accessor: 'width',
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            },
            {
                Header: <strong> الطول </strong>,
                accessor: 'height',
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            },
            {
                Header: <strong> سم </strong>,
                accessor: '_centiString',
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> المتر </strong>,
                accessor: 'meter',
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> الر قم</strong>,
                accessor: 'code',
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            },
            {
                Header: <strong> العدد </strong>,
                accessor: 'qty',
                filterable: true,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }
        ];
        // initial value of state

        this.state = {
            show: false,
            textModal: "إضافة",
            objSupplier: {
                id: 0,
                name: '',
                address: '',
                phone: ''
            },
            selected: [],
            selectedRow: 0,
            isLoading: false,
            showConfirme: false,
            type: "",
            show: false,
            listItems: [],
            listProductsForStore: [],
            typeList: [{ label: "عرض الكل", value: null }, { label: "متر مكعب", value: true }, { label: "عدد", value: false }]
        }
    }

    // life cycle of react calling when any change of props
    componentWillReceiveProps(nextState, prevState) {
        if (nextState.listProductsForStore && nextState.listProductsForStore.length > 0) {

            this.setState({
                isLoading: false,
                show: false,
                selected: []
            });
        } else {
            this.setState({
                isLoading: false
            });
        }
    };

    // life cycle of react calling when page is loading
    componentDidMount() {
        this.props.actions.getAllProductForStore();
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

    handleChange(value) {
        if (value === null) {
            this.setState({
                listProductsForStore: this.props.listProductsForStore
            });
        }
        else {
            let listProduct = this.props.listProductsForStore.filter(x => x.type === value);

            if (listProduct.length > 0) {
                this.setState({
                    listProductsForStore: listProduct
                });
            } else {
                toastr.warning("عفوا بيانات فى المخزن على هذا الصنف !!");
            }
        }
    }


    // this function when close modal
    handleClose() {
        this.setState({
            show: false
        });
    }

    // this function when get value from grid to edit feild
    viewDetails = (state, rowInfo, column, instance) => {

        const { selection } = this.state;
        return {
            onClick: (e, handleOriginal) => {
                let items = this.props.listProductsForStore.find(x => x.productId === rowInfo.original.productId).listProductSize.filter(x => x.code != null);

                if (items.length > 0) {
                    this.setState({
                        show: true,
                        listItems: items
                    });
                } else {
                    toastr.warning("عفوا لا يوجد روابط لهذا الصنف !!");
                }
            }
        };
    };


    render() {

        return (
            <Fragment>
                <div className="main_content_container">
                    <div className="page_content">
                        <br />
                        <br />
                        <h1 className="heading_title">عرض كل  المخزن</h1>
                        {/* Button of Add new Document and delete Row in Grid */}
                        <br />
                        <br />
                        {/* Button of Add new Document and delete Row in Grid */}
                        <div className="page-title-actions">
                            <Form.Group controlId="jobs">
                                <Form.Label>النوع</Form.Label>
                                <Select
                                    name="type"
                                    id="type"
                                    onChange={(opt) => { this.handleChange(opt.value) }}
                                    options={this.state.typeList}
                                />
                            </Form.Group>
                        </div>
                        <br />
                        <div className="page-title-actions">
                            <Button size="lg" style={{ width: '80px', height: '35px' }} onClick={this.printcontent.bind(this)}>طباعة</Button>
                        </div>
                        <br />
                        {/* List Of Data */}
                        <ReactTable
                            data={this.state.listProductsForStore}
                            columns={this.cells}
                            defaultPageSize={this.state.pageSize}
                            getTrProps={this.viewDetails}
                            defaultPageSize={200}
                        />
                    </div>
                </div>

                <div id="DivPrint" style={{ display: "none" }}>
                    <h1 className="heading_title">عرض كل  المخزن</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>إسم المنتج</th>
                                <th>الكمية</th>
                                <th>سم</th>
                                <th>متر</th>
                                <th>النوع</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.listProductsForStore.length > 0 ?
                                    this.state.listProductsForStore.map((item, i) => {
                                        return (<tr key={i}>
                                            <td>{item.name}</td>
                                            <td>{item.qty}</td>
                                            <td>{item.sumCenti}</td>
                                            <td> {item.sumMeter}</td>
                                            <td> {item.typeText}</td>
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


                <Modal show={this.state.show} onHide={this.handleClose.bind(this)} style={{ opacity: 1, marginTop: '10%', fontWeight: "bold", fontSize: "25px" }}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className="modal-header" style={{ marginTop: '55%' }}>
                        <ReactTable
                            data={this.state.listItems}
                            columns={this.cellsItems}
                            defaultPageSize={20}
                        />  <br />
                        <br />
                        <br />
                    </Modal.Body>
                </Modal>
            </Fragment>
        );
    }
}


const mapStateToProps = (state, ownProps) => ({
    listProductsForStore: state.reduces.listProductsForStore
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Store);
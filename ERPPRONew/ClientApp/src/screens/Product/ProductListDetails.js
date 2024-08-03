import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { bindActionCreators } from "redux";
import Select from "react-select";
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ReactTable from '../renderData/renderData';
import toastr from 'toastr';
import Config from "../../Config/Config";
import Delete from '../../Design/img/delete.png';
import Confirme from '../Confirme/Confirme';


class ProductListDetails extends Component {

    constructor(props) {

        super(props);

        if (!Config.IsAllow(81)) {
            toastr.error("عفوا ليس لديك صلاحية لهذة الصفحة");
            this.props.history.push("/DashBoard");
        }

        this.cells = [
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
                        </div>
                    );
                },
                sortable: false
            },
            {
                Header: <strong>التخانة</strong>,
                accessor: 'size',
                width: 100,
                filterable: true
            },
            {
                Header: <strong>العرض</strong>,
                accessor: 'width',
                width: 100,
                filterable: true
            },
            {
                Header: <strong> الطول </strong>,
                accessor: 'height',
                width: 100,
                filterable: true
            },
            {
                Header: <strong>سم</strong>,
                accessor: 'centiString',
                width: 100,
                filterable: true
            },
            {
                Header: <strong>المتر</strong>,
                accessor: 'meter',
                width: 100,
                filterable: true
            }, {
                Header: <strong>الر قم</strong>,
                accessor: 'code',
                width: 150,
                filterable: true
            },
            {
                Header: <strong>العدد</strong>,
                accessor: 'qty',
                width: 100,
                filterable: true
            }
        ];

        // initial value of state
        this.state = {
            show: false,
            listProduct: [],
            isLoading: false,
            productId: '',
            showConfirme: false,
            selected: '',
            total: 0
        }
    }

    // life cycle of react calling when any change of props
    componentWillReceiveProps(nextState, prevState) {
        if (nextState.listProduct && nextState.listProduct.length > 0) {
            if (this.state.productId != "") {

                let ListPayed = nextState.listProduct.filter(x => x.productId == this.state.productId.value);
                 
                let total = 0

                ListPayed.map(i => {
                    let xx = i.meter + "." + i.centiString;
                    total += parseFloat(xx);
                });

                let _total = total.toString().split(".");

                let __total = "";

                if (_total.length == 1) {
                    __total = "0000";
                } else {
                    __total = _total[1].length == 4 ? _total[1] : (_total[1].length == 3 ? (_total[1] + "0") : (_total[1].length == 2 ? (_total[1] + "00") : (_total[1] + "000")));
                }

                total = _total[0] + "." + __total;

                total = parseFloat(total);
                this.setState({
                    total: total.toFixed(4),
                    isLoading: false,
                    show: false,
                    listProduct: ListPayed
                });
            } else {

                this.setState({
                    isLoading: false,
                    show: false,
                    customerId: '',
                    listProduct: []
                });
            }
        }
    };

    // life cycle of react calling when page is loading
    componentDidMount() {
        this.props.actions.getProductForDrop();
        this.props.actions.getProductDetails();
    }

    // this function when close modal
    handleClose() {
        this.setState({
            showConfirme: false,
            show: false
        });
    }

    viewConfimeRowDelete = (id) => {

        this.setState({
            showConfirme: true,
            selected: id
        });
    }

    handleChange(value) {
        let objRow = this.props.listProduct.filter(x => x.productId == value.value);

        if (objRow.length > 0) {

            let total = 0

            objRow.map(i => {
                let xx = i.meter + "." + i.centiString;
                total += parseFloat(xx);
            });

            let _total = total.toString().split(".");

            let __total = "";

            if (_total.length == 1) {
                __total = "0000";
            } else {
                __total = _total[1].length == 4 ? _total[1] : (_total[1].length == 3 ? (_total[1] + "0") : (_total[1].length == 2 ? (_total[1] + "00") : (_total[1] + "000")));
            }
              
            total = _total[0] + "." + __total;

            total = parseFloat(total);

            this.setState({
                total: total.toFixed(4),
                listProduct: objRow,
                productId: value
            });
        } else {
            toastr.error("لا يوجد بيانات");

            this.setState({
                productId: value,
                listProduct: []
            });
        }
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

    viewDelteProduct = () => {
        if (this.state.productId.value != "") {
            this.setState({
                listProduct: [],
                total: 0
            });
            this.props.actions.ResetProduct(this.state.productId.value);
        } else {
            toastr.error("برجاء اختيار المنتج");
        }
    }

    handleDelete = () => {
        this.props.actions.DeleteProductQty(this.state.selected);

        this.setState({
            show: false,
            showConfirme: false,
        });
    }
    render() {
        return (
            <Fragment>
                <div className="main_content_container">
                    <div className="page_content">
                        <br />
                        <br />
                        <h1 className="heading_title"> عرض تفاصيل أطوال منتج</h1>
                        {/* Button of Add new Document and delete Row in Grid */}
                        <div className="page-title-actions">
                            <Form.Group controlId="jobs">
                                <Form.Label>المنتج</Form.Label>
                                <Select
                                    name="productId"
                                    id="productId"
                                    value={this.state.productId}
                                    onChange={(opt) => { this.handleChange(opt) }}
                                    options={this.props.listProductsForDrop}
                                />
                            </Form.Group>
                        </div>
                        <br />
                        <br />
                        {Config.IsAllow(94) ? (this.state.productId != "" ?
                            <Button size="lg" style={{ width: '130px', height: '45px', marginRight: '5px' }} onClick={this.viewDelteProduct.bind(this)}>حذف الرصيد</Button>
                            : null) : null}
                        <br />
                        <br />
                        إجمالى العدد : {this.state.total}
                        <br />
                        <br />
                        {/* List Of Data */}
                        <ReactTable
                            data={this.state.listProduct}
                            columns={this.cells}
                            defaultPageSize={20}
                        />
                    </div>
                </div>
                <Confirme show={this.state.showConfirme} handleClose={this.handleClose.bind(this)} handleDelete={this.handleDelete} />
            </Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    listProductsForDrop: state.reduces.listProductsForDrop,
    listProduct: state.reduces.listProduct
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductListDetails);
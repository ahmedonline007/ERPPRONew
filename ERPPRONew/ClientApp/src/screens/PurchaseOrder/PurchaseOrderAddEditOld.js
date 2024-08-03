import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { bindActionCreators } from "redux";
import { Form, Spinner, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ReactTable from "../renderData/renderData";
import Select from "react-select";
import toastr from 'toastr'; 
import Delete from '../../Design/img/delete.png';

class PurchaseOrderAddEditOld extends Component {

    constructor(props) {

        super(props);

        // this is columns of Department
        this.cells = [
            {
                Header: "",
                id: "checkbox",
                accessor: "",
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
                        </div>
                    );
                },
                sortable: false,
                width: 80
            },
            {
                Header: <strong> إسم المنتج </strong>,
                accessor: 'productName',
                width: 200
            }, {
                Header: <strong> سعر الشراء </strong>,
                accessor: 'priceSupplier'
            }, {
                Header: <strong> سعر البيع </strong>,
                accessor: 'priceSelling'
            }, {
                Header: <strong> الطول</strong>,
                accessor: 'hight'
            }, {
                Header: <strong> العرض</strong>,
                accessor: 'width'
            }, {
                Header: <strong> التخانة</strong>,
                accessor: 'size'
            }, {
                Header: <strong> سم</strong>,
                accessor: 'centi'
            }, {
                Header: <strong> المتر </strong>,
                accessor: 'meter'
            }, {
                Header: <strong> الكود </strong>,
                accessor: 'code'
            }, {
                Header: <strong> الكمية </strong>,
                accessor: 'quantity'
            },
            {
                Header: <strong> الأجمالى</strong>,
                accessor: 'total'
            } 
        ];

        // initial value of state

        this.state = {
            show: false,
            textModal: "إضافة",
            objPurchaseOrder: {
                numberOfInvoiceSupplier: "",
                itemCount: 0,
                totalInvoice: 0,
                payed: 0,
                amount: 0,
                customerId: 0
            },
            priceSelling: '',
            priceSupplier: '',
            productId: '',
            objProductSize: {
                width: '',
                hight: '',
                code: '',
                size: '',
                quantity: '',
                meter: '',
                centi: ''
            },
            objProductNumber: {
                code: '',
                quantity: ''
            },
            selected: [],
            selectedRow: 0,
            isLoading: false,
            showConfirme: false,
            type: true,
            listItems: []
        }
    }

    // life cycle of react calling when any change of props
    componentWillReceiveProps(nextState, prevState) {
        if (nextState.isAdded === "Add") {
            this.props.history.push("/PurchaseOrder");
        }
    };

    // life cycle of react calling when page is loading
    componentDidMount() {
        this.props.actions.getSupplierCustomerForDrop(true);
        this.props.actions.getProductForDrop();
        this.props.actions.getProductForTransaction();
    }

    // this function when write any value  
    handleChange(value, feild) {

        let originalSup = this.state.objPurchaseOrder;
        originalSup[feild] = value;

        if (feild === "payed") {

            originalSup["amount"] = (parseFloat(originalSup["totalInvoice"]) - parseFloat(originalSup["payed"])).toFixed(2);

            originalSup["amount"] = parseFloat(originalSup["amount"]);

            if (value === NaN) {
                originalSup["amount"] = parseFloat(originalSup["totalInvoice"]);
            }
        }

        this.setState({
            objPurchaseOrder: originalSup
        });
    }

    handleChangePrice(e, feild) {

        if (feild === "priceSelling") {
            this.setState({
                priceSelling: parseFloat(e.target.value)
            });
        } else {
            this.setState({
                priceSupplier: parseFloat(e.target.value)
            });
        }
    }

    handleChangeProductSize(value, feild) {

        let originalSup = this.state.objProductSize;
        originalSup[feild] = value;

        this.setState({
            objProductSize: originalSup
        });
    }

    handleChangeProductNumber(e, feild) {

        let originalSup = this.state.objProductNumber;
        originalSup[feild] = e.target.value;

        this.setState({
            objProductNumber: originalSup
        });
    }

    // this function when Delete one item
    viewConfimeRowDelete = (id) => {

        let listItems = this.state.listItems;

        let findIndex = listItems.findIndex(x => x.id === id);

        listItems.splice(findIndex, 1);

        let original = this.state.objPurchaseOrder;

        if (listItems.length > 0) {

            let sum = listItems.map(o => o.total).reduce((a, c) => { return a + c });

            original["totalInvoice"] = sum;
            original["amount"] = sum;
        } else {
            original["totalInvoice"] = 0;
            original["amount"] = 0;
        }

        original["payed"] = 0;

        this.setState({
            objPurchaseOrder: original,
            listItems: [...listItems]
        });
    }

    handleDropDownChange(type, value) {
        if (type === "customerId") {
            let origin = this.state.objPurchaseOrder;

            origin["customerId"] = value;

            this.setState({
                objPurchaseOrder: origin
            });
        } else {
            this.setState({
                productId: value
            });
        }
    }

    handleDropDownChangeItem(value) {
        let objProduct = this.props.listProductsTransactions.find(x => x.id === value.value);

        if (objProduct.type === true) {
            this.setState({
                type: true,
                productId: value
            });
        } else {
            this.setState({
                type: false,
                productId: value
            });
        }
    }

    addNewProduct = () => {

        if (this.state.type === true) {
            if (this.state.productId !== '' && this.state.priceSelling !== "" && this.state.priceSupplier !== "" &&
                this.state.objProductSize.hight !== "" && this.state.objProductSize.width !== "" &&
                this.state.objProductSize.centi !== "" && this.state.objProductSize.meter !== "" &&
                this.state.objProductSize.size !== "") {

                const priceSelling = parseFloat(this.state.priceSelling);
                const priceSupplier = parseFloat(this.state.priceSupplier);

                if (priceSelling <= priceSupplier) {
                    toastr.warning("عفوا سعر البيع أقل من أو يساوى مبلغ الشراء");
                } else {

                    let list = [];

                    let objItems = this.state.objProductSize;

                    objItems.id = Math.random();
                    objItems.productId = this.state.productId.value;
                    objItems.productName = this.state.productId.label;
                    objItems.priceSelling = this.state.priceSelling;
                    objItems.priceSupplier = this.state.priceSupplier;
                    objItems.type = true;

                    const mearge = objItems.meter + "." + objItems.centi;

                    objItems.total = (parseFloat(this.state.priceSupplier) * parseFloat(mearge)).toFixed(2);

                    objItems.total = parseFloat(objItems.total)

                    list = [...this.state.listItems, objItems];

                    let sum = list.map(o => o.total).reduce((a, c) => { return a + c });

                    let original = this.state.objPurchaseOrder;

                    original["totalInvoice"] = sum;
                    original["amount"] = sum;

                    let objProductSize = {
                        width: '',
                        hight: '',
                        code: '',
                        size: '',
                        quantity: '',
                        meter: '',
                        centi: ''
                    }

                    this.setState({
                        listItems: list,
                        objPurchaseOrder: original,
                        priceSelling: '',
                        priceSupplier: '',
                        productId: '',
                        objProductSize
                    });

                }
            } else {
                toastr.warning("برجاء مراجعة البيانات الأساسية للصنف");
            }
        } else {
            if (this.state.productId !== '' && this.state.priceSelling !== "" && this.state.priceSupplier !== "" &&
                this.state.objProductNumber.code !== "" && this.state.objProductNumber.quantity !== "") {
                const priceSelling = parseFloat(this.state.priceSelling);
                const priceSupplier = parseFloat(this.state.priceSupplier);
                if (priceSelling <= priceSupplier) {
                    toastr.warning("عفوا سعر البيع أقل من أو يساوى مبلغ الشراء");
                } else {

                    let list = [];

                    let objItems = this.state.objProductNumber;

                    objItems.id = Math.random();
                    objItems.productId = this.state.productId.value;
                    objItems.productName = this.state.productId.label;
                    objItems.priceSelling = this.state.priceSelling;
                    objItems.priceSupplier = this.state.priceSupplier;
                    objItems.type = false;

                    objItems.width = 0;
                    objItems.hight = 0;
                    objItems.size = 0;
                    objItems.meter = 0;
                    objItems.centi = 0;

                    objItems.total = (parseFloat(this.state.priceSupplier) * parseFloat(objItems.quantity)).toFixed(2);

                    objItems.total = parseFloat(objItems.total);

                    list = [...this.state.listItems, objItems];

                    let sum = list.map(o => o.total).reduce((a, c) => { return a + c });

                    let original = this.state.objPurchaseOrder;

                    original["totalInvoice"] = sum;
                    original["amount"] = sum;

                    let objProductNumber = {
                        code: '',
                        quantity: ''
                    }

                    this.setState({
                        listItems: list,
                        objPurchaseOrder: original,
                        priceSelling: '',
                        priceSupplier: '',
                        productId: '',
                        objProductNumber
                    });
                }
            } else {
                toastr.warning("برجاء مراجعة البيانات الأساسية للصنف");
            }
        }
    }

    savePurchaseOrder = () => {
        if (this.state.listItems.length > 0 && this.state.customerId !== "") {

            this.setState({
                isLoading: true
            });

            let mainPurchaseOrder = this.state.objPurchaseOrder;
            mainPurchaseOrder.itemCount = this.state.listItems.length;
            mainPurchaseOrder.numberOfInvoiceSupplier = mainPurchaseOrder.numberOfInvoiceSupplier !== "" ? parseFloat(mainPurchaseOrder.numberOfInvoiceSupplier) : 0;
            mainPurchaseOrder.customerId = this.state.objPurchaseOrder.customerId.value;

            this.state.listItems.map(item => {
                item.priceSelling = parseFloat(item.priceSelling) || 0;
                item.priceSupplier = parseFloat(item.priceSupplier) || 0;
                item.hight = parseFloat(item.hight) || 0;
                item.width = parseFloat(item.width) || 0;
                item.size = parseFloat(item.size) || 0;
                item.centi = parseFloat(item.centi) || 0;
                item.meter = parseFloat(item.meter) || 0;
                item.quantity = parseFloat(item.quantity) || 0;

                delete item["id"];
            });

            this.props.actions.addPurchaseOrder(mainPurchaseOrder, this.state.listItems);
        } else {
            toastr.warning("برجاء مراجعة البيانات الأساسية للفاتورة");
        }
    }

    render() {
        return (
            <Fragment>
                <div>
                    <div style={{ height: '850px', overflowX: 'auto' }}>
                        <h1 className="heading_title">فاتورة مشتريات</h1>
                        <br />
                        <br />
                        {/* Button of Add new Document and delete Row in Grid */}
                        <div className="row">
                            <div className="col-md-4">
                                <Form.Group controlId="backendPageNameEng" >
                                    <Form.Label>عدد أصناف الفاتورة</Form.Label>
                                    <Form.Control type="text"
                                        readOnly
                                        value={this.state.listItems.length}
                                        placeholder="عدد أصناف الفاتورة"
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-4">
                                <Form.Group controlId="backendPageNameEng" >
                                    <Form.Label>رقم فاتورة المورد</Form.Label>
                                    <Form.Control type="number"
                                        placeholder="رقم فاتورة المورد"
                                        onChange={(e) => this.handleChange(e.target.value, "numberOfInvoiceSupplier")}
                                        value={this.state.objPurchaseOrder.numberOfInvoiceSupplier}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-4">
                                <Form.Group controlId="dept">
                                    <Form.Label>المورد</Form.Label>
                                    <Select
                                        name="customerId"
                                        id="customerId"
                                        value={this.state.objPurchaseOrder.customerId}
                                        onChange={(opt) => {
                                            this.handleDropDownChange("customerId", opt)
                                        }}
                                        options={this.props.listSupplierCustomerForDrop}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <h3>تفاصيل الفاتورة</h3>
                        <hr />
                        <div className="row">
                            <div className="col-md-4">
                                <Form.Group controlId="backendPageNameEng" >
                                    <Form.Label>سعر البيع</Form.Label>
                                    <Form.Control type="number"
                                        placeholder="سعر البيع"
                                        onChange={(e) => this.handleChangePrice(e, "priceSelling")}
                                        value={this.state.priceSelling}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-4">
                                <Form.Group controlId="backendPageNameEng" >
                                    <Form.Label>سعر الشراء</Form.Label>
                                    <Form.Control type="number"
                                        placeholder="سعر الشراء"
                                        onChange={(e) => this.handleChangePrice(e, "priceSupplier")}
                                        value={this.state.priceSupplier}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-4">
                                <Form.Group controlId="dept">
                                    <Form.Label>الصنف</Form.Label>
                                    <Select
                                        name="productId"
                                        id="productId"
                                        value={this.state.productId}
                                        onChange={(opt) => {
                                            this.handleDropDownChangeItem(opt);
                                        }}
                                        options={this.props.listProductsForDrop}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        {
                            this.state.type === true ?
                                <div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <Form.Group controlId="backendPageNameEng" >
                                                <Form.Label>التخانة</Form.Label>
                                                <Form.Control type="number"
                                                    placeholder="التخانة"
                                                    onChange={(e) => this.handleChangeProductSize(parseFloat(e.target.value), "size")}
                                                    value={this.state.objProductSize.size}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Group controlId="backendPageNameEng" >
                                                <Form.Label>العرض</Form.Label>
                                                <Form.Control type="number"
                                                    placeholder="العرض"
                                                    onChange={(e) => this.handleChangeProductSize(parseFloat(e.target.value), "width")}
                                                    value={this.state.objProductSize.width}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Group controlId="backendPageNameEng" >
                                                <Form.Label>الطول</Form.Label>
                                                <Form.Control type="number"
                                                    placeholder="الطول"
                                                    onChange={(e) => this.handleChangeProductSize(parseFloat(e.target.value), "hight")}
                                                    value={this.state.objProductSize.hight}
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <Form.Group controlId="backendPageNameEng" >
                                                <Form.Label>رقم المنتج</Form.Label>
                                                <Form.Control type="text"
                                                    placeholder="رقم المنتج"
                                                    onChange={(e) => this.handleChangeProductSize(e.target.value, "code")}
                                                    value={this.state.objProductSize.code}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Group controlId="backendPageNameEng" >
                                                <Form.Label>متر</Form.Label>
                                                <Form.Control type="number"
                                                    placeholder="متر"
                                                    onChange={(e) => this.handleChangeProductSize(parseFloat(e.target.value), "meter")}
                                                    value={this.state.objProductSize.meter}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Group controlId="backendPageNameEng" >
                                                <Form.Label>سم</Form.Label>
                                                <Form.Control type="number"
                                                    placeholder="سم"
                                                    onChange={(e) => this.handleChangeProductSize(parseFloat(e.target.value), "centi")}
                                                    value={this.state.objProductSize.centi}
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">

                                        </div>
                                        <div className="col-md-4">

                                        </div>
                                        <div className="col-md-4">
                                            <Form.Group controlId="backendPageNameEng" >
                                                <Form.Label>عدد</Form.Label>
                                                <Form.Control type="number"
                                                    placeholder="عدد"
                                                    onChange={(e) => this.handleChangeProductSize(parseFloat(e.target.value), "quantity")}
                                                    value={this.state.objProductSize.quantity}
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="row" >
                                    <div className="col-md-4">
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group controlId="backendPageNameEng" >
                                            <Form.Label>الكود</Form.Label>
                                            <Form.Control type="text"
                                                placeholder="الكود"
                                                onChange={(e) => this.handleChangeProductNumber(e, "code")}
                                                value={this.state.objProductNumber.code}
                                            />

                                        </Form.Group>
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group controlId="backendPageNameEng" >
                                            <Form.Label>الكمية</Form.Label>
                                            <Form.Control type="number"
                                                placeholder="الكمية"
                                                onChange={(e) => this.handleChangeProductNumber(e, "quantity")}
                                                value={this.state.objProductNumber.quantity}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                        }
                        <div className="row">
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <Button size="lg" onClick={this.addNewProduct}>إضافة منتج</Button>
                            </div>
                            <div className="col-md-4"></div>
                        </div>
                        <br />
                        <br />
                        <ReactTable data={this.state.listItems} columns={this.cells} defaultPageSize={20}/>
                        <div className="row">
                            <div className="col-md-6">

                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng" >
                                    <Form.Label>إجمالى الفاتورة</Form.Label>
                                    <Form.Control type="number"
                                        readOnly
                                        placeholder="إجمالى الفاتورة"
                                        onChange={(e) => this.handleChange(parseFloat(e.target.value), "totalInvoice")}
                                        value={this.state.objPurchaseOrder.totalInvoice}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng" >
                                    <Form.Label>المتبقى</Form.Label>
                                    <Form.Control type="number"
                                        placeholder="المتبقى"
                                        onChange={(e) => this.handleChange(parseFloat(e.target.value), "amount")}
                                        value={this.state.objPurchaseOrder.amount}
                                    />
                                </Form.Group></div>
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng" >
                                    <Form.Label>المدفوع</Form.Label>
                                    <Form.Control type="number"
                                        placeholder="المدفوع"
                                        onChange={(e) => this.handleChange(parseFloat(e.target.value), "payed")}
                                        value={this.state.objPurchaseOrder.payed}
                                    />
                                </Form.Group></div>
                        </div>

                        <div className="row" style={{ paddingLeft: '30%' }}>
                            <div className="col-md-4">
                                <Button size="lg" onClick={() => this.props.history.push("/PurchaseOrder")}>الخروج</Button>
                            </div>
                            {this.state.isLoading ?
                                <div className="col-md-4">
                                    <Button disabled size="lg" >
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                      تحميل
                                    </Button>
                                </div>
                                :
                                <div className="col-md-4">
                                    <Button size="lg" onClick={this.savePurchaseOrder}>حفظ الفاتورة</Button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}


const mapStateToProps = (state, ownProps) => ({
    listSupplierCustomerForDrop: state.reduces.listSupplierCustomerForDrop,
    listProductsForDrop: state.reduces.listProductsForDrop,
    listProductsTransactions: state.reduces.listProductsTransactions,
    isAdded: state.reduces.isAdded
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrderAddEditOld); 

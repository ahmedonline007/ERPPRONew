import React, { Component, Fragment } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { bindActionCreators } from "redux";
import { Form, Spinner, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ReactTable from "../renderData/renderData";
import Select from "react-select";
import toastr from 'toastr';
import Delete from '../../Design/img/delete.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class PurchaseOrderAddEditClient extends Component {

    constructor(props) {

        super(props);

        // this is columns of Department

        this.cells1 = [
            {
                Header: "حذف",
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
                                    onClick={() => this.viewConfimeRowDelete1(rowInfo.original.id)}
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
            },
            {
                Header: <strong> ألواح</strong>,
                accessor: 'totalQty',
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>,
                width: 100
            },
            {
                Header: <strong> البوصة</strong>,
                accessor: 'sizewidth',
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>,
                width: 100
            },
            {
                Header: <strong> البيان</strong>,
                accessor: 'qtyheight',
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>,
                width: 600
            },
            {
                Header: <strong> المكعب</strong>,
                accessor: 'totalSize',
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>,
                width: 100
            },
            //, {
            //    Header: <strong> المتر </strong>,
            //    accessor: 'meter',
            //    Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            //}, {
            //    Header: <strong> الكود </strong>,
            //    accessor: 'code',
            //    Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            //}, {
            //    Header: <strong> الكمية </strong>,
            //    accessor: 'quantity',
            //    Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            //},
            
        ];

        this.cells2 = [
            {
                Header: "حذف",
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
                                    onClick={() => this.viewConfimeRowDelete2(rowInfo.original.id)}
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
                Header: <strong> الطول</strong>,
                accessor: 'hight',
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> العرض</strong>,
                accessor: 'width',
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> التخانة</strong>,
                accessor: 'size',
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> سم</strong>,
                accessor: 'centi',
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> المتر </strong>,
                accessor: 'meter',
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> الكود </strong>,
                accessor: 'code',
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> الكمية </strong>,
                accessor: 'quantity',
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            } 
        ];

        this.cells3 = [
            {
                Header: "حذف",
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
                                    onClick={() => this.viewConfimeRowDelete3(rowInfo.original.id)}
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
                Header: <strong> الكود </strong>,
                accessor: 'code',
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>,
                width: 200
            }, {
                Header: <strong> الكمية </strong>,
                accessor: 'quantity',
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>,
                width: 200
            } 
        ];

        // initial value of state

        this.state = {
            show: false,
            textModal: "إضافة",
            objPurchaseOrder: {
                numberOfInvoiceSupplier: "",
                description: "",
                itemCount: 0,
                totalInvoice: 0,
                payed: 0,
                amount: 0,
                customerId: 0
            },
            priceSelling: 0,
            priceSupplier: 0,
            productId: '',
            productId2: '',
            productId3: '',
            objProductSize: {
                width: "",
                hight: "",
                code: "",
                size: "",
                quantity: "",
                meter: "",
                centi: "",
                totalQty: "",
                sizewidth: "",
                qtyheight: "",
                totalSize: ""
            },
            objProductNumber: {
                code: "",
                quantity: ""
            },
            selected: [],
            selectedRow: 0,
            isLoading: false,
            showConfirme: false,
            type: true,
            listItems1: [],
            listItems2: [],
            listItems3: [],
            listSaveItems: [],
            totalQty: 0,
            totalSize: 0,
            totalQty1: 0,
            totalQty2: 0,
            totalSize1: 0,
            tabIndex: 0,
            startDate: new Date()
        }
    }

    // life cycle of react calling when any change of props
    componentWillReceiveProps(nextState, prevState) {
        if (nextState.isAdded === "Add") {
            this.props.history.push("/PurchaseOrderClient");
        }
    };

    // life cycle of react calling when page is loading
    componentDidMount() {
        this.props.actions.getProductForDrop();
        //  this.props.actions.getProductForTransaction();
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
    viewConfimeRowDelete1 = (id) => {

        let listItems = this.state.listItems1;

        let findIndex = listItems.findIndex(x => x.id === id);

        // let listSaveItems = this.state.listSaveItems.filter(x => x.code == "" && x.productId != listItems[findIndex].productId);

        let listSaveItems = this.state.listSaveItems.filter(x => x.id != id);

        //let listSaveItems = this.state.listSaveItems.find(x => x.id === id);

        let totalQty = this.state.totalQty;
        let totalSize = this.state.totalSize;

        totalQty = totalQty - parseFloat(listItems[findIndex].totalQty);
        totalSize = (totalSize - parseFloat(listItems[findIndex].totalSize)).toFixed(4) || 0;

        listItems.splice(findIndex, 1);

        let original = this.state.objPurchaseOrder;

        if (listItems.length > 0) {

            let sum = listItems.map(o => o.total).reduce((a, c) => { return a + c });

            original["totalInvoice"] = sum;
            original["amount"] = sum;
        }
        else {
            original["totalInvoice"] = 0;
            original["amount"] = 0;
        }

        original["payed"] = 0;

        this.setState({
            listSaveItems: listSaveItems,
            objPurchaseOrder: original,
            totalSize,
            totalQty,
            listItems1: [...listItems]
        });
    }

    viewConfimeRowDelete2 = (id) => {

        let listItems = this.state.listItems2;

        let findIndex = listItems.findIndex(x => x.id === id);

        const _totalSize = parseFloat(parseFloat(listItems[findIndex].meter) + parseFloat(listItems[findIndex].centi));

        //let listSaveItems = this.state.listSaveItems.filter(x => x.code != "" && x.productId != listItems[findIndex].productId);

        let listSaveItems = this.state.listSaveItems.filter(x => x.id != id);

        //let listSaveItems = this.state.listSaveItems.find(x => x.id === id);

        let totalQty = this.state.totalQty1;
        let totalSize = this.state.totalSize1;

        totalQty = totalQty - parseFloat(listItems[findIndex].quantity);
        totalSize = (totalSize - parseFloat(_totalSize)).toFixed(4) || 0;

        listItems.splice(findIndex, 1);

        let original = this.state.objPurchaseOrder;

        if (listItems.length > 0) {

            let sum = listItems.map(o => o.total).reduce((a, c) => { return a + c });

            original["totalInvoice"] = sum;
            original["amount"] = sum;
        }
        else {
            original["totalInvoice"] = 0;
            original["amount"] = 0;
        }

        original["payed"] = 0;

        this.setState({
            listSaveItems: listSaveItems,
            objPurchaseOrder: original,
            listItems2: [...listItems],
            totalSize1: totalSize,
            totalQty1: totalQty,
        });
    }

    viewConfimeRowDelete3 = (id) => {

        let listItems = this.state.listItems3;

        let findIndex = listItems.findIndex(x => x.id === id);

        let totalQty2 = this.state.totalQty2;

        totalQty2 = totalQty2 - parseFloat(listItems[findIndex].quantity);

        listItems.splice(findIndex, 1);

        let listSaveItems = this.state.listSaveItems.filter(x => x.id != id);

        let original = this.state.objPurchaseOrder;

        if (listItems.length > 0) {

            let sum = listItems.map(o => o.total).reduce((a, c) => { return a + c });

            original["totalInvoice"] = sum;
            original["amount"] = sum;
        }
        else {
            original["totalInvoice"] = 0;
            original["amount"] = 0;
        }

        original["payed"] = 0;

        this.setState({
            listSaveItems: listSaveItems,
            totalQty2,
            objPurchaseOrder: original,
            listItems3: [...listItems]
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
        let obj = this.state.objProductSize;
        obj["width"] = "";
        obj["size"] = "";
        obj["quantity"] = "";
        obj["hight"] = "";

        this.setState({
            productId: value,
            objProductSize: obj
        });
    }

    handleDropDownChangeItem2(value) {
        let obj = this.state.objProductSize;
        obj["width"] = "";
        obj["size"] = "";
        obj["quantity"] = "";
        obj["hight"] = "";

        this.setState({
            productId2: value,
            objProductSize: obj
        });
    }

    handleDropDownChangeItem3(value) {
        let obj = this.state.objProductSize;
        obj["width"] = "";
        obj["size"] = "";
        obj["quantity"] = "";
        obj["hight"] = "";

        this.setState({
            productId3: value,
            objProductSize: obj
        });
    }

    addNewProduct = () => {
        //اضافة رابطة برقم
        if (this.state.tabIndex === 1 && this.state.productId2 !== '' && this.state.objProductSize.code !== "" &&
            this.state.objProductSize.centi !== "" && this.state.objProductSize.meter !== "") {

            let list = [];
            let totalQty1 = parseFloat(this.state.totalQty1);
            let totalSize1 = parseFloat(this.state.totalSize1);

            this.state.objProductSize.centi = ("." + this.state.objProductSize.centi);

            const totalSize = parseFloat(parseFloat(this.state.objProductSize.meter) + parseFloat(this.state.objProductSize.centi));

            totalQty1 = (totalQty1 + parseFloat(this.state.objProductSize.quantity));

            totalSize1 = (totalSize1 + totalSize);

            totalSize1 = totalSize1.toFixed(4);

            let objItems = this.state.objProductSize;

            objItems.id = Math.random();
            objItems.productId = this.state.productId2.value;
            objItems.productName = this.state.productId2.label;
            objItems.priceSelling = this.state.priceSelling;
            objItems.priceSupplier = this.state.priceSupplier;
            objItems.type = true;

            list = [...this.state.listItems2, objItems];
            const listSaveItems = [...this.state.listSaveItems, objItems];


            let objProductSize = {
                width: this.state.objProductSize.width,
                hight: "",
                code: "",
                size: this.state.objProductSize.size,
                quantity: "",
                meter: "",
                centi: ""
            }

            this.setState({
                totalQty1,
                totalSize1,
                listItems2: list,
                listSaveItems,
                priceSelling: 0,
                priceSupplier: 0,
                objProductSize
            });
        }
        //اضافة تكعيب
        else if (this.state.tabIndex === 0 && this.state.productId !== '' && this.state.objProductSize.hight !== "" &&
            this.state.objProductSize.width !== "" && this.state.objProductSize.size !== "" && this.state.objProductSize.quantity !== "") {

            let list = [];

            let width = this.state.objProductSize.width < 100 ? ("0.0" + this.state.objProductSize.width) : ("0." + this.state.objProductSize.width);

            let size = this.state.objProductSize.size < 100 ? ("0.0" + this.state.objProductSize.size) : ("0." + this.state.objProductSize.size);

            //let hight = this.state.objProductSize.hight < 100 ? ("0." + this.state.objProductSize.hight.toString()) :   (hight.substring(0, 1) + "." +hight.substring(1, hight.length));

           // let hight = this.state.objProductSize.hight.toString();

            //hight = hight.substring(0, 1) + "." + hight.substring(1, hight.length);

            let lasthight = this.state.objProductSize.hight.toString();

            lasthight = lasthight.substring(0, 1) + "." + lasthight.substring(1, lasthight.length);

            let hight = this.state.objProductSize.hight < 100 ? ("0." + this.state.objProductSize.hight.toString()) : lasthight;

            let totalCubing = (parseFloat(hight).toFixed(3) * parseFloat(size).toFixed(3) * parseFloat(width).toFixed(3) * this.state.objProductSize.quantity).toFixed(4);

            let FixedCubing = totalCubing.toString();

            const centi = ("0." + FixedCubing.split(".")[1].substr(0, 4));
            const meter = FixedCubing.split(".")[0];

            let totalQty = parseFloat(this.state.totalQty);
            let totalSize = parseFloat(this.state.totalSize);

            totalSize += parseFloat(totalCubing);
            totalQty += parseFloat(this.state.objProductSize.quantity);

            totalSize = totalSize.toFixed(4);

            //فى حالة ان المنتج موجود من قبل
            if (this.state.listItems1.length > 0) {

                const isExist = this.state.listItems1.find(x => x.productId == this.state.productId.value && x.code == "" && x.width == this.state.objProductSize.width && x.size == this.state.objProductSize.size);

                if (isExist != null) {

                    let objItems = this.state.objProductSize;

                    objItems.id = Math.random();
                    objItems.productId = this.state.productId.value;
                    objItems.centi = centi;
                    objItems.meter = meter;
                    objItems.productName = this.state.productId.label;
                    objItems.priceSelling = this.state.priceSelling;
                    objItems.priceSupplier = this.state.priceSupplier;
                    objItems.totalQty = isExist.totalQty + this.state.objProductSize.quantity;
                    objItems.sizewidth = this.state.objProductSize.width + "/" + this.state.objProductSize.size;
                    objItems.qtyheight = isExist.qtyheight + "   -  " + this.state.objProductSize.quantity + "/" + this.state.objProductSize.hight;
                    objItems.totalSize = (parseFloat(isExist.totalSize) + parseFloat(FixedCubing)).toFixed(4);
                    objItems.type = true;

                    // list = [...this.state.listItems, objItems];
                    const listSaveItems = [...this.state.listSaveItems, objItems];

                    const findindex = this.state.listItems1.findIndex(x => x.productId == this.state.productId.value && x.code == "" && x.width == this.state.objProductSize.width && x.size == this.state.objProductSize.size);

                    list = this.state.listItems1;
                    list[findindex] = objItems;

                    list = [...list];

                    let objProductSize = {
                        width: this.state.objProductSize.width,
                        hight: "",
                        code: "",
                        size: this.state.objProductSize.size,
                        quantity: "",
                        meter: "",
                        centi: ""
                    }

                    this.setState({
                        listItems1: list,
                        priceSelling: 0,
                        priceSupplier: 0,
                        listSaveItems,
                        objProductSize,
                        totalSize,
                        totalQty
                    });
                }
                else {
                    let objItems = this.state.objProductSize;

                    objItems.id = Math.random();
                    objItems.productId = this.state.productId.value;
                    objItems.centi = centi;
                    objItems.meter = meter;
                    objItems.productName = this.state.productId.label;
                    objItems.priceSelling = this.state.priceSelling;
                    objItems.priceSupplier = this.state.priceSupplier;
                    objItems.type = true;
                    objItems.totalQty = this.state.objProductSize.quantity;
                    objItems.sizewidth = this.state.objProductSize.width + "/" + this.state.objProductSize.size;
                    objItems.qtyheight = this.state.objProductSize.quantity + "/" + this.state.objProductSize.hight;
                    objItems.totalSize = parseFloat(FixedCubing).toFixed(4);

                    list = [...this.state.listItems1, objItems];
                    const listSaveItems = [...this.state.listSaveItems, objItems];

                    let objProductSize = {
                        width: this.state.objProductSize.width,
                        hight: "",
                        code: "",
                        size: this.state.objProductSize.size,
                        quantity: "",
                        meter: "",
                        centi: ""
                    }

                    this.setState({
                        listItems1: list,
                        priceSelling: 0,
                        priceSupplier: 0,
                        listSaveItems,
                        objProductSize,
                        totalSize,
                        totalQty
                    });
                }
            }
            //فى حالة اضافة منتج اول مرة
            else {

                let objItems = this.state.objProductSize;

                objItems.id = Math.random();
                objItems.productId = this.state.productId.value;
                objItems.centi = centi;
                objItems.meter = meter;
                objItems.productName = this.state.productId.label;
                objItems.priceSelling = this.state.priceSelling;
                objItems.priceSupplier = this.state.priceSupplier;
                objItems.totalQty = this.state.objProductSize.quantity;
                objItems.sizewidth = this.state.objProductSize.width + "/" + this.state.objProductSize.size;
                objItems.qtyheight = this.state.objProductSize.quantity + "/" + this.state.objProductSize.hight;
                objItems.totalSize = parseFloat(FixedCubing).toFixed(4);
                objItems.type = true;

                list = [...this.state.listItems1, objItems];
                const listSaveItems = [...this.state.listSaveItems, objItems];

                let objProductSize = {
                    width: this.state.objProductSize.width,
                    hight: "",
                    code: "",
                    size: this.state.objProductSize.size,
                    quantity: "",
                    meter: "",
                    centi: ""
                }

                this.setState({
                    listItems1: list,
                    priceSelling: 0,
                    priceSupplier: 0,
                    listSaveItems,
                    objProductSize,
                    totalSize,
                    totalQty
                });
            }
        }
        //اضافة عدد
        else if (this.state.tabIndex === 2 && this.state.productId3 !== '' && this.state.objProductNumber.quantity !== "") {

            let list = [];

            let objItems = this.state.objProductNumber;

            let totalQty2 = parseFloat(this.state.totalQty2);

            totalQty2 = totalQty2 + parseFloat(this.state.objProductNumber.quantity);

            objItems.id = Math.random();
            objItems.productId = this.state.productId3.value;
            objItems.productName = this.state.productId3.label;
            objItems.priceSelling = this.state.priceSelling;
            objItems.priceSupplier = this.state.priceSupplier;
            objItems.type = false;

            objItems.width = "";
            objItems.hight = "";
            objItems.size = "";
            objItems.meter = "";
            objItems.centi = "";

            list = [...this.state.listItems3, objItems];
            const listSaveItems = [...this.state.listSaveItems, objItems];

            let objProductNumber = {
                code: "",
                quantity: ""
            }

            this.setState({
                totalQty2,
                listItems3: list,
                listSaveItems,
                priceSelling: '',
                priceSupplier: '',
                productId3: '',
                objProductNumber
            });
        }
        else {
            toastr.warning("برجاء مراجعة البيانات الأساسية للصنف");
        }
    }

    savePurchaseOrder = () => {
        if (this.state.listSaveItems.length > 0 && this.state.objPurchaseOrder.numberOfInvoiceSupplier !== "") {

            this.setState({
                isLoading: true
            });

            let mainPurchaseOrder = this.state.objPurchaseOrder;
            mainPurchaseOrder.itemCount = this.state.listSaveItems.length;
            mainPurchaseOrder.numberOfInvoiceSupplier = mainPurchaseOrder.numberOfInvoiceSupplier !== "" ? parseFloat(mainPurchaseOrder.numberOfInvoiceSupplier) : 0;
            mainPurchaseOrder.customerId = this.state.objPurchaseOrder.customerId.value;

            var date = new Date(this.state.startDate);

            var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];

            mainPurchaseOrder.date = dateString;

            this.state.listSaveItems.map(item => {
                item.priceSelling = parseFloat(item.priceSelling) || 0;
                item.priceSupplier = parseFloat(item.priceSupplier) || 0;
                item.hight = parseFloat(item.hight) || 0;
                item.width = parseFloat(item.width) || 0;
                item.size = parseFloat(item.size) || 0;
                item.centi = item.centi.toString() === "" ? "0" : (item.centi.toString());
                item.meter = parseFloat(item.meter) || 0;
                item.quantity = parseFloat(item.quantity) || 0;

                delete item["id"];
            });

            this.props.actions.addPurchaseOrderByClient(mainPurchaseOrder, this.state.listSaveItems);
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
                        <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                            <div className="col-md-4">
                                <Form.Group controlId="backendPageNameEng" >
                                    <Form.Label>الملاحظات</Form.Label>
                                    <Form.Control type="text"
                                        style={{ height: "50px" }}
                                        value={this.state.objPurchaseOrder.description}
                                        onChange={(e) => this.handleChange(e.target.value, "description")}
                                        placeholder="الملاحظات"
                                        autoComplete="off"
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-4">
                                <Form.Group controlId="date" >
                                    <Form.Label>التاريخ</Form.Label>
                                    <DatePicker selected={this.state.startDate}
                                        dateFormat="yyyy/MM/dd"
                                        todayButton="اليوم"
                                        onChange={date => this.setState({
                                            startDate: date
                                        })} />
                                </Form.Group>
                            </div>
                            <div className="col-md-4" >
                                <Form.Group controlId="backendPageNameEng" >
                                    <Form.Label>رقم القسيمة</Form.Label>
                                    <Form.Control type="number"
                                        style={{ height: "50px" }}
                                        autoComplete="off"
                                        placeholder="رقم القسيمة"
                                        onChange={(e) => this.handleChange(e.target.value, "numberOfInvoiceSupplier")}
                                        value={this.state.objPurchaseOrder.numberOfInvoiceSupplier}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <h3>تفاصيل الفاتورة</h3>
                        <hr />
                        <Tabs selectedIndex={this.state.tabIndex} onSelect={index => this.setState({ tabIndex: index })}>
                            <TabList>
                                <Tab>متر مكعب</Tab>
                                <Tab>رابطة برقم</Tab>
                                <Tab>عدد</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <div className="col-md-4">
                                    </div>
                                    <div className="col-md-4">
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
                                <div>
                                    <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                        <div className="col-md-4">

                                        </div>
                                        <div className="col-md-4">
                                            <Form.Group controlId="backendPageNameEng">
                                                <Form.Label>العرض</Form.Label>
                                                <Form.Control type="number"
                                                    style={{ height: "50px" }}
                                                    autoComplete="off"
                                                    placeholder="العرض"
                                                    onChange={(e) => this.handleChangeProductSize(parseFloat(e.target.value), "width")}
                                                    value={this.state.objProductSize.width}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Group controlId="backendPageNameEng">
                                                <Form.Label>التخانة</Form.Label>
                                                <Form.Control type="number"
                                                    style={{ height: "50px" }}
                                                    placeholder="التخانة"
                                                    autoComplete="off"
                                                    onChange={(e) => this.handleChangeProductSize(parseFloat(e.target.value), "size")}
                                                    value={this.state.objProductSize.size}
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                        <div className="col-md-4">
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Group controlId="backendPageNameEng">
                                                <Form.Label>عدد</Form.Label>
                                                <Form.Control type="number"
                                                    placeholder="عدد"
                                                    style={{ height: "50px" }}
                                                    autoComplete="off"
                                                    onChange={(e) => this.handleChangeProductSize(parseFloat(e.target.value), "quantity")}
                                                    value={this.state.objProductSize.quantity}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Group controlId="backendPageNameEng">
                                                <Form.Label>الطول</Form.Label>
                                                <Form.Control type="number"
                                                    placeholder="الطول"
                                                    style={{ height: "50px" }}
                                                    autoComplete="off"
                                                    onChange={(e) => this.handleChangeProductSize(parseFloat(e.target.value), "hight")}
                                                    value={this.state.objProductSize.hight}
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <Button size="lg" onClick={this.addNewProduct}>إضافة منتج</Button>
                                    </div>
                                    <div className="col-md-4"></div>
                                </div>
                                <br />
                                <br />
                                <ReactTable data={this.state.listItems1} columns={this.cells1} defaultPageSize={20} />
                                <br />
                                <br />
                                <br />
                                <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <div className="col-md-4">
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group controlId="backendPageNameEng">
                                            <Form.Label>إجمالى المتر المكعب</Form.Label>
                                            <Form.Control type="number"
                                                style={{ height: "50px" }}
                                                placeholder="إجمالى المتر المكعب"
                                                autoComplete="off"
                                                readOnly
                                                value={this.state.totalSize}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group controlId="backendPageNameEng">
                                            <Form.Label>إجمالى العدد</Form.Label>
                                            <Form.Control type="number"
                                                autoComplete="off"
                                                style={{ height: "50px" }}
                                                placeholder="إجمالى العدد"
                                                readOnly
                                                value={this.state.totalQty}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <div className="col-md-4">
                                    </div>
                                    <div className="col-md-4">
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group controlId="dept">
                                            <Form.Label>الصنف</Form.Label>
                                            <Select
                                                name="productId"
                                                id="productId"
                                                value={this.state.productId2}
                                                onChange={(opt) => {
                                                    this.handleDropDownChangeItem2(opt);
                                                }}
                                                options={this.props.listProductsForDrop2}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div>
                                    <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                        <div className="col-md-4">
                                            <Form.Group controlId="backendPageNameEng">
                                                <Form.Label>رقم المنتج</Form.Label>
                                                <Form.Control type="text"
                                                    placeholder="رقم المنتج"
                                                    style={{ height: "50px" }}
                                                    autoComplete="off"
                                                    onChange={(e) => this.handleChangeProductSize(e.target.value, "code")}
                                                    value={this.state.objProductSize.code}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Group controlId="backendPageNameEng">
                                                <Form.Label>العرض</Form.Label>
                                                <Form.Control type="number"
                                                    autoComplete="off"
                                                    style={{ height: "50px" }}
                                                    placeholder="العرض"
                                                    onChange={(e) => this.handleChangeProductSize(parseFloat(e.target.value), "width")}
                                                    value={this.state.objProductSize.width}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Group controlId="backendPageNameEng">
                                                <Form.Label>التخانة</Form.Label>
                                                <Form.Control type="number"
                                                    style={{ height: "50px" }}
                                                    placeholder="التخانة"
                                                    autoComplete="off"
                                                    onChange={(e) => this.handleChangeProductSize(parseFloat(e.target.value), "size")}
                                                    value={this.state.objProductSize.size}
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                        <div className="col-md-4">
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Group controlId="backendPageNameEng">
                                                <Form.Label>عدد</Form.Label>
                                                <Form.Control type="number"
                                                    style={{ height: "50px" }}
                                                    placeholder="عدد"
                                                    autoComplete="off"
                                                    onChange={(e) => this.handleChangeProductSize(parseFloat(e.target.value), "quantity")}
                                                    value={this.state.objProductSize.quantity}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Group controlId="backendPageNameEng">
                                                <Form.Label>الطول</Form.Label>
                                                <Form.Control type="number"
                                                    style={{ height: "50px" }}
                                                    placeholder="الطول"
                                                    autoComplete="off"
                                                    onChange={(e) => this.handleChangeProductSize(parseFloat(e.target.value), "hight")}
                                                    value={this.state.objProductSize.hight}
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                        <div className="col-md-4">
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Group controlId="backendPageNameEng">
                                                <Form.Label>متر</Form.Label>
                                                <Form.Control type="number"
                                                    style={{ height: "50px" }}
                                                    placeholder="متر"
                                                    autoComplete="off"
                                                    onChange={(e) => this.handleChangeProductSize(parseFloat(e.target.value), "meter")}
                                                    value={this.state.objProductSize.meter}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Group controlId="backendPageNameEng">
                                                <Form.Label>سم</Form.Label>
                                                <Form.Control type="number"
                                                    placeholder="سم"
                                                    style={{ height: "50px" }}
                                                    autoComplete="off"
                                                    onChange={(e) => this.handleChangeProductSize(e.target.value, "centi")}
                                                    value={this.state.objProductSize.centi}
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <Button size="lg" onClick={this.addNewProduct}>إضافة منتج</Button>
                                    </div>
                                    <div className="col-md-4"></div>
                                </div>
                                <br />
                                <br />
                                <ReactTable data={this.state.listItems2} columns={this.cells2} defaultPageSize={20} />
                                <br />
                                <br />
                                <br />
                                <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <div className="col-md-4">
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group controlId="backendPageNameEng">
                                            <Form.Label>إجمالى العدد</Form.Label>
                                            <Form.Control type="number"
                                                placeholder="إجمالى المتر المكعب"
                                                autoComplete="off"
                                                style={{ height: "50px" }}
                                                readOnly
                                                value={this.state.totalQty1}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group controlId="backendPageNameEng">
                                            <Form.Label>إجمالى المتر المكعب</Form.Label>
                                            <Form.Control type="number"
                                                autoComplete="off"
                                                style={{ height: "50px" }}
                                                readOnly
                                                placeholder="إجمالى العدد"
                                                value={this.state.totalSize1}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <div className="col-md-4">
                                    </div>
                                    <div className="col-md-4">
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group controlId="dept">
                                            <Form.Label>الصنف</Form.Label>
                                            <Select
                                                name="productId"
                                                id="productId"
                                                value={this.state.productId3}
                                                onChange={(opt) => {
                                                    this.handleDropDownChangeItem3(opt);
                                                }}
                                                options={this.props.listProductsForDrop3}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <div className="col-md-4">
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group controlId="backendPageNameEng" >
                                            <Form.Label>الكود</Form.Label>
                                            <Form.Control type="text"
                                                placeholder="الكود"
                                                style={{ height: "50px" }}
                                                autoComplete="off"
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
                                                style={{ height: "50px" }}
                                                autoComplete="off"
                                                onChange={(e) => this.handleChangeProductNumber(e, "quantity")}
                                                value={this.state.objProductNumber.quantity}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <Button size="lg" onClick={this.addNewProduct}>إضافة منتج</Button>
                                    </div>
                                    <div className="col-md-4"></div>
                                </div>
                                <br />
                                <br />
                                <ReactTable data={this.state.listItems3} columns={this.cells3} defaultPageSize={20} />
                                <br />
                                <br />
                                <br />
                                <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <div className="col-md-4">
                                    </div>
                                    <div className="col-md-4">
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group controlId="backendPageNameEng">
                                            <Form.Label>إجمالى العدد</Form.Label>
                                            <Form.Control type="number"
                                                autoComplete="off"
                                                style={{ height: "50px" }}
                                                readOnly
                                                placeholder="إجمالى العدد"
                                                value={this.state.totalQty2}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <br />
                        <br />
                        <div className="row" style={{ paddingLeft: '30%' }}>
                            <div className="col-md-4">
                                <Button size="lg" onClick={() => this.props.history.push("/PurchaseOrderClient")}>الخروج</Button>
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
    listProductsForDrop: state.reduces.listProductsForDrop,
    listProductsForDrop2: state.reduces.listProductsForDrop2,
    listProductsForDrop3: state.reduces.listProductsForDrop3,
    listProductsTransactions: state.reduces.listProductsTransactions,
    isAdded: state.reduces.isAdded
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrderAddEditClient); 

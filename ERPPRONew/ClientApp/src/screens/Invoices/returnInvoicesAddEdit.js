import React, { Component, Fragment } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { bindActionCreators } from "redux";
import { Form, Spinner, Button, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import Select from "react-select";
import ReactTable from '../renderData/renderData';
import toastr from 'toastr';
import Delete from '../../Design/img/delete.png';

class ReturnInvoicesAddEdit extends Component {

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
                Header: <strong> السعر </strong>,
                accessor: 'priceSelling',
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
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
            },
            {
                Header: <strong> الأجمالى</strong>,
                accessor: 'total',
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            } 
        ];

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
            }            
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
                Header: <strong> السعر </strong>,
                accessor: 'priceSelling',
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
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
            },
            {
                Header: <strong> الأجمالى</strong>,
                accessor: 'total',
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
            objInvoices: {
                numberOfInvoiceSupplier: "",
                // description: "",
                itemCount: 0,
                totalInvoice: 0,
                payed: 0,
                amount: 0,
                customerId: 0
            },
            priceSelling: 0,
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
                centi: ""
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
            tabIndex: 0
        }

        this.addNewProduct = this.addNewProduct.bind(this);
    }

    // life cycle of react calling when any change of props
    componentWillReceiveProps(nextState, prevState) {
        if (nextState.isAddedReturnInvoices === "Add") {
            this.props.history.push("/ReturnInvoices");
        }
    };

    // life cycle of react calling when page is loading
    componentDidMount() {
        this.props.actions.getSupplierCustomerForDrop(false);
        this.props.actions.getProductForDrop();
        this.props.actions.isAddReturnInvoices();
        //  this.props.actions.getProductForInvoices();
    }

    // this function when write any value  
    handleChange(value, feild) {

        let originalSup = this.state.objInvoices;

        originalSup[feild] = value;

        if (feild === "payed") {

            originalSup["amount"] = (parseFloat(originalSup["totalInvoice"]) - parseFloat(originalSup["payed"])).toFixed(0);

            originalSup["amount"] = parseFloat(originalSup["amount"]);

            if (value === NaN) {
                originalSup["amount"] = parseFloat(originalSup["totalInvoice"]);
            }
        }

        this.setState({
            objInvoices: originalSup
        });
    }

    handleChangePrice(e, feild) {

        if (feild === "priceSelling") {
            this.setState({
                priceSelling: parseFloat(e.target.value)
            });
        }
    }


    handleChangeInvoicesNumber(e) {

        let obj = this.state.objInvoices;

        obj["numberOfInvoiceSupplier"] = e.target.value

            this.setState({
                objInvoices: obj
            });
         
    }

    handleChangeProductSize(value, feild) {

        let originalSup = this.state.objProductSize;
        originalSup[feild] = value  //=== 0 ? 0 : value || 0;

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
        let listdata = this.state.listSaveItems;
        let listSaveItems = this.state.listSaveItems.filter(x => x.code == "" && x.productId == listItems[findIndex].productId);

        listSaveItems.forEach(item => {
            let findindexxx = listdata.find(x => x.id == item.id);

            listdata.splice(findindexxx, 1);

        });

        let totalQty = this.state.totalQty;
        let totalSize = parseFloat(this.state.totalSize).toFixed(4);

        totalQty = totalQty - parseFloat(listItems[findIndex].totalQty);
        totalSize = (totalSize - parseFloat(listItems[findIndex].totalSize)).toFixed(4) || 0;

        listItems.splice(findIndex, 1);

        let original = this.state.objInvoices;

        if (listdata.length > 0) {

            let sum = listdata.map(o => o.total).reduce((a, c) => { return a + c }).toFixed(0);

            original["totalInvoice"] = sum;
            original["amount"] = sum;
        } else {
            original["totalInvoice"] = 0;
            original["amount"] = 0;
        }

        original["payed"] = 0;


        this.setState({
            listSaveItems: listdata,
            objPurchaseOrder: original,
            totalSize,
            totalQty,
            listItems1: [...listItems]
        });
    }

    viewConfimeRowDelete2 = (id) => {

        let listItems = this.state.listItems2;

        let findIndex = listItems.findIndex(x => x.id === id);

        let listdata = this.state.listSaveItems;

        let listSaveItems = this.state.listSaveItems.filter(x => x.code != "" && x.productId == listItems[findIndex].productId);

        listSaveItems.forEach(item => {
            let findindexxx = listdata.find(x => x.id == item.id);

            listdata.splice(findindexxx, 1);

        });

        let totalQty = this.state.totalQty1;
        let totalSize = parseFloat(this.state.totalSize1).toFixed(4);

        totalQty = totalQty - parseFloat(listItems[findIndex].totalQty);
        totalSize = (totalSize - parseFloat(listItems[findIndex].totalSize)).toFixed(4) || 0;

        listItems.splice(findIndex, 1);

        let original = this.state.objInvoices;

        if (listdata.length > 0) {

            let sum = listdata.map(o => o.total).reduce((a, c) => { return a + c }).toFixed(0);

            original["totalInvoice"] = sum;
            original["amount"] = sum;
        } else {
            original["totalInvoice"] = 0;
            original["amount"] = 0;
        }

        original["payed"] = 0;

        this.setState({
            listSaveItems: listdata,
            objPurchaseOrder: original,
            listItems2: [...listItems],
            totalSize1: totalSize,
            totalQty1: totalQty,
        });
    }

    viewConfimeRowDelete3 = (id) => {

        let listItems = this.state.listItems3;

        let findIndex = listItems.findIndex(x => x.id === id);

        let listdata = this.state.listSaveItems;

        let listSaveItems = this.state.listSaveItems.filter(x => x.code != "" && x.productId == listItems[findIndex].productId);

        listSaveItems.forEach(item => {
            let findindexxx = listdata.find(x => x.id == item.id);

            listdata.splice(findindexxx, 1);

        });

        let totalQty2 = this.state.totalQty2;

        totalQty2 = totalQty2 - parseFloat(listItems[findIndex].quantity);

        let original = this.state.objInvoices;

        listItems.splice(findIndex, 1);

        if (listdata.length > 0) {

            let sum = listdata.map(o => o.total).reduce((a, c) => { return a + c }).toFixed(0);

            original["totalInvoice"] = sum;
            original["amount"] = sum;
        } else {
            original["totalInvoice"] = 0;
            original["amount"] = 0;
        }

        original["payed"] = 0;

        this.setState({
            listSaveItems: listdata,
            totalQty2,
            objPurchaseOrder: original,
            listItems3: [...listItems]
        });
    }

    handleDropDownChange(type, value) {
        if (type === "customerId") {
            let origin = this.state.objInvoices;

            origin["customerId"] = value;

            this.setState({
                objInvoices: origin
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
        if (this.state.tabIndex === 1 && this.state.productId2 !== '' && this.state.priceSelling > 0 && this.state.objProductSize.code !== "" &&
            this.state.objProductSize.centi !== "" && this.state.objProductSize.meter !== "") {

            let list = [];
            let totalQty1 = parseFloat(this.state.totalQty1);
            let totalSize1 = parseFloat(this.state.totalSize1);

             this.state.objProductSize.centi = ("." + this.state.objProductSize.centi);

            const total = parseFloat(parseFloat(this.state.objProductSize.meter) + parseFloat(this.state.objProductSize.centi));

            totalQty1 = (totalQty1 + parseFloat(this.state.objProductSize.quantity));

            totalSize1 = (totalSize1 + parseFloat(total));

            totalSize1 = totalSize1.toFixed(4);

            let objItems = this.state.objProductSize;

            objItems.id = Math.random();
            objItems.productId = this.state.productId2.value;
            objItems.productName = this.state.productId2.label;
            objItems.priceSelling = this.state.priceSelling;
            objItems.type = true;

            const mearge = parseFloat(objItems.meter + objItems.centi);

            objItems.total = (parseFloat(this.state.priceSelling) * parseFloat(mearge)).toFixed(0);

            objItems.total = parseFloat(objItems.total)

            list = [...this.state.listItems2, objItems];
            const listSaveItems = [...this.state.listSaveItems, objItems];

            let sum = listSaveItems.map(o => o.total).reduce((a, c) => { return a + c }).toFixed(0);

            let original = this.state.objInvoices;

            original["totalInvoice"] = sum;
            original["amount"] = sum;

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
                objInvoices: original,
                priceSelling: '',
                objProductSize
            });
        }
        //اضافة تكعيب
        else if (this.state.tabIndex === 0 && this.state.productId !== '' && this.state.priceSelling > 0 &&
            this.state.objProductSize.hight !== "" && this.state.objProductSize.width !== "" &&
            this.state.objProductSize.quantity !== "" && this.state.objProductSize.size !== "" && this.state.objProductSize.code === "") {

            let list = [];

            let width = this.state.objProductSize.width < 100 ? ("0.0" + this.state.objProductSize.width) : ("0." + this.state.objProductSize.width);

            let size = this.state.objProductSize.size < 100 ? ("0.0" + this.state.objProductSize.size) : ("0." + this.state.objProductSize.size);

            let hight = this.state.objProductSize.hight.toString();

            hight = hight.substring(0, 1) + "." + hight.substring(1, hight.length);

            let totalCubing = (parseFloat(hight).toFixed(3) * parseFloat(size).toFixed(3) * parseFloat(width).toFixed(3) * this.state.objProductSize.quantity).toFixed(4);

            let FixedCubing = totalCubing.toString();

            const centi = FixedCubing.split(".")[1].substr(0, 4);
            const meter = FixedCubing.split(".")[0];

            let totalQty = parseFloat(this.state.totalQty);
            let totalSize = parseFloat(this.state.totalSize);

            totalSize += parseFloat(totalCubing);
            totalQty += parseFloat(this.state.objProductSize.quantity);

            totalSize = totalSize.toFixed(4)

            if (this.state.listItems1.length > 0) {

                const isExist = this.state.listItems1.find(x => x.productId == this.state.productId.value && x.code == "" && x.width == this.state.objProductSize.width && x.size == this.state.objProductSize.size);

                //فى حالة ان المنتج موجود من قبل
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

                    const mearge = objItems.meter + (objItems.centi === "0000" ? ".0000" : ("." + objItems.centi));

                    objItems.total = (parseFloat(this.state.priceSelling) * parseFloat(mearge)).toFixed(0);

                    objItems.total = parseFloat(objItems.total)

                    const findindex = this.state.listItems1.findIndex(x => x.productId == this.state.productId.value);

                    list = this.state.listItems1;

                    list[findindex] = objItems;

                    list = [...list];

                    const listSaveItems = [...this.state.listSaveItems, objItems];

                    let sum = listSaveItems.map(o => o.total).reduce((a, c) => { return a + c }).toFixed(0);

                    let original = this.state.objInvoices;

                    original["totalInvoice"] = sum;
                    original["amount"] = sum;

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
                        objInvoices: original,
                        listSaveItems,
                        objProductSize,
                        totalSize,
                        totalQty
                    });
                }
                //فى حالة ان المنتج جديد
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

                    const mearge = objItems.meter + (objItems.centi === "0000" ? ".0000" : ("." + objItems.centi));

                    objItems.total = (parseFloat(this.state.priceSelling) * parseFloat(mearge)).toFixed(0);

                    objItems.total = parseFloat(objItems.total);

                    list = [...this.state.listItems1, objItems];
                    const listSaveItems = [...this.state.listSaveItems, objItems];

                    let sum = listSaveItems.map(o => o.total).reduce((a, c) => { return a + c }).toFixed(0);

                    let original = this.state.objInvoices;

                    original["totalInvoice"] = sum;
                    original["amount"] = sum;


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
                        objInvoices: original,
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

                const mearge = objItems.meter + (objItems.centi === "0000" ? ".0000" : ("." + objItems.centi));

                objItems.total = (parseFloat(this.state.priceSelling) * parseFloat(mearge)).toFixed(0);

                objItems.total = parseFloat(objItems.total)

                list = [...this.state.listItems1, objItems];

                const listSaveItems = [...this.state.listSaveItems, objItems];
                 
                let sum = listSaveItems.map(o => o.total).reduce((a, c) => { return a + c }).toFixed(0);

                let original = this.state.objInvoices;

                original["totalInvoice"] = sum;
                original["amount"] = sum;

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
                    objInvoices: original,
                    listSaveItems,
                    objProductSize,
                    totalSize,
                    totalQty
                });
            }
        }
        //اضافة عدد
        else if (this.state.tabIndex === 2 && this.state.productId3 !== '' && this.state.priceSelling > 0 &&
            this.state.objProductNumber.code !== "" && this.state.objProductNumber.quantity !== "") {

            let list = [];

            let objItems = this.state.objProductNumber;

            let totalQty2 = this.state.totalQty2;

            totalQty2 = totalQty2 + parseFloat(this.state.objProductNumber.quantity);

            objItems.id = Math.random();
            objItems.productId = this.state.productId3.value;
            objItems.productName = this.state.productId3.label;
            objItems.priceSelling = this.state.priceSelling;
            objItems.type = false;

            objItems.width = "";
            objItems.hight = "";
            objItems.size = "";
            objItems.meter = "";
            objItems.centi = "";

            objItems.total = (parseFloat(this.state.priceSelling) * parseFloat(objItems.quantity)).toFixed(0);

            objItems.total = parseFloat(objItems.total);

            list = [...this.state.listItems3, objItems];
            const listSaveItems = [...this.state.listSaveItems, objItems];

            let sum = listSaveItems.map(o => o.total).reduce((a, c) => { return a + c }).toFixed(0);

            let original = this.state.objInvoices;

            original["totalInvoice"] = sum;
            original["amount"] = sum;

            let objProductNumber = {
                code: "",
                quantity: ""
            }

            this.setState({
                totalQty2,
                listItems3: list,
                listSaveItems,
                objInvoices: original,
                priceSelling: '',
                productId: '',
                objProductNumber
            });
        }
        else {
            toastr.warning("برجاء مراجعة البيانات الأساسية للصنف");
        }
    }

    saveInvoices = (isPayed) => {
        if (this.state.listSaveItems.length > 0 && this.state.objInvoices.customerId !== 0 && this.state.objInvoices.numberOfInvoiceSupplier != "") {

            this.setState({
                isLoading: true,
                showConfirme: false
            });

            let mainInvoices = this.state.objInvoices;
             
            mainInvoices.totalInvoice = parseFloat(mainInvoices.totalInvoice);
            mainInvoices.amount = parseFloat(mainInvoices.amount);
            mainInvoices.payed = parseFloat(mainInvoices.payed);
            mainInvoices.itemCount = this.state.listSaveItems.length;
            mainInvoices.customerId = this.state.objInvoices.customerId.value;
            mainInvoices.isPayed = isPayed;
            mainInvoices.numberOfInvoiceSupplier = this.state.objInvoices.numberOfInvoiceSupplier;


            this.state.listSaveItems.map(item => {
                item.priceSelling = parseFloat(item.priceSelling) || 0;
                item.hight = parseFloat(item.hight) || 0;
                item.width = parseFloat(item.width) || 0;
                item.size = parseFloat(item.size) || 0;
                item.centi = item.centi.toString() === "" ? "0" : item.centi.toString().includes(".") ? item.centi.toString() : ("." + item.centi.toString());
                item.meter = parseFloat(item.meter) || 0;
                item.quantity = parseFloat(item.quantity) || 0;

                delete item["id"];
            });

            this.props.actions.addReturnInvoices(mainInvoices, this.state.listSaveItems);
        } else {
            toastr.warning("برجاء مراجعة البيانات الأساسية للفاتورة");
        }
    }
      
    // this function when close modal
    handleClose() {
        this.setState({
            showConfirme: false
        });
    }

    render() {
        return (
            <Fragment>
                <div>
                    <div style={{ height: '850px', overflowX: 'auto' }}>
                        <h1 className="heading_title">فاتورة مرتجع مبيعات</h1>
                        <br />
                        <br />
                        {/* Button of Add new Document and delete Row in Grid */}
                        <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                            <div className="col-md-4">
                                <Form.Group controlId="backendPageNameEng" >
                                    <Form.Label>رقم الفاتورة</Form.Label>
                                    <Form.Control type="number"
                                        style={{ height: "50px" }}
                                        onChange={(e) => { this.handleChangeInvoicesNumber(e) } }
                                        value={this.state.objInvoices.numberOfInvoiceSupplier}
                                        placeholder="رقم الفاتورة"
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-4">
                                <Form.Group controlId="backendPageNameEng" >
                                    <Form.Label>عدد أصناف الفاتورة</Form.Label>
                                    <Form.Control type="text"
                                        style={{ height: "50px" }}
                                        readOnly
                                        value={this.state.listSaveItems.length}
                                        placeholder="عدد أصناف الفاتورة"
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-4">
                                <Form.Group controlId="dept">
                                    <Form.Label>العميل</Form.Label>
                                    <Select
                                        name="customerId"
                                        id="customerId"
                                        value={this.state.objInvoices.customerId}
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
                                        <Form.Group controlId="backendPageNameEng" >
                                            <Form.Label>سعر البيع</Form.Label>
                                            <Form.Control type="number"
                                                style={{ height: "50px" }}
                                                placeholder="سعر البيع"
                                                autoComplete="off"
                                                onChange={(e) => this.handleChangePrice(e, "priceSelling")}
                                                value={this.state.priceSelling}
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
                                </div>
                                <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <Button size="lg" onClick={this.addNewProduct}>إضافة منتج</Button>
                                    </div>
                                    <div className="col-md-4"></div>
                                </div>
                                <br />
                                <br />
                                <ReactTable data={this.state.listItems1} columns={this.cells1} defaultPageSize={15}/>
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
                                                style={{ height: "50px" }}
                                                autoComplete="off"
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
                                        <Form.Group controlId="backendPageNameEng" >
                                            <Form.Label>سعر البيع</Form.Label>
                                            <Form.Control type="number"
                                                style={{ height: "50px" }}
                                                placeholder="سعر البيع"
                                                autoComplete="off"
                                                onChange={(e) => this.handleChangePrice(e, "priceSelling")}
                                                value={this.state.priceSelling}
                                            />
                                        </Form.Group>
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
                                                    style={{ height: "50px" }}
                                                    placeholder="رقم المنتج"
                                                    autoComplete="off"
                                                    onChange={(e) => this.handleChangeProductSize(e.target.value, "code")}
                                                    value={this.state.objProductSize.code}
                                                //onMouseLeave={this.handleMouseLeave}
                                                />
                                            </Form.Group>
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
                                                    style={{ height: "50px" }}
                                                    placeholder="سم"
                                                    autoComplete="off"
                                                    onChange={(e) => this.handleChangeProductSize(e.target.value, "centi")}
                                                    value={this.state.objProductSize.centi}
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <Button size="lg" onClick={this.addNewProduct}>إضافة منتج</Button>
                                    </div>
                                    <div className="col-md-4"></div>
                                </div>
                                <br />
                                <br />
                                <ReactTable data={this.state.listItems2} columns={this.cells2} defaultPageSize={15}/>
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
                                                value={this.state.totalSize1}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group controlId="backendPageNameEng">
                                            <Form.Label>إجمالى العدد</Form.Label>
                                            <Form.Control type="number"
                                                style={{ height: "50px" }}
                                                autoComplete="off"
                                                readOnly
                                                placeholder="إجمالى العدد"
                                                value={this.state.totalQty1}
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
                                        <Form.Group controlId="backendPageNameEng" >
                                            <Form.Label>سعر البيع</Form.Label>
                                            <Form.Control type="number"
                                                style={{ height: "50px" }}
                                                placeholder="سعر البيع"
                                                autoComplete="off"
                                                onChange={(e) => this.handleChangePrice(e, "priceSelling")}
                                                value={this.state.priceSelling}
                                            />
                                        </Form.Group>
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
                                                style={{ height: "50px" }}
                                                placeholder="الكود"
                                                autoComplete="off"
                                                onChange={(e) => this.handleChangeProductNumber(e, "code")}
                                                value={this.state.objProductNumber.code}
                                            //onMouseLeave={this.handleMouseLeave}
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group controlId="backendPageNameEng" >
                                            <Form.Label>الكمية</Form.Label>
                                            <Form.Control type="number"
                                                style={{ height: "50px" }}
                                                placeholder="الكمية"
                                                autoComplete="off"
                                                onChange={(e) => this.handleChangeProductNumber(e, "quantity")}
                                                value={this.state.objProductNumber.quantity}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <Button size="lg" onClick={this.addNewProduct}>إضافة منتج</Button>
                                    </div>
                                    <div className="col-md-4"></div>
                                </div>
                                <br />
                                <br />
                                <ReactTable data={this.state.listItems3} columns={this.cells3} defaultPageSize={15}/>
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
                                                style={{ height: "50px" }}
                                                autoComplete="off"
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
                        <br />

                        <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng" >
                                    <Form.Label>المتبقى</Form.Label>
                                    <Form.Control type="number"
                                        style={{ height: "50px" }}
                                        placeholder="المتبقى"
                                        autoComplete="off"
                                        readOnly
                                        onChange={(e) => this.handleChange(parseFloat(e.target.value), "amount")}
                                        value={this.state.objInvoices.amount}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng" >
                                    <Form.Label>إجمالى الفاتورة</Form.Label>
                                    <Form.Control type="number"
                                        readOnly
                                        style={{ height: "50px" }}
                                        placeholder="إجمالى الفاتورة"
                                        onChange={(e) => this.handleChange(parseFloat(e.target.value), "totalInvoice")}
                                        value={this.state.objInvoices.totalInvoice}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row hidden" >
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng" >
                                    <Form.Label>المتبقى</Form.Label>
                                    <Form.Control type="number"
                                        placeholder="المتبقى"
                                        style={{ height: "50px" }}
                                        autoComplete="off"
                                        readOnly
                                        onChange={(e) => this.handleChange(parseFloat(e.target.value), "amount")}
                                        value={this.state.objInvoices.amount}
                                    />
                                </Form.Group></div>
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng" >
                                    <Form.Label>المدفوع</Form.Label>
                                    <Form.Control type="number"
                                        placeholder="المدفوع"
                                        style={{ height: "50px" }}
                                        autoComplete="off"
                                        onChange={(e) => this.handleChange(parseFloat(e.target.value), "payed")}
                                        value={this.state.objInvoices.payed}
                                    />
                                </Form.Group></div>
                        </div>

                        <div className="row" style={{ paddingLeft: '30%' }}>
                            <div className="col-md-4">
                                <Button size="lg" onClick={() => this.props.history.push("/ReturnInvoices")}>الخروج</Button>
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
                                    <Button size="lg" onClick={() => {
                                        if (this.state.listSaveItems.length > 0) { 
                                        this.setState({ showConfirme: true });
                                        } else {
                                            toastr.warning("برجاء مراجعة البيانات الأساسية للفاتورة");
                                        }
                                    }}>حفظ الفاتورة</Button>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <Modal show={this.state.showConfirme} onHide={this.handleClose.bind(this)} style={{ opacity: 1, marginTop: '10%' }}>
                    <Modal.Header closeButton style={{ marginTop: '15%' }}>
                        <Modal.Title>رسالة حفظ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>هل يتم استرداد المبلغ ؟؟</Modal.Body>
                    <Modal.Footer>
                        <Button size="lg" variant="secondary" onClick={() => this.saveInvoices(false)} style={{ width: '80px', height: '35px', marginRight: '10px' }}>
                            لا
                    </Button>
                        <Button size="lg" variant="primary" onClick={() => this.saveInvoices(true)} style={{ width: '80px', height: '35px', marginRight: '20px' }}>
                            نعم
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}


const mapStateToProps = (state, ownProps) => ({
    listSupplierCustomerForDrop: state.reduces.listSupplierCustomerForDrop,
    listProductsForDrop: state.reduces.listProductsForDrop,
    listProductsForDrop2: state.reduces.listProductsForDrop2,
    listProductsForDrop3: state.reduces.listProductsForDrop3,
    listProductsForInvoices: state.reduces.listProductsForInvoices,
    isAddedReturnInvoices: state.reduces.isAddedReturnInvoices
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ReturnInvoicesAddEdit); 

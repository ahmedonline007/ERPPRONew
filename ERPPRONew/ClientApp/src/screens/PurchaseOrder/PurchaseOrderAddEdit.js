﻿import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { bindActionCreators } from "redux";
import { Form, Spinner, Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ReactTable from "../renderData/renderData";
import Select from "react-select";
import toastr from 'toastr';
import { Formik } from "formik";
import * as Yup from "yup";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Confirme from '../Confirme/Confirme';


// validation of field
const schema = Yup.object({
    priceSupplier: Yup.number().required('برجاء ادخال فاتورة الشراء').positive('برجاء ادخال قيمة موجبة').integer('برجاء ادخال قيمة رقمية')
});

class PurchaseOrderAddEdit extends Component {

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
                        <Form.Check
                            checked={this.state.selected.indexOf(rowInfo.original.id) > -1}
                            onChange={() => this.toggleRow(rowInfo.original.id)} />
                    );
                },
                sortable: false,
                width: 45
            },
            {
                Header: <strong> إسم المنتج </strong>,
                accessor: 'productName',
                width: 180
            }, {
                Header: <strong> التخانة</strong>,
                accessor: 'size',
                width: 70,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> العرض</strong>,
                accessor: 'width',
                width: 70,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> الطول</strong>,
                accessor: 'hight',
                width: 70,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> الكمية </strong>,
                accessor: 'quantity',
                width: 80,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> سم</strong>,
                accessor: 'centi',
                width: 80,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> المتر </strong>,
                accessor: 'meter',
                width: 80,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> الكود </strong>,
                accessor: 'code',
                width: 100,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }, {
                Header: <strong> سعر الشراء </strong>,
                accessor: 'priceSupplier',
                width: 105,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            },
            {
                Header: <strong> الأجمالى</strong>,
                accessor: 'total',
                width: 200,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }
        ];

        // initial value of state

        this.state = {
            show: false,
            textModal: "إضافة",
            objPurchaseOrder: {
                id: props.match.params.id,
                numberOfInvoiceSupplier: "",
                invoiceNo: "",
                itemCount: 0,
                totalInvoice: 0,
                payed: 0,
                amount: 0,
                customerId: "",
                date: "",
                descount: 0,
                describtion: ''
            },
            priceSelling: 0,
            priceSupplier: '',
            productId: '',
            objProduct: {
                id: 0,
                priceSelling: 0,
                priceSupplier: '',
                productId: '',
                type: ''
            },
            objProductSize: {
                width: '',
                hight: '',
                code: '',
                size: '',
                quantity: '',
                meter: '',
                centi: '',
                productId: '',
                invoicesNo: ''
            },
            objProductNumber: {
                code: '',
                quantity: '',
                invoiceNo: '',
                productId: ''
            },
            selected: [],
            selectedRow: 0,
            isLoading: false,
            showConfirme: false,
            type: props.match.params.isEdit === "true" ? true : false,
            listItems: [],
            totalSize1: 0,
            totalQty1: 0,
            totalSize2: 0,
            totalQty2: 0,
            totalQty3: 0,
            setPrice: '',
            tabIndex: 0,
            selected: [],
            isList: false
        }
    }

    // life cycle of react calling when any change of props
    componentWillReceiveProps(nextState, prevState) {
        if (nextState.isAdded === "Add") {
            this.props.history.push("/PurchaseOrder");
        }
        else if (Object.keys(nextState.objPurchaseOrder).length) {
            let dtoPurchaseOrder = this.state.objPurchaseOrder;

            dtoPurchaseOrder["numberOfInvoiceSupplier"] = nextState.objPurchaseOrder.numberOfInvoiceSupplier;
            dtoPurchaseOrder["invoiceNo"] = nextState.objPurchaseOrder.numberOfInvoiceBySystem;
            dtoPurchaseOrder["date"] = nextState.objPurchaseOrder.date.split("T")[0].replaceAll("-", "/");;

            let total = 0;

            nextState.objPurchaseOrder.listPurchaseOrderDetails.map(item => {

                if (item.type) {

                    const cent = item.centi.includes(".") ? item.centi.split('.')[1].toString() : item.centi;
                    const mearge = item.meter + "." + cent;
                    item.total = (parseFloat(item.priceSupplier) * parseFloat(mearge)).toFixed(2);
                    item.total = parseFloat(item.total);

                    total += item.total;
                } else {
                    item.total = (parseFloat(item.priceSupplier) * parseFloat(item.quantity)).toFixed(2);
                    item.total = parseFloat(item.total);

                    total += item.total;
                }
            });

            let totalSize1 = nextState.objPurchaseOrder.listPurchaseOrderDetails.filter(x => x.code == "" && x.type === true)

            if (totalSize1.length > 0) {
                totalSize1 = totalSize1.map(x => {
                    let centi = x.centi.includes(".") ? x.centi.split('.')[1].toString() : x.centi
                    return parseFloat(x.meter.toString() + "." + centi)
                }).reduce((a, c) => { return a + c });
            } else {
                totalSize1 = 0;
            }

            let totalSize2 = nextState.objPurchaseOrder.listPurchaseOrderDetails.filter(x => x.code != "" && x.type === true)

            if (totalSize2.length > 0) {
                totalSize2 = totalSize2.map(x => {
                    let centi = x.centi.includes(".") ? x.centi.split('.')[1].toString() : x.centi
                    return parseFloat(x.meter.toString() + "." + centi)
                }).reduce((a, c) => { return a + c });
            } else {
                totalSize2 = 0;
            }

            let totalQty1 = nextState.objPurchaseOrder.listPurchaseOrderDetails.filter(x => x.code == "" && x.type === true)

            if (totalQty1.length > 0) {
                totalQty1 = totalQty1.map(x => x.quantity).reduce((a, c) => { return a + c })
            } else {
                totalQty1 = 0;
            }

            let totalQty2 = nextState.objPurchaseOrder.listPurchaseOrderDetails.filter(x => x.code != "" && x.type === true)

            if (totalQty2.length > 0) {
                totalQty2 = totalQty2.map(x => x.quantity).reduce((a, c) => { return a + c });
            } else {
                totalQty2 = 0;
            }

            let totalQty3 = nextState.objPurchaseOrder.listPurchaseOrderDetails.filter(x => x.type === false)

            if (totalQty3.length > 0) {
                totalQty3 = totalQty3.map(x => x.quantity).reduce((a, c) => { return a + c })
            } else {
                totalQty3 = 0;
            }

            let sum = nextState.objPurchaseOrder.listPurchaseOrderDetails.length > 0 ? nextState.objPurchaseOrder.listPurchaseOrderDetails.map(o => o.total || 0).reduce((a, c) => { return a + c }).toFixed(2) : 0;

            dtoPurchaseOrder["totalInvoice"] = sum;
            dtoPurchaseOrder["amount"] = sum - parseFloat(nextState.objPurchaseOrder["payed"]);

            nextState.objPurchaseOrder.listPurchaseOrderDetails.forEach(i => {
                i.centi = i.centi.includes(".") ? i.centi.split('.')[1].toString() : i.centi;
            });

            dtoPurchaseOrder.customerId = { value: nextState.objPurchaseOrder.customerId, label: nextState.objPurchaseOrder.customerName }

            const totalpayed = (parseFloat(dtoPurchaseOrder["totalInvoice"]) - parseFloat(nextState.objPurchaseOrder["payed"])).toFixed(2);

            dtoPurchaseOrder["amount"] = parseFloat(totalpayed <= 0 ? 0 : totalpayed);

            dtoPurchaseOrder["amount"] = parseFloat(dtoPurchaseOrder["amount"]);

            if (Number.isNaN(nextState.objPurchaseOrder["payed"])) {
                dtoPurchaseOrder["amount"] = parseFloat(dtoPurchaseOrder["totalInvoice"]);
            }

            dtoPurchaseOrder["payed"] = nextState.objPurchaseOrder["payed"];

            this.setState({
                objPurchaseOrder: dtoPurchaseOrder,
                listItems: nextState.objPurchaseOrder.listPurchaseOrderDetails || [],
                totalSize1,
                totalSize2,
                totalQty1,
                totalQty2,
                totalQty3
            });
        } else {
            this.setState({
                isLoading: false,
                show: false
            });
        }
    };

    // life cycle of react calling when page is loading
    componentDidMount() {
        this.props.actions.getProductForDrop();
        this.props.actions.getPurchaseOrderById(this.state.objPurchaseOrder.id);
        this.props.actions.getSupplierCustomerForDrop(true);
    }

    toggleRow(id) {
        const isAdd = this.state.selected.indexOf(id);

        let newSelected = this.state.selected;

        if (isAdd > -1) {
            newSelected.splice(isAdd, 1);
        } else {
            newSelected.push(id);
        }

        this.setState({
            selected: newSelected,
            isList: newSelected.length > 0 ? true : false
        });
    }

    // this function when write any value  
    handleChange(value, feild) {

        let originalSup = this.state.objPurchaseOrder;
        originalSup[feild] = value;

        if (feild === "payed") {
            const totalpayed = (parseFloat(originalSup["totalInvoice"]) - parseFloat(originalSup["payed"])).toFixed(2);

            originalSup["amount"] = parseFloat(totalpayed <= 0 ? 0 : totalpayed); //(parseFloat(originalSup["totalInvoice"]) - parseFloat(originalSup["payed"])).toFixed(2);

            originalSup["amount"] = parseFloat(originalSup["amount"]);

            if (Number.isNaN(value)) {
                originalSup["amount"] = parseFloat(originalSup["totalInvoice"]);
            }
        }

        this.setState({
            objPurchaseOrder: originalSup
        });
    }

    handlePriceChange(value) {

        this.setState({
            setPrice: isNaN(value) ? 0 : value
        });
    }

    // this function when close modal
    handleClose() {
        this.setState({
            showConfirme: false,
            show: false
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

            let sum = listItems.map(o => o.total).reduce((a, c) => { return a + c }).toFixed(2);

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

    savePurchaseOrder = () => {
        if (this.state.listItems.length > 0 && this.state.objPurchaseOrder.customerId !== "") {

            this.setState({
                isLoading: true
            });

            let mainPurchaseOrder = this.state.objPurchaseOrder;
            mainPurchaseOrder.itemCount = this.state.listItems.length;
            mainPurchaseOrder.numberOfInvoiceSupplier = mainPurchaseOrder.numberOfInvoiceSupplier !== "" ? parseFloat(mainPurchaseOrder.numberOfInvoiceSupplier) : 0;
            mainPurchaseOrder.customerId = this.state.objPurchaseOrder.customerId.value;
            mainPurchaseOrder.id = parseInt(mainPurchaseOrder.id);
            mainPurchaseOrder.date = mainPurchaseOrder.date.replaceAll("/", "-");
            mainPurchaseOrder.type = this.state.type;

            this.props.actions.editPurchaseOrder(mainPurchaseOrder);
        } else {
            toastr.warning("برجاء مراجعة البيانات الأساسية للفاتورة");
        }
    }

    // this function when get value from grid to edit feild
    editDepartment = (state, rowInfo, column, instance) => {

        const { selection } = this.state;
        return {
            onClick: (e, handleOriginal) => {

                if (e.target.type !== "checkbox" && (e.target.className !== "Delete" || e.target.className === "rt-td")) {

                    let originalProduct = this.state.objProduct;

                    originalProduct.id = rowInfo.original.id;
                    originalProduct.priceSupplier = rowInfo.original.priceSupplier;
                    originalProduct.productId = rowInfo.original.productId;
                    originalProduct.type = rowInfo.original.type;

                    this.setState({
                        objProduct: originalProduct,
                        textModal: "تعديل",
                        show: true,
                        isList: false
                    });
                }
                else if (e.target.className === "Delete") {
                    this.setState({
                        showConfirme: true
                    });
                }
            }
        };
    };

    editItems = (value) => {
        if (value.priceSupplier > 0) {
            // فى حالة انه ضغط على السطر لوحدة
            if (this.state.isList === false) {

                this.setState({
                    isLoading: true
                });

                let list = this.state.listItems;

                let objRow = this.state.listItems.find(x => x.id === value.id);

                let index = this.state.listItems.findIndex(x => x.id === value.id);

                objRow["priceSupplier"] = value.priceSupplier;

                /*list[index] = {};*/

                if (value.type) {
                    const mearge = objRow.meter.toString() + "." + objRow.centi;
                    objRow.total = (parseFloat(objRow.priceSupplier) * parseFloat(mearge)).toFixed(2);
                    objRow.total = parseFloat(objRow.total);
                } else {
                    objRow.total = (parseFloat(objRow.priceSupplier) * parseFloat(objRow.quantity)).toFixed(2);

                    objRow.total = parseFloat(objRow.total);
                }

                let sum = this.state.listItems.length > 0 ? this.state.listItems.map(o => o.total || 0).reduce((a, c) => { return a + c }).toFixed(2) : 0;

                sum = parseFloat(sum);

                //if (this.state.listItems.length > 1) {
                //    sum += objRow.total;
                //}


                let dtoPurchaseOrder = this.state.objPurchaseOrder;

                dtoPurchaseOrder["totalInvoice"] = sum;
                dtoPurchaseOrder["amount"] = sum;

                list.splice(index, 1, objRow);

                this.setState({
                    objPurchaseOrder: dtoPurchaseOrder,
                    listItems: [...list],
                    isLoading: false,
                    show: false,
                    selected: []
                });

                this.props.actions.editItems(value);
            }
            else {
                // فى حالة انه علم على اكتر من سطر
                this.setState({
                    isLoading: true
                });

                let list = this.state.listItems;

                this.state.selected.map(row => {

                    let item = this.state.listItems.find(x => x.id == row);

                    let index = this.state.listItems.findIndex(x => x.id === row);

                    list[index] = {};

                    if (item.type) {
                        const mearge = item.meter.toString() + "." + item.centi;
                        item.total = (parseFloat(value.priceSupplier) * parseFloat(mearge)).toFixed(2);
                        item.total = parseFloat(item.total);
                    } else {
                        item.total = (parseFloat(value.priceSupplier) * parseFloat(item.quantity)).toFixed(2);

                        item.total = parseFloat(item.total);
                    }

                    item.priceSupplier = value.priceSupplier;

                    list.splice(index, 1, item);

                    value.invoiceNo = this.state.objPurchaseOrder.invoiceNo;
                    value.productId = item.productId;
                    value.type = item.type;
                    value.id = item.id;

                    this.props.actions.editItems(value);
                });

                let sum = this.state.listItems.length > 0 ? this.state.listItems.map(o => o.total).reduce((a, c) => { return a + c }).toFixed(2) : 0;

                let dtoPurchaseOrder = this.state.objPurchaseOrder;

                dtoPurchaseOrder["totalInvoice"] = parseFloat(sum);
                dtoPurchaseOrder["amount"] = parseFloat(sum);

                this.setState({
                    objPurchaseOrder: dtoPurchaseOrder,
                    listItems: [...list],
                    isLoading: false,
                    show: false,
                    selected: []
                });
            }
        } else {
            toastr.warning("برجاء كتابة سعر الشراء أو أكبر من الصفر !!");
        }
    }

    handleBlurChange = () => {

        const value = parseFloat(this.state.setPrice);

        if (value >= 0) {

            let list = [];

            this.state.listItems.map(item => {
                if (item.type) {
                    const mearge = item.meter.toString() + "." + item.centi;
                    item.total = (parseFloat(value) * parseFloat(mearge)).toFixed(2);
                    item.total = parseFloat(item.total);
                } else {
                    item.total = (parseFloat(value) * parseFloat(item.quantity)).toFixed(2);

                    item.total = parseFloat(item.total);
                }

                item.priceSupplier = value;

                list.push(item);

                item.invoiceNo = this.state.objPurchaseOrder.invoiceNo;

                this.props.actions.editItems(item);
            });

            let sum = this.state.listItems.length > 0 ? this.state.listItems.map(o => o.total).reduce((a, c) => { return a + c }).toFixed(2) : 0;

            let dtoPurchaseOrder = this.state.objPurchaseOrder;

            dtoPurchaseOrder["totalInvoice"] = parseFloat(sum);
            dtoPurchaseOrder["amount"] = parseFloat(sum);

            this.setState({
                objPurchaseOrder: dtoPurchaseOrder,
                listItems: [...list],
                selected: []
            });
        }
        else {
            toastr.warning("برجاء كتابة سعر الشراء أو أكبر من الصفر !!");
        }
    }

    addNewProduct = () => {
        //اضافة رابطة برقم
        if (this.state.tabIndex === 1 && this.state.productId2 !== '' && this.state.priceSupplier > 0 && this.state.objProductSize.code !== "" &&
            this.state.objProductSize.centi !== "" && this.state.objProductSize.meter !== "") {

            let objItems = this.state.objProductSize;

            objItems.productId = this.state.productId2.value;
            objItems.productName = this.state.productId2.label;
            objItems.priceSupplier = this.state.priceSupplier;
            objItems.type = true;
            objItems.purchaseOrderId = this.state.objPurchaseOrder.id;
            objItems.invoiceNo = this.state.objPurchaseOrder.invoiceNo;
            objItems.hight = 0;
            objItems.centi = objItems.centi.toString() === "" ? "0" : objItems.centi.toString().includes(".") ? objItems.centi.toString() : ("." + objItems.centi.toString());


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
                priceSupplier: '',
                objProductSize
            });


            this.props.actions.AddNewItemFromPurchaseOrderByAdmin(objItems);
        }
        //اضافة تكعيب
        else if (this.state.tabIndex === 0 && this.state.productId !== '' && this.state.priceSupplier > 0 &&
            this.state.objProductSize.hight !== "" && this.state.objProductSize.width !== "" &&
            this.state.objProductSize.quantity !== "" && this.state.objProductSize.size !== "" && this.state.objProductSize.code === "") {

            let width = this.state.objProductSize.width < 100 ? ("0.0" + this.state.objProductSize.width) : ("0." + this.state.objProductSize.width);

            let size = this.state.objProductSize.size < 100 ? ("0.0" + this.state.objProductSize.size) : ("0." + this.state.objProductSize.size);

            //let hight = this.state.objProductSize.hight.toString();

            //hight = hight.substring(0, 1) + "." + hight.substring(1, hight.length);

            let lasthight = this.state.objProductSize.hight.toString();

            lasthight = lasthight.substring(0, 1) + "." + lasthight.substring(1, lasthight.length);

            let hight = this.state.objProductSize.hight < 100 ? ("0." + this.state.objProductSize.hight.toString()) : lasthight;

            let totalCubing = (parseFloat(hight).toFixed(3) * parseFloat(size).toFixed(3) * parseFloat(width).toFixed(3) * this.state.objProductSize.quantity).toFixed(4);

            let FixedCubing = totalCubing.toString();

            const centi = FixedCubing.split(".")[1].substr(0, 4);
            const meter = FixedCubing.split(".")[0];

            let objItems = this.state.objProductSize;

            objItems.productId = this.state.productId.value;
            objItems.centi = centi.toString() === "" ? "0" : centi.toString().includes(".") ? centi.toString() : ("." + centi.toString());
            objItems.meter = meter;
            objItems.productName = this.state.productId.label;
            objItems.priceSelling = this.state.priceSelling;
            objItems.priceSupplier = this.state.priceSupplier;
            objItems.type = true;
            objItems.purchaseOrderId = this.state.objPurchaseOrder.id;
            objItems.invoiceNo = this.state.objPurchaseOrder.invoiceNo;


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
                priceSelling: 0,
                priceSupplier: '',
                objProductSize,
            });


            this.props.actions.AddNewItemFromPurchaseOrderByAdmin(objItems);
        }
        //اضافة عدد
        else if (this.state.tabIndex === 2 && this.state.productId3 !== '' && this.state.priceSupplier > 0 &&
            this.state.objProductNumber.code !== "" && this.state.objProductNumber.quantity !== "") {

            let objItems = this.state.objProductNumber;

            objItems.productId = this.state.productId3.value;
            objItems.productName = this.state.productId3.label;
            objItems.priceSupplier = this.state.priceSupplier;
            objItems.type = false;
            objItems.purchaseOrderId = this.state.objPurchaseOrder.id;
            objItems.invoiceNo = this.state.objPurchaseOrder.invoiceNo;

            objItems.width = 0;
            objItems.hight = 0;
            objItems.size = 0;
            objItems.meter = 0;
            objItems.centi = "0";

            let objProductNumber = {
                code: "",
                quantity: ""
            }

            this.props.actions.AddNewItemFromPurchaseOrderByAdmin(objItems);

            objItems.width = "";
            objItems.hight = "";
            objItems.size = "";
            objItems.meter = "";
            objItems.centi = "";


            this.setState({
                priceSupplier: '',
                productId: '',
                objProductNumber
            });
        }
        else {
            toastr.warning("برجاء مراجعة البيانات الأساسية للصنف");
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

    handleDelete = () => {
        if (this.state.listItems.length == 1) {
            toastr.warning("عفوا لايمكن حذف الصنف لابد حذف الفاتورة باكملها");
        } else {
            this.props.actions.DeleteListItemFromPurchaseOrderDetails(this.state.selected, this.state.objPurchaseOrder.invoiceNo);

            this.setState({
                isLoading: false,
                showConfirme: false,
                selected: []
            });
        }
    }

    render() {

        let totalQuantity = (parseFloat(this.state.totalSize1) + parseFloat(this.state.totalSize2)).toFixed(4);
        let totalSize = parseInt(this.state.totalQty1) + parseInt(this.state.totalQty2) + parseInt(this.state.totalQty3);

        return (
            <Fragment>
                <div>
                    <div style={{ height: '850px', overflowX: 'auto' }}>
                        <h1 className="heading_title">فاتورة مشتريات</h1>
                        <br />
                        <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                            <div className="col-md-4">
                                <Form.Group controlId="backendPageNameEng" >
                                    <Form.Label>عدد أصناف الفاتورة</Form.Label>
                                    <Form.Control type="text"
                                        readOnly
                                        style={{ height: "50px" }}
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
                                        autoComplete="off"
                                        readOnly
                                        style={{ height: "50px" }}
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
                        <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                            <div className="col-md-4">
                            </div>
                            <div className="col-md-4">
                            </div>
                            <div className="col-md-4">
                                <Form.Group controlId="dept">
                                    <Form.Label>التاريخ</Form.Label>
                                    <Form.Control type="text"
                                        readOnly
                                        style={{ height: "50px" }}
                                        value={this.state.objPurchaseOrder.date}
                                        placeholder="تاريخ الفاتورة"
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <h3>تفاصيل الفاتورة</h3>
                        <hr />
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
                                            <Form.Label>سعر الشراء</Form.Label>
                                            <Form.Control type="number"
                                                style={{ height: "50px" }}
                                                placeholder="سعر الشراء"
                                                autoComplete="off"
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
                            </TabPanel>
                            <TabPanel>
                                <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <div className="col-md-4">
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group controlId="backendPageNameEng" >
                                            <Form.Label>سعر الشراء</Form.Label>
                                            <Form.Control type="number"
                                                style={{ height: "50px" }}
                                                placeholder="سعر الشراء"
                                                autoComplete="off"
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
                            </TabPanel>
                            <TabPanel>
                                <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <div className="col-md-4">
                                    </div>
                                    <div className="col-md-4">
                                        <Form.Group controlId="backendPageNameEng" >
                                            <Form.Label>سعر الشراء</Form.Label>
                                            <Form.Control type="number"
                                                style={{ height: "50px" }}
                                                placeholder="سعر الشراء"
                                                autoComplete="off"
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
                            </TabPanel>
                        </Tabs>
                        <br />
                        <hr />
                        <hr />
                        <br />
                        {this.state.selected.length > 0 ?
                            <div>
                                <Button size="lg" style={{ width: '80px', height: '35px', marginRight: '5px' }} onClick={() => this.setState({ showConfirme: true })}>حذف</Button>
                                <Button size="lg" style={{ width: '180px', height: '35px', marginRight: '5px' }} onClick={() => this.setState({ show: true })}>تسعير المنتج</Button>
                            </div>
                            : null}
                        <br />
                        <hr />
                        <hr />
                        <br />
                        <ReactTable data={this.state.listItems} columns={this.cells} defaultPageSize={20} getTrProps={this.editDepartment} />
                        <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                            <div className="col-md-4">
                            </div>
                            <div className="col-md-4" style={{ marginTop: "40px" }}>
                                <Button size="lg" onClick={this.handleBlurChange}>تحديث السعر</Button>
                            </div>
                            <div className="col-md-4">
                                <Form.Group controlId="backendPageNameEng" >
                                    <Form.Label>السعر</Form.Label>
                                    <Form.Control type="number"
                                        placeholder="السعر"
                                        autoComplete="off"
                                        style={{ height: "50px" }}
                                        onChange={(e) => this.handlePriceChange(parseFloat(e.target.value))}
                                        value={this.state.setPrice}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng">
                                    <Form.Label>إجمالى المتر المكعب</Form.Label>
                                    <Form.Control type="number"
                                        placeholder="إجمالى المتر المكعب"
                                        autoComplete="off"
                                        readOnly
                                        style={{ height: "50px" }}
                                        value={this.state.totalSize1.toFixed(4)}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng">
                                    <Form.Label>المتر المكعب إجمالى العدد</Form.Label>
                                    <Form.Control type="number"
                                        autoComplete="off"
                                        placeholder=" المتر المكعب إجمالى العدد"
                                        readOnly
                                        style={{ height: "50px" }}
                                        value={this.state.totalQty1}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng">
                                    <Form.Label>إجمالى المتر المكعب لرقم الرابطة</Form.Label>
                                    <Form.Control type="number"
                                        placeholder="إجمالى المتر المكعب لرقم الرابطة "
                                        autoComplete="off"
                                        readOnly
                                        style={{ height: "50px" }}
                                        value={this.state.totalSize2.toFixed(4)}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng">
                                    <Form.Label>إجمالى العدد لرقم الرابطة</Form.Label>
                                    <Form.Control type="number"
                                        autoComplete="off"
                                        placeholder="إجمالى العدد لرقم الرابطة"
                                        readOnly
                                        style={{ height: "50px" }}
                                        value={this.state.totalQty2}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                            <div className="col-md-6">
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng">
                                    <Form.Label>إجمالى العدد</Form.Label>
                                    <Form.Control type="number"
                                        autoComplete="off"
                                        placeholder="إجمالى العدد"
                                        readOnly
                                        style={{ height: "50px" }}
                                        value={this.state.totalQty3}
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng" >
                                    <Form.Label>إجمالى العدد </Form.Label>
                                    <Form.Control type="number"
                                        readOnly
                                        style={{ height: "50px" }}
                                        placeholder="إجمالى العدد"
                                        value={totalSize}
                                    />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng" >
                                    <Form.Label>إجمالى التكعيب</Form.Label>
                                    <Form.Control type="number"
                                        readOnly
                                        style={{ height: "50px" }}
                                        placeholder="إجمالى التكعيب"
                                        value={totalQuantity}
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                            <div className="col-md-6">
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng" >
                                    <Form.Label>الاجمالى </Form.Label>
                                    <Form.Control type="number"
                                        readOnly
                                        style={{ height: "50px" }}
                                        placeholder="الاجمالى "
                                        onChange={(e) => this.handleChange(parseFloat(e.target.value), "totalInvoice")}
                                        value={this.state.objPurchaseOrder.totalInvoice}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng" >
                                    <Form.Label>المتبقى</Form.Label>
                                    <Form.Control type="number"
                                        placeholder="المتبقى"
                                        style={{ height: "50px" }}
                                        autoComplete="off"
                                        readOnly
                                        onChange={(e) => this.handleChange(parseFloat(e.target.value), "amount")}
                                        value={this.state.objPurchaseOrder.amount}
                                    />
                                </Form.Group></div>
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng" >
                                    <Form.Label>المدفوع</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="المدفوع"
                                        style={{ height: "50px" }}
                                        autoComplete="off"
                                        onChange={(e) => this.handleChange(parseFloat(e.target.value), "payed")}
                                        value={this.state.objPurchaseOrder.payed}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row" style={{ fontWeight: 'bold', fontSize: '25px' }}>
                            <div className="col-md-6">
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="backendPageNameEng" >
                                    <Form.Label>ملاحظات</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="ملاحظات"
                                        style={{ height: "50px" }}
                                        autoComplete="off"
                                        onChange={(e) => this.handleChange(e.target.value, "describtion")}
                                        value={this.state.objPurchaseOrder.describtion}
                                    />
                                </Form.Group>
                            </div>
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
                {/* Add or Edit Field */}
                <Modal show={this.state.show} onHide={this.handleClose.bind(this)} style={{ opacity: 1, marginTop: '10%' }}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className="modal-header" style={{ marginTop: '50px' }}>
                        <Formik validationSchema={schema} onSubmit={(values) => { this.editItems(values) }}
                            initialValues={{
                                id: this.state.objProduct.id,
                                priceSupplier: this.state.objProduct.priceSupplier,
                                priceSelling: 0,
                                invoiceNo: this.state.objPurchaseOrder.invoiceNo,
                                productId: this.state.objProduct.productId,
                                type: this.state.objProduct.type
                            }}>
                            {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, }) => (
                                <Form noValidate onSubmit={handleSubmit} style={{ fontWeight: 'bold', fontSize: '25px' }}>
                                    <Form.Group controlId="priceSupplier" >
                                        <Form.Label>سعر الشراء</Form.Label>
                                        <Form.Control type="number"
                                            style={{ height: "50px" }}
                                            placeholder="سعر الشراء"
                                            onChange={handleChange}
                                            autoComplete="off"
                                            aria-describedby="inputGroupPrepend"
                                            name="priceSupplier"
                                            value={values.priceSupplier}
                                            onBlur={handleBlur}
                                            isInvalid={!!errors.priceSupplier}
                                        />
                                        <Form.Control.Feedback type="invalid" style={{ color: "red" }}>
                                            {errors.priceSupplier}
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
                                                    </Button>}
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal>
                <Confirme show={this.state.showConfirme} handleClose={this.handleClose.bind(this)} handleDelete={this.handleDelete} />
            </Fragment>
        );
    }
}


const mapStateToProps = (state, ownProps) => ({
    listSupplierCustomerForDrop: state.reduces.listSupplierCustomerForDrop,
    listProductsTransactions: state.reduces.listProductsTransactions,
    isAdded: state.reduces.isAdded,
    objPurchaseOrder: state.reduces.objPurchaseOrder,
    listProductsForDrop: state.reduces.listProductsForDrop,
    listProductsForDrop2: state.reduces.listProductsForDrop2,
    listProductsForDrop3: state.reduces.listProductsForDrop3,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrderAddEdit);
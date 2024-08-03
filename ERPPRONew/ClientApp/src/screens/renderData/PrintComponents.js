import React, { Component, Fragment } from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';


class PrintComponents extends Component {

    constructor(props) {

        super(props);

        this.state = {
            type: "true"
        }
    }

    handlePrint = () => {
        const type = this.state.type;

        if (type === "true") {

            var restorepage = document.body.innerHTML;
            var printcontent = document.getElementById(this.props.DivPrint).innerHTML;
            document.body.innerHTML = printcontent;
            window.print();
            document.body.innerHTML = restorepage; 

            document.getElementById(this.props.DivPrint).style.display = "none";
        } else {
            var restorepage = document.body.innerHTML;

            var printcontent = document.getElementById(this.props.DivPrint).innerHTML;
            document.body.innerHTML = printcontent;

            var css = '@page { size: landscape; }',
                head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style');

            style.type = 'text/css';
            style.media = 'print';

            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }

            head.appendChild(style);

            window.print();
            document.body.innerHTML = restorepage;
            document.getElementById(this.props.DivPrint).style.display = "none";
        }
    }


    render() {
        return (
            <Fragment>
                <Form>
                    <Col>
                        <Form.Group>
                            <Form.Label as="legend" column xs={12}>
                                نوع الطباعة
                                            </Form.Label>
                            <Col sm={10}>
                                <Form.Check inline
                                    type="radio"
                                    value={"true"}
                                    defaultChecked={this.state.type === "true"}
                                    label="طول"
                                    name="isActive"
                                    onChange={() => this.setState({ type: "true" })}
                                />
                                <Form.Check inline
                                    type="radio"
                                    value={"false"}
                                    defaultChecked={this.state.type === "false"}
                                    label="عرض"
                                    name="isActive"
                                    onChange={() => this.setState({ type: "false" })}
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Button size="lg" variant="success" type="button" onClick={this.handlePrint} style={{ width: '115px', height: '35px' }}> طباعة </Button>
                    <Button size="lg" onClick={this.props.closeModalPrint } style={{ width: '80px', height: '35px', marginRight: '10px' }}>
                        غلق
                                                </Button>
                </Form>

            </Fragment>
        );
    }
}


export default PrintComponents;



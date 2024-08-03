import React, { Component } from "react";
import { Modal, Button } from 'react-bootstrap';

class Confirme extends Component {

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose} style={{ opacity: 1, marginTop: '10%' }}>
                <Modal.Header closeButton style={{ marginTop: '15%' }}>
                    <Modal.Title>رسالة حذف</Modal.Title>
                </Modal.Header>
                <Modal.Body>هل انت متاكد من حذف هذا العنصر ؟؟</Modal.Body>
                <Modal.Footer>
                    <Button size="lg" variant="secondary" onClick={this.props.handleClose} style={{ width: '80px', height: '35px', marginRight: '10px' }}>
                        غلق
                    </Button>
                    <Button size="lg" variant="primary" onClick={this.props.handleDelete} style={{ width: '80px', height: '35px', marginRight: '20px' }}>
                        حذف
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


export default Confirme;

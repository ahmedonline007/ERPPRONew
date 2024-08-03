import React, { Component, Fragment } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Header from '../LayOut/Header';
import RightMenu from '../LayOut/RightMenu';
import Config from '../../Config/Config';

const lang = localStorage.getItem("lang") || "ar";

class LayOut extends Component {

    constructor(props) {
        super(props);

        this.state = {
            viewModal: false,
            viewTimerText: ""
        }

        this.finsihDate = 0;

        this.setTimeAlert = this.setTimeAlert.bind(this);
    }

    setTimeAlert(e) {

        e.preventDefault();

        if (this.finsihDate > 0) {
            clearInterval(this.finsihDate);
        }

        const settingsTimeOut = 5;

        const time = (settingsTimeOut * 60);

        let timer = time, minutes, seconds;

        this.finsihDate = setInterval(() => {

            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);


            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            if (--timer < 0) {
                timer = 0;
                localStorage.clear();
                clearInterval(this.finsihDate);
                window.location.reload();
            } else if (minutes === "00" && seconds <= 59) {
                this.viewModalFN(seconds);
            }

            console.log("timer : ", minutes + ":" + seconds);

        }, 1000);
    }

    viewModalFN(seconds) {
        this.setState({
            viewModal: true,
            viewTimerText: seconds
        });
    }


    routetoLogin = () => {
        localStorage.clear();
        window.location.reload();
    }

    onHide = () => {
        this.setState({
            viewModal: false
        });
    }

    render() { 
        return (
            <Fragment>
                <div>  
                    <Header />
                    <div >
                        <RightMenu />
                        <br/>
                        <br />
                        <br />
                        <div style={{ marginRight: '20%' }}>
                            {this.props.children}
                        </div>
                    </div>
                    <Modal show={this.state.viewModal} onHide={this.onHide}>
                        <Modal.Header closeButton>
                            <Modal.Title>رسالة تنبية</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4> {"لحماية البيانات، سيتم تسجيل الخروج بعد عدد الثواني التالية:  " + this.state.viewTimerText}</h4>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.onHide}> البقاء فى النظام</Button>
                            <Button onClick={this.routetoLogin}> الخروج</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Fragment>
        );
    }
}

export default LayOut;

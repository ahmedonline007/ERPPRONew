import React, { Component, Fragment } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import toastr from 'toastr';
import axios from '../../axios/axios';
//import "../../Design/CSS/custom.css";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            password: "",
            isLoading: false
        }
    }

    handleLogin = () => {
        if (this.state.userName === "Admin" && this.state.password == "**100**200**") {
            window.localStorage.setItem("userInfo", JSON.stringify({ isAdmin: true }));
            this.props.history.push("/DashBoard");
        }
        else if (this.state.userName !== "" && this.state.password !== "") {
            this.setState({
                isLoading: true
            });

            axios.get(`Login?userName=${this.state.userName}&password=${this.state.password}`).then(result => {
                if (result.data.isExist === false) {
                    toastr.error("خطأ فى كلمة إسم المستخدم أو كلمة المرور");
                    this.setState({
                        isLoading: false
                    });
                } else {
                    window.localStorage.setItem("userInfo", JSON.stringify({ isAdmin: false }));
                    window.localStorage.setItem("Permission", JSON.stringify(result.data.listPermission));
                    window.localStorage.setItem("name", result.data.name);

                    this.setState({
                        isLoading: false
                    });
                    this.props.history.push("/DashBoard");

                }
            });
        } else {
            toastr.error("خطأ فى كلمة إسم المستخدم أو كلمة المرور");
        }
    }

    handleValue = (e, feild) => {
        this.setState({
            [feild]: e.target.value
        })
    }

    render() {
        return (
            <Fragment>
                <div style={{ backgroundColor: "rgb(240, 235, 235)", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <form style={{
                        border: "1px solid black", backgroundColor: 'white', padding: '20px 50px',
                        margin: '10px 0', width: '400px', height: '400px', borderRadius: '5px'
                    }}>
                        <h2 style={{ fontFamily: 'Arial', textAlign: 'center'}}>
                            تسجيل الدخول
                         </h2>
                        <div>
                            <label htmlFor="userId">إسم المستخدم</label> <br />
                            <input
                                style={{
                                    border: "1px solid rgb(194, 189, 189)",   padding: '15px 15px',
                                    margin: '5px 0', width: '100%', boxSizing: 'border-box', borderRadius: '4px'
                                }}
                                type="text"
                                value={this.state.userName}
                                onChange={(e) => this.handleValue(e, "userName")}
                                id="userId"
                                name="userName"
                                placeholder="إسم المستخدم"
                            />
                        </div>
                        <div>
                            <label htmlFor="pass"> كلمة المرور </label><br />
                            <input
                                style={{
                                    border: "1px solid rgb(194, 189, 189)", padding: '15px 15px',
                                    margin: '5px 0', width: '100%', boxSizing: 'border-box', borderRadius: '4px'
                                }}
                                type="password" id="pass" name="pass" placeholder="كلمة المرور" onChange={(e) => this.handleValue(e, "password")} value={this.state.password} />
                        </div>
                        <br />
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
                            <Button size="lg" variant="success" type="button" onClick={this.handleLogin} style={{ width: '145', height: '47px' }}> تسجيل الدخول </Button>
                        }
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default Login;

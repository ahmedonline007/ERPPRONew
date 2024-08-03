import React, { Component, Fragment } from 'react';
import { Form, Col } from 'react-bootstrap';
import Config from '../../Config/Config';
import axois from "../../axios/axios";
import User from "../../Design/img/avatar.svg";
import Logo from "../../Design/img/logo.png";

class DashBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentLang: window.localStorage.getItem("lang") || "ar",
            fullName: "Ahmed Salah",
            employeeId: 1
        }
    }

    signOut = () => {
        this.props.history.push('/');
        localStorage.clear();
        window.location.reload();
    }

    handleChangeCheck = (e) => {
        this.setState({
            currentLang: e.target.value
        });
        window.localStorage.setItem("lang", e.target.value);

        axois.get(`UpdateLanguage?EmployeeId=${this.state.employeeId}&lang=${e.target.value}`).then(result => {

            window.location.reload();
        });
    }

    render() {

        return (
            <Fragment>
                <div className="page_content">
                    <div className="page_content">
                        <div className="quick_links text-center">
                            <h1 className="heading_title">الوصول السريع</h1>
                            <a href="#" style={{ backgroundColor: "#c0392b" }}>
                                <h4>استعراض الموقع</h4>
                            </a>
                            <a href="options.html" style={{ backgroundColor: "#2980b9" }}>
                                <h4>تعديل البيانات</h4>
                            </a>
                            <a href="view_all_users.html" style={{ backgroundColor: "#8e44ad" }}>
                                <h4>عرض الاعضاء</h4>
                            </a>
                            <a href="add_new_topic.html" style={{ backgroundColor: "#d35400" }}>
                                <h4>إضافة موضوع</h4>
                            </a>
                            <a href="add_new_photo.html" style={{ backgroundColor: "#2c3e50" }}>
                                <h4>إضافة صورة</h4>
                            </a>
                        </div>
                        <div className="home_statics text-center">
                            <h1 className="heading_title">احصائيات عامة للموقع</h1>

                            <div style={{ backgroundColor: "#9b59b6" }}>
                                <span className="bring_right glyphicon glyphicon-home"></span>

                                <h3>زيارات الموقع</h3>

                                <p className="h4">55</p>
                            </div>

                            <div style={{ backgroundColor: "#34495e" }}>
                                <span className="bring_right glyphicon glyphicon-phone-alt"></span>

                                <h3>المتصلين الان</h3>

                                <p className="h4">55</p>
                            </div>
                            <div style={{ backgroundColor: "#00adbc" }}>
                                <span className="bring_right glyphicon glyphicon-user"></span>

                                <h3>عدد الاعضاء</h3>

                                <p className="h4">55</p>
                            </div>
                            <div style={{ backgroundColor: "#f39c12" }}>
                                <span className="bring_right glyphicon glyphicon-pencil"></span>

                                <h3>عدد المقالات</h3>

                                <p className="h4">55</p>
                            </div>
                            <div style={{ backgroundColor: "#2ecc71" }}>
                                <span className="bring_right glyphicon glyphicon-calendar"></span>

                                <h3>عمر الموقع بالايام</h3>

                                <p className="h4">55</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>);
    }
}

export default DashBoard;
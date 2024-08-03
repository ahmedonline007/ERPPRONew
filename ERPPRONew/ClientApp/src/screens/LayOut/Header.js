import React, { Component, Fragment } from 'react';
import User from "../../Design/img/avatar.svg";
import Logo from "../../Design/img/logo.png";
import { withRouter } from "react-router-dom";
class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: localStorage.getItem("name") || "Ahmed Salah"
        }
    }

    signOut = () => {
        this.props.history.push('/');
        localStorage.clear();
        window.location.reload();
    }

    render() {

        return (
            <Fragment>
                <div className="row header_section">
                    <div className="col-sm-3 col-xs-12 logo_area bring_right">
                        <h1 className="inline-block"><img src={Logo} alt="" />لوحة تحكم</h1>
                        <span className="glyphicon glyphicon-align-justify bring_left open_close_menu" data-toggle="tooltip"
                            data-placement="right" title="Tooltip on left"></span>
                    </div>
                    <div className="col-sm-3 col-xs-12 head_buttons_area bring_right hidden-xs">
                        <div className="inline-block messages bring_right">
                            <span className="glyphicon glyphicon-envelope" data-toggle="tooltip" data-placement="left"
                                title="الرسائل"><span className="notifications"></span></span>
                        </div>
                        <div className="inline-block full_screen bring_right hidden-xs">
                            <span className="glyphicon glyphicon-fullscreen" data-toggle="tooltip" data-placement="left"
                                title="شاشة كاملة"></span>
                        </div>
                    </div>
                    <div className=" col-sm-4 col-xs-12 user_header_area bring_left left_text">

                        <div className="user_info inline-block">
                            <img src={User} alt="" className="img-circle" />
                            <span className="h4 nomargin user_name">{this.state.fullName}</span>
                            <span className="glyphicon glyphicon-cog"></span>
                        </div>
                        <div className="user_info inline-block" onClick={this.signOut}>
                            <span className="h4 nomargin user_name">تسجيل الخروج</span>
                            <span className="glyphicon glyphicon-cog"></span>
                        </div>
                    </div>
                </div>
            </Fragment>);
    }
}

export default withRouter(Header);
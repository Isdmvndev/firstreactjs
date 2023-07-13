import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./Login.scss";
import * as actions from "../../store/actions";
import { FormattedMessage } from "react-intl";
import { handleLogin } from "../../services/userService"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            errMessage: '',
        }
    }
    handleOnChangeUserNameInput = (event) => {
        this.setState({
            userName: event.target.value,
        })
    }
    handleOnChangePasswordInput = (event) => {
        this.setState({
            password: event.target.value,
        })
    }
    handleLogin = async () => {
        try {
            this.setState({
                errMessage: '',
            })
            var data = await handleLogin(this.state.userName, this.state.password);
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (e) {
            this.setState({
                errMessage: e.message,
            })
        }
    }
    render() {
        //JSX
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 textcenter">
                            Login
                        </div>
                        <div className="col-12 form-group">
                            <label>UserName</label>
                            <input type="text" className="form-control" value={this.state.userName} onChange={(event) => this.handleOnChangeUserNameInput(event)}></input>
                        </div>
                        <div className="col-12 form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" value={this.state.password} onChange={(event) => this.handleOnChangePasswordInput(event)}></input>
                        </div>
                        <div className="col-12" style={{ color: 'red' }} >{this.state.errMessage}</div>
                        <div className="col-12 form-group">
                            <button onClick={() => this.handleLogin()} className="btn-login">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//redux
const mapStateToProps = (state) => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

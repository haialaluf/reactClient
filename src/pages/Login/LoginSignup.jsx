
import React, { Component } from 'react';
import { emailLogin, emailRegister } from './UserActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login  from './Login/Login';
import Register  from './Register/Register';

class LoginSignup extends Component {

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <div>
                    <h2>Login</h2>
                    <Login action={ this.props.actions.login }/>
                </div>
                <div>
                    <h2>Register</h2>
                    <Register action={ this.props.actions.register }/>
                </div>
            </div>
        )
    }
}

export default connect(
    (store) => ({
        items: store.items
    }),
    (dispatch) => ({
        actions: {
            register: bindActionCreators(emailRegister, dispatch),
            login: bindActionCreators(emailLogin, dispatch),
        }
    }))(LoginSignup);

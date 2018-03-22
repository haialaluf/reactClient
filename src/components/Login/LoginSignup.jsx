
import React, { Component } from 'react';
import { emailLogin, emailRegister/*, facebookLogin, googleLogin*/ } from './../../serverConnection/Actions/UserActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login  from './Login/Login';
import Register  from './Register/Register';
// import FacebookLogin from 'react-facebook-login';
// import GoogleLogin from 'react-google-login';


class LoginSignup extends Component {

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    showErrorModal(err) {
        console.log(err);
    }

    makeAction(action) {
        const redirectAfterLogIn = () => {
            this.props.history.push('/');
        }
        return (data) => {
            action(data, redirectAfterLogIn);
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h2>Login</h2>
                    <Login action={ this.makeAction(this.props.actions.login).bind(this) }/>
                </div>
                <div>
                    <h2>Register</h2>
                    <Register action={ this.makeAction(this.props.actions.register).bind(this) }/>
                </div>
                {/*

                <div>
                    <FacebookLogin
                        appId="566983050092492"
                        autoLoad={ false }
                        fields="name,email,picture"
                        callback={ this.props.actions.facebookLogin }/>
                </div>
                <div>
                    <GoogleLogin
                        clientId="782172464302-up9run1lv6e2vrhlq0acrupq2kf68oru.apps.googleusercontent.com"
                        buttonText="LOGIN WITH GOOGLE"
                        onSuccess={this.props.actions.googleLogin}
                        onFailure={ this.showErrorModal }
                    />
                </div>

                */}
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
            // facebookLogin: bindActionCreators(facebookLogin, dispatch),
            // googleLogin: bindActionCreators(googleLogin, dispatch)
        }
    }))(LoginSignup);

import React, { Component } from 'react';
import Style from '../../../assets/Styles';
import { connect } from 'react-redux';

/*
 Props:
    action: function(userInfo) make Login request
 */

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {
                email: false,
                password: false
            }
        };
    }

    login () {
        if (!this.refs.email.value || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.refs.email.value))) {
            this.setState({ errors: {email: true} });
            return;
        }
        if (!this.refs.password.value) {
            this.setState({ errors: {password: true} });
            return;
        }
        this.setState({ errors: {} });
        this.props.action({
            email: this.refs.email.value,
            password: this.refs.password.value
        });
    }

    render() {
        return (
            <div style={ Object.assign({}, style.component, this.props.style) }>
                <form>
                    <input style={ Object.assign({}, style.input, this.state.errors.email ? style.error : {}) } type="text" placeholder="Email" ref="email"/>
                    <input style={ Object.assign({}, style.input, this.state.errors.password ? style.error : {}) } type="password" placeholder="Password" ref="password"/>
                    <button style={ style.input } type="button" onClick={ this.login.bind(this) }>Login</button>
                </form>
            </div>
        )
    }
}

let style = {
    imageCropper: {
        maxWidth: '800px',
        maxHeight: '800px'
    },
    component: {

    },
    input: {
        margin: '8px',
        height: '32px'
    },
    error: {
        borderColor: Style.colors.errorColor
    }
};

export default connect(
    (store) => ({
        user: store.user
    }))(Login);

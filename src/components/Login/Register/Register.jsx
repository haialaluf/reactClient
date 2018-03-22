import React, { Component } from 'react';
import Style from '../../../assets/Styles';
import '../../../../node_modules/cropperjs/dist/cropper.css';

/*
 Props:
 action: function(userInfo) make Register post request
 */

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {
                name: false,
                email: false,
                password: false,
                password2: false
            }
        };
    }

    register () {
        if (!this.refs.name.value) {
            this.setState({ errors: {name: true} });
            return;
        }

        if (!this.refs.email.value || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(this.refs.email.value))) {
            this.setState({ errors: {email: true} });
            return;
        }
        if (!this.refs.password.value) {
            this.setState({ errors: {password: true} });
            return;
        }
        if (!this.refs.confirmPassword.value) {
            this.setState({ errors: {password2: true} });
            return;
        }

        if (this.refs.password.value === this.refs.confirmPassword.value) {
            this.setState({ errors: {} });
            this.props.action({
                name: this.refs.name.value,
                email: this.refs.email.value,
                password: this.refs.password.value
            });
        } else {
            this.setState({ errors: {password2: true, password: true} });
        }

    }

    render() {
        return (
            <div style={ Object.assign({}, style.component, this.props.style) }>
                <form>
                    <input style={ Object.assign({}, style.input, this.state.errors.name ? style.error : {}) } type="text" placeholder="Name" ref="name"/>
                    <input style={ Object.assign({}, style.input, this.state.errors.email ? style.error : {}) } type="text" placeholder="Email" ref="email"/>
                    <input style={ Object.assign({}, style.input, this.state.errors.password ? style.error : {}) } type="password" placeholder="Password" ref="password"/>
                    <input style={ Object.assign({}, style.input, this.state.errors.password2 ? style.error : {}) } type="password" placeholder="Password" ref="confirmPassword"/>
                    <button style={ { ...style.button } } type="button" onClick={ this.register.bind(this) }>Register</button>
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
    button: {
        border: '1px solid #000',
        cursor: 'pointer',
        color: '#000',
        padding: '8px'
    },
    input: {
        margin: '8px',
        height: '32px'
    },
    error: {
        borderColor: Style.colors.errorColor
    }
};

export default Register;

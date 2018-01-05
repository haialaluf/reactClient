import React, { Component } from 'react';
import Style from '../../../assets/Styles';
import { sendMessage } from './../../../serverConnection/Actions/ContactActions';

class ContactForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {
                name: false,
                email: false,
                subject: false
            }
        };
    }

    register () {
        if (!this.refs.name.value) {
            this.setState({ errors: {name: true} });
            return;
        }

        if (!this.refs.subject.value) {
            this.setState({ errors: {subject: true} });
            return;
        }

        if (!this.refs.email.value || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(this.refs.email.value))) {
            this.setState({ errors: {email: true} });
            return;
        }

        this.setState({ errors: {} });

        sendMessage(this.refs.name.value, this.refs.email.value, this.refs.subject.value, this.refs.message.value)
            .then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            });

    }

    render() {
        return (
            <div className="contact-form">
                <div className="title">Contact Us</div>
                <form>
                    <input style={ Object.assign({}, this.state.errors.name ? style.error : {}) }
                           type="text"
                           placeholder="Name"
                           ref="name"/>
                    <input style={ Object.assign({}, this.state.errors.subject ? style.error : {}) }
                           type="text"
                           placeholder="Subject"
                           ref="subject"/>
                    <input style={ Object.assign({}, this.state.errors.email ? style.error : {}) }
                           type="text"
                           placeholder="Email"
                           ref="email"/>
                    <textarea placeholder="Message" ref="message"/>
                    <button type="button" onClick={ this.register.bind(this) }>Send</button>
                </form>
            </div>
        )
    }
}

let style = {
    error: {
        borderColor: Style.colors.errorColor
    }
};

export default ContactForm;

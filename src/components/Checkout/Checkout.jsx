/*
Props: 
 sendCallback: function({name, email, date, phone, address}) //all arguments arr valid, but phone
 */


import React, { Component } from 'react';
import Style from '../../assets/Styles';
import AddressAutocomplete from '../AddressAutocomplete/AddressAutocomplete'


class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            errors: {
                name: false,
                email: false,
                date: false
            }
        };
    }

    checkout () {
        if (!this.refs.name.value) {
            this.setState({ errors: {name: true} });
            return;
        }

        if (!this.refs.date.value) {
            this.setState({ errors: {subject: true} });
            return;
        }

        if (!this.refs.email.value || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(this.refs.email.value))) {
            this.setState({ errors: {email: true} });
            return;
        }

        this.setState({ errors: {} });
        let details = {
            name: this.refs.name.value,
            email: this.refs.email.value,
            date: this.refs.date.value,
            phone: this.refs.phone.value,
            address: this.state.address,
        };


        this.props.sendCallback(details)

    }

    render() {
        return (
            <div className="checkout">
                <div className="title"></div>
                <form>
                    *
                    <input style={ Object.assign({}, this.state.errors.name ? style.error : {}) }
                           type="text"
                           placeholder="Name"
                           ref="name"/> *
                    <input style={ Object.assign({}, this.state.errors.email ? style.error : {}) }
                           type="text"
                           placeholder="Email"
                           ref="email"/> *
                    <input style={ Object.assign({}, this.state.errors.date ? style.error : {}) }
                           type="datetime-local"
                           ref="date"/>
                    *
                    <AddressAutocomplete onAddressSelected={ (val)=> {
                    this.setState({address: val.formatted_address})
                    } }/>
                    <input type="text"
                           placeholder="Phone number"
                           ref="phone"/>

                    <button type="button" onClick={ this.checkout.bind(this) }>Send</button>
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

export default Checkout;

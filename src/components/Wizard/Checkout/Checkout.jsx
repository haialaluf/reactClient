/*
Props: 
 sendCallback: function({name, email, date, phone, address}) //all arguments arr valid, but phone
 */


import React, { Component } from 'react';
import Helpers from '../../../helpers';
import AddressAutocomplete from '../../General/AddressAutocomplete/AddressAutocomplete'
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';


class Checkout extends Component {

    constructor(props) {
        super(props);
        this.inputs = {};
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
        this.setState({ errors: {} });
        let dateTime = 'YYYY-MM-DDT';
        dateTime = Helpers.parseDate(this.inputs.date, dateTime);
        dateTime = Helpers.parseDate(this.inputs.time, dateTime + 'HH:MM');

        if (!this.inputs.name) {
            this.setState({ errors: {name: true} });
            return;
        }

        if (!this.inputs.date) {
            this.setState({ errors: {subject: true} });
            return;
        }

        if (!this.inputs.email || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(this.inputs.email))) {
            this.setState({ errors: {email: true} });
            return;
        }

        let details = {
            name: this.inputs.name,
            email: this.inputs.email,
            date: dateTime,
            phone: this.inputs.phone,
            address: this.state.address
        };


        this.props.sendCallback(details)

    }

    render() {
        return (
            <div className="checkout">
                <div className="title"></div>
                <form>
                    <TextField
                        id="name"
                        style={ {color: 'black'} }
                        floatingLabelText="Name"
                        onChange={ (e) => this.inputs.name = e.target.value }
                    />
                    <TextField
                        id="email"
                        floatingLabelText="Email"
                        onChange={ (e) => this.inputs.email = e.target.value }
                    />
                    <TextField
                        id="phone"
                        floatingLabelText="Phone number"
                        onChange={ (e) => this.inputs.phone = e.target.value }
                    />
                    <div className="date-time-piker">
                        <DatePicker
                            hintText="Sellect date"
                            minDate={ new Date() }
                            style={ {width: 'calc(60% - 22px)', overflow: 'hidden'} }
                            onChange={ (e, date) => this.inputs.date = date  }
                        />
                        <TimePicker
                            format="ampm"
                            style={ {width: 'calc(40% - 22px)', overflow: 'hidden'} }
                            hintText="Select Time"
                            onChange={ (e, time) => this.inputs.time = time  }
                        />
                    </div>
                    <AddressAutocomplete onAddressSelected={ (val)=> {
                            this.setState({address: val.formatted_address})
                        } }
                    />
                    <div className="button-container">
                        <RaisedButton label="Send"
                                    className="button"
                                    primary={true}
                                    style={ {
                                                margin: 'auto',
                                                marginTop: '20px',
                                                width: '128px'
                                            } }
                                    onClick={ this.checkout.bind(this) }/>
                    </div>
                </form>
            </div>
        )
    }
}

export default Checkout;

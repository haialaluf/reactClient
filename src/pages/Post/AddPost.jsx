import React from 'react'
import AddressAutocomplete from '../../components/AddressAutocomplete/AddressAutocomplete'
import Style from '../../assets/Styles';
// import Config from '../../Config'

class AddPost extends React.Component {
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

        this.setState({ errors: {} });

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
                    <AddressAutocomplete onAddressSelected={(address) => this.address = address} />
                    <textarea placeholder="description" ref="description"/>
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
}


export default AddPost;

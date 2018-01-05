/*
Props:
 onAddressSelected: function
 */

import React from 'react'
import Config from '../../../Config'
import scriptLoader from 'react-async-script-loader'
import Autocomplete from 'react-google-autocomplete'


class AddressAutocompleteComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            googleApiReady: false
        };
    }

    componentWillReceiveProps({isScriptLoaded, isScriptLoadSucceed}) {
        if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
            if (isScriptLoadSucceed) {
                this.setState({googleApiReady: true})
            }
        }
    }

    render() {
        return (
            <div>
                {this.state.googleApiReady ?
                    <Autocomplete onPlaceSelected={ this.props.onAddressSelected }
                                  types={['address']}
                                  componentRestrictions={{}}/> : <input placeholder="Enter a location"/> }
            </div>
        )
    }
}

const AddressAutocomplete = scriptLoader(`https://maps.googleapis.com/maps/api/js?key=${Config.googleMapsApiKey}&libraries=places`)(AddressAutocompleteComponent);

export default AddressAutocomplete;

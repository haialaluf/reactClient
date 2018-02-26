import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home/Home'
import EditNote from './Note/EditNote/EditNote'
import Note from './Note/NoteFactory'
import { bindActionCreators } from 'redux';
import { changeHomeView } from '../../serverConnection/Actions/HomeViewActions';

class HomePageFactory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentState: 0,
            reachedState: 0,
            selected: []
        };
    }

    render() {
        const data = this.props.settings && this.props.settings.homeView && this.props.settings.homeView.components
        const Note = getNoteType(this.props);
        return  (<Home note={ Note } data={ data } />)


    }
}

export default connect(
    (store) => ({
        settings: store.settings,
    }),
    (dispatch) => ({
        actions: {
            changeHomeView: bindActionCreators(changeHomeView, dispatch),
        }
    }))(HomePageFactory);


function getNoteType(factoryProps) {
    if (isAdminHomePage(factoryProps)) {
        return (props) => <EditNote { ...props }
                                    saveCallback={ (item) => {
                                        factoryProps.actions.changeHomeView(item);
                                    }}/>
    } else {
        return Note
    }
}

function isAdminHomePage(props) {
    return props.edit
}
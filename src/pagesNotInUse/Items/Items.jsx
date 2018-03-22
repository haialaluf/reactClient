import React, { Component } from 'react';
import { addItem, getItems, deleteItem } from './ItemActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Item from "../../components/Wizard/Item/Item";
import AddItem from "../../components/Wizard/AddItem/AddItem";

class Items extends Component {

    componentWillMount() {
        this.props.actions.getItems()
    }

    componentWillUnmount() {
    }

    render() {
        let items = this.props.items;
        return (
            <div>
                <h2>Items</h2>
                <div className="items-container">
                    { items && items.map((item, index) => <Item item={ item } key={ index } deleteCallback={ this.props.actions.deleteItem }/>) }
                </div>
                <div>
                    <h2>Add Item</h2>
                    <AddItem action={ this.props.actions.addItem }/>
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
            addItem: bindActionCreators(addItem, dispatch),
            getItems: bindActionCreators(getItems, dispatch),
            deleteItem: bindActionCreators(deleteItem, dispatch)
        }
    }))(Items);

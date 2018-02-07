import React, { Component } from 'react';
import { getOrders, deleteOrder } from './../../serverConnection/Actions/OrdersActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Item from "../Wizard/Item/Item";
import Helpers from "../../helpers";
import ReactTable from 'react-table'
import '../../../node_modules/react-table/react-table.css'


class Orders extends Component {

    componentWillMount() {
        this.props.actions.getOrders()
    }

    componentWillUnmount() {
    }

    render() {
        let orders = this.props.orders;
        const columns = [{
                Header: 'Name',
                accessor: 'name' // String-based value accessors!
            }, {
                Header: 'Email',
                accessor: 'email' // String-based value accessors!
            }, {
                Header: 'Phone',
                accessor: 'phone' // String-based value accessors!
            }, {
                Header: 'Address',
                accessor: 'address'
            }, {
                Header: 'Date',
                accessor: 'date',
                Cell: props => <span className='number'>{Helpers.parseDate(new Date(props.value), 'DD/MM/YYYY HH:MM')}</span> // Custom cell components!
            }]


        return (
            <div>
                <div className="orders-container">
                    <ReactTable
                        data={ orders }
                        columns={ columns }
                        className="-striped -highlight"
                        expander="true"
                        SubComponent={(order) => {
                            let items = order.original.items;
                            return <div className="items-container">
                                        { items && items.map((item, index) => <Item item={ item } key={ index }/>) }
                                   </div>
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default connect(
    (store) => ({
        orders: store.orders
    }),
    (dispatch) => ({
        actions: {
            getOrders: bindActionCreators(getOrders, dispatch),
            deleteOrder: bindActionCreators(deleteOrder, dispatch)
        }
    }))(Orders);

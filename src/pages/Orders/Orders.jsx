import React, { Component } from 'react';
import { getOrders, deleteOrder } from './OrdersActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Item from "../../components/Item/Item";
import ReactTable from 'react-table'
import 'react-table/react-table.css'


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
                Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
            }]


        return (
            <div>
                <h2>Orders</h2>
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
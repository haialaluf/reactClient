import React, { Component } from 'react';
import { getItems } from '../Items/ItemActions';
import { makeOrder } from '../Orders/OrdersActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Item from "../../components/Item/Item";
import Checkout from "../../components/Checkout/Checkout";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";

const STAGES = 3;

class Wizard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentState: 1,
            reachedState: 1,
            selected: []
        };
    }

    componentDidMount() {
        this.props.actions.getItems({type: this.state.currentState})
    }

    nextState() {
        this.props.actions.getItems({type: this.state.currentState + 1});
        if (this.state.currentState === this.state.reachedState) {
            this.props.actions.getItems({type: this.state.currentState + 1});
        }
        this.setState({
            currentState: Math.min(this.state.currentState + 1, STAGES),
            reachedState: Math.max(this.state.currentState + 1, this.state.reachedState)
        })
    }

    moveState(state) {
        return () => {
            this.props.actions.getItems({type: state});
            this.setState({
                currentState: state,
            })
        }
    }

    componentWillUnmount() {
    }

    addCallback(item) {
        return () => {
            let selected = this.state.selected.concat();
            let index = this.state.selected.indexOf(item._id);
            if (index === -1) {
                selected.push(item._id);
            } else {
                selected.splice(index, 1);
            }
            this.setState({selected: selected});
        };
    }

    checkOut(details) {
        details.items = this.state.selected;
        this.props.actions.makeOrder(details, (res) => {
            //order has sent successful
            debugger
        })

    }

    render() {
        let items = this.props.items.filter((item) => item.type === this.state.currentState);
        return (
            <div>
                <BreadCrumbs show={ this.state.reachedState } >
                    <div className={ `pointer ${this.state.currentState === 1 ? 'selected' : ''} ${this.state.currentState !== 1 ? 'hide-in-mobile' : ''}` }
                         onClick={ this.moveState.bind(this)(1) }>
                        <div>Hello</div>
                    </div>
                    <div className={ `pointer ${this.state.currentState === 2 ? 'selected' : ''} ${this.state.currentState !== 2 ? 'hide-in-mobile' : ''}` }
                         onClick={ this.moveState.bind(this)(2) }>
                        <div>2</div>
                    </div>
                    <div className={ `pointer ${this.state.currentState === 3 ? 'selected' : ''} ${this.state.currentState !== 3 ? 'hide-in-mobile' : ''}` }
                         onClick={ this.moveState.bind(this)(3) }>
                        <div>3</div>
                    </div>
                    <div className="pointer" onClick={ this.nextState.bind(this) }>
                        <div>{this.state.currentState === STAGES? 'Done' : 'Next' } </div>
                    </div>
                </BreadCrumbs>
                <div className="items-container">
                    { items && items.map((item, index) => <Item item={ item }
                                                                key={ index }
                                                                selected={ this.state.selected.indexOf(item._id) > -1 }
                                                                addCallback={ this.addCallback.bind(this)(item) }/>) }
                    {this.state.currentState === 3 ? <Checkout sendCallback={ this.checkOut.bind(this) }/> : ''}
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
            getItems: bindActionCreators(getItems, dispatch),
            makeOrder: bindActionCreators(makeOrder, dispatch)
        }
    }))(Wizard);

import React, { Component } from 'react';
import { getItems } from '../../../serverConnection/Actions/ItemActions';
import { makeOrder } from '../../../serverConnection/Actions/OrdersActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Item from "../../dumb/Item/Item";
import Checkout from "../../dumb/Checkout/Checkout";
import BreadCrumbs from "../../dumb/BreadCrumbs/BreadCrumbs";

const STAGES = 3;

class CreateWizardTool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentState: 1,
            reachedState: 1,
            items: [],
            stages: []
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    newStage() {

    }

    addStage() {
        let stages = this.state.stages.concat([{
        }])
    }

    newItem() {

    }

    addItem() {
        let stages = this.state.stages.concat([{
        }])
    }

    nextState() {
        this.setState({
            currentState: Math.min(this.state.currentState + 1, STAGES),
            reachedState: Math.max(this.state.currentState + 1, this.state.reachedState)
        })
    }

    moveState(state) {
        return () => {
            this.setState({
                currentState: state,
            })
        }
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
        const items = this.state.items.filter((item) => item.type === this.state.currentState);
        const isState = (state) => this.state.currentState === state;
        return (
            <div>
                <BreadCrumbs show={ this.state.reachedState } >
                    <div className={ `pointer ${ isState(1) ? 'selected' : ''} ${ isState(1) ? 'hide-in-mobile' : ''}` }
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
                    <div onClick={ this.newItem }
                         className="item">
                        <div className="title">Add Item</div>
                    </div>
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
    }))(CreateWizardTool);

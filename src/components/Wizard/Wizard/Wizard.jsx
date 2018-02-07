import React, { Component } from 'react';
import { getWizardById } from '../../../serverConnection/Actions/WizardActions';
import { makeOrder } from '../../../serverConnection/Actions/OrdersActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Item from "../../../components/Wizard/Item/Item";
import Checkout from "../../../components/Wizard/Checkout/Checkout";
import BreadCrumbs from "../../../components/Wizard/BreadCrumbs/BreadCrumbs";


class Wizard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentState: 0,
            reachedState: 0,
            selected: []
        };
    }

    componentDidMount() {
        this.getActiveWizard.bind(this)()
    }

    componentDidUpdate() {
        this.getActiveWizard.bind(this)()
    }

    componentWillUnmount() {
    }

    getActiveWizard() {
        let newActiveWizard = this.props.wizardId || (this.props.settings && this.props.settings.activeWizard);
        if (newActiveWizard && this.wizardId !== newActiveWizard) {
            this.wizardId = newActiveWizard;
            this.props.actions.getWizardById(this.props.wizardId || (this.props.settings && this.props.settings.activeWizard));
        }
    }

    nextState(wizard) {
        this.setState((state) => ({
            currentState: Math.min(state.currentState + 1, wizard.stages.length),
            reachedState: Math.max(state.currentState + 1, state.reachedState)
        }))
    }

    moveState(state) {
        return () => {
            this.setState({
                currentState: state
            })
        }
    }

    addCallback(item) {
        return () => {
            this.setState((state) => {
                let selected = state.selected.concat();
                let index = state.selected.indexOf(item._id);
                if (index === -1) {
                    selected.push(item._id);
                } else {
                    selected.splice(index, 1);
                }
                return {selected}
            });
        };
    }


    checkOut(details) {
        details.items = this.state.selected;

        let self = this;
        this.props.actions.makeOrder(details, (res) => {
            //order has sent successful
            self.props.history.push('/');
        })

    }

    renderStages(stage, index) {
        const isState = (state) => this.state.currentState === state;
        return <div
            key={ index }
            className={ `pointer ${ isState(index) ? 'selected' : ''}` }
            onClick={ this.moveState.bind(this)(index) }>
            <div onClick={ () => this.setState({editMode: {stageName: true}}) }>
                  { stage.title }
            </div>
        </div>
    }


    render() {
        const wizard = this.props.wizardList.length ?
            this.props.wizardList.find(wizard => wizard._id === this.props.wizardId || this.props.settings.activeWizard)
            : {};
        const items = wizard.items && wizard.items.filter((item) => item.type === this.state.currentState);
        const stages = wizard.stages || [];
        const isState = (state) => this.state.currentState === state;
        if (wizard.items) {
            return (
                <div>
                    <BreadCrumbs show={ this.state.reachedState } >
                        { stages.map(this.renderStages.bind(this)) }
                        <div className={ `pointer ${ isState(stages.length) ? 'selected' : ''}` }
                             onClick={ this.moveState.bind(this)(stages.length) }>
                            <div className={`${ !isState(stages.length) ? 'hide-in-mobile' : ''}`}>Checkout</div>
                        </div>
                        <div className="pointer" onClick={ () => this.nextState.bind(this)(wizard) }>
                            <div>{this.state.currentState === wizard.stages.length? 'Done' : 'Next' } </div>
                        </div>
                    </BreadCrumbs>
                    <div className="items-container">
                        { items && items.map((item, index) => <Item item={ item }
                                                                    key={ index }
                                                                    selected={ this.state.selected.indexOf(item._id) > -1 }
                                                                    addCallback={ this.addCallback.bind(this)(item) }/>) }
                        { this.state.currentState === stages.length && <Checkout sendCallback={ this.checkOut.bind(this) }/> }
                    </div>

                </div>
            )
        } else {
            return <div></div>
        }

    }
}

export default connect(
    (store) => ({
        wizardList: store.wizard,
        settings: store.settings
    }),
    (dispatch) => ({
        actions: {
            getWizardById: bindActionCreators(getWizardById, dispatch),
            makeOrder: bindActionCreators(makeOrder, dispatch)
        }
    }))(Wizard);

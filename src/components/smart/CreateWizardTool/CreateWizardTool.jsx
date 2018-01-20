import React, {Component} from 'react';
import {createWizard} from '../../../serverConnection/Actions/WizardActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Item from "../../dumb/Item/Item";
import AddItem from "../../dumb/AddItem/AddItem";
import Checkout from "../../dumb/Checkout/Checkout";
import BreadCrumbs from "../../dumb/BreadCrumbs/BreadCrumbs";
import CircularProgressbar from 'react-circular-progressbar';

const STAGES = 3;

class CreateWizardTool extends Component {

    constructor(props) {
        super(props);
        this.itemId = 1;
        this.state = {
            currentState: 0,
            reachedState: 0,
            editMode: {
                stageName: true,
                item: 0
            },
            wizard: {
                items: [],
                stages: [{
                    title: 'Enter stage title',
                    description: ''
                }]
            }
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    addStage() {
        let stages = this.state.wizard.stages.concat([{
            title: 'Enter stage title',
            description: ''
        }]);
        this.setState({
            wizard: {
                items: this.state.wizard.items,
                stages: stages
            },
            currentState: stages.length - 1,
            reachedState: stages.length - 1,
            editMode: {}
        });
    }

    newItem() {
        let editMode = this.state.editMode;
        let wizard = this.state.wizard;
        wizard.items.push({
            _id: this.itemId
        });
        editMode.item = this.itemId;
        this.itemId++;
        this.setState({
            editMode: editMode,
            wizard: wizard
        });

    }

    addItem(item) {
        item._id = this.state.editMode.item;
        item.type = this.state.currentState;
        let wizard = this.state.wizard;
        wizard.items = wizard.items.map((wizardItem) => {
            return wizardItem._id === item._id ? item : wizardItem;
        });
        this.setState({wizard: wizard, editMode: {}})
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

    createWizard() {
        let wizard = this.state.wizard;
        let self = this;
        this.props.actions.createWizard(wizard, () => {
            //Wizard has been created
            self.props.history.push('/');
        }, (progress) => {
            self.setState({progress: progress});
        });
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

    renderStages(stage, index) {
        const isState = (state) => this.state.currentState === state;
        return <div
            key={ index }
            className={ `pointer ${ isState(index) ? 'selected' : ''} ${ isState(index) ? 'hide-in-mobile' : ''}` }
            onClick={ this.moveState.bind(this)(index) }>
            <div onClick={ () => this.setState({editMode: {stageName: true}}) }>
                {
                    this.state.editMode.stageName && isState(index) ?
                        <input onChange={ (e) => {
                                                    let wizard = this.state.wizard;
                                                    wizard.stages[index].title = e.target.value;
                                                    this.setState({wizard: wizard});
                                                 }
                                        }
                               value={ stage.title }
                        />
                        :
                        <div>{ stage.title }</div>
                }
            </div>
        </div>
    }

    render() {
        const items = this.state.wizard.items.filter((item) => item.type === this.state.currentState);
        return (
            <div className={`wizard create-wizard-tool ${ this.state.progress? 'progress' : '' }`}>
                <BreadCrumbs show={ this.state.reachedState }>
                    { this.state.wizard.stages.map(this.renderStages.bind(this)) }
                    <div className="pointer" onClick={ this.addStage.bind(this) }>
                        <div>Add Stage</div>
                    </div>
                    <div className="pointer" onClick={ this.createWizard.bind(this) }>
                        <div>Done</div>
                    </div>
                </BreadCrumbs>
                <div className="items-container">
                    { items && items.map((item, index) => <Item item={ item }
                                                                key={ index }
                                                                deleteCallback={ itemId => {
                                                            let wizard = this.state.wizard;
                                                            wizard.items = wizard.items.filter((item) => item._id !== itemId);
                                                            this.setState({ wizard: wizard, editMode: {} });
                                                        } }
                                                                editCallback={ x=>x }/>) }
                    {this.state.currentState === 3 ? <Checkout sendCallback={ this.checkOut.bind(this) }/> : ''}
                    <div onClick={ this.newItem.bind(this) }
                         className="item add-item">
                        <div>Add Item</div>
                    </div>
                    {
                        this.state.editMode.item ?
                            <div className="item expand">
                                <AddItem action={ (item)=> { this.addItem.bind(this)(item) }
                                         }
                                         cancelAction={ () => {
                                                            let itemId = this.state.editMode.item;
                                                            let wizard = this.state.wizard;
                                                            wizard.items = wizard.items.filter((item) => item._id !== itemId);
                                                            this.setState({ wizard: wizard, editMode: {} });
                                                        }
                                         }
                                />
                            </div>
                            : ''
                    }
                </div>

                <CircularProgressbar percentage={this.state.progress}/>
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
            createWizard: bindActionCreators(createWizard, dispatch),
        }
    }))(CreateWizardTool);

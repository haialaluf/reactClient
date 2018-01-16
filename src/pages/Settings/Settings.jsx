import React, { Component } from 'react';
import { getAllWizards } from '../../serverConnection/Actions/WizardActions';
import { changeAppSettings } from '../../serverConnection/Actions/AppActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import PlayPause from "../../components/dumb/Buttons/PlayPause/PlayPause";
import Wizard from "../Wizard/Wizard";

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            settings: {
                activeWizard: 0
            },
            wizardSimulator: {}
        };
    }

    componentWillMount() {
        this.props.actions.getWizard()
    }

    componentWillReceiveProps(props) {
        this.setState({settings: props.settings});
    }
    componentWillUnmount() {
    }

    renderWizard(wizard, index) {
        return  <div key={ index }>
            <div className="detail-line">
                <div className="text">
                    {`Wizard ${index + 1}`}
                </div>
                <PlayPause onClick={ () => {
                                            let wizardSimulator = Object.assign({}, this.state.wizardSimulator);
                                            wizardSimulator[wizard._id] = !wizardSimulator[wizard._id];
                                            this.setState({wizardSimulator: wizardSimulator})
                                         }
                               }
                           state={ this.state.wizardSimulator[wizard._id] } />
                    <RaisedButton onClick={ () => {
                                                let settings = Object.assign({}, this.state.settings);
                                                settings.activeWizard = wizard._id;
                                                this.setState({settings: settings})
                                            }
                                          }
                                  label="Activate"
                                  disabled={this.state.settings && this.state.settings.activeWizard === wizard._id}
                                  style={ {position: 'absolute', right: '40px'} }/>
            </div>
            { this.state.wizardSimulator[wizard._id] ? <Wizard wizardId={ wizard._id }/> : ''}
        </div>

    }

    saveSettings() {
        this.props.actions.changeAppSettings(this.state.settings);
    }

    render() {
        return (
            <div className="container">
                <div className="title">
                    Settings
                </div>


                <div className="settings">
                    <div className="options">
                        <div className="title">
                            Active wizard:
                        </div>
                        <div>
                            {
                                this.props.wizardList && this.props.wizardList.map(this.renderWizard.bind(this))
                            }
                        </div>
                    </div>
                    
                    <RaisedButton onClick={ this.saveSettings.bind(this) } label="Save" primary={true} style={ {float: 'right'} }/>
                </div>

            </div>
        )
    }
}
export default connect(
    (store) => ({
        wizardList: store.wizard,
        settings: store.settings
    }),
    (dispatch) => ({
        actions: {
            getWizard: bindActionCreators(getAllWizards, dispatch),
            changeAppSettings: bindActionCreators(changeAppSettings, dispatch),
        }
    }))(Settings);

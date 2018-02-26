import React, { Component } from 'react';
import { getAllWizards } from '../../serverConnection/Actions/WizardActions';
import { changeAppSettings } from '../../serverConnection/Actions/AppActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import PlayPause from "../General/Buttons/PlayPause/PlayPause";
import Wizard from "../Wizard/Wizard/Wizard";
import "./Settings.css";

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

    componentWillReceiveProps() {
        this.setState((state, props) => {
            return {settings: props.settings}
        });
    }
    
    componentWillUnmount() {
    }


    saveSettings() {
        /*
        let settings = {
            homeView: {
                components: [
                    {
                        type: 0,
                        data: [
                            {
                                title: 'step 1',
                                text: 'Some short explanation on step 1',
                                imageUrl: 'https://s3.eu-central-1.amazonaws.com/easy-client-assets/first-dot.png',
                                animation: 'grow'
                            },
                            {
                                title: 'step 2',
                                text: 'Some short explanation on step 2',
                                imageUrl: 'https://s3.eu-central-1.amazonaws.com/easy-client-assets/second-dot.png',
                                animation: 'grow'
                            },
                            {
                                title: 'step 3',
                                text: 'Some short explanation on step 3',
                                imageUrl: 'https://s3.eu-central-1.amazonaws.com/easy-client-assets/third-dot.png',
                                animation: 'grow'
                            },
                            {
                                title: 'step 4',
                                text: 'Some short explanation on step 4',
                                imageUrl: 'https://s3.eu-central-1.amazonaws.com/easy-client-assets/fourth-dot.png',
                                animation: 'grow'
                            }
                        ]
                    },
                    {
                        type: 1,
                        data: [
                            {
                                title: 'About',
                                animation: 'enter-left',
                                text: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
                                imageUrl: ''
                            },
                            {
                                title: '',
                                animation: 'enter-right',
                                text: '',
                                imageUrl: 'https://s3.eu-central-1.amazonaws.com/easy-client-assets/about.png'
                            }
                        ]
                    },
                    {
                        type: 2,
                        data: [{
                            title: 'About',
                            animation: 'enter-bottom',
                            text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.`,
                            longText: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                
                
                
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
                            imageUrl: [ 'https://s3.eu-central-1.amazonaws.com/easy-client-assets/first-dot.png', 'https://s3.eu-central-1.amazonaws.com/easy-client-assets/second-dot.png' ]
                        }]
                    }
                ]
            }
        }
        */
        this.props.actions.changeAppSettings(this.state.settings);
    }

    renderWizard(wizard, index) {
        return  <div key={ index }>
            <div className="detail-line">
                <div className="text">
                    {`Wizard ${index + 1}`}
                </div>
                <PlayPause onClick={ () => {
                                            this.setState( (state) => {
                                                let wizardSimulator = state.wizardSimulator;
                                                wizardSimulator[wizard._id] = !wizardSimulator[wizard._id];
                                                return {wizardSimulator}
                                            })
                                         }
                               }
                           state={ this.state.wizardSimulator[wizard._id] } />
                    <RaisedButton onClick={ () => {
                                                this.setState((state) => {
                                                    let settings = state.settings;
                                                    settings.activeWizard = wizard._id;
                                                    return {settings}
                                                })
                                            }
                                          }
                                  label="Activate"
                                  disabled={this.state.settings && this.state.settings.activeWizard === wizard._id}
                                  style={ {position: 'absolute', right: '40px'} }/>
            </div>
            { this.state.wizardSimulator[wizard._id] && <Wizard wizardId={ wizard._id }/> }
        </div>

    }

    render() {
        return (
            <div className="container" ref={(el)=>this.e = el}>
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

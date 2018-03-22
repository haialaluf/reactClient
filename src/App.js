import React, {Component} from 'react';
import Header from './components/General/Header/Header';
import Menu from './components/General/Menu/Menu';
import CreateWizardTool from './components/Wizard/CreateWizardTool/CreateWizardTool';
import Home from './components/HomePage/HomePageFactory';
import Settings from './components/Settings/Settings';
import LoginSignup from './components/Login/LoginSignup';
import Wizard from './components/Wizard/Wizard/Wizard';
import Orders from './components/Orders/Orders';
import { Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Style from './assets/Styles'
import { bindActionCreators } from 'redux';
import { whoAmI } from './serverConnection/Actions/UserActions';
import { getAppSettings } from './serverConnection/Actions/AppActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from './serverConnection/Actions/UserActions';
import './main.scss';

const HomePageTool = function (props) {
    return <Home edit="true" />
};

class App extends Component {

    constructor(props) {
        super(props);
        this.props.actions.getAppSettings();
        this.props.actions.whoAmI();
        this.state = {};

        const history = this.props.history;
        const path = window.location.href.substring(window.location.href.lastIndexOf('/'));
        if (history.location.pathname !== path) {
            history.replace(path);
        }
    }

    render() {
        return (
            <MuiThemeProvider
                muiTheme={ getMuiTheme({
                                palette: {
                                    textColor: '#000000',
                                    primary1Color: Style.colors.main,
                                    pickerHeaderColor: Style.colors.main
                                }
                            })
                          }>
                <div className={`App rtl ${window.innerHeight > window.innerWidth? 'long-screen' : ''}`}>
                    <Header menu={ this.state.menuOpen }
                            openMenu={ () => this.setState((state) => ({ menuOpen: !state.menuOpen })) }
                            user={ this.props.user }/>
                    <Menu menu={ this.state.menuOpen }
                          closeMenu={ ()=>this.setState({ menuOpen: false }) }
                          user={ this.props.user }
                          logOut ={ this.props.actions.logout }/>
                    <Switch>
                        <Route exact path='/' component={ Home }/>
                        <Route exact path='/HomePageTool' component={ HomePageTool } />
                        <Route path='/settings' component={ Settings }/>
                        <Route path='/login' component={ LoginSignup }/>
                        <Route path='/Wizard' component={ Wizard }/>
                        <Route path='/CreateWizardTool' component={ CreateWizardTool }/>
                        <Route path='/Orders' component={ Orders }/>
                    </Switch>
                </div>
            </MuiThemeProvider>
        );
    }
}

let AppComponent = connect(
    (store) => ({
        user: store.user
    }),
    (dispatch) => ({
        actions: {
            logout: bindActionCreators(logout, dispatch),
            getAppSettings: bindActionCreators(getAppSettings, dispatch),
            whoAmI: bindActionCreators(whoAmI, dispatch)
        }
    }))(App);

export default withRouter(props => <AppComponent {...props}/>);
import React, {Component} from 'react';
import Header from './components/smart/Header/Header';
import Menu from './components/smart/Menu/Menu';
import CreateWizardTool from './components/smart/CreateWizardTool/CreateWizardTool';
import Home from './pages/Home/Home';
import AddPost from './pages/Post/AddPost';
import Settings from './pages/Settings/Settings';
import LoginSignup from './pages/Login/LoginSignup';
import Wizard from './pages/Wizard/Wizard';
import Orders from './pages/Orders/Orders';
import { Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './main.scss';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Style from './assets/Styles'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        };
        let location = window.location.href;
        location = location.substring(location.lastIndexOf('/'), location.length);
        this.stickyHeader.bind(this)(location);
    }

    stickyHeader(location) {
        let self = this;
        const scrollSpy = (offset) => {
            return ()=> {
                let position = window.scrollY;
                if (position > offset && !self.state.sticky) {
                    self.setState({sticky: true})
                }
                else if (position < offset && self.state.sticky) {
                    self.setState({sticky: false})
                }
            }
        };
        switch (location) {
            case '/':
                window.addEventListener('scroll', scrollSpy(384));
                break;
            case '/Wizard':
                self.setState({sticky: true});
                break;
            case '/Orders':
                self.setState({sticky: true});
                break;
            default:
                window.addEventListener('scroll', scrollSpy(48));

        }

    }

    componentWillReceiveProps() {
        let location = window.location.href;
        location = location.substring(location.lastIndexOf('/'), location.length);
        if (this.location !== location) {
            this.location = location;
            this.stickyHeader.bind(this)(this.location);
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
                <div className={`App ${window.innerHeight > window.innerWidth? 'long-screen' : ''}`}>
                    <Header sticky={ this.state.sticky }
                            menu={ this.state.menuOpen }
                            openMenu={ ()=>this.setState({ menuOpen: !this.state.menuOpen }) }
                            user={ this.props.user }/>
                    <Menu menu={ this.state.menuOpen } closeMenu={ ()=>this.setState({ menuOpen: false }) }/>
                    <Switch>
                        <Route exact path='/' component={ Home }/>
                        <Route path='/settings' component={ Settings }/>
                        <Route path='/login' component={ LoginSignup }/>
                        <Route path='/AddPost' component={ AddPost }/>
                        <Route path='/Wizard' component={ Wizard }/>
                        <Route path='/CreateWizardTool' component={ CreateWizardTool }/>
                        <Route path='/Orders' component={ Orders }/>
                    </Switch>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App
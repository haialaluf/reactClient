import React, { Component } from 'react';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Home from './pages/Home/Home';
import AddPost from './pages/Post/AddPost';
import Items from './pages/Items/Items';
import Components from './pages/Components/Components';
import LoginSignup from './pages/Login/LoginSignup';
import Wizard from './pages/Wizard/Wizard';
import Orders from './pages/Orders/Orders';
import { Route, Switch } from 'react-router-dom';
import './main.scss';

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
                    self.setState({ sticky: true })
                }
                else if (position < offset && self.state.sticky){
                    self.setState({ sticky: false })
                }
            }
        };
        switch (location) {
            case '/':
                window.addEventListener('scroll', scrollSpy(384));
                break;
            case '/Wizard':
                self.setState({ sticky: true });
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
            <div className="App">
                <Header sticky={ this.state.sticky }
                        menu={ this.state.menuOpen }
                        openMenu={ ()=>this.setState({ menuOpen: !this.state.menuOpen }) }
                        user={ this.props.user }/>
                <Menu menu={ this.state.menuOpen } closeMenu={ ()=>this.setState({ menuOpen: false }) }/>
                <Switch>
                    <Route exact path='/' component={ Home }/>
                    <Route path='/components' component={ Components }/>
                    <Route path='/items' component={ Items }/>
                    <Route path='/login' component={ LoginSignup }/>
                    <Route path='/AddPost' component={ AddPost }/>
                    <Route path='/Wizard' component={ Wizard }/>
                    <Route path='/Orders' component={ Orders }/>
                </Switch>
            </div>
        );
    }
}

export default App

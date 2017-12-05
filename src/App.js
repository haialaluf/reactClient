import React, { Component } from 'react';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Home from './pages/Home/Home';
import Items from './pages/Items/Items';
import Components from './pages/Components/Components';
import LoginSignup from './pages/Login/LoginSignup';
import { Route, Switch } from 'react-router-dom';
import './styles/main.scss';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            let position = window.scrollY;
            if (position > 48) {
                this.setState({ stiky: true })
            } else {
            this.setState({ stiky: false })
            }
        });
    }


    render() {
        return (
            <div className="App">
                <Header stiky={ this.state.stiky }
                        menu={ this.state.menuOpen }
                        openMenu={ ()=>this.setState({ menuOpen: !this.state.menuOpen }) }
                        user={ this.props.user }/>
                <Menu menu={ this.state.menuOpen } closeMenu={ ()=>this.setState({ menuOpen: false }) }/>
                <Switch>
                    <Route exact path='/' component={ Home }/>
                    <Route path='/components' component={ Components }/>
                    <Route path='/items' component={ Items }/>
                    <Route path='/login' component={ LoginSignup }/>
                </Switch>
            </div>
        );
    }
}

export default App

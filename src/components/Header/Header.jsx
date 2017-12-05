import React, { Component } from 'react';
import Hamburger from '../Hamburger/Hamburger';
import Icon from '../Icon/Icon';
import Style from '../../assets/Styles'
import { bindActionCreators } from 'redux';
import { whoAmI } from '../../pages/Login/UserActions';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Scroll from 'react-scroll'; // Imports all Mixins

let Link = Scroll.Link;
let headerOffset = -12 - parseInt(Style.sizes.menuWidth.substring(0,2), 10);

class Header extends Component {

    componentWillMount() {
        this.props.actions.whoAmI()
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div style={ Object.assign({}, style.header, this.props.stiky ? style.stiky : {} ) }>
                <Hamburger open={ this.props.menu } onClick={ this.props.openMenu }/>

                {
                    this.props.location.pathname === '/' ?
                        <span className="home-page-header">
                            <span className="header-link hide-in-mobile">
                                <Link to="contact-form"
                                      onClick={ this.props.closeMenu }
                                      spy={ true } activeClass="active"
                                      smooth={ true } offset={ headerOffset }
                                      duration={ 400 }>
                                    Contact Us
                                </Link>
                            </span>
                            <span className="header-link hide-in-mobile">
                                <Link to="about"
                                      onClick={ this.props.closeMenu }
                                      spy={ true } activeClass="active"
                                      smooth={ true } offset={ headerOffset }
                                      duration={ 400 }>
                                    About
                                </Link>
                            </span>
                            <span className="header-link hide-in-mobile">
                                <Link to="how-it-work"
                                      onClick={ this.props.closeMenu }
                                      spy={ true } activeClass="active"
                                      smooth={ true }
                                      offset={ headerOffset }
                                      duration={ 400 }>
                                    How It's Work
                                </Link>
                            </span>
                            <span className="header-button swing">
                                Get Started
                            </span>
                        </span>
                        :
                        <span className="user-page-header" style={ style.loginButton }>
                            <Icon image="user" style={ style.userIcon }/>
                            { this.props.user && this.props.user.id ?
                                this.props.user.name :
                                <Route render={({ history}) => (
                                <span onClick={() => { history.push('/login') }}>Login/Signup</span>
                                )} />
                            }
                        </span>
                }

            </div>
        )
    }
}


let style = {
    header: {
        height: Style.sizes.headerHeight,
        width: '100%',
        background: Style.colors.menuPrimary,
        padding: '8px',
        position: 'fixed',
        zIndex: '100',
        left: '0',
        top: '0',
        transition: 'all 0.3s'
    },
    userIcon: {
        position: 'absolute',
        right: '-40px',
        bottom: '-4px',
        height: '28px',
        width: '28px'
    },
    loginButton: {
        position: 'absolute',
        right: '64px',
        top: '14px',
        cursor: 'pointer'
    },
    stiky: {
        boxShadow: 'rgba(0,0,0,.4) 0 0 4px 2px'
    }
};

let HeaderComponent = connect(
    (store) => ({
        user: store.user
    }),
    (dispatch) => ({
        actions: {
            whoAmI: bindActionCreators(whoAmI, dispatch)
        }
    }))(Header);

export default withRouter(props => <HeaderComponent {...props}/>);
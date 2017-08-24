import React, { Component } from 'react';
import Hamburger from '../Hamburger/Hamburger';
import Icon from '../Icon/Icon';
import Style from '../../assets/Styles'
import { bindActionCreators } from 'redux';
import { whoAmI } from '../../pages/Login/UserActions';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux';

class Header extends Component {

    componentWillMount() {
        this.props.actions.whoAmI()
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div style={ style.header }>
                <Hamburger open={ this.props.menu } onClick={ this.props.openMenu }/>
                <Icon image="user" style={ style.userIcon }/>
                <span style={ style.loginButton }>
                    { this.props.user && this.props.user.local ?
                        'Hello ' + this.props.user.local.name :
                        <Route render={({ history}) => (
                        <span onClick={() => { history.push('/login') }}>Login/Signup</span>
                        )} />
                    }</span>
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
        top: '0'
    },
    userIcon: {
        position: 'absolute',
        right: '32px',
        height: '28px',
        width: '28px',
    },
    loginButton: {
        position: 'absolute',
        right: '80px',
        top: '14px',
        cursor: 'pointer'
    }
};

export default connect(
    (store) => ({
        user: store.user
    }),
    (dispatch) => ({
        actions: {
            whoAmI: bindActionCreators(whoAmI, dispatch),
        }
    }))(Header);

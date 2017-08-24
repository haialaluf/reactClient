import React, {Component} from 'react';
import Style from '../../assets/Styles'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../pages/Login/UserActions';

class Menu extends Component {

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div style={ this.props.menu ? style.menu : Object.assign({}, style.menu, style.menuClose) }>
                {
                    this.props.menu ?
                        <ul>
                            <li><Link to='/' onClick={ this.props.closeMenu }>Home</Link></li>
                            <li><Link to='/components' onClick={ this.props.closeMenu }>Components</Link></li>
                            <li><Link to='/items' onClick={ this.props.closeMenu }>Items</Link></li>
                            <li><Link to='/login' onClick={ this.props.closeMenu }>Login</Link></li>
                            { this.props.user && this.props.user.local ?
                            <li><Link to='/login' onClick={ () => this.props.actions.logout() }>Logout</Link></li>
                            :
                            null }
                        </ul>
                        :
                        null
                }
            </div>
        )
    }
}


let style = {
    menu: {
        height: '25%',
        width: Style.sizes.menuWidth,
        background: Style.colors.menuPrimary,
        position: 'fixed',
        zIndex: '99',
        top: '0',
        transition: '.2s all',
        marginTop: '46px'
    },
    menuClose: {
        height: '0',
    }
};

export default connect(
    (store) => ({
        user: store.user
    }),
    (dispatch) => ({
        actions: {
            logout: bindActionCreators(logout, dispatch)
        }
    }))(Menu);

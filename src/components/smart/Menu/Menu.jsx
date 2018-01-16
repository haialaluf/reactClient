import React, {Component} from 'react';
import Style from '../../../assets/Styles'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../../serverConnection/Actions/UserActions';
import Scroll from 'react-scroll'; // Imports all Mixins

let LinkId = Scroll.Link;
let headerOffset = - (parseInt(Style.sizes.menuWidth.substring(0,2), 10) + 12);

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
                        <ul className="menu">
                            <li className="hide-in-tablet hide-in-desktop">
                                <LinkId to="how-it-work" 
                                        onClick={ this.props.closeMenu } 
                                        spy={ true } 
                                        smooth={ true } 
                                        offset={ headerOffset } 
                                        duration={ 400 }>
                                    How It's Work
                                </LinkId>
                            </li>
                            <li className="hide-in-tablet hide-in-desktop">
                                <LinkId to="about"
                                        onClick={ this.props.closeMenu }
                                        spy={ true }
                                        smooth={ true }
                                        offset={ headerOffset } 
                                        duration={ 400 }>
                                    About
                                </LinkId>
                            </li>
                            <li className="hide-in-tablet hide-in-desktop">
                                <LinkId to="contact-form"
                                      onClick={ this.props.closeMenu }
                                      spy={ true } activeClass="active"
                                      smooth={ true } offset={ headerOffset }
                                      duration={ 400 }>
                                    Contact Us
                                </LinkId>
                            </li>
                            <li>
                                <Link to='/' onClick={ this.props.closeMenu }>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to='/settings' onClick={ this.props.closeMenu }>
                                    Settings
                                </Link>
                            </li>
                            <li>
                                <Link to='/items' onClick={ this.props.closeMenu }>
                                    Items
                                </Link>
                            </li>
                            <li>
                                <Link to='/login' onClick={ this.props.closeMenu }>
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to='/AddPost' onClick={ this.props.closeMenu }>
                                    Post
                                </Link>
                            </li>
                            <li>
                                <Link to='/Orders' onClick={ this.props.closeMenu }>
                                    Orders
                                </Link>
                            </li>
                            <li>
                                <Link to='/CreateWizardTool' onClick={ this.props.closeMenu }>
                                    Create Wizard Tool
                                </Link>
                            </li>
                            { this.props.user && this.props.user.id ?
                            <li>
                                <Link to='/login' onClick={ () => this.props.actions.logout() }>
                                    Logout
                                </Link>
                            </li>
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
        width: Style.sizes.menuWidth,
        background: Style.colors.menuPrimary,
        position: 'fixed',
        zIndex: '99',
        top: '0',
        transition: '.4s all',
        marginTop: '46px',
        boxShadow: 'rgba(0, 0, 0, 0.4) 2px 4px 4px 0px'
    },
    menuClose: {
        transition: '.4s all',
        top: '-100vh'
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

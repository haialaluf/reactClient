import React, {Component} from 'react';
import Style from '../../../assets/Styles'
import { Link } from 'react-router-dom'
import Scroll from 'react-scroll'; // Imports all Mixins
import { withRouter } from 'react-router-dom';

let LinkId = Scroll.Link;
let headerOffset = - (parseInt(Style.sizes.menuWidth.substring(0,2), 10) + 12);

class Menu extends Component {

    constructor(props) {
        super(props);
        this.renderInnerLinks = this.renderInnerLinks.bind(this);
    }

    renderInnerLinks() {
        if (this.props.location.pathname === '/') {
            return (
                    <div  className="hide-in-tablet hide-in-desktop">
                        <li>
                            <LinkId to="how-it-work" 
                                    onClick={ this.props.closeMenu } 
                                    spy={ true } 
                                    smooth={ true } 
                                    offset={ headerOffset } 
                                    duration={ 400 }>
                                How It's Work
                            </LinkId>
                        </li>
                        <li>
                            <LinkId to="about"
                                    onClick={ this.props.closeMenu }
                                    spy={ true }
                                    smooth={ true }
                                    offset={ headerOffset } 
                                    duration={ 400 }>
                                About Us
                            </LinkId>
                        </li>
                        <li>
                            <LinkId to="large-note"
                                        onClick={ this.props.closeMenu }
                                        spy={ true }
                                        smooth={ true }
                                        offset={ headerOffset } 
                                        duration={ 400 }>
                                    About Something
                            </LinkId>
                        </li>
                        <li>
                            <LinkId to="contact-form"
                                onClick={ this.props.closeMenu }
                                spy={ true } activeClass="active"
                                smooth={ true } offset={ headerOffset }
                                duration={ 400 }>
                                Contact Us
                            </LinkId>
                        </li>
                    </div>
            )
    
        } else {
            return(<div/> )
        }
    }

    render() {
        return (
            <div style={ this.props.menu ? style.menu : Object.assign({}, style.menu, style.menuClose) }>
                {
                    this.props.menu ?
                        <ul className="menu">
                            { this.renderInnerLinks() }
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
                                <Link to='/login' onClick={ this.props.closeMenu }>
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to='/Orders' onClick={ this.props.closeMenu }>
                                    Orders
                                </Link>
                            </li>
                            <li>
                                <Link to='/HomePageTool' onClick={ this.props.closeMenu }>
                                    Home Page Tool
                                </Link>
                            </li>
                            <li>
                                <Link to='/CreateWizardTool' onClick={ this.props.closeMenu }>
                                    Create Wizard Tool
                                </Link>
                            </li>
                            { this.props.user && this.props.user.id ?
                            <li>
                                <Link to='/login' onClick={ () => this.props.logout() }>
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
        left: 0,
        transition: '.4s all',
        marginTop: '46px',
        boxShadow: 'rgba(0, 0, 0, 0.4) 2px 4px 4px 0px',
        direction: 'ltr'
    },
    menuClose: {
        transition: '.4s all',
        top: '-100vh'
    }
};

export default withRouter(props => <Menu {...props}/>);
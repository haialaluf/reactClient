import React, { Component } from 'react';
import Hamburger from '../Buttons/Hamburger/Hamburger';
import Icon from '../Icon/Icon';
import Style from '../../../assets/Styles'
import { Route } from 'react-router-dom'
import Scroll from 'react-scroll'; // Imports all Mixins
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';

const InnerLink = Scroll.Link;
const headerOffset = -12 - parseInt(Style.sizes.menuWidth.substring(0,2), 10);

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {}

        const history = this.props.history;
        history.listen((location) => {
            if (location.pathname) {
                this.stickyHeader.bind(this)(location.pathname);
            }
        });
        
    }

    stickyHeader(location) {
        let self = this;
        const scrollSpy = (offset) => {
            return () => {
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

    render() {
        return (
            <div style={ Object.assign({}, style.header, this.state.sticky ? style.sticky : {} ) }>
                <Hamburger open={ this.props.menu } onClick={ this.props.openMenu }/>

                {
                    this.props.location.pathname === '/' ?
                        <span className="home-page-header">
                            <span className="header-link hide-in-mobile">
                                <InnerLink to="contact-form"
                                      onClick={ this.props.closeMenu }
                                      spy={ true } activeClass="active"
                                      smooth={ true } offset={ headerOffset }
                                      duration={ 400 }>
                                    Contact Us
                                </InnerLink>
                            </span>
                            <span className="header-link hide-in-mobile">
                                <InnerLink to="large-note"
                                      onClick={ this.props.closeMenu }
                                      spy={ true } activeClass="active"
                                      smooth={ true } offset={ headerOffset }
                                      duration={ 400 }>
                                    About Something
                                </InnerLink>
                            </span>
                            <span className="header-link hide-in-mobile">
                                <InnerLink to="two-notes"
                                      onClick={ this.props.closeMenu }
                                      spy={ true } activeClass="active"
                                      smooth={ true } offset={ headerOffset }
                                      duration={ 400 }>
                                    About Us
                                </InnerLink>
                            </span>
                            <span className="header-link hide-in-mobile">
                                <InnerLink to="four-notes"
                                      onClick={ this.props.closeMenu }
                                      spy={ true } activeClass="active"
                                      smooth={ true }
                                      offset={ headerOffset }
                                      duration={ 400 }>
                                    How It's Work
                                </InnerLink>
                            </span>
                            <span className="header-button swing" style={ {backgroundColor: Style.colors.main} }>

                                <Link to='/Wizard' onClick={ this.props.closeMenu }>
                                    Get Started
                                </Link>

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
        width: 'calc(100% - 16px)',
        background: Style.colors.menuPrimary,
        padding: '8px',
        position: 'fixed',
        zIndex: '100',
        top: '0',
        transition: 'all 0.3s',
        direction: 'ltr'
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
    sticky: {
        boxShadow: 'rgba(0,0,0,.4) 0 0 4px 2px'
    }
};

export default withRouter(props => <Header {...props}/>);
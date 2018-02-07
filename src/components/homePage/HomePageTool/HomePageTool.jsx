import React, {Component} from 'react';
import ContactForm from '../../General/ContactForm/ContactForm';
import Note from '../Note/EditNote/EditNote';
import Config from '../../../Config';
import '../Home/Home.scss';

class HomePageTool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            focus: 0,
            menuOpen: false
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this)(30));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(ms) {
        let documentHeight, sectionHeight, lastCall=0;
        const windowHeight = window.innerHeight;
        const self = this;
        return function() {
            if (!documentHeight) {
                documentHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight,
                        document.documentElement.clientHeight, document.documentElement.scrollHeight,
                        document.documentElement.offsetHeight ) - windowHeight - 80;
                sectionHeight = documentHeight / 7;

            }
            let now = new Date().getTime(),
                diff = now - lastCall;
            if (diff >= ms) {
                let scrollTop = window.scrollY;
                let focus = Math.round(scrollTop / sectionHeight) + 1;
                self.setState((state) => {
                    return focus !== state.focus ? focus : {}
                });
            }
        };
    }


    render() {
        return (
            <div className="container">
                <div className="cover">
                    <video src={Config.storage + 'SampleVideo.mp4'} type="video/mp4" autoPlay loop muted/>
                </div>
                <div className="four-notes" name="four-notes">
                    <div className="title">
                        How It's Work
                    </div>
                    <div className="all-notes-container">
                        <div className="two-notes-container">
                            <Note animation="grow"
                                  focus={ this.state.focus === 1 }
                                  title="Step 1"
                                  imageUrl={ Config.storage + 'first-dot.png' }
                                  text="Some short explanation on step 1"/>
                            <Note animation="grow"
                                  focus={ this.state.focus === 2 }
                                  title="Step 2"
                                  imageUrl={ Config.storage + 'second-dot.png' }
                                  text="Some short explanation on step 2"/>
                        </div>
                        <div className="two-notes-container">
                            <Note animation="grow"
                                  focus={ this.state.focus === 3 }
                                  title="Step 3"
                                  imageUrl={ Config.storage + 'third-dot.png' }
                                  text="Some short explanation on step 3"/>
                            <Note animation="grow"
                                  focus={ this.state.focus === 4 }
                                  title="Step 4"
                                  imageUrl={ Config.storage + 'fourth-dot.png' }
                                  text="Some short explanation on step 4"/>
                        </div>
                    </div>
                </div>
                <div className="two-notes">
                    <Note
                        focus={ this.state.focus > 5 }
                        animation="enter-left"
                        title="About"
                        text={`
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                    `}/>
                    <Note imageUrl={ Config.storage + 'about.png' }
                          animation="enter-right"
                          className="hide-in-mobile hide-in-tablet"
                          focus={ this.state.focus > 5 }/>

                </div>
                <div name="contact-form">
                    <ContactForm></ContactForm>
                </div>
                <div className="footer">
                    Copyright © 2018 EasyClient
                </div>
            </div>
        )
    }
}

export default HomePageTool;

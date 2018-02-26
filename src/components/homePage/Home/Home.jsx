import React, {Component} from 'react';
import ContactForm from '../../General/ContactForm/ContactForm';
import Config from '../../../Config';
import './Home.scss';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            focus: 0,
            menuOpen: false
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.call(this, 30));
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
                        document.documentElement.offsetHeight ) - 2 * windowHeight;
                sectionHeight = documentHeight / 18;

            }
            let now = new Date().getTime(),
                diff = now - lastCall;
            if (diff >= ms) {
                let scrollTop = window.scrollY;
                let focus = Math.round(scrollTop / sectionHeight) + 1;
                self.setState((state) => {
                    return focus !== state.focus ? {focus} : {}
                });
            }
        };
    }


    render() {
        const Note = this.props.note;
        const data = this.props.data;
        return (
            <div className="container">
                <div className="cover">
                    <video src={ Config.storage + 'SampleVideo.mp4'} type="video/mp4" autoPlay loop muted/>
                </div>
                {
                    data && data[0] &&
                    <div className="four-notes" name="four-notes">
                        <div className="all-notes-container">
                            <div className="two-notes-container">
                                <Note focus={ this.state.focus >= 1  && this.state.focus < 3 }
                                    { ...data[0].data[0] }/>
                                <Note focus={ this.state.focus >= 3  && this.state.focus < 5 }
                                    { ...data[0].data[1] }/>
                            </div>
                            <div className="two-notes-container">
                                <Note focus={ this.state.focus >= 5  && this.state.focus < 7  }
                                    { ...data[0].data[2] }/>
                                <Note focus={ this.state.focus >= 7  && this.state.focus < 9  }
                                    { ...data[0].data[3] }/>
                            </div>
                        </div>
                    </div>
                }
                {
                    data && data[1] &&
                    <div className="two-notes" name="two-notes">
                        <Note focus={ this.state.focus > 9 }
                              animation="enter-left"
                            { ...data[1].data[0] } />
                        <Note { ...data[1].data[1] }
                            className="hide-in-mobile hide-in-tablet"
                            focus={ this.state.focus > 9 }
                            position={ this.state.focus - 10 }/>

                    </div>
                }
                {
                    data && data[2] &&
                    <div className="large-note" name="large-note">
                        <Note focus={ this.state.focus > 18 } { ...data[2].data[0] }/>
                    </div>
                }
                {
                    data &&
                    <div name="contact-form">
                        <ContactForm></ContactForm>
                    </div>
                }
                {
                    data &&
                    <div className="footer">
                        Copyright © 2018 EasyClient
                    </div>
                }
            </div>
        )
    }
}

export default Home;

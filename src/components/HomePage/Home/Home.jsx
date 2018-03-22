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



    renderFourNotes(data, focus, Note) {
        if (data && data.length === 4) {
            return (
                <div className="four-notes" name="four-notes">
                    <div className="all-notes-container">
                        <div className="two-notes-container">
                            <Note focus={ focus >= 1  && focus < 3 }
                                { ...data[0] }/>
                            <Note focus={ focus >= 3  && focus < 5 }
                                { ...data[1] }/>
                        </div>
                        <div className="two-notes-container">
                            <Note focus={ focus >= 5  && focus < 7  }
                                { ...data[2] }/>
                            <Note focus={ focus >= 7  && focus < 9  }
                                { ...data[3] }/>
                        </div>
                    </div>
                </div>
            )    
        }
    }


    renderTwoNotes(data, focus, Note) {
        if (data && data.length === 2) {
            return (
                <div className="two-notes" name="two-notes">
                    <Note focus={ focus > 9 }
                        animation="enter-left"
                        { ...data[0] } />
                    <Note { ...data[1] }
                        focus={ focus > 9 }
                        position={ focus - 10 }/>
                </div>
            )
        }
    }
    

    renderExpendableNode(data, focus, Note) {
        if (data && data.length === 1) {
            return (
                <div className="large-note" name="large-note">
                    <Note focus={ focus > 18 } { ...data[0] }/>
                </div>
            )
        }
    }


    render() {
        const Note = this.props.note;
        const data = this.props.data || [];
        
        return (
            <div className="container">
                <div className="cover">
                    <video src={ Config.storage + 'SampleVideo.mp4'} type="video/mp4" autoPlay loop muted/>
                </div>

                { data[0] ? this.renderFourNotes( data[0].data, this.state.focus, Note) : <div/> }
                { data[1] ? this.renderTwoNotes( data[1].data, this.state.focus, Note) : <div/> }
                { data[2] ? this.renderExpendableNode( data[2].data, this.state.focus, Note) : <div/> }

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

export default Home;

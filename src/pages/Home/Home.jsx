import React, {Component} from 'react';
// import {Carousel} from 'react-responsive-carousel';
import ContactForm from '../../components/smart/ContactForm/ContactForm'
import Config from '../../Config'


class Home extends Component {

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
        let timer, documentHeight, sectionHeight, lastCall=0;
        const windowHeight = window.innerHeight;
        documentHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight,
                document.documentElement.clientHeight, document.documentElement.scrollHeight,
                document.documentElement.offsetHeight ) - windowHeight;
        const self = this;
        return function() {
            if (!documentHeight) {
                documentHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight,
                        document.documentElement.clientHeight, document.documentElement.scrollHeight,
                        document.documentElement.offsetHeight ) - windowHeight;
                sectionHeight = documentHeight / 6;

            }
            let now = new Date().getTime(),
                diff = now - lastCall;
            if (diff >= ms) {
                let scrollTop = window.scrollY;
                let focus = Math.round(scrollTop / sectionHeight) + 1;
                if (focus != self.state.focus) {
                    self.setState({focus: focus})
                }
            }
        };
    }

    // randomColor() {
    //     let alfabet = '0123456789ABCDE'.split('');
    //     let hex = ['1', '2', '3', '4', '5', '6'].map(
    //         ()=> alfabet[parseInt(Math.random() * 16, 10)]
    //     );
    //     return '#' + hex.join('')
    // }

    render() {
        return (
            <div className="container">
                <div className="cover">
                    {/*
                     <Carousel autoPlay={ true } infiniteLoop={ true } showIndicators={ false } showStatus={ false } showThumbs={ false } >
                     <div className="slide" style={ { backgroundColor: this.randomColor() } }>
                     <div className="title" style={ { color: this.randomColor() } }>
                     This
                     </div>
                     </div>
                     <div className="slide" style={ { backgroundColor: this.randomColor() } }>
                     <div className="title" style={ { color: this.randomColor() } }>
                     Is
                     </div>
                     </div>
                     <div className="slide" style={ { backgroundColor: this.randomColor() } }>
                     <div className="title" style={ { color: this.randomColor() } }>
                     Home
                     </div>
                     </div>
                     </Carousel>
                     */}
                    <video src={Config.storage+'/SampleVideo.mp4'} type="video/mp4" autoPlay loop muted/>
                </div>
                <div className="how-it-work" name="how-it-work">
                    <div className="title">
                        How It's Work
                    </div>
                    <div className="all-stages-container">
                        <div className="two-stages-container">
                            <div className={ `stage stage1 ${this.state.focus === 1 ? 'grow' : ''}` }>
                                <div className="head">Step 1</div>
                                <div className="text">Some short explanation on step 1</div>
                            </div>
                            <div className={ `stage stage2 ${this.state.focus === 2 ? 'grow' : ''}` }>
                                <div className="head">Step 1</div>
                                <div className="text">Some short explanation on step 2</div>
                            </div>
                        </div>
                        <div className="two-stages-container">
                            <div className={ `stage stage3 ${this.state.focus === 3 ? 'grow' : ''}` }>
                                <div className="head">Step 3</div>
                                <div className="text">Some short explanation on step 3</div>
                            </div>
                            <div className={ `stage stage4 ${this.state.focus === 4 ? 'grow' : ''}` }>
                                <div className="head">Step 4</div>
                                <div className="text">Some short explanation on step 4</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about" name="about">
                    <div className="text-container">
                        <div className="title">
                            About
                        </div>
                        <div className="text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            <div className="br"/>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                    </div>
                    <div className="image-container"></div>
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

export default Home;

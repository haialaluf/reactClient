import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import ContactForm from '../../components/ContactForm/ContactForm'
class Home extends Component {

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    randomColor() {
        let alfabet = '0123456789ABCDE'.split('');
        let hex = ['1', '2', '3', '4', '5', '6'].map(
            ()=> alfabet[parseInt(Math.random() * 16, 10)]
        );
        return '#' + hex.join('')
    }

    render() {
        return (
            <div className="container">
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
                <div className="how-it-work" name="how-it-work">
                    <div className="title">
                        How It's Work
                    </div>
                    <div className="all-stages-container">
                        <div className="two-stages-container">
                            <div className="stage stage1">
                                <div className="head"></div>
                                <div className="text"></div>
                            </div>
                            <div className="stage stage2">
                                <div className="head"></div>
                                <div className="text"></div>
                            </div>
                        </div>
                        <div className="two-stages-container">
                            <div className="stage stage3">
                                <div className="head"></div>
                                <div className="text"></div>
                            </div>
                            <div className="stage stage4">
                                <div className="head"></div>
                                <div className="text"></div>
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                    </div>
                    <div className="image-container"></div>
                </div>
                <div name="contact-form">
                    <ContactForm></ContactForm>
                </div>
            </div>
        )
    }
}

export default Home;

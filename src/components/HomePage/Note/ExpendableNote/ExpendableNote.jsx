import React, { Component } from 'react';
import './ExpendableNote.css'
import Helpers from '../../../../helpers'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

class ExpendableNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expand: false
        };
    }

    componentWillMount () {
        let colors = this.props.colors || {};
        colors = Helpers.setDefaultColors(colors, ['title','text']);
        this.colors = colors;
    }

    render() {
        return (
            <div className={`note expandable-note ${ this.props.className } ${ this.state.expand? 'expand' : ''}`}
                 style={ {
                    backgroundColor: this.colors.background,
                    margin: this.state.expand ? '10vh 3vw' : '',
                    width: this.state.expand ? '94vw' : '',
                    height: this.state.expand ? '94vh' : ''
                    } }>

                {
                    this.props.imageUrl && this.props.imageUrl.length &&
                    <Carousel showArrows={ false }
                              showStatus={ false }
                              showThumbs={ this.state.expand }
                              autoPlay={ true }>
                        {
                            this.props.imageUrl.split(',').map( (imageUrl, index) =>
                                <div className="image-container" key={ index }>
                                    <img src={ imageUrl }
                                         alt="note"/>
                                </div>
                            )
                        }
                    </Carousel>

                }

                <div className="text-container">
                    <div className="title" style={ {color: this.colors.title} }>
                        { this.props.title }
                    </div>
                    <div className="text" style={ {color: this.colors.text} }>
                        { this.props.text }
                    </div>
                </div>
                {
                    this.state.expand &&
                    <div className="text-container">
                        <div className="text" style={ {color: this.colors.text} }>
                            { this.props.longText }
                        </div>
                    </div>
                }
                { this.props.children }
                <div onClick={ () => this.setState((state) => ({expand: !state.expand})) } className="expand-button">
                    Read { this.state.expand ? 'less' : 'more' }
                </div>
            </div>
        )
    }
}

export default ExpendableNote;

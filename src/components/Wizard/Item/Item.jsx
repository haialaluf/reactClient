/*
 Props: selected: bool
 Props: addCallback: function
 Props: deleteCallback: function
 */

import React, {Component} from 'react';
import Icon from '../../General/Icon/Icon';
import Star from '../../General/Buttons/Star/Star';
import PlayPause from '../../General/Buttons/PlayPause/PlayPause';
import helpers from '../../../helpers';
import Style from '../../../assets/Styles'
import { Carousel } from 'react-responsive-carousel';
import YouTube from 'react-youtube';

class Item extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            images: null,
            expand: false
        };
        this.setImage = this.setImage.bind(this);
        this.renderImageCarousel = this.renderImageCarousel.bind(this);
        this.renderButtons = this.renderButtons.bind(this);

    }

    componentWillMount() {
        this.setImage();
        this.videoUrls = this.props.item.videoUrl && this.props.item.videoUrl.split(',');
        const firstVideoUrl = this.videoUrls[0]; 
        this.videoId = helpers.getVideoId(firstVideoUrl);
    }

    setImage() {
        let item = this.props.item;
        let files = item && (item.filesUrl || item.fileList);
        if (files && files.length && files[0]) {
            //case Data from server
            if ( typeof files[0] === 'string') {
                this.setState({images: files});
            } else if (files[0] instanceof Blob) {
                let imagesPromise = files.map(helpers.blobToDataURL);
                Promise.all(imagesPromise).then((imagesDataUrl) => {
                    this.setState({images: imagesDataUrl});
                })
            }
        }
    }

    renderImageCarousel() {
        return this.state.expand && this.state.images && this.state.images.length && this.state.images[0] ?
        (
                <Carousel showArrows={ false }
                          showStatus={ false }
                          showThumbs={ this.state.expand }
                          autoPlay={ true }>
                    {
                        this.state.images.map( (imageUrl, index) =>
                            <div className="image-container" key={ index }>
                                <img src={ imageUrl }
                                     alt="note"/>
                            </div>
                        )
                    }
                </Carousel>
        ) : <div/>
    }

    renderButtons() {
        return !this.state.expand && this.props.addCallback ?
        <span className="buttons-container">
            <div>
                <div className="costume-button"
                    style={ {backgroundColor: this.props.selected ? Style.colors.main : Style.colors.menuSecondary } }>
                    <Star color={ '#FFD18A'} 
                        backgroundColor={this.props.selected ? Style.colors.main : Style.colors.menuSecondary}
                        state={ this.props.selected } 
                        size="36px"
                        onClick={ (e) => {
                                e.stopPropagation();
                                this.props.addCallback();
                            } } />
                </div>
            </div>
            <div>
                <div className="costume-button"
                    style={ {backgroundColor: this.state.play ? Style.colors.main : Style.colors.menuSecondary} }>
                    <PlayPause state={ this.state.play } 
                        color={ '#FFD18A'} 
                        backgroundColor={this.state.play ? Style.colors.main : Style.colors.menuSecondary}
                        size="28px"
                        onClick={ (e) => {
                            e.stopPropagation();
                            this.setState({play: !this.state.play}) 
                        } }/>
                </div>
            </div>
        </span> : <div/>
    }

    render() {
        const item = this.props.item;
        return (
                <div name={ item._id }
                     className={`item ${this.state.expand ? ' expand' : 'collapse'}`}
                     onClick={ () => !this.state.expand && this.setState((state) => ({ expand: !state.expand })) }>

                    { this.renderImageCarousel() }

                    <div className="title">{ item.name }</div>
                    {
                        !this.state.expand && this.state.play && this.videoId && 
                        <YouTube
                            videoId={ this.videoId }
                            opts={
                                {
                                    playerVars: {
                                        autoplay: 1
                                    },
                                    height: 'calc(100% - 60px)',
                                    width: '100%'
                                } }
                            onReady={this._onReady}
                        />
                    }
                    <div className={`description ${ !this.state.expand ? 'hide-in-mobile' : ''}`}>{ item.shortDescription }</div>
                    {
                        this.state.expand &&
                        <div className="description long">{ item.description }</div>
                    }
                    {
                        !this.state.expand && !this.state.play &&
                        <div className="image-container" 
                            style={ this.props.selected ? 
                                {border: '2px solid ' + Style.colors.main,
                                 width: 'calc(100% - 12px)',
                                 height: 'calc(100% - 114px)'
                                } : {} }>
                            <img src={ this.state.images ? this.state.images[0] : '' } alt="note"/>
                        </div>                    
                    }
                    {
                        this.state.expand && this.videoUrls.map((videoUrl) => (
                            <YouTube
                                videoId={ helpers.getVideoId(videoUrl) }
                                opts={ {
                                        width: '100%'
                                    } }
                                onReady={this._onReady}
                            />
                        ))
                    }
                    {
                        this.props.deleteCallback &&
                        <span className="left-icon small-icon" onClick={ () => this.props.deleteCallback(this.props.item._id) }>
                            <Icon image="delete"/>
                        </span>
                    }
                    {
                        this.state.expand &&
                        <span className="right-icon small-icon" onClick={ () => this.setState((state) => ({ expand: !state.expand })) }>
                                <Icon image={ this.state.expand? "close" : "expand" }/>
                        </span>                   
                    }
                    { this.renderButtons() }
                </div>
        )
    }
}

export default Item

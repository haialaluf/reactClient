import React, { Component } from 'react';
import './ExpendableNote.css'
import Scroll from 'react-scroll'; // Imports all Mixins

// var scroller = Scroll.scroller;
// let headerOffset = - (parseInt(Style.sizes.menuWidth.substring(0,2), 10) + 32);

class AnimatedTextNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expand: false
        };
    }

    // componentDidReceiveProps(props) {
    //     if (props.show)
    //     setTimeout(()=> scroller.scrollTo('large-note', {
    //         duration: 400,
    //         smooth: true,
    //         offset: headerOffset
    //     }), 144)
    // }

    render() {
        return (
            <div className={`note expandable-note ${ this.props.className }`}
                 style={ {
                    margin: this.state.expand ? '10vh 3vw' : '10vh 10vw',
                    width: this.state.expand ? '94vw' : '80vw',
                    height: this.state.expand ? '94vh' : '60vh'
                    } }>
                <div onClick={ () => this.setState((state) => ({expand: !state.expand})) } className="expand-button">
                    expand
                </div>
            </div>
        )
    }
}

export default AnimatedTextNote;

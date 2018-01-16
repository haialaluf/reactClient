import React, { Component } from 'react';
import Style from '../../../../assets/Styles'
class Hamburger extends Component {

    render() {
        return (
            <div style={ style.hamburger } onClick={ this.props.onClick }>
                <span style={ this.props.open? Object.assign({}, style.hamburgerLines, style.line1, style.lineOpen1) : Object.assign({}, style.hamburgerLines, style.line1)}></span>
                <span style={ this.props.open? Object.assign({}, style.hamburgerLines, style.line2, style.lineOpen2) : Object.assign({}, style.hamburgerLines, style.line2)}></span>
                <span style={ this.props.open? Object.assign({}, style.hamburgerLines, style.line3, style.lineOpen3) : Object.assign({}, style.hamburgerLines, style.line3)}></span>
            </div>
        )
    }
}


let style = {
    hamburger: {
        width: '28px',
        height: '32px',
        position: 'absolute',
        margin: '4px',
        transform: 'rotate(0deg)',
        transition: '.5s ease-in-out',
        cursor: 'pointer'
    },
    hamburgerLines: {
        display: 'block',
        position: 'absolute',
        height: '4px',
        width: '100%',
        background: Style.colors.menuSecondary,
        borderRadius: '6px',
        opacity: '1',
        left: '0',
        transform: 'rotate(0deg)',
        transformOrigin: 'left center',
        transition: '.25s ease-in-out'
    },
    line1: {
        top: '0px',
    },
    line2: {
        top: '8px',
    },
    line3: {
        top: '16px',
    },
    lineOpen1: {
        transform: 'rotate(45deg)',
        top: '0',
        left: '0'
    },
    lineOpen2: {
        width: '0%',
        opacity: '0'
    },
    lineOpen3: {
        transform: 'rotate(-45deg)',
        top: '20px',
        left: '0'
    }
};

export default Hamburger;

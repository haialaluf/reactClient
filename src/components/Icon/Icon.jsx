import React, { Component } from 'react';
import ReactSVG from 'react-svg'

class Icon extends Component {

    render() {
        const img = require(`./../../assets/icons/${this.props.image}.svg`);
        let style = {
            icon: {
                fill: this.props.color
            }
        };
        return (
            <span className={ this.props.className }>
                <ReactSVG
                    path={ img }
                    callback={svg => 1}
                    style={ Object.assign({}, style.icon, this.props.style) }
                />
            </span>

        )
    }
}

export default Icon;

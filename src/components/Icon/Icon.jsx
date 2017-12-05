import React, { Component } from 'react';
import ReactSVG from 'react-svg'
import Style from '../../assets/Styles'

class Icon extends Component {

    render() {
        const img = require(`./../../assets/icons/${this.props.image}.svg`);
        let style = {
            icon: {
                height: '32px',
                width: '32px',
                fill: Style.colors.menuSecondary
            }
        };
        return (
            <ReactSVG
                path={ img }
                callback={svg => 1}
                style={ Object.assign({}, style.icon, this.props.style) }
            />
        )
    }
}

export default Icon;

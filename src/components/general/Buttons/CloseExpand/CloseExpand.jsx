import React from 'react';
import Style from '../../../assets/Styles'

function CloseExpand(props) {
    return (
        <div style={ props.open? style.icon : Object.assign({}, style.icon, {transform: 'rotate(0)'})} onClick={ props.onClick }>
            <span style={ !props.open? Object.assign({}, style.lineExpand, style.top, style.line)
                                            : Object.assign({}, style.lineExpand, style.top)}>
                <span style={ props.open? Object.assign({}, style.arrow, style.arrowTop)
                                                : Object.assign({}, style.arrow, style.arrowTop, style.arrowTopExpand) }>
                </span>
            </span>
            <span style={ !props.open? Object.assign({},style.lineExpand, style.bottom, style.line) :
                                            Object.assign({}, style.lineExpand, style.bottom)}>
                <span style={ props.open? Object.assign({}, style.arrow, style.arrowBottom)
                                                : Object.assign({}, style.arrow, style.arrowBottom, style.arrowBottomExpand) }>
                </span>
            </span>
        </div>
    )
}



let style = {
    icon: {
        width: '32px',
        position: 'absolute',
        margin: '16px',
        transform: 'rotate(-45deg)'
    },
    line: {
        height: 0,
        transition: 'none'
    },
    lineExpand: {
        display: 'block',
        width: '.25em',
        height: '1.2em',
        background: Style.colors.menuSecondary,
        opacity: '1',
        left: '0',
        transformOrigin: 'left center',
        transition: '.25s ease-in-out'
    },
    top: {
        left: 0
    },
    bottom: {
        marginTop: '1em',
        right: 0
    },
    arrow: {
        borderRadius: '0.1em',
        display: 'inline-block',
        width: '.8em',
        height: '.8em',
        position: 'absolute',
        transform: 'rotate(-45deg)'
    },
    arrowTop: {
        top: 0,
        left: '-.25em',
        borderTop: '0.25em solid '+ Style.colors.menuSecondary,
        borderRight: '0.25em solid '+ Style.colors.menuSecondary,
        transition: '.25s ease-in-out'
    },
    arrowBottom: {
        left: '-.25em',
        top: '2.6em',
        borderBottom: '0.25em solid '+ Style.colors.menuSecondary,
        borderLeft: '0.25em solid '+ Style.colors.menuSecondary,
        transition: '.25s ease-in-out'
    },
    arrowTopExpand: {
        top: '1.6em',
    },
    arrowBottomExpand: {
        top: '.8em',
    }
};

export default CloseExpand;

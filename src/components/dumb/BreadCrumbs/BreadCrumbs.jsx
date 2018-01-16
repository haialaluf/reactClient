import React, { Component } from 'react';


class BreadCrumbs extends Component {

    render() {
        return (
            <div className="bread-crumbs">
                { this.props.children }
            </div>
        )
    }
}

export default BreadCrumbs


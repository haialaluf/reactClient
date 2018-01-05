/*
Props:
    show: Number (optional) How many bread crumbs to show (show="3" far 3 bread crumbs, show="all" for all fo them)
 */

import React, { Component } from 'react';


class BreadCrumbs extends Component {

    render() {
        let show = parseInt(this.props.show, 10);
        return (
            <div className="bread-crumbs">
                { this.props.children }
            </div>
        )
    }
}

export default BreadCrumbs


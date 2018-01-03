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
                { this.props.children.filter((val, index) =>  show && (index < show || index === this.props.children.length - 1)) }
            </div>
        )
    }
}

export default BreadCrumbs


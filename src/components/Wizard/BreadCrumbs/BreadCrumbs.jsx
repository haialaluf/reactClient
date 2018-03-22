import React from 'react';

function BreadCrumbs(props) {
    return (
        <div className="bread-crumbs">
            { props.children }
        </div>
    )
}

export default BreadCrumbs
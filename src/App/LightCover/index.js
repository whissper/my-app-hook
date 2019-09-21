import React from 'react';
import './LightCover.css';

function LightCover(props) {

    const { isLoading } = props;

    const style = {
        visibility: isLoading ? "visible" : "hidden",
        opacity: isLoading ? "1" : "0"
    };

    return (
        <div id="light_cover" style={style}>
            <div className="light_cover_info">
                <i className="fas fa-spinner fa-spin fa-3x"></i>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );

}

export default LightCover;

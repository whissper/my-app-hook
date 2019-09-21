import React from 'react';
import './TimerGenerator.css';

function TimerGenerator(props) {

    function handleClick() {
        props.addNewTimer();
    }

    return (
        <div className="generator">
            <button className="btn btn-default" onClick={handleClick}>Add</button>
        </div>
    );
}

export default TimerGenerator;

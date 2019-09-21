import React, { useReducer, useEffect } from 'react';
import './Timer.css';
import pretendToFetch from '../Utils/pretendToFetch';

function Timer({ increment = 1, ...props }) {
    
    /* const [counter, setCounter] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let timerID = null;

        const tick = () => {
            setCounter(
                (prevCounter) => (prevCounter + increment)
            );
        };

        if (isLoading) {
            pretendToFetch().then((result) => {
                setIsLoading(false);

                timerID = setInterval(
                    tick,
                    1000
                );
            });
        } else {
            timerID = setInterval(
                tick,
                1000
            );
        }

        return () => {
            clearInterval(timerID);
        };

    }, [increment, isLoading]); // [increment, isLoading] -- control this property over time */ 

    const initialState = { counter: 0, isLoading: true };

    function reducer(state, action) {
        switch (action.type) {
            case 'addIncrement':
                return { ...state, counter: state.counter + action.increment }
            case 'cancelLoading':
                return { ...state, isLoading: false };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const {counter, isLoading} = state;

    useEffect(() => {
        let timerID = null;

        const tick = () => {
            dispatch({ 
                type: 'addIncrement', 
                increment: increment 
            });
        };

        if (isLoading) {
            pretendToFetch().then((result) => {
                dispatch({ 
                    type: 'cancelLoading', 
                    increment: increment 
                });

                timerID = setInterval(
                    tick,
                    1000
                );
            });
        } else {
            timerID = setInterval(
                tick,
                1000
            );
        }

        return () => {
            clearInterval(timerID);
        };

    }, [increment, isLoading]);//[increment, state.isLoading] -- control this property over time

    function delClick() {
        props.onDelete(props.timerID);
    }

    function incClick() {
        props.onSetInc({timerID: props.timerID, increment: increment});
    }

    if (isLoading) {
        return (
            <div>
                <div className="timer-container">
                    <i className="fas fa-spinner fa-spin fa-2x"></i>
                    <span className="sr-only">LOADING...</span>
                </div>
                <div className="clear"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="timer-container">
                <span>Ticks have passed: {counter}</span>
                <button className="btn btn-danger" onClick={delClick}>DELETE</button>
                <button className="btn btn-success" data-toggle="modal" data-target="#myModal" onClick={incClick}>INC</button>
            </div>
            <div className="clear"></div>
        </div>
    );

}

export default Timer;

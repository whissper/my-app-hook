import React, { useReducer, useEffect } from 'react';
import './App.css';
import Timer from './Timer';
import TimerGenerator from './TimerGenerator';
import LightCover from './LightCover';
import pretendToFetch from './Utils/pretendToFetch';
import ModalWindow from './ModalWindow';


function App(props) {

    /* const [timers, setTimers] = useState(
        [
            <Timer key="1" timerID="1a" increment={2}
                onDelete={deleteTimer}
                onSetInc={chooseTimer} />,
            <Timer key="2" timerID="2b" increment={4}
                onDelete={deleteTimer}
                onSetInc={chooseTimer} />,
            <Timer key="3" timerID="3c" increment={12}
                onDelete={deleteTimer}
                onSetInc={chooseTimer} />
        ]
    );

    const [timerIsLoading, setTimerIsLoading] = useState(true);
    const [modalWindowParams, setModalWindowParams] = useState({title:'Unknown', inputVal: '0'});

    useEffect(() => {
        startLocking();

        pretendToFetch().then((result) => {
            stopLocking();
        });
    }, []);// [] -- empty array as second argument coz we want to fetch data only when component mounts */

    const initialState = {
        timers: [
            <Timer key="1" timerID="1a" increment={2}
                onDelete={deleteTimer}
                onSetInc={chooseTimer} />,
            <Timer key="2" timerID="2b" increment={4}
                onDelete={deleteTimer}
                onSetInc={chooseTimer} />,
            <Timer key="3" timerID="3c" increment={12}
                onDelete={deleteTimer}
                onSetInc={chooseTimer} />
        ],
        timerIsLoading: true,
        modalWindowParams: { title: 'Unknown', inputVal: '0' }
    };

    function reducer(state, action) {
        switch (action.type) {
            case 'addTimer':
                const lastTimer = state.timers.length ?
                    state.timers[state.timers.length - 1] :
                    <Timer key="1"
                        timerID="1a"
                        onDelete={deleteTimer}
                        onSetInc={chooseTimer} />;

                const keyVal = parseInt(lastTimer.key) + 1;
                const timerIDVal = keyVal + "e";

                const newTimer = <Timer key={keyVal}
                    timerID={timerIDVal}
                    onDelete={deleteTimer}
                    onSetInc={chooseTimer} />;

                return { ...state, timers: [...state.timers, newTimer] };
            case 'deleteTimer':
                const timersAfterDel = state.timers.filter(
                    (timer) => (timer.props.timerID !== action.timerID)
                );

                return { ...state, timers: timersAfterDel };
            case 'updateTimer':
                let timersAfterUpd = [];

                state.timers.forEach((el) => {
                    if (el.props.timerID === action.timerID) {
                        const changedTimer = <Timer key={el.key}
                            timerID={el.props.timerID}
                            increment={action.increment}
                            onDelete={deleteTimer}
                            onSetInc={chooseTimer} />;

                        timersAfterUpd.push(changedTimer);
                    } else {
                        timersAfterUpd.push(el);
                    }
                });

                return { ...state, timers: timersAfterUpd };
            case 'setTimerIsLoading':
                return { ...state, timerIsLoading: action.timerIsLoading };
            case 'setModalWindowParams':
                return { ...state, modalWindowParams: { title: action.timerID, inputVal: action.increment } };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const { timers, timerIsLoading, modalWindowParams } = state;

    useEffect(() => {
        startLocking();

        pretendToFetch().then((result) => {
            stopLocking();
        });
    }, []);// [] -- empty array as the second argument coz we want to fetch data only when component mounts

    function deleteTimer(id) {
        /* setTimers((prevTimers) => (
            prevTimers.filter((timer) => (timer.props.timerID !== id))
        )); 
        const freshTimers = timers.filter((timer) => (timer.props.timerID !== id)); */

        dispatch({
            type: 'deleteTimer',
            timerID: id
        });
    }

    function chooseTimer(timer) {
        //setModalWindowParams({title: timer.timerID, inputVal: timer.increment});
        dispatch({
            type: 'setModalWindowParams',
            timerID: timer.timerID,
            increment: timer.increment
        });
    }

    function addTimer() {
        /* const lastTimer = timers.length ?
            timers[timers.length - 1] :
            <Timer key="1"
                timerID="1a"
                onDelete={deleteTimer}
                onSetInc={chooseTimer} />;

        const keyVal = parseInt(lastTimer.key) + 1;
        const timerIDVal = keyVal + "e";

        const newTimer = <Timer key={keyVal}
            timerID={timerIDVal}
            onDelete={deleteTimer}
            onSetInc={chooseTimer} />;

        setTimers((prevTimers) => (prevTimers.concat(newTimer))); */
        dispatch({
            type: 'addTimer'
        });
    }

    function updateIncrement(ID, incrementVal) {
        /* let freshTimers = [];

        timers.forEach((el) => {
            if (el.props.timerID === ID) {
                const changedTimer = <Timer key={el.key}
                    timerID={el.props.timerID}
                    increment={incrementVal}
                    onDelete={deleteTimer}
                    onSetInc={chooseTimer} />;

                freshTimers.push(changedTimer);
            } else {
                freshTimers.push(el);
            }
        });

        setModalWindowParams({ title: ID, inputVal: incrementVal });
        setTimers(freshTimers); */
        dispatch({
            type: 'setModalWindowParams',
            timerID: ID,
            increment: incrementVal
        });
        dispatch({
            type: 'updateTimer',
            timerID: ID,
            increment: incrementVal
        });
    }

    function startLocking() {
        //setTimerIsLoading(true);
        dispatch({
            type: 'setTimerIsLoading',
            timerIsLoading: true
        });
    }

    function stopLocking() {
        //setTimerIsLoading(false);
        dispatch({
            type: 'setTimerIsLoading',
            timerIsLoading: false
        });
    }

    return (
        <div className="TimersTable container">
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <TimerGenerator addNewTimer={addTimer} />
                    {timerIsLoading ? null : timers}
                    <LightCover isLoading={timerIsLoading} />
                    <ModalWindow titleText={modalWindowParams.title}
                        inputText={modalWindowParams.inputVal}
                        changeIncrement={updateIncrement} />
                </div>
            </div>
        </div>
    );

}

export default App;

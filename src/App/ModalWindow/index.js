import React, { useRef, useEffect } from 'react';
import './ModalWindow.css';

function ModalWindow(props) {
    const { titleText, inputText } = props;

    const incrementInput = useRef(null);

    useEffect(() => {
        incrementInput.current.value = inputText;
    }, [inputText]);

    function saveIncrement() {
        props.changeIncrement(titleText, parseInt(incrementInput.current.value));
    }

    function cancelInput() {
        incrementInput.current.value = inputText;
    }

    return (
        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={cancelInput} ><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title" id="myModalLabel">Change increment of timer: {titleText}</h4>
                    </div>
                    <div className="modal-body">
                        <div className="input-group">
                            <span className="input-group-addon" id="basic-addon1">increment:</span>
                            <input type="text" className="form-control" placeholder="" aria-describedby="basic-addon1" defaultValue={inputText} ref={incrementInput} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal" onClick={cancelInput} >Cancel</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={saveIncrement} >Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalWindow;

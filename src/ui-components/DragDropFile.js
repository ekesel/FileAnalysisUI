import React from 'react';
import { Link } from "react-router-dom";
import { DING_SOUND } from '../constants';

function DragDropFile(props) {
    const [dragActive, setDragActive] = React.useState(false);
    const inputRef = React.useRef(null);

    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleFiles = (file) => {
        props.setFileItems(current => [...current, file]);
        ding();
    }
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files[0]);
        }
    };

    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files[0]);
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    const ding = () => {
        // audio as data file
        let sound = new Audio(DING_SOUND);
        sound.play();
    }

    return (
        <div className='fileContainer'>
            <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
                <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
                    <div>
                        <p>Drop your files here 🔥</p>
                        <p>OR</p>
                        <button className="upload-button" onClick={onButtonClick}>Browse</button>
                    </div>
                </label>
                {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
            </form>
            <div className='fileItems'>
                {props.fileItems && props.fileItems.map((item, index) => {
                    return (
                        <div className='itemRow' key={index}>
                            <Link to="/analysis" state={{ "file": item }} >
                            <span className='fileIcon'>{index + 1}.</span>
                            <span className='fileIcon'>📁</span>
                            <span>{item.name}</span>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default DragDropFile
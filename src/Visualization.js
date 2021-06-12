import React from "react";

import { FaPlay, FaPause, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useGlobalContext } from "./Context";
// import Button from "react-bootstrap/Button";
import { FaTwitter, FaGithub } from "react-icons/fa";

const Visualization = () => {
  const {
    
    visualizationStatus,
    playPauseToggle,
    changeSpeed,
    
  } = useGlobalContext();
  return (
    <div id="visualization">
      <div id="visualization-code-control-container">
        <textarea id="code-container" readOnly></textarea>
        <div id="visualization-controls">
          <div>
            <button
              id="increase-speed"
              className="button speed-btn"
              onClick={(e) => changeSpeed(e.target.id)}
            >
              {" "}
              <FaArrowDown
                onClick={(e) => changeSpeed(e.target.closest("button").id)}
              />
            </button>
            Speed
            <button
              id="decrease-speed"
              className="button speed-btn"
              onClick={(e) => changeSpeed(e.target.id)}
            >
              <FaArrowUp
                onClick={(e) => changeSpeed(e.target.closest("button").id)}
              />
            </button>
          </div>
          <button id="visualization-pause" onClick={playPauseToggle}>
            {visualizationStatus === "playing" ? <FaPause /> : <FaPlay />}
          </button>
          {/* Fast Forward button will be added later */}
          {/* <button
            id="visualization-forward"
            className="button"
            onClick={fastForward}
          >
            {" "}
            Fast Forward
          </button>*/}
        </div>
        <div className="contact">
          <a
            href="https://github.com/croy47"
            target="_blank"
            rel="noreferrer noopener"
          >
            <FaGithub />
          </a>
          <a
            href="https://twitter.com/chandan_py_js"
            target="_blank"
            rel="noreferrer noopener"
          >
            <FaTwitter />
          </a>
          <p>Designed By Chandan Roy</p>
        </div>

        <span></span>
      </div>
      {/* code output */}
      <div id="iframe-container">
        <iframe id="code-output">{/* <div id="code-output"></div> */}</iframe>
      </div>
    </div>
  );
};

export default Visualization;

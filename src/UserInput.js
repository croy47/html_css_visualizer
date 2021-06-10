import React from "react";
import { useGlobalContext } from "./Context";

const UserInput = () => {
  const { handleChange, startVisualization } = useGlobalContext();
  return (
    <div id="userinput">
      {/* html input */}
      <div id="html-input-component" className="input-component">
        <textarea
          id="html-textarea"
          className="html-textarea textarea"
          onChange={(e) => handleChange(e.target.value, e.target.id)}
          placeholder="Write your HTML here. Make Sure it's in correct format."
        ></textarea>
      </div>
      {/* css input */}
      <div id="css-input-component" className="input-component">
        <textarea
          id="css-textarea"
          className="css-textarea textarea"
          onChange={(e) => handleChange(e.target.value, e.target.id)}
          placeholder="Write your CSS here. Make Sure it's in correct format."
        ></textarea>
      </div>
      <button id="submit-btn" onClick={startVisualization}>
        {" "}
        Start Visualization{" "}
      </button>
    </div>
  );
};

export default UserInput;

import React from "react";
// import { useGlobalContext } from "./Context";

const Visualization = () => {
  // const { isVisualizationOn, increase, decrease } = useGlobalContext();
  return (
    <div id="visualization">
      <textarea id="code-container" readOnly></textarea>
      <div id="code-output"></div>
    </div>
  );
};

export default Visualization;

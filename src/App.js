import React from "react";
import { useGlobalContext } from "./Context";

import UserInput from "./UserInput";
import Visualization from "./Visualization";
export default function App() {
  const { isVisualizationOn } = useGlobalContext();

  if (!isVisualizationOn)
    return (
      <div className="app">
        <UserInput />
      </div>
    );

  return (
    <div className="app">
      {/* <UserInput /> */}
      <Visualization />
    </div>
  );
}

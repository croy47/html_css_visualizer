import React, { useContext, useEffect, useReducer, useRef } from "react";
import reducer from "./reducer";
import sanitizeHtml from "sanitize-html";

const AppContext = React.createContext();
//Provider, Consumer

const initialState = {
  html: "",
  css: "",
  isVisualizationOn: false,
  delay: 100,
  visualizationStatus: "playing",
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //destructure state for easy reference.
  const { isVisualizationOn, delay, visualizationStatus } = state;

  ////DECLARATIONS
  let codeInterval = useRef(null);
  let outputInterval = useRef(null);
  let indexRef = useRef(0);
  let html = `${state.html}`;

  const endingBodyTag = html.search("</body>");

  let css = `\n<style>\n${state.css}\n</style>\n`;
  let code = css
    ? html.slice(0, endingBodyTag) + css + html.slice(endingBodyTag)
    : html;
  ///

  const writer = (code, codeContainer) => {
    if (visualizationStatus === "playing") {
      codeContainer.append(code[indexRef.current]);
      codeContainer.scrollTop = codeContainer.scrollHeight;
      ++indexRef.current;
      if (indexRef.current === code.length) {
        indexRef.current = 0;
        clearInterval(codeInterval.current);
        codeInterval.current = null;
        return;
      }
    }
  };

  const updater = (codeVal, codeOutput) => {
    let doc = codeOutput.contentWindow.document;
    doc.open();
    doc.write(codeVal);
    doc.close();

    // let availableWidth = codeOutput.offsetWidth;

    // let actualBody = doc.querySelector("body");

    // let actualWidth = actualBody.scrollWidth;

    // if (actualWidth > availableWidth) {
    //   let scaleDownRatio = availableWidth / actualWidth;
    //   let roundedRatio = Math.round(scaleDownRatio * 10) / 10;
    //   console.log(roundedRatio);

    //   actualBody.style.transform = `scale(${roundedRatio - 0.3})`;
    //}
    if (codeInterval.current === null)
      return clearInterval(outputInterval.current);
  };

  useEffect(() => {
    ///
    if (isVisualizationOn) {
      ///
      ///
      let codeContainer = document.getElementById("code-container");
      let codeOutput = document.getElementById("code-output");
      // console.log(codeOutput.offsetWidth);

      ///

      ////
      if (visualizationStatus === "playing") {
        codeInterval.current = setInterval(() => {
          writer(code, codeContainer);
        }, delay);

        outputInterval.current = setInterval(() => {
          updater(codeContainer.value, codeOutput);
        }, delay);
      }
      ///
      return () => {
        clearInterval(codeInterval.current);
        clearInterval(outputInterval.current);
      };
    }
  }, [isVisualizationOn, visualizationStatus, delay]);

  ////
  const handleChange = (string, id) => {
    dispatch({ type: "UPDATE_STATE", payload: [string, id] });
  };

  ////
  const startVisualization = () => {
    dispatch({ type: "START_VISUALIZING" });
  };

  ////
  const playPauseToggle = () => {
    dispatch({ type: "CHANGE_VISUALIZATION_STATUS" });
  };

  ///
  const changeSpeed = (type) => {
    dispatch({ type: "CHANGE_SPEED", payload: type });
  };

  const fastForward = () => {
    // console.log(indexRef.current);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleChange,
        startVisualization,
        playPauseToggle,
        changeSpeed,
        fastForward,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

// let elementWidth = iframe.querySelector("body").scrollWidth;
// let containerWidth =
//   document.getElementById("iframe-container").scrollWidth;
// console.log(elementWidth, containerWidth);

// let scaleDownX =
//   document.getElementById("iframe-container").scrollWidth /
//   iframe.querySelector("body").scrollWidth;
// console.log(scaleDownX);

///
// let visualizerDoc = iframe.documentElement;
// console.log(visualizerDoc.offsetWidth, visualizerDoc.scrollWidth);

//condition when content overflows the container
// in such situation, this scales the content down to fit the container
// don't want it to happen at every render. rather when i %

// if (indexRef.current % 20 === 0) {
//   if (iframe.body.offsetWidth < iframe.body.scrollWidth) {
//     iframe.html.style.transform = `scale(${
//       iframe.html.offsetWidth / iframe.html.scrollWidth
//     }, 0)`;
//     console.log(iframe.body.offsetWidth, iframe.body.scrollWidth);
//   }
// }

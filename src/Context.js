import React, { useContext, useEffect, useReducer, useRef } from "react";
import reducer from "./reducer";
import sanitizeHtml from "sanitize-html";

const AppContext = React.createContext();
//Provider, Consumer

const initialState = {
  html: "",
  css: "",
  isVisualizationOn: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  let codeInterval = useRef(null);
  let outputInterval = useRef(null);

  let i = 0;
  const writer = (code, codeContainer) => {
    codeContainer.append(code[i]);
    codeContainer.scrollTop = codeContainer.scrollHeight;
    i++;
    if (i === code.length) {
      clearInterval(codeInterval.current);
      codeInterval.current = null;
      return;
    }
  };

  const updater = (codeVal, codeOutput) => {
    // codeOutput.setAttribute("dangerouslySetInnerHTML", {
    //   _html: { sanitized },
    // });

    // let sanitized = sanitizeHtml(codeVal);

    codeOutput.innerHTML = codeVal;
    codeOutput.scrollTop = codeOutput.scrollHeight;

    if (codeInterval.current === null)
      return clearInterval(outputInterval.current);
  };

  useEffect(() => {
    if (state.isVisualizationOn) {
      let html = `${state.html}`;
      const endingBodyTag = html.search("</body>");
      let css = `\n<style>\n${state.css}\n</style>\n`;
      let code = css
        ? html.slice(0, endingBodyTag) + css + html.slice(endingBodyTag)
        : html;

      let codeContainer = document.getElementById("code-container");
      let codeOutput = document.getElementById("code-output");
      codeInterval.current = setInterval(() => {
        writer(code, codeContainer);
      }, 200);

      outputInterval.current = setInterval(() => {
        updater(codeContainer.value, codeOutput);
      }, 400);

      return () => {
        clearInterval(codeInterval.current);
        clearInterval(outputInterval.current);
      };
    }
  }, [state.isVisualizationOn]);

  const handleChange = (string, id) => {
    dispatch({ type: "UPDATE_STATE", payload: [string, id] });
  };

  const startVisualization = () => {
    dispatch({ type: "START_VISUALIZING" });
  };

  return (
    <AppContext.Provider value={{ ...state, handleChange, startVisualization }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

const reducer = (state, action) => {
  try {
    if (action.type === "UPDATE_STATE") {
      if (action.payload[1] === "html-textarea") {
        return { ...state, html: action.payload[0] };
      }
      ///
      if (action.payload[1] === "css-textarea") {
        return { ...state, css: action.payload[0] };
      }
    }
    ///
    if (action.type === "START_VISUALIZING") {
      // console.log("start visualizing");

      return { ...state, isVisualizationOn: !state.isVisualizationOn };
    }
    ///
    if (action.type === "CHANGE_VISUALIZATION_STATUS") {
      return {
        ...state,
        visualizationStatus:
          state.visualizationStatus === "playing" ? "paused" : "playing",
      };
    }
    ///
    if (action.type === "CHANGE_SPEED") {
      if (action.payload === "decrease-speed") {
        return {
          ...state,
          delay:
            state.delay > 10
              ? Math.round(state.delay / 2)
              : state.delay > 3
              ? state.delay - 1
              : state.delay,
        };
      }
      if (action.payload === "increase-speed") {
        return {
          ...state,
          delay:
            state.delay < 50
              ? state.delay * 3
              : state.delay < 100
              ? state.delay * 2
              : state.delay < 300
              ? state.delay * 1.5
              : state.delay < 500
              ? state.delay * 1.5
              : state.delay * 1.3,
        };
      }
    }

    ///
    return { ...state };
  } catch (err) {
    alert("Sorry, I couldn't process it. Check your HTML or CSS");
  }
};

export default reducer;

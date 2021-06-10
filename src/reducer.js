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
      console.log("start visualizing");

      return { ...state, isVisualizationOn: !state.isVisualizationOn };
    }

    return { ...state };
  } catch (err) {
    alert("Sorry, I couldn't process it. Check your HTML or CSS");
  }
};

export default reducer;

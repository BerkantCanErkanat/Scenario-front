import { createSlice } from "@reduxjs/toolkit";

export const scenarioSlice = createSlice({
  name: "scenario",
  initialState: {
    posts: [],
  },
  reducers: {
    addToScenarios: (state, action) => {

    },
    updateScenario: (state, action) => {
      
    },
    removeFromScenarios: (state, action) => {

    },
  },
});

export const { addToScenarios,updateScenario,removeFromScenarios } = scenarioSlice.actions;

export default scenarioSlice.reducer;
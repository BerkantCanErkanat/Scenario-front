import { createSlice } from "@reduxjs/toolkit";

export const currentScenarioSlice = createSlice({
  name: "currentScenarior",
  initialState: {
    scenarioId: null
  },
  reducers: {
    setScenarioId: (state, action) => {
        state.scenarioId = action.payload
    },
  },
});

export const { setPostId } = currentScenarioSlice.actions;

export default currentScenarioSlice.reducer;
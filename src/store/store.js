import { configureStore } from '@reduxjs/toolkit'
import scenarioReducer from '../slices/ScenarioSlice'
import CurrentScenarioReducer from '../slices/CurrentScenarioSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import {scenarioAPI} from '../services/api'

export const store = configureStore({
  reducer: {
    scenario: scenarioReducer,
    currentScenario: CurrentScenarioReducer,
    [scenarioAPI.reducerPath]: scenarioAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(scenarioAPI.middleware),
});
setupListeners(store.dispatch)
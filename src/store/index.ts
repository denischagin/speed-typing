import { Action, ActionCreator, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit"
import mistakesSlice from "./slices/mistakesSlice"
import keyboardSlice from './slices/keyboardSlice';
import timerSlice from './slices/timerSlice';
import statatisticsSlice from './slices/statisticsSlice';
import { loadStateFromLocalStorage, saveStateToLocalStorage } from "./functions/localeStorage";
import settingsSlice from "./slices/settingsSlice";

const rootReducer = combineReducers({
    mistakes: mistakesSlice,
    keyboard: keyboardSlice,
    timer: timerSlice,
    statistics: statatisticsSlice,
    settings: settingsSlice,
})




export const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadStateFromLocalStorage()
}) 

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
type AppThunk = ActionCreator<
	ThunkAction<void, RootState, unknown, Action<string>>
>;

store.subscribe(() => saveStateToLocalStorage(store.getState()))

export type { AppDispatch, RootState, AppThunk };

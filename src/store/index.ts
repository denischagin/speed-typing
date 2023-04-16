import { Action, ActionCreator, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit"
import mistakesSlice from "./slices/mistakesSlice"
import keyboardSlice from './slices/keyboardSlice';
import textSlice from './slices/textSlice';
import timerSlice from './slices/timerSlice';
import statatisticsSlice from './slices/statisticsSlice';

const rootReducer = combineReducers({
    mistakes: mistakesSlice,
    keyboard: keyboardSlice,
    // text: textSlice,
    timer: timerSlice,
    statatistics: statatisticsSlice,
})


export const store = configureStore({
    reducer: rootReducer,
}) 

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
type AppThunk = ActionCreator<
	ThunkAction<void, RootState, unknown, Action<string>>
>;

export type { AppDispatch, RootState, AppThunk };
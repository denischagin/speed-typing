import { Action, ActionCreator, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit"
import mistakesSlice from "./slices/mistakesSlice"
import currentSymbolSlice from './slices/currentSymbolSlice';
import textSlice from './slices/textSlice';
import timerSlice from './slices/timerSlice';

const rootReducer = combineReducers({
    mistakes: mistakesSlice,
    currentSymbol: currentSymbolSlice,
    text: textSlice,
    timer: timerSlice
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
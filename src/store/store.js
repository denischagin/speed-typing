import { combineReducers, configureStore } from "@reduxjs/toolkit"
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


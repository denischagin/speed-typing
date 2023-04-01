
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentSymbol: "",
}

const currentSymbolSlice = createSlice({
    initialState,
    name: "currentSymbol",
    reducers: {
        setCurrentSymbol(state, action) {
            let payload = action.payload
            if (action.payload === " ") return payload = "Space"
            state.currentSymbol = action.payload
        }
    }
})

export default currentSymbolSlice.reducer
export const currentSymbolActions = currentSymbolSlice.actions
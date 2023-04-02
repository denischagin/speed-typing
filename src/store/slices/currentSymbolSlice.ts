
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface ICurrentSymbolState {
    currentSymbol: string;
}

const initialState: ICurrentSymbolState = {
    currentSymbol: "",
}

const currentSymbolSlice = createSlice({
    initialState,
    name: "currentSymbol",
    reducers: {
        setCurrentSymbol(state, action: PayloadAction<string>) {
            let payload = action.payload
            if (action.payload === " ") {
                payload = "Space"
                return 
            }
            state.currentSymbol = action.payload
        }
    }
})

export default currentSymbolSlice.reducer
export const currentSymbolActions = currentSymbolSlice.actions
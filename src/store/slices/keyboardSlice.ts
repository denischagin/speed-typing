
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface IKeyboardState {
    currentSymbol: string;
}

const initialState: IKeyboardState = {
    currentSymbol: "",
}

const keyboardSlice = createSlice({
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

export default keyboardSlice.reducer
export const { setCurrentSymbol } = keyboardSlice.actions
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IMistakesState  {
    mistakesCount: number
}

const initialState: IMistakesState = {
    mistakesCount: 0
}

const mistakesSlice = createSlice({
    initialState,
    name: "mistakes",
    reducers: {
        setMistakes(state, action: PayloadAction<number>) {
            state.mistakesCount = action.payload;
        },

        increment(state) {
            state.mistakesCount += 1;
        }

    }
})

export default mistakesSlice.reducer;
export const mistakesActions = mistakesSlice.actions
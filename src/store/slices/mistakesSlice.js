import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mistakesCount: 0
}

const mistakesSlice = createSlice({
    initialState,
    name: "mistakes",
    reducers: {
        setMistakes(state, action) {
            state.mistakesCount = action.payload;
        },

        increment(state) {
            state.mistakesCount += 1;
        }

    }
})

export default mistakesSlice.reducer;
export const mistakesActions = mistakesSlice.actions
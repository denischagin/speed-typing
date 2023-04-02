
import { createSlice } from '@reduxjs/toolkit';

interface ITimerState {
    timerIsStarted: boolean
}

const initialState = {
    timerIsStarted: false,
}

const timerSlice = createSlice({
    initialState,
    name: "timer",
    reducers: {
        startStopTimer(state) {
            state.timerIsStarted = !state.timerIsStarted
        }
    }
})

export default timerSlice.reducer
export const timerActions = timerSlice.actions
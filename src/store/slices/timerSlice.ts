
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

interface ITimerState {
    timerIsStarted: boolean,
    dateTimerStart: number;
    dateTimerFinish: number;
}

const initialState: ITimerState = {
    timerIsStarted: false,
    dateTimerFinish: 0,
    dateTimerStart: 0,
}

const timerSlice = createSlice({
    initialState,
    name: "timer",
    reducers: {
        startStopTimer(state) {
            state.timerIsStarted = !state.timerIsStarted
        },

        setDateTimeStart(state, action: PayloadAction<number>) {{
            state.dateTimerStart = action.payload
        }},

        setDateTimeFinish(state, action: PayloadAction<number>) {{
            state.dateTimerFinish = action.payload
        }},
    }
})

export default timerSlice.reducer
export const timerActions = timerSlice.actions
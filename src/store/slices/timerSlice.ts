import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface ITimerState {
  timerIsStarted: boolean;
  timer: number;
  dateStart: number;
}

const initialState: ITimerState = {
  timerIsStarted: false,
  timer: 0,
  dateStart: 0,
};

const timerSlice = createSlice({
  initialState,
  name: "timer",
  reducers: {
    startTimer(state) {
      state.timerIsStarted = !state.timerIsStarted;
      state.dateStart = Date.now();
    },

    stopTimer(state) {
      state.timerIsStarted = false;
      console.log('dispatch stop')
    },

    tick(state) {
      state.timer = (Date.now() - state.dateStart)/10
    },

    setTimer(state, action: PayloadAction<number>) {
      state.timer = action.payload
    }
  },
});

export default timerSlice.reducer;
export const { startTimer, stopTimer, setTimer, tick } =
  timerSlice.actions;

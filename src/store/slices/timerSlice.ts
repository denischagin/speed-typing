import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface ITimerState {
  timerIsStarted: boolean;
  timer: number
}

const initialState: ITimerState = {
  timerIsStarted: false,
  timer: 0,
};

const timerSlice = createSlice({
  initialState,
  name: "timer",
  reducers: {
    startStopTimer(state) {
      state.timerIsStarted = !state.timerIsStarted;
    },

    tick(state) {
      state.timer += 1
    },

    setTimer(state, action: PayloadAction<number>) {
      state.timer = action.payload
    }
  },
});

export default timerSlice.reducer;
export const { startStopTimer, tick, setTimer } =
  timerSlice.actions;

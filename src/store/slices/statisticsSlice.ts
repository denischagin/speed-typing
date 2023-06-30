import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { IText } from "../../types/IText";
import { fetchText } from "../asyncActions/fetchText";
import { TextTypeEnum } from "../../types/TextTypeEnum";
import { validateText } from "../../helpers/validateText";

interface IStatsState {
  printSpeedLetterPerMinute: number | null;
  printSpeedWordsPerMinute: number | null;
  countWords: number | null;
  countLetters: number | null;
  textType: TextTypeEnum;
  textNumber: number;
  text: string;
  isLoading: boolean;
  error: string | unknown;
}

const initialState: IStatsState = {
  printSpeedLetterPerMinute: null,
  printSpeedWordsPerMinute: null,
  countLetters: null,
  countWords: null,
  textType: TextTypeEnum.PARAGRAPH,
  textNumber: 1,
  text: "",
  isLoading: false,
  error: "",
};

const statatisticsSlice = createSlice({
  initialState,
  name: "statistics",
  reducers: {
    calcSpeed(state, action: PayloadAction<number>) {
      const minutes = action.payload / 6000;

      if (!state.countLetters || !state.countWords) return;

      state.printSpeedLetterPerMinute = Math.floor(
        state.countLetters / minutes
      );
      state.printSpeedWordsPerMinute = Math.floor(state.countWords / minutes);
    },

    setTypeAndNumberText(
      state,
      action: PayloadAction<{
        textType: TextTypeEnum;
        textNumber: number;
      }>
    ) {
      (state.textType = action.payload.textType),
        (state.textNumber = action.payload.textNumber);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchText.pending, (state) => {
        (state.isLoading = true), (state.error = "");
      })
      .addCase(fetchText.fulfilled, (state, action: PayloadAction<IText>) => {
        state.isLoading = false;

        const text = validateText(action.payload.text);

        state.text = text;
        
        state.countLetters = state.text.length;
        state.countWords = state.text.split(" ").length;
      })
      .addCase(fetchText.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default statatisticsSlice.reducer;
export const { calcSpeed, setTypeAndNumberText } = statatisticsSlice.actions;

import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { IText } from "../../types/IText";
import { fetchText } from "../asyncActions/fetchText";
import { TextTypeEnum } from "../../types/TextTypeEnum";
import { validateText } from "../../helpers/validateText";
import { IHistoryStatistic } from "../../types/IHistoryStatistic";

interface IStatsState {
  printSpeedLetterPerMinute: number | null;
  printSpeedWordsPerMinute: number | null;
  textType: TextTypeEnum;
  textNumber: number;
  text: string;
  isLoading: boolean;
  error: string | unknown;
  history: IHistoryStatistic[]
}

const initialState: IStatsState = {
  printSpeedLetterPerMinute: null,
  printSpeedWordsPerMinute: null,
  textType: TextTypeEnum.PARAGRAPH,
  textNumber: 1,
  text: "",
  isLoading: false,
  error: "",
  history: []
};

const statatisticsSlice = createSlice({
  initialState,
  name: "statistics",
  reducers: {
    setText(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },

    setTypeAndNumberText(
      state,
      action: PayloadAction<{
        textType: TextTypeEnum;
        textNumber: number;
      }>
    ) {
      state.textType = action.payload.textType,
      state.textNumber = action.payload.textNumber;
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
      
      })
      .addCase(fetchText.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default statatisticsSlice.reducer;
export const { setTypeAndNumberText, setText } = statatisticsSlice.actions;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type FontFamilyType = "Roboto" | "Arial" | "Tahoma" | "Verdana" | "Comic Sans MS";
export type FontWeightType = "normal" | "bold"
export type FontSizeType = string

interface ISettingsState {
  fontFamily: FontFamilyType;
  fontSize: FontSizeType;
  fontWeight: FontWeightType;
}

const initialState: ISettingsState = {
  fontFamily: "Roboto",
  fontSize: "18px",
  fontWeight: "normal",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setFontFamily: (state, action: PayloadAction<FontFamilyType>) => {
      state.fontFamily = action.payload;
    },

    setFontSize: (state, action: PayloadAction<FontSizeType>) => {
      state.fontSize = action.payload;
    },

    setFontWeight: (state, action: PayloadAction<FontWeightType>) => {
      state.fontWeight = action.payload;
    },
  },
});

export const { setFontFamily, setFontSize, setFontWeight } =
  settingsSlice.actions;
export default settingsSlice.reducer;

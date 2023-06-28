import { createAsyncThunk } from "@reduxjs/toolkit";
import { IText } from "../../types/IText";
import { TextService } from "../../services/TextService";
import { TextTypeEnum } from "../../types/TextTypeEnum";

interface ITextParams {
    textNumber: number
    textType: TextTypeEnum,
}

export const fetchText = createAsyncThunk<IText, ITextParams>(
    "statatistics/fetchText",
    async (textParams) => {
        const { textType, textNumber: number } = textParams
        try {
            const result = await TextService.getText(textType, number)
            return result
        } catch(e) {
            return (e as Error).message
        }
    }
)

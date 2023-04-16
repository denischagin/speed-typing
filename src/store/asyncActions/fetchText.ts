import { createAsyncThunk } from "@reduxjs/toolkit";
import { IText } from "../../types/IText";

export const fetchText = createAsyncThunk<IText, void>(
    "statatistics/fetchText",
    async () => {
        try {
            const url = 'https://fish-text.ru/get?type=paragraph&number=1&format=json&lang=ru'
            const response = await fetch(url)
            return response.json();
        } catch(e) {
            return (e as Error).message
        }
    }
)

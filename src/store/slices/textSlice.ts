
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IText } from '../../types/IText';

export const fetchText = createAsyncThunk<IText, void>(
    "text/fetchText",
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

interface ITextState {
    text: string,
    isLoading: boolean,
    error: string | unknown,
}

const initialState: ITextState = {
    text: "",
    isLoading: false,
    error: ""
}

const textSlice = createSlice({
    initialState,
    name: "text",
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchText.pending, (state) => {
                state.isLoading = true,
                state.error = ''
            })
            .addCase(fetchText.fulfilled, (state, action: PayloadAction<IText>) => {
                state.isLoading = false
                state.text = action.payload.text
            })
            .addCase(fetchText.rejected, (state, action ) => {
                state.isLoading = false
                state.error = action.payload ?? 'Something went wrong'
            })
    }
})

export default textSlice.reducer
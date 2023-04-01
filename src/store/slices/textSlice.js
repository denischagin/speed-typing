
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchText = createAsyncThunk(
    "text/fetchText",
    async () => {
        try {
            const url = 'https://fish-text.ru/get?type=paragraph&number=1&format=json&lang=ru'
            const response = await fetch(url)
            return response.json();
        } catch(e) {
            return e.message
        }
    }
)

const initialState = {
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
            .addCase(fetchText.pending, (state, action) => {
                state.isLoading = true,
                state.error = ''
            })
            .addCase(fetchText.fulfilled, (state, action) => {
                state.isLoading = false
                state.text = action.payload.text
            })
            .addCase(fetchText.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export default textSlice.reducer
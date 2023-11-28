import { createSlice } from "@reduxjs/toolkit";
import { ICast } from "../../interfaces/ICast";
import { IGenre } from "../../interfaces/IGenre";
import { getTVShows } from "../thunks/tvShows.thunk";
import { ITVShow } from "../../interfaces/ITVShow";

interface TVShowsState {
    tvShows: { [category: string]: ITVShow[] };
    genres: IGenre[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined | unknown;
    selectedTvShow: ITVShow & { cast?: ICast[] } | null;

}

const initialState: TVShowsState = {
    tvShows: {},
    genres: [],
    status: 'idle',
    error: null,
    selectedTvShow: null
}

export const tvShowsSlice = createSlice({
    name: 'tvShows',
    initialState,
    reducers: {
        setSelectedTvShow: (state, action) => {
            state.selectedTvShow = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // * TV SHOWS * 
            .addCase(getTVShows.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTVShows.fulfilled, (state, action) => {
                console.log("action.payload",action.payload)
                const { category, page } = action.meta.arg;
                state.status = 'succeeded';
                state.tvShows[category] = action.payload;
            })
            .addCase(getTVShows.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

    }
})

export const { setSelectedTvShow } = tvShowsSlice.actions;
export default tvShowsSlice.reducer;
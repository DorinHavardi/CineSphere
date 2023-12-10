import { createSlice } from "@reduxjs/toolkit";
import { ICast } from "../../interfaces/ICast";
import { IGenre } from "../../interfaces/IGenre";
import { getGenres, getTVShow, getTVShows } from "../thunks/tvShows.thunk";
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
                // console.log("action.payload",action.payload)
                const { category, page } = action.meta.arg;
                state.status = 'succeeded';
                state.tvShows[category] = action.payload;
            })
            .addCase(getTVShows.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getTVShow.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTVShow.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log("action.payload", action.payload)
                state.selectedTvShow = action.payload;
            })
            .addCase(getTVShow.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // * GENRES *
            .addCase(getGenres.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getGenres.fulfilled, (state, action) => {
                state.genres = action.payload;
                state.status = 'succeeded';
            })
            .addCase(getGenres.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            })

    }
})

export const { setSelectedTvShow } = tvShowsSlice.actions;
export default tvShowsSlice.reducer;
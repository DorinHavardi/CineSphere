import { createSlice } from '@reduxjs/toolkit';
import { IGenre } from '../../interfaces/IGenre';
import { IMovie } from '../../interfaces/IMovie';
import { ICast } from '../../interfaces/ICast';
import { getGenres, getMovie, getMovieCast, getMovies } from '../thunks/movies.thunk';

interface MoviesState {
    movies: { [category: string]: IMovie[] };
    genres: IGenre[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined | unknown;
    selectedMovie: IMovie & { cast?: ICast[] } | null;
}

const initialState: MoviesState = {
    movies: {},
    genres: [],
    status: 'idle',
    error: null,
    selectedMovie: null,
};

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setSelectedMovie: (state, action) => {
            state.selectedMovie = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // * MOVIES *
            .addCase(getMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMovies.fulfilled, (state, action) => {
                const { category, page } = action.meta.arg;
                state.status = 'succeeded';
                state.movies[category] = action.payload;
            })
            .addCase(getMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getMovie.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMovie.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log("action.payload", action.payload)
                state.selectedMovie = action.payload;
            })
            .addCase(getMovie.rejected, (state, action) => {
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
            // * CAST *
            .addCase(getMovieCast.pending, (state) => {
                state.status = 'loading'
            }).addCase(getMovieCast.fulfilled, (state, action) => {
                state.status = 'succeeded'
                if (state.selectedMovie) {
                    state.selectedMovie.cast = action.payload;
                }
            }).addCase(getMovieCast.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
});

export const { setSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;

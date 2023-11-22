import { createSlice } from '@reduxjs/toolkit';
import Config from 'react-native-config';
import { IGenre } from '../../interfaces/IGenre';
import { IMovie } from '../../interfaces/IMovie';
import { ICast } from '../../interfaces/ICast';
import { getGenres, getMovieCast, getMovies } from '../thunks/movies.thunk';

const API_KEY = Config.TMDB_API_KEY;

interface MoviesState {
    movies: { [category: string]: IMovie[] };
    genres: IGenre[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined | unknown;
    selectedMovie: IMovie & { cast?: ICast[] } | null,
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

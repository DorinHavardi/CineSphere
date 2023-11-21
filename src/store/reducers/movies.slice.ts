import { createSlice } from '@reduxjs/toolkit';
import Config from 'react-native-config';
import { IGenre } from '../../interfaces/IGenre';
import { IMovie } from '../../interfaces/IMovie';
import { ICast } from '../../interfaces/ICast';
import { getMovieCast } from '../thunks/movies.thunk';

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
        setMovies: (state, action) => {
            const { category, movies } = action.payload;
            state.movies[category] = movies;
        },
        setSelectedMovie: (state, action) => {
            state.selectedMovie = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getMovieCast.pending, (state) => {
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

export const { setMovies, setSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;

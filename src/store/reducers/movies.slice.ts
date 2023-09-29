import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Config from 'react-native-config';
const API_KEY = Config.TMDB_API_KEY;


interface MoviesState {
    movies: any[]; // ideally, you'd want to type the movie data more specifically
    genres: [];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined;
}

const initialState: MoviesState = {
    movies: [],
    genres: [],
    status: 'idle',
    error: null,
};

export const fetchNewMovies = createAsyncThunk('movies/fetchNewMovies', async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);
    return response.data.results;
});

export const getMoviesGenres = createAsyncThunk('movies/getMoviesGenres', async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    return response.data.genres;
})

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNewMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload;
            })
            .addCase(fetchNewMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getMoviesGenres.fulfilled, (state, action) => {
                state.genres = action.payload;
            });

    },
});

export default moviesSlice.reducer;

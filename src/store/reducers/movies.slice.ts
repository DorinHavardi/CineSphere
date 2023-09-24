import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Config from 'react-native-config';

export const fetchNewMovies = createAsyncThunk('movies/fetchNewMovies', async () => {
    const apiKey = Config.TMDB_API_KEY;
    const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`);
    console.log("response", response.data.results);
    return response.data.results;
});

interface MoviesState {
    movies: any[]; // ideally, you'd want to type the movie data more specifically
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined;
}

const initialState: MoviesState = {
    movies: [],
    status: 'idle',
    error: null,
};


export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
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
            });
    },
});

export default moviesSlice.reducer;

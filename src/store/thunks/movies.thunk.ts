// moviesThunks.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import Config from 'react-native-config';

const API_KEY = Config.TMDB_API_KEY;

export const getMovieCast = createAsyncThunk(
    'movies/getMovieCast',
    async (movieId, thunkAPI) => {
        try {
            const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.cast;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

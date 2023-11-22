// moviesThunks.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import Config from 'react-native-config';
import { ETMDBCategories } from '../../enums/ETMDBCategories';
import axios from 'axios';

const API_KEY = Config.TMDB_API_KEY;

export const getMovies = createAsyncThunk(
    'movies/getMovies',
    async ({ category, page }: { category: ETMDBCategories, page: number }, thunkAPI) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=en-US&page=${page}`);
            return response.data.results;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getGenres = createAsyncThunk(
    'genres/fetchGenres',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
            return response.data.genres; // An array of genres { id: number, name: string }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response ? error.response.data : "An error occurred");
        }
    }
);

export const getMovieCast = createAsyncThunk(
    'movies/getMovieCast',
    async ({ movieId }: { movieId: number }, thunkAPI) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`);
            return response.data.cast; // axios automatically parses the JSON response
        } catch (error: any) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error.response.data);
            } else if (error.request) {
                return thunkAPI.rejectWithValue("No response received");
            } else {
                return thunkAPI.rejectWithValue(error.message);
            }
        }
    }
);
import { createAsyncThunk } from "@reduxjs/toolkit";
import Config from "react-native-config";
import { ETVCategories } from "../../enums/ETMDBCategories";
import axios from "axios";


const API_KEY = Config.TMDB_API_KEY;

export const getTVShows = createAsyncThunk(
    'tvShows/getTVShows',
    async ({ category, page }: { category: ETVCategories, page: number }, thunkAPI) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/tv/${category}?api_key=${API_KEY}&language=en-US&page=${page}`);
            return response.data.results;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getTVShow = createAsyncThunk(
    'movies/getTVShow',
    async ({ tvShowId }: { tvShowId: number }, thunkAPI) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${API_KEY}&language=en-US`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getGenres = createAsyncThunk(
    'genres/getGenres',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`);
            return response.data.genres; // An array of genres { id: number, name: string }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response ? error.response.data : "An error occurred");
        }
    }
);

export const getTvShowCast = createAsyncThunk(
    'movies/getTvShowCast',
    async ({ tvShowId }: { tvShowId: number }, thunkAPI) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/tv/${tvShowId}/credits?api_key=${API_KEY}`);
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
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
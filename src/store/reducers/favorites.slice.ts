import { createSlice } from "@reduxjs/toolkit";
import { IItem } from "../../types/item.type";

interface IFavorites {
    favorites: IItem[];
}

const initialState: IFavorites = {
    favorites: []
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            state.favorites.push(action.payload);
        },
        removeFromFavorites: (state, action) => {
            state.favorites = state.favorites.filter(item => item.id !== action.payload.id);
        }
    }
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

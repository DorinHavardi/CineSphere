import { createSlice } from "@reduxjs/toolkit";

interface SystemState {
    isTabBarVisible: boolean;
    isLoading: boolean;
}

const initialState: SystemState = {
    isTabBarVisible: true,
    isLoading: false,
};

export const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        setIsTabBarVisible: (state, action) => {
            state.isTabBarVisible = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        }
    },
})

export const { setIsTabBarVisible, setIsLoading } = systemSlice.actions;
export default systemSlice.reducer
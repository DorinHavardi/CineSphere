import { createSlice } from "@reduxjs/toolkit";

interface SystemState {
    isTabBarVisible: boolean;
}

const initialState: SystemState = {
    isTabBarVisible: true
};

export const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        setIsTabBarVisible: (state, action) => {
            state.isTabBarVisible = action.payload;
        }
    },
})

export const { setIsTabBarVisible } = systemSlice.actions;
export default systemSlice.reducer
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface IAuthState {
    user: IUser | null;
    error: string | null;
}

const initialState: IAuthState = {
    user: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    },
});

export const { setUser, setError } = authSlice.actions;
export default authSlice.reducer;

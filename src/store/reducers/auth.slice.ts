import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IUser";

export interface IAuthState {
    user: IUser | null | undefined;
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
        setUser: (state, action: PayloadAction<IUser | null | undefined>) => {
            state.user = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    },
});

export const { setUser, setError } = authSlice.actions;
export default authSlice.reducer;

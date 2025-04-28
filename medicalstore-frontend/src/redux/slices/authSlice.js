import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        userRole: null,
        authFormType: 'login',
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            // state.userRole = action.payload.role;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.userRole = null;
        },
        setAuthFormType(state, action) {
            state.authFormType = action.payload; // 'login' or 'register'
        },
    },
});

export const { login, logout,setAuthFormType } = authSlice.actions;

export default authSlice.reducer;
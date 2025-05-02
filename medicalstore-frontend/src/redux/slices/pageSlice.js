import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
    name: 'page',
    initialState: {
        currentPage: 'dashboard', 
    },
    reducers: {
        switchPage(state, action) {
            state.currentPage = action.payload;
            // state.userRole = action.payload.role;
        },
    },
});

export const { switchPage } = pageSlice.actions;

export default pageSlice.reducer;
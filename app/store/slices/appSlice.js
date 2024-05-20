import { createSlice } from '@reduxjs/toolkit';

export const AppSlice = createSlice({
    name: 'app',
    initialState: {},
    reducers: {
        setAppConfig: (state, action) => {
            state.config = action.payload
        },
    }
});

export const { setAppConfig } = AppSlice.actions;

export default AppSlice.reducer;

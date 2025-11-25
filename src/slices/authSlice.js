import { createSlice } from '@reduxjs/toolkit';
import { getUserInfo, setUserInfo, removeUserInfo } from '../utils/storage';

const initialState = {
    userInfo: getUserInfo(),
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            setUserInfo(action.payload);
        },
        logout: (state) => {
            state.userInfo = null;
            removeUserInfo();
        },
    }
});

export const {
    setCredentials,
    logout
} = authSlice.actions;

export default authSlice.reducer;
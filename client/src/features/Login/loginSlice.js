import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authUser } from "./../../utils/userApi";
import Cookies from 'js-cookie';


export const authenticateUser = createAsyncThunk(
    'users/authenticate',
    async (userInfo, thunkAPI) => {
        const response = await authUser(userInfo.email, userInfo.password);
        Cookies.set('token', response);
        thunkAPI.dispatch(displayDialog(false));
        return response;
    }
) 

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loading: false,
        openDialog: false,
        failedLogin: false
    },
    reducers: {
        displayDialog(state, action) {
            const display = action.payload;
            state.openDialog = display;
        }
    },
    extraReducers: {
        [authenticateUser.pending]: (state, action) => {
            state.loading = true;
        },
        [authenticateUser.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [authenticateUser.rejected]: (state, action) => {
            state.loading = false;
            state.failedLogin = true;
        }
    }
})


export const { displayDialog } = loginSlice.actions;
export default loginSlice.reducer;
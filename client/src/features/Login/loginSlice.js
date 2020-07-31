import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authUser } from "./../../utils/userApi";
import Cookies from 'js-cookie';


export const authenticateUser = createAsyncThunk(
    'users/authenticate',
    async (userInfo, thunkAPI) => {
        try {
            const response = await authUser(userInfo.email, userInfo.password);
            Cookies.set('token', response);
            thunkAPI.dispatch(displayDialog(false));
            userInfo.loginDispatch({ type: 'clear' });
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue("Invalid Email/Password");
        }

    }
) 

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loading: false,
        openDialog: false,
        loginStatus: false
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
            state.loginStatus = true;
        },
        [authenticateUser.rejected]: (state, action) => {
            state.loading = false;
            state.loginStatus = false;
            // console.log(action.payload);
        }
    }
})


export const { displayDialog } = loginSlice.actions;
export default loginSlice.reducer;
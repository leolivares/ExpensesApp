import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authUser } from "./../../utils/userApi";
import Cookies from 'js-cookie';


export const authenticateUser = createAsyncThunk(
    'users/authenticate',
    async (userInfo, thunkAPI) => {
        try {
            const response = await authUser(userInfo.email, userInfo.password);
            Cookies.set('token', response);
            await (async () => new Promise(resolve => setTimeout(resolve, 1000)))();
            userInfo.loginDispatch({ type: 'clear' });
            thunkAPI.dispatch(loginUser());
            return response;
        } catch (e) {
            userInfo.loginDispatch({ type: 'loginFailed' });
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
        },
        loginUser(state, action) {
            state.openDialog = false;
            state.loginStatus = true;
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
            state.loginStatus = false;
            // console.log(action.payload);
        }
    }
})


export const { displayDialog, loginUser } = loginSlice.actions;
export default loginSlice.reducer;
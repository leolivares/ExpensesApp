import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser } from "./../../utils/userApi";
import { authUser } from "./../../utils/userApi";
import { loginUser } from "./../Login/loginSlice";
import Cookies from 'js-cookie';


export const registerUser = createAsyncThunk(
    'users/register',
    async (userInfo, thunkAPI) => {
        try {
            const response = await createUser(userInfo.email, 
                userInfo.first_name, 
                userInfo.last_name, 
                userInfo.birthday, 
                userInfo.password);
            await (async () => new Promise(resolve => setTimeout(resolve, 1000)))();
            userInfo.registerDispatch({ type: 'clear' });
            thunkAPI.dispatch(displayDialog(false));
            console.log(`Check: ${userInfo.email} ${userInfo.password}`);

            const token = await authUser(userInfo.email, userInfo.password);
            Cookies.set('token', token);
            thunkAPI.dispatch(loginUser());
            return response;
        } catch(e) {
            userInfo.registerDispatch({ type: 'registerFailed' });
            return thunkAPI.rejectWithValue("Email already in use");
        }
    }
) 

const registerSlice = createSlice({
    name: 'register',
    initialState: {
        loading: false,
        openDialog: false,
        failedRegister: false
    },
    reducers: {
        displayDialog(state, action) {
            const display = action.payload;
            state.openDialog = display;
        }
    },
    extraReducers: {
        [registerUser.pending]: (state, action) => {
            state.loading = true;
        },
        [registerUser.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [registerUser.rejected]: (state, action) => {
            state.loading = false;
            state.failedRegister = true;
        }
    }
})


export const { displayDialog } = registerSlice.actions;
export default registerSlice.reducer;
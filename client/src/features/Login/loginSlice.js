import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authUser } from "./../../utils/userApi";


export const authenticateUser = createAsyncThunk(
    'users/authenticate',
    async (userInfo, thunkAPI) => {
        const response = await authUser(userInfo.email, userInfo.password);
        return response;
    }
) 

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loading: false,
        openDialog: false,
        token: null
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
            state.token = action.payload;
        },
        [authenticateUser.rejected]: (state, action) => {
            state.loading = false;
        }
    }
})


export const { displayDialog } = loginSlice.actions;
export default loginSlice.reducer;
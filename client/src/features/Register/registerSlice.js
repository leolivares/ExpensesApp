import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser } from "./../../utils/userApi";


export const registerUser = createAsyncThunk(
    'users/register',
    async (userInfo, thunkAPI) => {
        console.log(`BD: ${userInfo.birthday}`);
        const response = await createUser(userInfo.email, 
                                          userInfo.first_name, 
                                          userInfo.last_name, 
                                          userInfo.birthday, 
                                          userInfo.password);
        thunkAPI.dispatch(displayDialog(false));
        return response;
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
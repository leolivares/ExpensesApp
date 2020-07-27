import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const authenticateUser = createAsyncThunk(
    'users/authenticate',
    async (userInfo, thunkAPI) => {
        console.log(`HEY: ${userInfo}`);
        return "Done";
    }
) 

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loading: false,
        openDialog: false
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
        }
    }
})


export const { displayDialog } = loginSlice.actions;
export default loginSlice.reducer;
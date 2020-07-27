import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './../features/Login/loginSlice';


const store = configureStore({
  reducer: {
    login: loginReducer
  },
});

export default store;
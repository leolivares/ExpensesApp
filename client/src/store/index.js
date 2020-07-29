import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './../features/Login/loginSlice';
import registerReducer from './../features/Register/registerSlice';


const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer
  },
});

export default store;
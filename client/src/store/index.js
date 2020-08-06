import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import loginReducer from './../features/Login/loginSlice';
import registerReducer from './../features/Register/registerSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: [
    'login',
  ]
};

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

export const persistor = persistStore(store);
export default store;
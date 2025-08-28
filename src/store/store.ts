// store.ts
import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './blogs';
import storeReducer from './storeSlice';
import interviewsReducer from './interviewSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, storeReducer);

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    store: persistedReducer,
    interviews: interviewsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

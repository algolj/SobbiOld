import { rootReducer } from './reducers/rootReducer';
import { configureStore } from '@reduxjs/toolkit';

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppDispatch = ReturnType<typeof setupStore>;

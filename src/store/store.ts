import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { articlesSlice } from "./articles-slice";
import { commentsSlice } from "./comments-slice";

const rootReducer = combineReducers({
  articles: articlesSlice.reducer,
  comments: commentsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

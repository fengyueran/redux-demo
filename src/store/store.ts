import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { articlesReducer } from "./articles-slice";
import { commentsReducer } from "./comments-slice";

const rootReducer = combineReducers({
  articles: articlesReducer,
  comments: commentsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

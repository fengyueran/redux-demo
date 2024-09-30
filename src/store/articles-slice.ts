import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types for Article and Comment
interface Article {
  id: string;
  title: string;
  content: string;
  commentIds: string[];
}

// Define the initial state for articles
interface ArticlesState {
  byId: Record<string, Article>;
  allIds: string[];
}

// Articles Slice
const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    byId: {},
    allIds: [],
  } as ArticlesState,
  reducers: {
    addArticle: (
      state,
      action: PayloadAction<{ id: string; title: string; content: string }>
    ) => {
      const { id, title, content } = action.payload;
      state.byId[id] = { id, title, content, commentIds: [] };
      state.allIds.push(id);
    },
    updateArticle: (
      state,
      action: PayloadAction<{ id: string; title: string; content: string }>
    ) => {
      const { id, title, content } = action.payload;
      if (state.byId[id]) {
        state.byId[id].title = title;
        state.byId[id].content = content;
      }
    },
    deleteArticle: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      delete state.byId[id];
      state.allIds = state.allIds.filter((articleId) => articleId !== id);
    },
    addCommentToArticle: (
      state,
      action: PayloadAction<{ articleId: string; commentId: string }>
    ) => {
      const { articleId, commentId } = action.payload;
      state.byId[articleId].commentIds.push(commentId);
    },
    removeCommentFromArticle: (
      state,
      action: PayloadAction<{ articleId: string; commentId: string }>
    ) => {
      const { articleId, commentId } = action.payload;
      const article = state.byId[articleId];
      if (article) {
        article.commentIds = article.commentIds.filter(
          (id) => id !== commentId
        );
      }
    },
  },
});

export const articlesActions = articlesSlice.actions;
export const articlesReducer = articlesSlice.reducer;

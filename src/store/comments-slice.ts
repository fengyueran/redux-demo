import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types for Comment
interface Comment {
  id: string;
  content: string;
  author: string;
  articleId: string;
}

// Define the initial state for comments
interface CommentsState {
  byId: Record<string, Comment>;
  allIds: string[];
}

// Comments Slice
const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    byId: {},
    allIds: [],
  } as CommentsState,
  reducers: {
    addComment: (
      state,
      action: PayloadAction<{
        id: string;
        content: string;
        author: string;
        articleId: string;
      }>
    ) => {
      const { id, content, author, articleId } = action.payload;
      state.byId[id] = { id, content, author, articleId };
      state.allIds.push(id);
    },
    updateComment: (
      state,
      action: PayloadAction<{ id: string; content: string }>
    ) => {
      const { id, content } = action.payload;
      if (state.byId[id]) {
        state.byId[id].content = content;
      }
    },
    deleteComment: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      delete state.byId[id];
      state.allIds = state.allIds.filter((commentId) => commentId !== id);
    },
  },
});

export const commentsActions = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;

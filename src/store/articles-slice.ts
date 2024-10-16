import { PayloadAction } from "@reduxjs/toolkit";

import {
  createEntityReducer,
  EntityState,
} from "../utils/create-entity-reducer";

interface Article {
  id: string;
  title: string;
  content: string;
  commentIds: string[];
}

const reducers = {
  addCommentToArticle: (
    state: EntityState<Article>,
    action: PayloadAction<{ articleId: string; commentId: string }>
  ) => {
    const { articleId, commentId } = action.payload;
    state.byId[articleId].commentIds.push(commentId);
  },
  removeCommentFromArticle: (
    state: EntityState<Article>,
    action: PayloadAction<{ articleId: string; commentId: string }>
  ) => {
    const { articleId, commentId } = action.payload;
    const article = state.byId[articleId];
    if (article) {
      article.commentIds = article.commentIds.filter((id) => id !== commentId);
    }
  },
};

export const articlesSlice = createEntityReducer<Article, typeof reducers>({
  name: "articles",
  reducers,
});

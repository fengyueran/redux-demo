import { createSelector } from "reselect";

import { RootState } from "./store";

const getAllIds = (state: RootState) => state.articles.allIds;
const getArticlesById = (state: RootState) => state.articles.byId;

export const getAllArticles = createSelector(
  [getAllIds, getArticlesById],
  (allIds, byId) => allIds.map((id: string) => byId[id])
);

export const getAllCommentIds = (state: RootState) => state.comments.allIds;

const getCommentsById = (state: RootState) => state.comments.byId;

const getCommentId = (_state: RootState, id: string) => id;

export const getCommentById = createSelector(
  [getCommentsById, getCommentId],
  (byId, id) => byId[id]
);

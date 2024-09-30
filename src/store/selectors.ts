import { createSelector } from "reselect";
import { RootState } from "./store";

export const getAllArticles = (state: RootState) =>
  state.articles.allIds.map((id) => state.articles.byId[id]);

// 获取文章详情
export const getArticleById = (state: RootState, articleId: string) =>
  state.articles.byId[articleId];

// 获取评论详情
export const getCommentsById = (state: RootState, commentId: string) =>
  state.comments.byId[commentId];

// 获取文章的所有评论
//getArticleComments的参数和createSelector第一个参数数组中第一个元素的输入一样，也就是和getArticleById一样
export const getArticleComments = createSelector(
  [getArticleById, (state) => state.comments.byId],
  (article, commentsById) =>
    article.commentIds.map((commentId) => commentsById[commentId])
);

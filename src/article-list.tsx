import { useDispatch, useSelector } from "react-redux";
import { articlesActions, commentsActions, selectors } from "./store";

import { CommentList } from "./comment-list";
export const ArticleList = () => {
  const dispatch = useDispatch();
  const articles = useSelector(selectors.getAllArticles);

  const handleAddArticle = () => {
    const articleId = "article3";
    dispatch(
      articlesActions.addArticle({
        id: articleId,
        title: "New Article",
        content: "This is a new article.",
      })
    );
  };

  const handleDeleteArticle = (id: string) => {
    dispatch(articlesActions.deleteArticle({ id }));
  };

  const handleAddComment = (articleId: string) => {
    const commentId = "comment1";
    dispatch(
      commentsActions.addComment({
        id: commentId,
        content: "Great article!",
        author: "user1",
        articleId,
      })
    );
    dispatch(articlesActions.addCommentToArticle({ articleId, commentId }));
  };

  return (
    <div>
      <button onClick={handleAddArticle}>Add Article</button>
      {articles.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
          <button onClick={() => handleAddComment(article.id)}>
            Add Comment
          </button>
          <CommentList articleId={article.id} />
          <button onClick={() => handleDeleteArticle(article.id)}>
            Delete Article
          </button>
        </div>
      ))}
    </div>
  );
};

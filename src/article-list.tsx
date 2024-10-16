import { useDispatch, useSelector } from "react-redux";
import { articlesSlice, commentsSlice, selectors } from "./store";

import { CommentList } from "./comment-list";
export const ArticleList = () => {
  const dispatch = useDispatch();
  const articles = useSelector(selectors.getAllArticles);

  const handleAddArticle = () => {
    const articleId = String(Date.now());
    dispatch(
      articlesSlice.actions.addEntity({
        id: articleId,
        title: `New Article-${new Date()}`,
        content: "This is a new article.",
        commentIds: [],
      })
    );
  };

  const handleDeleteArticle = (id: string) => {
    dispatch(articlesSlice.actions.deleteEntity(id));
  };

  const handleAddComment = (articleId: string) => {
    const commentId = String(Date.now());
    dispatch(
      commentsSlice.actions.addEntity({
        id: commentId,
        content: `Great article!-${new Date()}`,
        author: "user1",
        articleId,
      })
    );
    dispatch(
      articlesSlice.actions.addCommentToArticle({ articleId, commentId })
    );
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

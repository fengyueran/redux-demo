import { useSelector, useDispatch } from "react-redux";
import { selectors, commentsActions, articlesActions } from "./store";

interface Props {
  articleId: string;
}
export const CommentList = (props: Props) => {
  const { articleId } = props;
  const dispatch = useDispatch();
  const comments = useSelector((state) =>
    selectors.getArticleComments(state, articleId)
  );

  const handleDelete = (commentId: string) => {
    dispatch(
      articlesActions.removeCommentFromArticle({ articleId, commentId })
    );
    dispatch(commentsActions.deleteComment({ id: commentId }));
  };

  return (
    <div>
      {comments?.length
        ? comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.content}</p>
              <button onClick={() => handleDelete(comment.id)}>
                {" "}
                Delete Comment
              </button>
            </div>
          ))
        : null}
    </div>
  );
};

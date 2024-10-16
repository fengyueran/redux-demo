import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectors, commentsSlice, articlesSlice, RootState } from "./store";

interface CommentProps {
  articleId: string;
  commentId: string;
}
const Comment = React.memo((props: CommentProps) => {
  const { articleId, commentId } = props;
  const dispatch = useDispatch();

  const comment = useSelector((state: RootState) =>
    selectors.getCommentById(state, commentId)
  );

  const handleDelete = (commentId: string) => {
    dispatch(
      articlesSlice.actions.removeCommentFromArticle({ articleId, commentId })
    );
    dispatch(commentsSlice.actions.deleteEntity(commentId));
  };

  return (
    <div>
      <p>{comment.content}</p>
      <button onClick={() => handleDelete(comment.id)}>Delete Comment</button>
    </div>
  );
});
interface Props {
  articleId: string;
}
export const CommentList = (props: Props) => {
  const { articleId } = props;
  const commentIds = useSelector(selectors.getAllCommentIds);

  return (
    <div>
      {commentIds?.length
        ? commentIds.map((commentId) => (
            <Comment
              key={commentId}
              articleId={articleId}
              commentId={commentId}
            />
          ))
        : null}
    </div>
  );
};

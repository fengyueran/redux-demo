import { createEntityReducer } from "../utils/create-entity-reducer";

interface Comment {
  id: string;
  content: string;
  author: string;
  articleId: string;
}

export const commentsSlice = createEntityReducer<Comment>({
  name: "comment",
});

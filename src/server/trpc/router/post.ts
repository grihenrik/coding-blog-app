import { router } from "../trpc";
import { createPost } from "./post/postBody/createPost";
import { read } from "./post/read";
import { readOne } from "./post/readOne";
import { likePost } from "./post/likePost";
import { getLikes } from "./post/getLikes";
import { deletePost } from "./post/postBody/deletePost";
import { updatePost } from "./post/postBody/updatePost";
import { bookmarkPost } from "./post/bookmarkPost";
import { postCommentCreate } from "./post/postComment/postCommentCreate";
import { postCommentGet } from "./post/postComment/postCommentGet";
import { postCommentUpdate } from "./post/postComment/postCommentUpdate";
import { postCommentDelete } from "./post/postComment/postCommentDelete";
import { getReadingList } from "./post/getReadingList";

export const postRouter = router({
  createPost,
  read,
  readOne,
  likePost,
  getLikes,
  deletePost,
  updatePost,
  bookmarkPost,
  postCommentGet,
  postCommentCreate,
  postCommentUpdate,
  postCommentDelete,
  getReadingList,
});

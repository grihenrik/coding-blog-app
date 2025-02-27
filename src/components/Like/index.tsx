import React, { useCallback, useContext } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { trpc } from "../../utils/trpc";
import { GlobalContext } from "../../contexts/GlobalContextProvider";

export const Like = ({ ...post }) => {
  const utils = trpc.useUtils();

  const { isLiked, setIsLiked } = useContext(GlobalContext);

  const invalidateCurrentPost = useCallback(() => {
    utils.post.readOne.invalidate();
  }, [utils.post.readOne]);

  const likePost = trpc.post.likePost.useMutation({
    onSuccess: () => {
      invalidateCurrentPost();
    },
  });
  console.log("post", post);
  return (
    <div>
      {isLiked ? (
        <FcLikePlaceholder
          className=" cursor-pointer text-2xl"
          onClick={() => {
            if (post?.id) {
              likePost.mutate({ postId: post?.id });
              setIsLiked((isLiked: boolean) => !isLiked);
            }
          }}
        ></FcLikePlaceholder>
      ) : (
        <FcLike
          className="text-2xl"
          onClick={() => {
            if (post?.id) {
              likePost.mutate({ postId: post?.id });
              setIsLiked((isLiked: boolean) => !isLiked);
            }
          }}
        />
      )}
    </div>
  );
};

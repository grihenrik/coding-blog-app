import React, { useCallback } from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { trpc } from "../../utils/trpc";

interface LikeProps {
  post: {
    id: string;
    likes: number;
  };
}

export const Like = ({ post }: LikeProps) => {
  const utils = trpc.useUtils();

  const invalidateCurrentPost = useCallback(() => {
    utils.post.readOne.invalidate();
  }, [utils.post.readOne]);

  const likePost = trpc.post.likePost.useMutation({
    onSuccess: () => {
      invalidateCurrentPost();
    },
  });

  return (
    <div>
      {post?.likes == 0 ? (
        <FcLikePlaceholder
          className=" cursor-pointer text-2xl"
          onClick={() => {
            if (post?.id) {
              likePost.mutate({ postId: post.id });
            }
          }}
        ></FcLikePlaceholder>
      ) : (
        <FcLike
          className="text-2xl"
          onClick={() => {
            if (post?.id) {
              likePost.mutate({ postId: post.id });
            }
          }}
        />
      )}
    </div>
  );
};

import React from "react";
import { CiBookmarkPlus, CiBookmarkCheck } from "react-icons/ci";
import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import { useCallback } from "react";
import type { RouterOutputs } from "../../utils/trpc";

type Post = RouterOutputs["post"]["read"][number];

export const Bookmark = ({ ...post }: Post) => {
  const utils = trpc.useUtils();

  const { status } = useSession();

  const bookmarkPost = trpc.post.bookmarkPost.useMutation({
    onSuccess: () => {
      setIsBookmarked(!isBookmarked);
      invalidateCurrentPost();
    },
  });
  const [isBookmarked, setIsBookmarked] = React.useState(
    post.bookmarks?.length > 0
  );

  const invalidateCurrentPost = useCallback(() => {
    utils.post.read.invalidate();
  }, [utils.post.read]);
  if (status !== "authenticated") {
    return;
  }

  return (
    <div>
      <div>
        {!isBookmarked ? (
          <CiBookmarkPlus
            className="text-3xl"
            onClick={() => {
              bookmarkPost.mutate({ postId: post.id });
            }}
          />
        ) : (
          <CiBookmarkCheck
            className="text-3xl"
            onClick={() => {
              bookmarkPost.mutate({ postId: post.id });
            }}
          />
        )}
      </div>
    </div>
  );
};

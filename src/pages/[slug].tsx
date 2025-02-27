import { useRouter } from "next/router";
import MainLayout from "../layouts/MainLayout";
import { trpc } from "../utils/trpc";
import Loading from "../components/Loading";
import { useContext, useState } from "react";
import PostSingle from "../components/PostSingle";
import { Like } from "../components/Like";
import { BsChat } from "react-icons/bs";
import { CommentSidebar } from "../components/CommentSidebar";
import { GlobalContext } from "../contexts/GlobalContextProvider";

const PostPage = () => {
  const { isCommentSidebarOpen, setIsCommentSidebarOpen } =
    useContext(GlobalContext);
  const router = useRouter();
  const { slug } = router.query;
  const post = trpc.post.readOne.useQuery(
    { slug: slug as string },
    { enabled: !!slug }
  );

  return (
    <>
      <MainLayout />

      {post.data && (
        <PostSingle
          post={{
            ...post.data,
            likes: post.data?.likes?.length ?? 0,
            featuredImage: post.data.featuredImage ?? "",
            isLoading: post.isLoading,
            text: post.data.text ?? "",
            author: {
              name: post.data.author?.name || "",
              image: post.data.author?.image || "",
            },
          }}
        />
      )}
      <Loading isLoading={post.isLoading} />
      <div className="items-center- group flex justify-center ">
        <div className="fixed bottom-10 z-10 flex w-full justify-center gap-2 ">
          <div className="flex items-center rounded-full border border-gray-500 bg-white  px-4 py-3 shadow-2xl">
            <span>
              <Like id={post?.data?.id} />
            </span>
            <span className="pl-4">
              <BsChat
                className="cursor-pointer text-2xl"
                onClick={() =>
                  setIsCommentSidebarOpen(
                    (isCommentSidebarOpen) => !isCommentSidebarOpen
                  )
                }
              />
            </span>
          </div>
        </div>
      </div>
      {post.data?.id && <CommentSidebar postId={post.data.id} />}
    </>
  );
};

export default PostPage;

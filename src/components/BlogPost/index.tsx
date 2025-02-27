import React from "react";
import Loading from "../Loading";
import { Like } from "../Like";
import Image from "next/image";

interface BlogPostProps {
  post: {
    id: string;
    title: string;
    description: string;
    text: string;
    likes: number;
    featuredImage: string;
    isLoading: boolean;
  };
}

const BlogPost = ({ post }: BlogPostProps) => {
  return (
    <div>
      <Loading isLoading={post.isLoading ?? false} />
      <div className="flex h-full w-full items-center justify-center p-10">
        <div className="flex w-full max-w-screen-lg flex-col gap-4">
          <div
            id="postimage"
            className="relative h-[60vh] w-full rounded-xl bg-gray-300 shadow-lg"
          >
            <div
              id="title"
              className="absolute  flex h-full w-full items-center justify-center text-4xl font-semibold"
            >
              <div className="rounded-md bg-white p-4">{post?.title}</div>
            </div>
            {post?.featuredImage && (
              <Image
                src={post?.featuredImage ?? ""}
                alt={post?.title ?? ""}
                fill
                className="rounded-xl object-cover"
              />
            )}
          </div>

          <div id="description" className="border-l-4 border-gray-900 pl-6">
            {post?.description}
          </div>
          <div id="maintext">{post?.text}</div>
        </div>
      </div>
    </div>
  );
};
export default BlogPost;

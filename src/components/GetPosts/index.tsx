import React from "react";

import Link from "next/link";
import Image from "next/image";
import Loading from "../Loading";
import { Bookmark } from "../Bookmark";
import { trpc } from "../../utils/trpc";
import type { RouterOutputs } from "../../utils/trpc";

type Post = RouterOutputs["post"]["read"][number];

export const GetPosts = () => {
  const getPosts = trpc.post?.read.useQuery();
  const isLoading = getPosts.isLoading;

  return (
    <div>
      <Loading isLoading={isLoading} />
      <div className="flex w-full flex-col justify-center gap-y-4">
        {getPosts.data?.map((post: Post) => (
          <>
            <Link href={`/${post.slug}`} key={post.id}>
              <div
                key={post.id}
                className="group flex flex-col border-b border-gray-500 duration-300 last:border-none group-hover:transition-transform"
              >
                <div className="flex w-full items-center space-x-2 py-2">
                  {post.featuredImage && (
                    <Image
                      src={post.featuredImage}
                      alt="profile"
                      width={36}
                      height={36}
                      className="h-full w-full rounded-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <div>
                    {post.author.name} &#x2022;{" "}
                    {post.createdAt.toISOString().split("T")[0]}
                  </div>
                  <div>Bio details</div>
                </div>
              </div>
              <div className="my-4 grid w-full grid-cols-12 gap-4">
                <div className="col-span-8">
                  <div className="flex flex-col gap-y-2">
                    <div className="text-2xl font-semibold text-gray-800 decoration-blue-300 group-hover:underline">
                      {post.title}
                    </div>
                    <div className="line-clamp-3 overflow-hidden break-words text-sm text-gray-500 group-hover:line-clamp-none">
                      {post.description}
                    </div>
                  </div>
                </div>
                <div className="col-span-4 flex flex-col justify-between gap-4">
                  <div className="h-full w-full transform rounded-xl bg-gray-300 transition duration-300 hover:scale-105 hover:shadow-xl"></div>
                </div>
              </div>
            </Link>
            <div className="flex w-full items-center justify-start gap-2 pb-8">
              <div className="flex w-full items-center justify-start gap-2 pb-8">
                <div className="flex items-center  gap-2">
                  {["React", "TypeScript", "GraphQL", "Next.js"].map(
                    (topic) => (
                      <div
                        key={topic}
                        className="rounded-3xl bg-gray-200/50 px-4 py-3 text-gray-900"
                      >
                        {topic}
                      </div>
                    )
                  )}
                </div>
              </div>
              <Bookmark {...post} />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

import React from "react";
import { trpc } from "../../utils/trpc";
import Avatar from "../Avatar";
import Link from "next/link";

type readingListType = {
  id: string;
  title: string;
  description: string;
  text: string;
  html: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export const Sidebar = () => {
  const { ...readingList } = trpc.post.getReadingList.useQuery();
  return (
    <>
      <div>
        <div>
          <h3 className="my-6 text-lg font-semibold">
            People you might be interested in
          </h3>
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex flex-row items-center space-x-4">
                <div className="h-9 w-9 flex-none rounded-full bg-gray-500"></div>
                <div>
                  <div className="text-sm font-semibold">John Doe</div>
                  <div className="text-xs">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Reiciendis, voluptatum!
                  </div>
                </div>
                <div>
                  <button className="flex items-center gap-4 rounded-md border border-gray-500 px-4 py-1 text-gray-600 transition hover:border-gray-900 hover:text-gray-900">
                    Follow
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sticky top-20">
        {/* Bookmarks */}
        <div>
          <h3 className="my-6 text-lg font-semibold">Your reading list</h3>
          <div className="flex flex-col gap-4">
            {readingList?.data &&
              readingList.data.map((bookmark) => (
                <Link
                  href={`/${bookmark.post.slug}`}
                  key={bookmark.id}
                  className="group flex flex-row items-center space-x-4"
                >
                  <div className="aspect-square h-full w-2/5 rounded-xl bg-gray-300"></div>
                  <div className="flex w-3/5 flex-col gap-2">
                    <div className="group text-sm font-semibold text-gray-800 decoration-blue-600 hover:underline">
                      {bookmark.post.title}
                    </div>
                    <div className="truncate text-xs text-gray-500">
                      {bookmark.post.description}
                    </div>
                    <div className="flex w-full items-center gap-x-4">
                      <div className="h-5 w-5 rounded-full bg-gray-500">
                        {bookmark?.post?.author?.image && (
                          <Avatar
                            size="s"
                            url={bookmark?.post?.author?.image}
                            alt={bookmark?.post?.author?.name ?? ""}
                          />
                        )}
                      </div>
                      <div className="text-xs">
                        {bookmark.post.author.name} &#x2022;
                      </div>
                      <div className="text-xs">
                        {bookmark.createdAt.toISOString().split("T")[0]}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

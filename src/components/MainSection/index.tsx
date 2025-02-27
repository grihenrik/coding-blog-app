import React from "react";
import { CiSearch } from "react-icons/ci";

import { HiChevronDown } from "react-icons/hi";
import { GetPosts } from "../GetPosts";

export const MainSection = () => {
  return (
    <>
      <div className="col-span-8 border-r border-gray-300 p-24">
        <div className="flex flex-col border-b border-gray-300 ">
          <div className="flex justify-between gap-2 px-2 py-2">
            <div className="flex w-full items-center gap-2 rounded-full border border-gray-300 p-1 text-gray-900">
              <label htmlFor="search" className="relative">
                <div className="absolute left-2 flex h-full items-center">
                  <CiSearch size={30} className="w-max" />
                </div>
              </label>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search..."
                className="rounded border-gray-300 p-4 pl-7 outline-none"
              />
            </div>
            <div className="flex w-full items-center justify-end gap-2 pb-8">
              <div>My topics:</div>
              <div className="flex items-center  gap-2">
                {["React", "TypeScript", "GraphQL", "Next.js"].map((topic) => (
                  <div
                    key={topic}
                    className="rounded-3xl bg-gray-200/50 px-4 py-3 text-gray-900"
                  >
                    {topic}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <div>Articles</div>
            <button className="rounded-3xl border border-gray-900 px-4 py-1.5">
              <div className="flex items-center gap-2">
                <div className="font-semibold">following</div>
                <div>
                  <HiChevronDown size={30} />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Posts here */}
        <GetPosts />
      </div>
    </>
  );
};

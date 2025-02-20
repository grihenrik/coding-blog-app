import { type NextPage } from "next";

import { signIn, signOut, useSession } from "next-auth/react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { BsBell } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { HiChevronDown } from "react-icons/hi";
import { trpc } from "../utils/trpc";
import MainLayout from "../layouts/MainLayout";
import Modal from "../components/Modal";
import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContextProvider";
import WriteFormModal from "../components/WriteFormModal";

const Home: NextPage = () => {
  const { isWriteModalOpen, setIsWriteModalOpen } = useContext(GlobalContext);

  return (
    <>
      <div>
        <MainLayout />

        <section className="grid h-screen w-screen grid-cols-12">
          <main className="col-span-8 border-r border-gray-300 p-24">
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
            <div className="flex w-full flex-col justify-center gap-y-4">
              {[...Array(10)].map((_, index) => (
                <div
                  key={index}
                  className="group flex flex-col border-b border-gray-500 last:border-none group-hover:transition-transform"
                >
                  <div className="flex w-full items-center space-x-2 py-2">
                    <div className="h-9 w-9 rounded-full bg-gray-400"></div>
                    <div>
                      <div>Author &#x2022; 20-02-2025</div>
                      <div>Bio details</div>
                    </div>
                  </div>
                  <div className="my-4 grid w-full grid-cols-12 gap-4">
                    <div className="col-span-8">
                      <div className="flex flex-col gap-y-2">
                        <div className="text-2xl font-semibold text-gray-800 decoration-blue-300 group-hover:underline">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Aperiam, reprehenderit.
                        </div>
                        <div className="line-clamp-3 overflow-hidden break-words text-sm text-gray-500 group-hover:line-clamp-none">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Ab ipsa delectus dolorum enim, placeat, voluptas
                          alias reiciendis at nulla eum id facilis, fuga odit
                          hic sunt laudantium quod. Illum fugiat placeat
                          doloremque neque animi modi sequi odit ad eveniet
                          praesentium veritatis dolorum, ipsam voluptatibus.
                          Eaque itaque similique deserunt debitis perferendis
                          aspernatur facilis, omnis quam pariatur vel ipsum
                          maiores illum inventore?
                        </div>
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="h-full w-full transform rounded-xl bg-gray-300 transition duration-300 hover:scale-105 hover:shadow-xl"></div>
                    </div>
                  </div>
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
                </div>
              ))}
            </div>
          </main>
          <aside className="col-span-4 flex h-full w-full flex-col space-y-4 p-6">
            <div>
              <div>
                <h3 className="my-6 text-lg font-semibold">
                  People you might be interested in
                </h3>
                <div className="flex flex-col gap-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex flex-row items-center space-x-4"
                    >
                      <div className="h-9 w-9 flex-none rounded-full bg-gray-500"></div>
                      <div>
                        <div className="text-sm font-semibold">John Doe</div>
                        <div className="text-xs">
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Reiciendis, voluptatum!
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
              <div>
                <h3 className="my-6 text-lg font-semibold">
                  Your reading list
                </h3>
                <div className="flex flex-col gap-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="group flex flex-row items-center space-x-4"
                    >
                      <div className="aspect-square h-full w-2/5 rounded-xl bg-gray-300"></div>
                      <div className="flex w-3/5 flex-col gap-2">
                        <div className="text-sm font-semibold  text-gray-800 decoration-blue-300 group-hover:underline">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </div>
                        <div className="text-xs">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Ut ullam optio laboriosam in possimus sapiente
                          porro.
                        </div>
                        <div className="flex w-full items-center gap-x-4">
                          <div className="h-5 w-5 rounded-full bg-gray-500"></div>
                          <div className="text-xs">Author &#x2022;</div>
                          <div className="text-xs">20-02-2025</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </section>
        <WriteFormModal />
      </div>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

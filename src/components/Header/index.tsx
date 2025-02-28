import React from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { BsBell } from "react-icons/bs";
import { FiEdit, FiLogOut } from "react-icons/fi";
import { signIn, signOut } from "next-auth/react";
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import Link from "next/link";
import { trpc } from "../../utils/trpc";
import Avatar from "../Avatar";
import { set } from "zod";

type isAuthenticatedType = {
  isAuthenticated: boolean;
};

export const Header = ({ isAuthenticated }: isAuthenticatedType) => {
  const { isWriteModalOpen, setIsWriteModalOpen, userId, setUserId } =
    useContext(GlobalContext);

  const user = trpc.user.getCurrentUser.useQuery();
  // if (user.data?.id) {
  //   setUserId(user.data.id);
  // }

  return (
    <header className="border-b[1px] flex h-20 flex-row items-center justify-around border-gray-300 bg-gray-100 p-3">
      <div>
        <IoReorderThreeOutline size={30} />
      </div>
      <Link href={"/"} className="cursor-pointer select-none text-xl font-thin">
        Coding Blog App
      </Link>

      {isAuthenticated ? (
        <div className="flex items-center gap-2">
          <div>
            <BsBell size={30} />
          </div>
          <div
            className="h-8 w-8 rounded-full bg-gray-600"
            onClick={() => alert("UserProfile Clicked" + user.data?.name)}
          >
            <Avatar
              size="m"
              url={user.data?.image || ""}
              alt={user.data?.name || ""}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="flex items-center gap-4 rounded-md border border-gray-300 px-4 py-1 text-gray-600 transition hover:border-gray-900 hover:text-gray-900"
            >
              <div>Write</div>
              <div>
                <FiEdit />
              </div>
            </button>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-4 rounded-md border border-gray-300 px-4 py-1 text-gray-600 transition hover:border-gray-900 hover:text-gray-900"
            >
              <div>Logout</div>
              <div>
                <FiLogOut />
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={() => signIn()}
            className="rounded-md border border-gray-300 px-4 py-1 text-gray-600 transition hover:border-gray-900 hover:text-gray-900"
          >
            Sign In
          </button>
        </div>
      )}
    </header>
  );
};

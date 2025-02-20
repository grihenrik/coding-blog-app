import React from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { BsBell } from "react-icons/bs";
import { FiEdit, FiLogOut } from "react-icons/fi";
import { signIn, signOut } from "next-auth/react";
import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { set } from "zod";

type isAuthenticatedType = {
  isAuthenticated: boolean;
};

export const Header = ({ isAuthenticated }: isAuthenticatedType) => {
  const { isWriteModalOpen, setIsWriteModalOpen } = useContext(GlobalContext);
  return (
    <header className="border-b[1px] flex h-20 flex-row items-center justify-around border-gray-300 bg-gray-100 p-3">
      <div>
        <IoReorderThreeOutline size={30} />
      </div>
      <div className="text-xl font-thin">Coding Blog App</div>

      {isAuthenticated ? (
        <div className="flex items-center gap-2">
          <div>
            <BsBell size={30} />
          </div>
          <div className="h-5 w-5 rounded-full bg-gray-600"></div>
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

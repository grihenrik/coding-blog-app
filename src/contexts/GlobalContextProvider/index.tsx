// Desc: Global context provider
//       This file is responsible for providing the global context to the entire application.
import React, { createContext, useState } from "react";
import { type PropsWithChildren } from "react";
import type { TAG } from "../../types";
import { trpc } from "../../utils/trpc";

type GlobalContextType = {
  isWriteModalOpen: boolean;
  setIsWriteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCommentSidebarOpen: boolean;
  setIsCommentSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isTagCreateModalOpen: boolean;
  setIsTagCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  selectedTags: TAG[];
  setSelectedTags: React.Dispatch<React.SetStateAction<TAG[]>>;
  isLiked: number;
  setIsLiked: React.Dispatch<React.SetStateAction<number>>;
};

export const GlobalContext = createContext<{
  isWriteModalOpen: boolean;
  setIsWriteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCommentSidebarOpen: boolean;
  setIsCommentSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isTagCreateModalOpen: boolean;
  setIsTagCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  selectedTags: TAG[];
  setSelectedTags: React.Dispatch<React.SetStateAction<TAG[]>>;
  isLiked: number;
  setIsLiked: React.Dispatch<React.SetStateAction<number>>;
}>(null as unknown as GlobalContextType);

export const GlobalContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTagCreateModalOpen, setIsTagCreateModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<TAG[]>([]);
  const [userId, setUserId] = useState("");
  const [isLiked, setIsLiked] = useState(0);
  const [isCommentSidebarOpen, setIsCommentSidebarOpen] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        isWriteModalOpen,
        setIsWriteModalOpen,
        isCommentSidebarOpen,
        setIsCommentSidebarOpen,
        isLoading,
        setIsLoading,
        isTagCreateModalOpen,
        setIsTagCreateModalOpen,
        selectedTags,
        setSelectedTags,
        userId,
        setUserId,
        isLiked,
        setIsLiked,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

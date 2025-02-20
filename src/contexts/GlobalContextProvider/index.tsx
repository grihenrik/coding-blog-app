// Desc: Global context provider
//       This file is responsible for providing the global context to the entire application.
import React, { createContext, useState } from "react";
import { type PropsWithChildren } from "react";

type GlobalContextType = {
  isWriteModalOpen: boolean;
  setIsWriteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GlobalContext = createContext<{
  isWriteModalOpen: boolean;
  setIsWriteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>(null as unknown as GlobalContextType);

export const GlobalContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        isWriteModalOpen,
        setIsWriteModalOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;

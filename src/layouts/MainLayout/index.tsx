import { useSession } from "next-auth/react";
import React from "react";
import { Header } from "../../components/Header";

const MainLayout = ({ children }: React.PropsWithChildren) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: _, status } = useSession();

  return (
    <div className="flex h-full flex-col before:w-full ">
      <Header isAuthenticated={status === "authenticated"} />
      {children}
    </div>
  );
};

export default MainLayout;

import { type NextPage } from "next";

import { MainSection } from "../components/MainSection";
import MainLayout from "../layouts/MainLayout";
import WriteFormModal from "../components/WriteFormModal";
import { Sidebar } from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <>
      <div>
        <MainLayout />
        <section className="grid h-screen w-screen grid-cols-12">
          <main className="col-span-8 border-r border-gray-300 p-4">
            <MainSection />
          </main>
          <aside className="col-span-4 flex h-full w-full flex-col space-y-4 p-6">
            <Sidebar />
          </aside>
        </section>
        <WriteFormModal />
      </div>
    </>
  );
};
export default Home;

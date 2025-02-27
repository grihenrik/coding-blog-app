import { Dialog, Transition } from "@headlessui/react";
import { useContext, Fragment } from "react";
import { GlobalContext } from "../../contexts/GlobalContextProvider";

export const CommentSidebar = () => {
  const { isCommentSidebarOpen, setIsCommentSidebarOpen } =
    useContext(GlobalContext);

  return (
    <>
      <Transition.Root show={isCommentSidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          onClose={() =>
            setIsCommentSidebarOpen(
              (isCommentSidebarOpen: boolean) => !isCommentSidebarOpen
            )
          }
        >
          <div className="fixed right-0 top-0">
            <Transition.Child
              enter="transition duration-1000"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative h-screen w-full bg-black text-white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea,
                eius.
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

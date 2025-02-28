import { Dialog, Transition } from "@headlessui/react";
import { useContext, Fragment } from "react";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { HiX } from "react-icons/hi";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { trpc } from "../../utils/trpc";
import Avatar from "../Avatar";
import { useCallback } from "react";

type CommentFormType = { text: string };

type CommentSidebarProps = {
  postId: string;
};

export const CommentSidebar = (...post: CommentSidebarProps[]) => {
  const { isCommentSidebarOpen, setIsCommentSidebarOpen } =
    useContext(GlobalContext);

  const postId = post[0]?.postId;
  const utils = trpc.useUtils();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<CommentFormType>({
    resolver: zodResolver(z.object({ text: z.string().min(3) })),
  });
  const invalidateCurrentPost = useCallback(() => {
    utils.post.postCommentGet.invalidate();
  }, [utils.post.postCommentGet]);

  const commentPost = trpc.post.postCommentCreate.useMutation({
    onSuccess: () => {
      toast.success("Comment added successfully");
      invalidateCurrentPost();
      reset();
    },
  });

  const getComments = trpc.post.postCommentGet.useQuery(
    { postId: postId as string },
    { enabled: !!postId }
  );

  const onSubmit: SubmitHandler<CommentFormType> = async (
    data: CommentFormType
  ) => {
    console.log(data, postId);
    postId &&
      commentPost.mutate({
        ...data,
        postId: postId,
      });
  };

  if (errors?.text?.message) {
    toast.error(errors.text.message);
  }

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
          <div className="fixed right-0 top-0 mr-0 h-screen w-[20%]">
            <Transition.Child
              enter="transition duration-1000"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative h-screen w-full overflow-scroll bg-white p-6 text-gray-800 shadow">
                <div className="flex h-full w-full flex-col ">
                  <div className="mt-5 flex items-center justify-between gap-20 py-4 text-xl">
                    <div className="flex items-center">
                      <span className="px-2 text-xl font-semibold">
                        Responses
                      </span>
                      <span className="px-2 text-xl font-medium">({4})</span>
                    </div>
                    <div className="flex items-center">
                      <button
                        className="flex-end flex  text-gray-500 "
                        onClick={() => {
                          setIsCommentSidebarOpen(false);
                          reset();
                        }}
                      >
                        <HiX className="cursor-pointer" />
                      </button>
                    </div>
                  </div>
                  <form
                    className="flex flex-col items-end gap-4"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div>
                      <textarea
                        id="comment"
                        rows={3}
                        className="mr-8 w-full rounded-xl border  border-gray-300 p-4 pr-12 shadow-lg outline-none"
                        placeholder="Comment..."
                        {...register("text")}
                      />
                    </div>
                    <div>
                      {isValid && (
                        <button
                          type="submit"
                          className="flex cursor-pointer items-center space-x-3 rounded border border-gray-200 px-4 py-2 transition hover:border-gray-900 hover:text-gray-900"
                        >
                          Share comment
                        </button>
                      )}
                    </div>
                  </form>
                  {getComments.isSuccess &&
                    getComments.data.map((comment, index) => (
                      <div
                        key={index}
                        className="flex flex-row items-center space-x-4 border-b-2 border-gray-300 pb-2 last:border-none"
                      >
                        <div className="h-10 w-10 flex-none rounded-full bg-gray-500">
                          <Avatar
                            size="l"
                            url={comment.user?.image ?? ""}
                            alt={comment.user?.name ?? ""}
                          />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">
                            {comment.user?.name}
                          </div>
                          <div className="my-1 py-1 text-xs">
                            {comment.text}
                          </div>
                        </div>
                        <div></div>
                      </div>
                    ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

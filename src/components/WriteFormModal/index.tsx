import { useContext, useState } from "react";
import dynamic from "next/dynamic";
import { z } from "zod";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import Modal from "../Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../../utils/trpc";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export type TAG = { id: string; name: string };

type WriteFormType = {
  title: string;
  description: string;
  text: string;
  html: string;
};

export const writeFormSchema = z.object({
  title: z.string().min(15),
  description: z.string().min(20),
  text: z.string().min(50),
  html: z.string(),
  tags: z.array(z.object({ id: z.string(), name: z.string() })).optional(),
});

const WriteFormModal = () => {
  const { isWriteModalOpen, setIsWriteModalOpen } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<WriteFormType>({
    resolver: zodResolver(writeFormSchema),
  });

  const postRoute = trpc.useUtils().post;

  const createPost = trpc.post?.createPost.useMutation({
    onSuccess: () => {
      toast.success("Post created successfully");
      reset();
      setIsWriteModalOpen(false);
      postRoute.read.invalidate();
    },
  });

  const [selectedTags, setSelectedTags] = useState<TAG[]>([]);
  const onSubmit = (data: WriteFormType) => {
    createPost.mutate({
      title: data.title,
      description: data.description,
      text: data.text,
      html: data.html,
      tags: selectedTags,
    });
  };
  const [isTagCreateModalOpen, setIsTagCreateModalOpen] = useState(false);

  return (
    <Modal
      isOpen={isWriteModalOpen}
      onClose={() => setIsWriteModalOpen(false)}
      title="Write a new article"
    >
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData.entries());
            onSubmit(data as WriteFormType);
          }}
        >
          <div className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                id="title"
                className="w-full rounded border border-gray-300 p-2"
                placeholder="Title of blog"
                {...register("title")}
              />
              <p>{errors.title?.message}</p>
            </div>
            <div>
              <input
                type="text"
                id="shortdescription"
                className="w-full rounded border border-gray-300 p-2"
                placeholder="Short description of blog"
                {...register("description")}
              />
              <p>{errors.description?.message}</p>
              <input
                className="w-full rounded border border-gray-300 p-2"
                type="text"
                id="text"
                placeholder="Write your blog"
                {...register("text")}
              />
              <input
                className="w-full rounded border border-gray-300 p-2"
                type="html"
                id="html"
                placeholder="Write your blog"
                {...register("html")}
              />
              {/* <Controller
                name="html"
                control={control}
                render={({ field }) => (
                  <div className="w-full">
                    <ReactQuill
                      theme="snow"
                      {...field}
                      placeholder="Write the blog body here"
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                  </div>
                )} 
              /> */}

              <p>{errors.text?.message}</p>
            </div>
            <div>
              <label htmlFor="tags">Tags</label>
              <div className="flex gap-2">
                {selectedTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="rounded-3xl bg-gray-200/50 px-4 py-3 text-gray-900"
                  >
                    {tag.name}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setIsTagCreateModalOpen(true)}
                  className="rounded-full bg-gray-200/50 p-2"
                >
                  <div>+</div>
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-md border border-gray-300 px-4 py-1 text-gray-600 transition hover:border-gray-900 hover:text-gray-900"
              >
                Publish
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default WriteFormModal;

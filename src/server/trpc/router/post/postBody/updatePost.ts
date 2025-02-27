import { z } from "zod";
import { protectedProcedure } from "../../../trpc";
import { writeFormSchema } from "../../../../../components/WriteFormModal";

export const updatePost = protectedProcedure
  .input(z.object({ postId: z.string(), data: writeFormSchema }))
  .mutation(async ({ ctx: { prisma }, input: { postId, data } }) => {
    await prisma?.post.update({
      where: {
        id: postId,
      },
      data: {
        title: data.title,
        description: data.description,
        text: data.text,
        html: data.html,
      },
    });
  });

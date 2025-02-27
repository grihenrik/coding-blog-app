import { protectedProcedure } from "../../../trpc";
import { z } from "zod";

export const deletePost = protectedProcedure
  .input(z.object({ postId: z.string() }))
  .mutation(async ({ ctx: { prisma }, input: { postId } }) => {
    await prisma?.post.delete({
      where: {
        id: postId,
      },
    });
  });

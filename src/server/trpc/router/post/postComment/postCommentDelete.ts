import { z } from "zod";
import { protectedProcedure } from "../../../trpc";

export const postCommentDelete = protectedProcedure
  .input(z.object({ postId: z.string() }))
  .mutation(async ({ ctx: { prisma, session }, input: { postId } }) => {
    const comment = await prisma?.comment.findFirst({
      where: { userId: session.user.id, postId },
    });
    if (comment) {
      await prisma?.comment.delete({ where: { id: comment.id } });
    }
  });

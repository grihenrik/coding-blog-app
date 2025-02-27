import { z } from "zod";
import { protectedProcedure } from "../../../trpc";

export const postCommentUpdate = protectedProcedure
  .input(z.object({ postId: z.string(), text: z.string() }))
  .mutation(async ({ ctx: { prisma, session }, input: { postId, text } }) => {
    const comment = await prisma?.comment.findFirst({
      where: { userId: session.user.id, postId },
    });
    if (comment) {
      await prisma?.comment.update({
        where: { id: comment.id },
        data: { text },
      });
    }
  });

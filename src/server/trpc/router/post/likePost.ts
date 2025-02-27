import { protectedProcedure } from "../../trpc";
import { z } from "zod";

export const likePost = protectedProcedure
  .input(z.object({ postId: z.string() }))
  .mutation(async ({ ctx: { prisma, session }, input: { postId } }) => {
    const like = await prisma?.like.findFirst({
      where: { userId: session.user.id, postId },
    });
    if (like) {
      await prisma?.like.delete({ where: { id: like.id } });
      return;
    }
    await prisma?.like.create({
      data: {
        user: { connect: { id: session.user.id } },
        post: { connect: { id: postId } },
      },
    });
  });

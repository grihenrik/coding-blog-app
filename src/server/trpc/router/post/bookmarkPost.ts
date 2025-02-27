import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const bookmarkPost = protectedProcedure
  .input(z.object({ postId: z.string() }))
  .mutation(async ({ ctx: { prisma, session }, input: { postId } }) => {
    const bookmark = await prisma?.bookmark.findFirst({
      where: {
        userId: session.user.id,
        postId: postId,
      },
    });
    if (bookmark !== null) {
      await prisma?.bookmark.delete({
        where: {
          id: bookmark.id,
        },
      });
      return;
    }
    await prisma?.bookmark.create({
      data: {
        userId: session.user.id,
        postId: postId,
      },
    });
  });

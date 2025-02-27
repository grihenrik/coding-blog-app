import { publicProcedure } from "../../trpc";
import { z } from "zod";
export const getLikes = publicProcedure
  .input(z.object({ postId: z.string() }))
  .query(async ({ ctx: { prisma }, input: { postId } }) => {
    return await prisma?.like.count({
      where: {
        postId: postId,
      },
    });
  });

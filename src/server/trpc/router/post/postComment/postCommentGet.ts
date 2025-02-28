import { publicProcedure } from "../../../trpc";
import { z } from "zod";
export const postCommentGet = publicProcedure
  .input(
    z.object({
      postId: z.string(),
    })
  )
  .query(async ({ ctx: { prisma }, input: { postId } }) => {
    return await prisma?.comment.findMany({
      where: {
        postId: postId,
      },
      select: {
        id: true,
        text: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  });

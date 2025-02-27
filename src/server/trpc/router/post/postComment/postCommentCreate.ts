import { z } from "zod";
import { protectedProcedure } from "../../../trpc";

export const postCommentCreate = protectedProcedure
  .input(z.object({ postId: z.string(), text: z.string() }))
  .mutation(async ({ ctx: { prisma, session }, input: { postId, text } }) => {
    await prisma?.comment.create({
      data: {
        text,
        user: {
          connect: {
            id: session.user.id,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });
  });

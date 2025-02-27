import { publicProcedure } from "../../trpc";
import { z } from "zod";

export const readOne = publicProcedure
  .input(z.object({ slug: z.string() }))
  .query(async ({ ctx: { prisma, session }, input: { slug } }) => {
    return await prisma?.post.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        description: true,
        text: true,
        featuredImage: true,
        likes: session?.user?.id
          ? { where: { userId: session?.user?.id } }
          : false,
      },
    });
  });

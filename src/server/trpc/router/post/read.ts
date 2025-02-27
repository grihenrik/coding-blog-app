import { publicProcedure } from "../../trpc";

export const read = publicProcedure.query(
  async ({ ctx: { prisma, session } }) => {
    return await prisma?.post.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        featuredImage: true,
        createdAt: true,
        slug: true,
        author: { select: { name: true, image: true } },
        bookmarks: session?.user?.id
          ? { where: { userId: session?.user?.id } }
          : false,
      },
    });
  }
);

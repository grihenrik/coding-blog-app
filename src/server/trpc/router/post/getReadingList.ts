import { protectedProcedure } from "../../trpc";

export const getReadingList = protectedProcedure.query(
  async ({ ctx: { prisma, session } }) => {
    const readingList = await prisma?.bookmark.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        post: {
          select: {
            id: true,
            title: true,
            description: true,
            createdAt: true,
            slug: true,
            featuredImage: true,
            author: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
        createdAt: true,
      },
      take: 4,
      orderBy: {
        createdAt: "desc",
      },
    });
    return readingList;
  }
);

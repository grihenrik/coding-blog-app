import { protectedProcedure } from "../../trpc";

// read one user details
export const read = protectedProcedure.query(
  async ({ ctx: { prisma, session } }) => {
    return await prisma?.user.findFirstOrThrow({
      where: { id: session?.user.id },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
);

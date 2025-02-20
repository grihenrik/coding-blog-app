import { router, protectedProcedure, publicProcedure } from "../trpc";
import slugify from "slugify";
import { writeFormSchema } from "../../../components/WriteFormModal";

export const postRouter = router({
  createPost: protectedProcedure
    .input(writeFormSchema)
    .mutation(
      async ({
        ctx: { prisma, session },
        input: { title, description, text },
      }) => {
        // check post already exist
        const post = await prisma?.post.findFirst({
          where: {
            title: title,
          },
        });
        if (post) {
          throw new Error("Post already exist");
        }
        await prisma?.post.create({
          data: {
            title: title,
            description: description,
            text: text,
            slug: slugify(title),
            author: {
              connect: {
                id: session.user.id,
              },
            },
          },
        });
      }
    ),
  read: publicProcedure.query(async ({ ctx: { prisma } }) => {
    return await prisma?.post.findMany();
  }),
});

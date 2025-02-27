import { protectedProcedure } from "../../../trpc";
import slugify from "slugify";
import { writeFormSchema } from "../../../../../components/WriteFormModal";

export const createPost = protectedProcedure
  .input(writeFormSchema)
  .mutation(
    async ({
      ctx: { prisma, session },
      input: { title, description, text, html },
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
          text: text === undefined ? "" : text,
          html: html === undefined ? "" : html,
          slug: slugify(title),
          author: {
            connect: {
              id: session.user.id,
            },
          },
        },
      });
    }
  );

import { router, protectedProcedure, publicProcedure } from "../trpc";
import slugify from "slugify";
import { writeFormSchema } from "../../../components/WriteFormModal";
import { z } from "zod";

export const postRouter = router({
  createPost: protectedProcedure
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
    ),
  read: publicProcedure.query(async ({ ctx: { prisma, session } }) => {
    return await prisma?.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        featuredImage: true,
        createdAt: true,
        slug: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        bookmarks: session?.user?.id
          ? {
              where: {
                userId: session?.user?.id ?? "",
              },
            }
          : false,
      },
    });
  }),
  readOne: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx: { prisma, session }, input: { slug } }) => {
      return await prisma?.post.findUnique({
        where: {
          slug: slug,
        },
        select: {
          id: true,
          title: true,
          description: true,
          text: true,
          featuredImage: true,
          likes: session?.user?.id
            ? {
                where: {
                  userId: session?.user?.id,
                },
              }
            : false,
        },
      });
    }),
  likePost: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx: { prisma, session }, input: { postId } }) => {
      const like = await prisma?.like.findFirst({
        where: {
          userId: session.user.id,
          postId: postId,
        },
      });
      if (like !== null) {
        await prisma?.like.delete({
          where: {
            id: like.id,
          },
        });
        return;
      }
      await prisma?.like.create({
        data: {
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
    }),
  getLikes: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx: { prisma }, input: { postId } }) => {
      return await prisma?.like.count({
        where: {
          postId: postId,
        },
      });
    }),

  deletePost: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx: { prisma }, input: { postId } }) => {
      await prisma?.post.delete({
        where: {
          id: postId,
        },
      });
    }),
  updatePost: protectedProcedure
    .input(z.object({ postId: z.string(), data: writeFormSchema }))
    .mutation(async ({ ctx: { prisma }, input: { postId, data } }) => {
      await prisma?.post.update({
        where: {
          id: postId,
        },
        data: {
          title: data.title,
          description: data.description,
          text: data.text,
          html: data.html,
        },
      });
    }),
  bookmarkPost: protectedProcedure
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
    }),
});

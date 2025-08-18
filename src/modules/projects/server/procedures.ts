import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/db";
import { protectedProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod";
import { generateSlug } from "random-word-slugs";
import { TRPCError } from "@trpc/server";
import { consumeCredits } from "@/lib/usage";

export const projectsRouter = createTRPCRouter({
  // procedure to fetch an individual project by its unique id
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, { message: "Id is required." }),
      }),
    )
    .query(async ({ input, ctx }) => {
      const existingProject = await prisma.project.findUnique({
        // using findUnique method, on index id and userId
        where: {
          id: input.id,
          userId: ctx.auth.userId,
        },
      });
      if (!existingProject) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      return existingProject;
    }),
  getMany: protectedProcedure.query(async ({ ctx }) => {
    const projects = await prisma.project.findMany({
      where: { userId: ctx.auth.userId },
      orderBy: { updatedAt: "desc" },
    });
    return projects;
  }),

  create: protectedProcedure
    .input(
      z.object({
        value: z
          .string()
          .min(1, { message: "Value is required" })
          .max(10000, { message: "Value is too long" }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await consumeCredits();
      } catch (error) {
        // smthing else happened beside hitting the rate limit, like db_connection
        if (error instanceof Error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Something went wrong",
          });
        } else {
          // the rate limit got hit
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "You have run out of credits",
          });
        }
      }

      const createdProject = await prisma.project.create({
        data: {
          userId: ctx.auth.userId,
          name: generateSlug(2, { format: "kebab" }),
          messages: {
            create: { content: input.value, role: "USER", type: "RESULT" },
          },
        },
      });

      await inngest.send({
        name: "code-agent/run",
        data: {
          value: input.value,
          projectId: createdProject.id,
        },
      });

      return createdProject;
    }),
});

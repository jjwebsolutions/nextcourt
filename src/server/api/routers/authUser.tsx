import { z } from "zod";
import bcrypt from "bcrypt";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  adminProcedure,
} from "~/server/api/trpc";

export const authUserRouter = createTRPCRouter({
  getAll: adminProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  getUser: protectedProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findMany({
        where: {
          username: input.username,
        },
      });
      if (user) {
        return user;
      }
      return ["nouserfound"];
    }),
  createUser: publicProcedure
    .input(
      z.object({
        username: z.string(),
        name: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const saltRounds = 10;
      const hash: string = await bcrypt.hash(input.password, saltRounds);
      const res = await ctx.prisma.user.create({
        data: {
          username: input.username,
          name: input.name,
          email: input.email,
          password: hash,
        },
      });
      if (res) {
        return ["usercreated"];
      } else {
        return ["usernotcreated"];
      }
    }),
});

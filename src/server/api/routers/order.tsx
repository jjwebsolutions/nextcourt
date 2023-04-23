// create a procedure that handle a new order
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const orderRouter = createTRPCRouter({
  postOrder: publicProcedure
    .input(
      z.object({
        dateFormat: z.string(),
        slots: z.array(z.object({ slot: z.string(), available: z.boolean() })),
        username: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const day = await ctx.prisma.day.findUnique({
        where: { dateFormat: input.dateFormat },
      });
      if (day) {
        await ctx.prisma.day.update({
          where: {
            id: day.id,
          },
          data: {
            slots: input.slots,
          },
        });

        await ctx.prisma.order.create({
          data: {
            date: input.dateFormat,
            slots: input.slots,
            username: input.username,
          },
        });
        return ["slotschanged_ordercreated"];
      } else {
        // Create a new day in the database
        await ctx.prisma.day.create({
          data: {
            dateFormat: input.dateFormat,
            slots: input.slots,
          },
        });

        // Create a new order for the day
        await ctx.prisma.order.create({
          data: {
            date: input.dateFormat,
            slots: input.slots,
            username: input.username,
          },
        });

        return ["newdaycreatedindb_ordercreated"];
      }
    }),
});

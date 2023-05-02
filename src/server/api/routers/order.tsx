// create a procedure that handle a new order
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  adminProcedure,
} from "~/server/api/trpc";

export const orderRouter = createTRPCRouter({
  // Post order
  postOrder: publicProcedure
    .input(
      z.object({
        dateFormat: z.string(),
        slots: z.array(z.object({ slot: z.string(), available: z.boolean() })),
        slotsOrder: z.array(z.string()),
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
            slots: input.slotsOrder,
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
            slots: input.slotsOrder,
            username: input.username,
          },
        });

        return ["newdaycreatedindb_ordercreated"];
      }
    }),
  // Delete order
  deleteOrder: protectedProcedure
    .input(
      z.object({
        orderId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.order.delete({
        where: {
          id: input.orderId,
        },
      });
      return ["orderdeleted"];
    }),

  // Get order by username
  getOrdersByUsername: protectedProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      const orders = await ctx.prisma.order.findMany({
        where: {
          username: input.username,
        },
      });
      if (orders) {
        return orders;
      }
      return ["noordersfound"];
    }),

  // Get all orders
  getAllOrders: adminProcedure.query(async ({ ctx }) => {
    const orders = await ctx.prisma.order.findMany();
    if (orders) {
      return orders;
    }
    return ["noordersfound"];
  }),
});

import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const dayRouter = createTRPCRouter({
  getSlots: publicProcedure
    .input(z.object({ dateFormat: z.string() }))
    .query(async ({ ctx, input }) => {
      const day = await ctx.prisma.day.findFirst({
        where: { dateFormat: input.dateFormat },
      });
      if (day) {
        return day.slots;
      } else {
        return ["empty"];
      }
    }),
});

// Create a procedure that returns all slots for a given day
//  getSlots: publicProcedure // publicProcedure is a helper function that creates a procedure that is accessible to everyone
//    .input(z.object({ text: z.string() })) // input is a helper function that creates a zod schema for the input
//    .query(({ ctx, input }) => { // query is a helper function that creates a procedure that is accessible to everyone
//      const day = await ctx.prisma.day.findFirst(); // ctx is the context object that is passed to all procedures
// with typescript create a procedure that returns all slots for a given day
//  getSlots: publicProcedure // publicProcedure is a helper function that creates a procedure that is accessible to everyone
//    .input(z.object({ text: z.string() })) // input is a helper function that creates a zod schema for the input
//    .query(({ ctx, input }) => { // query is a helper function that creates a procedure that is accessible to everyone
//      const day = await ctx.prisma.day.findFirst(); // ctx is the context object that is passed to all procedures

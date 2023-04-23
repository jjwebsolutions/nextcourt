import { createTRPCRouter } from "~/server/api/trpc";

import { authUserRouter } from "~/server/api/routers/authUser";
import { dayRouter } from "~/server/api/routers/day";
import { orderRouter } from "./routers/order";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  authUser: authUserRouter,
  day: dayRouter,
  order: orderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

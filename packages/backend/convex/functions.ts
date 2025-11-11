import { internalMutation } from "@workspace/backend/_generated/server.js";

// export const clearExpiredUserSessionsFromDB = internalMutation({
//   handler: async (ctx) => {
//     const now = Date.now();
//     const expiredSessions = await ctx.db
//       .query("contactSessions")
//       .withIndex("by_expires_at", (q) => q.lt("expiresAt", now))
//       .collect();

//     for (const session of expiredSessions) {
//       await ctx.db.delete(session._id);
//     }
//   }
// });
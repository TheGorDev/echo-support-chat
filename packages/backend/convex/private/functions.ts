import { internalMutation } from "@workspace/backend/_generated/server.js";
import { DatabaseWriter } from "@workspace/backend/_generated/server.js";

export const clearExpiredSessions = internalMutation({
  handler: async (ctx: { db: DatabaseWriter }) => {
    const now = Date.now();

    // Используем индекс по expiresAt
    const expired = await ctx.db
      .query("contactSessions")
      .withIndex("by_expires_at", (q) => q.lt("expiresAt", now))
      .collect();

    for (const session of expired) {
      await ctx.db.delete(session._id);
    }

    return { deleted: expired.length };
  },
});
import { ConvexError, v } from "convex/values";
import {
    internalAction,
  internalMutation,
  internalQuery,
  mutation,
} from "@workspace/backend/_generated/server.js";
import { ConvexError, v } from "convex/values";
import {
    internal
} from "@workspace/backend/_generated/api.js";

export const upsert = mutation({
  args: {
    service: v.union(v.literal("vapi")),
    value: v.any(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new ConvexError({
        code: "UNATHORIZED",
        message: "Identity not found",
      });
    }

    const orgId = identity.orgId as string;
    if (orgId === null) {
      throw new ConvexError({
        code: "UNATHORIZED",
        message: "Organization not found",
      });
    }

    await ctx.scheduler.runAfter(0, internal.system.secrets.upsert, {
        service: args.service,
        organizationId: orgId,
        value: args.value
    })
  },
});

import { ConvexError, v } from "convex/values";
import { mutation, query } from "@workspace/backend/_generated/server.js";

export const getOne = query({
  args: {
    service: v.union(v.literal("vapi")),
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

    return await ctx.db
      .query("plugins")
      .withIndex("by_organization_id_and_service", (q) =>
        q.eq("organizationId", orgId).eq("service", args.service)
      )
      .unique();
  },
});

export const remove = mutation({
  args: {
    service: v.union(v.literal("vapi")),
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

    const existiongPlagin = await ctx.db
      .query("plugins")
      .withIndex("by_organization_id_and_service", (q) =>
        q.eq("organizationId", orgId).eq("service", args.service)
      )
      .unique();
    if (!existiongPlagin) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Plugin not found",
      });
    }

    await ctx.db.delete(existiongPlagin._id)

  },
});

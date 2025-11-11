import { mutation, query } from "@workspace/backend/_generated/server.js";
import { ConvexError, v } from "convex/values";
import { supportAgent } from "../system/ai/agents/supportAgent.js";
import {components} from "@workspace/backend/_generated/api.js"
import { saveMessage } from "@convex-dev/agent"
import { paginationOptsValidator } from "convex/server";

export const create = mutation({
  args: {
    prompt: v.string(),
    conversationId: v.id("conversations"),
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

    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Conversation not found",
      });
    }
    if (conversation.organizationId != orgId) {
      throw new ConvexError({
        code: "UNATHORIZED",
        message: "Invalid organization id",
      });
    }

    if (conversation.status === "resolved")
      throw new ConvexError({
        code: "BAD_REQUEST",
        message: "Conversation resolved",
      });

    await saveMessage(ctx, components.agent, {
      threadId: conversation.threadId,
      agentName: identity.familyName || identity.email,
      message: {
        role: "assistant",
        content: args.prompt,
      },
    });
  },
});

export const getMany = query({
  args: {
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
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

    const conversation = await ctx.db
      .query("conversations")
      .withIndex("by_thread_id", (q) => q.eq("threadId", args.threadId))
      .unique();
    if (!conversation) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Conversation not found",
      });
    }
    if (conversation.organizationId != orgId) {
      throw new ConvexError({
        code: "UNATHORIZED",
        message: "Invalid organization id",
      });
    }

    const paginated = await supportAgent.listMessages(ctx, {
      threadId: args.threadId,
      paginationOpts: args.paginationOpts,
    });

    return paginated;
  },
});

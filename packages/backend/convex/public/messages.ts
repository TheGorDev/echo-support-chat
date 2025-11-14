import { action, query } from "@workspace/backend/_generated/server.js";
import { ConvexError, v } from "convex/values";
import { internal } from "@workspace/backend/_generated/api.js";
import { supportAgent } from "@workspace/backend/system/ai/agents/supportAgent.js";
import { paginationOptsValidator } from "convex/server";
import { components } from "@workspace/backend/_generated/api.js";
import { saveMessage } from "@convex-dev/agent";
import { resolveConversation } from "@workspace/backend/system/ai/tools/resolveConversation.js";
import { escalateConversation } from "@workspace/backend/system/ai/tools/escalateConversation.js";
import { search } from "@workspace/backend/system/ai/tools/search.js";

export const create = action({
  args: {
    prompt: v.string(),
    threadId: v.string(),
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, args) => {
    const contactSession = await ctx.runQuery(
      internal.system.contactSessions.getOne,
      { contactSessionId: args.contactSessionId }
    );
    if (!contactSession || contactSession.expiresAt < Date.now())
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid session",
      });

    const conversation = await ctx.runQuery(
      internal.system.conversations.getByThreadId,
      { threadId: args.threadId }
    );
    if (!conversation)
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Conversation not found",
      });

    if (conversation.status === "resolved")
      throw new ConvexError({
        code: "BAD_REQUEST",
        message: "Conversation resolved",
      });

    const shouldTriggerAgent = conversation.status === "unresolved";

    if (shouldTriggerAgent) {
      await supportAgent.generateText(
        ctx,
        { threadId: args.threadId },
        {
          prompt: args.prompt,
          tools: {
            resolveConversation,
            escalateConversation,
            search,
          },
        }
      );
    } else {
      await saveMessage(ctx, components.agent, {
        threadId: args.threadId,
        prompt: args.prompt,
      });
    }
  },
});

export const getMany = query({
  args: {
    threadId: v.string(),
    contactSessionId: v.id("contactSessions"),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    // const contactSession = await ctx.runQuery(internal.system.contactSessions.getOne, {contactSessionId: args.contactSessionId})
    const contactSession = await ctx.db.get(args.contactSessionId);
    if (!contactSession || contactSession.expiresAt < Date.now())
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid session",
      });

    return await supportAgent.listMessages(ctx, {
      threadId: args.threadId,
      paginationOpts: args.paginationOpts,
    });
  },
});

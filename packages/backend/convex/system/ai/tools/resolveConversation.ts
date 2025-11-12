import { createTool } from "@convex-dev/agent";
import z from "zod"
import {internal} from "@workspace/backend/_generated/api.js"
import { supportAgent } from "@workspace/backend/system/ai/agents/supportAgent.js";

export const resolveConversation = createTool({
    description: "Resolve conversation",
    args: z.object({}),
    handler: async (ctx) => {
        if(!ctx.threadId) return "Missing thread ID"


        await ctx.runMutation(internal.system.conversations.resolve,{threadId: ctx.threadId})

        await supportAgent.saveMessage(ctx, {
            threadId: ctx.threadId,
            message: {
                role: "assistant",
                content: "Conversation resolved"
            }
        })

        return  "Conversation resolved"
    }
})
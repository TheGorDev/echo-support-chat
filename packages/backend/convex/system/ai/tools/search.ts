import { openai } from "@ai-sdk/openai";
import { createTool } from "@convex-dev/agent";
import { generateText } from "ai";
import z from "zod";
import { internal } from "@workspace/backend/_generated/api.js";
import { supportAgent } from "@workspace/backend/system/ai/agents/supportAgent.js";
import { rag } from "@workspace/backend/system/ai/rag.js";

export const search = createTool({
  description:
    "Search the knowledge base for relevant information to help answer user questions",
  args: z.object({
    query: z.string().describe("The search query to find relevant information"),
  }),
  handler: async (ctx, args) => {
    try {
      if (!ctx.threadId) return "Missing thread ID";

      const conversation = await ctx.runQuery(
        internal.system.conversations.getByThreadId,
        { threadId: ctx.threadId }
      );

      if (!conversation) return "Conversation not found";

      const orgId = conversation.organizationId;

      const searchResult = await rag.search(ctx, {
        namespace: orgId,
        query: args.query,
        limit: 5,
      });

      const contextText = `Found results in ${searchResult.entries
        .map((e) => e.title || null)
        .filter((t) => t !== null)
        .join(", ")}. Here is the context:\n\n${searchResult.text}`;

      const response = await generateText({
        messages: [
          {
            role: "system",
            content:
              "You interpret knowledge base search results and provide helpful, accurate answers to user questions",
          },
          {
            role: "user",
            content: `User asked: "${args.query}"\n\nSearch results: ${contextText}`,
          },
        ],
        model: openai.languageModel("gpt-4o-mini"),
      });

      return response.text;
    } catch (error) {
        console.log(error)
        const errorMessage = error instanceof Error ? error.message : String(error);
        return `Error searching knowledge base: ${errorMessage}`;
    }
  },
});

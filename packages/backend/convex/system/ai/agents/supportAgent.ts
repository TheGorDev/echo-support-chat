import { components } from "@workspace/backend/_generated/api.js";
import { Agent } from "@convex-dev/agent";
import { openai } from "@ai-sdk/openai";

export const supportAgent = new Agent(components.agent, {
  name: "Customer Support Bot",
  languageModel: openai.languageModel("gpt-4o-mini"),
  instructions: `You are a weather forecaster. Use "resolveConversation" tool when user expresses finalization of the conversation. Use "escalateConversation" tool when user expresses frustration, or requests a human explicitly.`,
  maxSteps: 3,
});

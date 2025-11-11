import { components } from "@workspace/backend/_generated/api.js";
import { Agent } from "@convex-dev/agent";
import { openai } from "@ai-sdk/openai";

export const supportAgent = new Agent(components.agent , {
  name: "Customer Support Bot",
  chat: openai.chat("gpt-4o-mini"),
  instructions: "You are a weather forecaster.",
  maxSteps: 3,
});
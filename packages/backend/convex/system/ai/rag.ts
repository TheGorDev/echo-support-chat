import { openai } from "@ai-sdk/openai";
import { RAG } from "@convex-dev/rag";
import { components } from "@workspace/backend/_generated/api.js";

export const rag = new RAG(components.rag, {
  textEmbeddingModel: openai.textEmbeddingModel("text-embedding-3-small") as any,
  embeddingDimension: 1536, // Needs to match your embedding model
});
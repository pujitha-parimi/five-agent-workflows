
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST method." });
  }

  const { pattern, prompt } = req.body ?? {};

  const allowedPatterns = [
    "chain",
    "routing",
    "parallel",
    "orchestrator",
    "evaluator",
  ];

  if (!allowedPatterns.includes(pattern) || typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({
      error: "Provide a valid pattern and a non-empty prompt.",
    });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error: "GEMINI_API_KEY is not configured.",
    });
  }

  const instructions: Record<string, string> = {
    chain: "Use prompt chaining: analyze the request, develop an answer, then present a final result.",
    routing: "Classify the request, explain the selected route, and answer as the appropriate specialist.",
    parallel: "Analyze the request from three independent perspectives, then combine the findings.",
    orchestrator: "Act as an orchestrator: break the request into subtasks, solve each, and combine the results.",
    evaluator: "Draft an answer, evaluate its accuracy and clarity, improve it, and present the final version.",
  };

  try {
    const result = await generateText({
      model: google("gemini-3.8-flash"),
      system: instructions[pattern]!,
      prompt: prompt.trim(),
    });

    return res.status(200).json({
      pattern,
      output: result.text,
    });
  } catch (error) {
    console.error("Gemini request failed:", error);
    return res.status(500).json({
      error: "Gemini request failed. Check the API key and model configuration.",
    });
  }
}

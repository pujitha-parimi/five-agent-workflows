
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // 1. Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Use POST method.",
    });
  }

  // 2. Read the user's selected workflow and question
  const { pattern, prompt } = req.body ?? {};

  const allowedPatterns = [
    "chain",
    "routing",
    "parallel",
    "orchestrator",
    "evaluator",
  ];

  if (
    !allowedPatterns.includes(pattern) ||
    typeof prompt !== "string" ||
    !prompt.trim()
  ) {
    return res.status(400).json({
      error: "Provide a valid pattern and a non-empty prompt.",
    });
  }

  // 3. Read the API key configured in Vercel
  const apiKey =
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error:
        "API key is not configured. Add GOOGLE_GENERATIVE_AI_API_KEY in Vercel Environment Variables.",
    });
  }

  // 4. Instructions for each workflow pattern
  const instructions: Record<string, string> = {
    chain:
      "Use prompt chaining: analyze the request, develop an answer, then present a final result.",

    routing:
      "Classify the request, explain the selected route, and answer as the appropriate specialist.",

    parallel:
      "Analyze the request from three independent perspectives, then combine the findings.",

    orchestrator:
      "Act as an orchestrator: break the request into subtasks, solve each, and combine the results.",

    evaluator:
      "Draft an answer, evaluate its accuracy and clarity, improve it, and present the final version.",
  };

  // 5. Send the question to Gemini
  try {
  const googleProvider = createGoogleGenerativeAI({
    apiKey,
  });

  const result = await generateText({
    model: googleProvider("gemini-3.8-flash"),
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
      error:
        "Gemini request failed. Check the API key, model availability, and server logs.",
    });
  }
}
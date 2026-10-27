
import "dotenv/config";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

async function main(): Promise<void> {
  const result = await generateText({
    model: google("gemini-3.8-flash"),
    prompt: "Explain AI agents in 2 simple sentences.",
  });

  console.log("Gemini response:");
  console.log(result.text);
}

main().catch((error: unknown) => {
  console.error("Gemini test failed:", error);
});

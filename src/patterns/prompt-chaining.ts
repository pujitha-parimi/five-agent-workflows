
type TextStep = (input: string) => Promise<string>;

async function promptChaining(
  firstStep: TextStep,
  secondStep: TextStep,
): Promise<void> {
  const original = await firstStep("AI agents");

  console.log("\nSTEP 1 - Original content:");
  console.log(original);

  const summary = await secondStep(original);

  console.log("\nSTEP 2 - Summary:");
  console.log(summary);
}

// Local demo: no API call, so it runs instantly.
const createContent: TextStep = async (topic) =>
  `${topic} can understand a task, plan actions, and use tools.`;

const summarize: TextStep = async (content) =>
  `Summary: ${content}`;

promptChaining(createContent, summarize).catch(console.error);

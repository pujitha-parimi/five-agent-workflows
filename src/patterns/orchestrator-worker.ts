
type Worker = {
  name: string;
  execute: () => Promise<string>;
};

async function orchestratorWorker(): Promise<void> {
  // Manager creates and assigns tasks to workers.
  const workers: Worker[] = [
    {
      name: "Worker 1",
      execute: async () => "Advantages: AI agents automate repetitive tasks.",
    },
    {
      name: "Worker 2",
      execute: async () => "Disadvantages: AI agents can make mistakes.",
    },
  ];

  console.log("Orchestrator: Assigning tasks to workers...");

  // Workers complete their independent tasks.
  const results = await Promise.all(
    workers.map(async (worker) => ({
      name: worker.name,
      result: await worker.execute(),
    })),
  );

  // Manager collects all results.
  console.log("\nOrchestrator: Collecting results...");

  for (const item of results) {
    console.log(`${item.name}: ${item.result}`);
  }

  console.log("\nOrchestrator: All tasks completed!");
}

orchestratorWorker().catch(console.error);

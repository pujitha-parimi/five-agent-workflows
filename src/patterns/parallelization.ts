
type Task = {
  name: string;
  run: () => Promise<string>;
};

async function parallelization(): Promise<void> {
  const tasks: Task[] = [
    {
      name: "Advantages",
      run: async () => "Fast responses and task automation.",
    },
    {
      name: "Disadvantages",
      run: async () => "Can make mistakes and needs monitoring.",
    },
    {
      name: "Uses",
      run: async () => "Customer support and research assistance.",
    },
  ];

  // Start all independent tasks together.
  const results = await Promise.all(
    tasks.map(async (task) => ({
      name: task.name,
      result: await task.run(),
    })),
  );

  for (const item of results) {
    console.log(`${item.name}: ${item.result}`);
  }
}

parallelization().catch(console.error);

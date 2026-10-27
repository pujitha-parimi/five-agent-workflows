
type Evaluation = {
  score: number;
  feedback: string;
};

function evaluateAnswer(answer: string): Evaluation {
  if (answer.length < 40) {
    return {
      score: 4,
      feedback: "Add more useful details.",
    };
  }

  return {
    score: 9,
    feedback: "The answer has enough detail.",
  };
}

function improveAnswer(answer: string, feedback: string): string {
  return `${answer} Improvement: ${feedback}`;
}

function evaluatorOptimizer(): void {
  let answer = "AI agents automate tasks.";

  console.log("Original answer:", answer);

  const evaluation = evaluateAnswer(answer);
  console.log("Score:", evaluation.score);
  console.log("Feedback:", evaluation.feedback);

  answer = improveAnswer(answer, evaluation.feedback);

  console.log("Improved answer:", answer);
}

evaluatorOptimizer();

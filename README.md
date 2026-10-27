# Five Agent Workflow Patterns

A beginner-friendly TypeScript project demonstrating five common AI workflow patterns. The project uses Node.js, TypeScript, and Google Gemini API setup.

## Tech Stack

- Node.js
- TypeScript
- Google Gemini
- Vercel AI SDK
- tsx

## Workflow Patterns

### 1. Prompt Chaining
Connects multiple steps so that the output of one step becomes the input of the next step.

File: `src/patterns/prompt-chaining.ts`

### 2. Routing
Selects a handler based on the type of request.

File: `src/patterns/routing.ts`

### 3. Parallelization
Runs independent tasks concurrently using `Promise.all()`.

File: `src/patterns/parallelization.ts`

### 4. Orchestrator–Worker
A central orchestrator assigns tasks to workers and collects their results.

File: `src/patterns/orchestrator-worker.ts`

### 5. Evaluator–Optimizer
Evaluates an answer, provides feedback, and demonstrates an improvement step.

File: `src/patterns/evaluator-optimizer.ts`

## Setup

1. Install Node.js.
2. Clone or download this project.
3. Install dependencies:

   `npm install`

4. Create a `.env` file in the project root and add your Google Gemini API key:

   `GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here`

5. Run a workflow, for example:

   `npx tsx src/patterns/routing.ts`

## TypeScript Check

Run:

`npx tsc --noEmit`

## Important Note

The five workflow pattern files currently demonstrate the workflow logic locally. They do not all call Gemini. The separate Gemini connection test verifies the API integration. Actual Gemini-powered implementations of all five patterns are a future enhancement.

Never commit your real API key or `.env` file to GitHub.

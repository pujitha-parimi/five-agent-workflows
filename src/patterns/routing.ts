
type Handler = (request: string) => string;

const codingHandler: Handler = (request) =>
  `Coding workflow selected for: ${request}`;

const generalHandler: Handler = (request) =>
  `General workflow selected for: ${request}`;

function routeRequest(request: string): string {
  const isCodingRequest =
    request.toLowerCase().includes("code") ||
    request.toLowerCase().includes("python");

  if (isCodingRequest) {
    return codingHandler(request);
  }

  return generalHandler(request);
}

console.log(routeRequest("Write Python code"));
console.log(routeRequest("Explain AI agents"));

import Sandbox from "@e2b/code-interpreter";
import { gemini, createAgent } from "@inngest/agent-kit";

//use createFunction to define
import { inngest } from "./client";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("cube-r2adio");
      return sandbox.sandboxId;
    });

    // creating a coding agent
    const codeAgent = createAgent({
      name: "codeAgent",
      system:
        "You are an expert next.js developer. You write readable and maintainable code. You write simple Next.js and React snippets.",
      model: gemini({ model: "gemini-2.0-flash" }),
    });

    const { output } = await codeAgent.run(
      `Write the following snippet: ${event.data.value}`,
    );

    // sandbox url
    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000); // creates a host under port 3000
      return `https://${host}`;
    });

    return { output, sandboxUrl };
  },
);

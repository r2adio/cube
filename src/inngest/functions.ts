//use createFunction to define
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    //imagine this as a download step
    await step.sleep("wait-a-moment", "30s");
    //imagine this as a transcript step
    await step.sleep("wait-a-moment", "10s");
    //imagine this as a summary step
    await step.sleep("wait-a-moment", "5s");
    return { message: `Hello ${event.data.email}!` };
  },
);

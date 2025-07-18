"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
  const trpc = useTRPC();
  // trpc.hello.queryOptions({ text: "Hello!" }); //check src/trpc/routers/_app.ts
  // const { data } = useQuery(fetch("/api/create-ai", { body: JSON.stringify })); //earlier meathod to get data from api
  // simple fetching data using a client component, this is a data access layer
  const { data } = useQuery(trpc.createAI.queryOptions({ text: "Antonio" }));

  return <div>{JSON.stringify(data)}</div>;
};

export default Page;

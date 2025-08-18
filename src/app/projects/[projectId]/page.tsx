import { ProjectView } from "@/modules/projects/ui/views/project-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

// extracting project id
interface Props {
  params: Promise<{ projectId: string }>;
}

const Page = async ({ params }: Props) => {
  const { projectId } = await params;

  const queryClient = getQueryClient();
  // when fetching messages, here props is: `projectId`,
  // 'cause it's referring to entirely new entity
  void queryClient.prefetchQuery(
    trpc.messages.getMany.queryOptions({ projectId /* projectId:projectId */ }),
  );

  // when `fetching projects, here props is: `id:projectId`,
  // 'cause we already know that id is referring to projectId
  void queryClient.prefetchQuery(
    trpc.projects.getOne.queryOptions({ id: projectId }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<p>Error!</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <ProjectView projectId={projectId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
};

export default Page;

import { ProjectForm } from "@/modules/home/ui/components/project-form";
import { ProjectsList } from "@/modules/home/ui/components/projects-list";
import Image from "next/image";

const Page = () => {
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl md:text-5xl font-bold text-center">
            Shape your ideas with
          </h1>
          <Image
            src="/logo.svg"
            alt="Cube"
            width={60}
            height={60}
            className="hidden md:block mx-2.5"
          />
          <h1 className="pl-2 text-2xl md:text-5xl font-bold text-center">Cube</h1>
        </div>
        <p className="text-md md:text-xl text-muted-foreground text-center">
          Create apps and websites by chatting with AI
        </p>

        <div className="max-w-3xl mx-auto w-full">
          <ProjectForm />
        </div>
      </section>
      <ProjectsList />
    </div>
  );
};

export default Page;

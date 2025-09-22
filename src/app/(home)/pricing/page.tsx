"use client";
import { dark } from "@clerk/themes";
import { PricingTable } from "@clerk/nextjs";

import { useCurrentTheme } from "@/hooks/use-current-theme";

const Page = () => {
  const currentThene = useCurrentTheme();

  return (
    <div className="flex flex-col max-w-3xl mx-auto w-full">
      <section className="space-y-6 pt-[16vh] 2xl:pt-48">
        <h1 className="text-xl md:text-5xl font-bold text-center">Pricing</h1>
        <p className="pb-8 text-muted-foreground text-center text-sm md:text-base">
          Choose the plan that fits your needs
        </p>
      </section>
      <PricingTable
        appearance={{
          baseTheme: currentThene === "dark" ? dark : undefined,
          elements: { pricingTableCard: "border! shadow-none! rounded-lg!" },
        }}
      />
    </div>
  );
};

export default Page;

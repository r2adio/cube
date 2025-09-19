import { RateLimiterPrisma } from "rate-limiter-flexible";

import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const FREE_POINTS = 20;
const PRO_POINTS = 200;
const DURATION = 30 * 24 * 60 * 60; // 30 days
const GENERATION_COST = 1;

// func to get the usage tracker
export async function getUsageTracker() {
  const { has } = await auth();
  const hasProAccess = has({ plan: "pro" });

  const usageTracker = new RateLimiterPrisma({
    storeClient: prisma,
    tableName: "Usage",
    points: hasProAccess ? PRO_POINTS : FREE_POINTS,
    duration: DURATION,
  });

  return usageTracker;
}

// func to consume credits for the current user
export async function consumeCredits() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const usageTracker = await getUsageTracker();
  // -1 credit from total credits, whenever a credit is consumed
  const result = await usageTracker.consume(userId, GENERATION_COST);

  return result;
}

// func to get the user status by current userId key
export async function getUsageStatus() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const usageTracker = await getUsageTracker();
  const result = await usageTracker.get(userId);

  return result;
}

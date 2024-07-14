"use server";

import prisma from "@/lib/prisma";

export async function getBudget(userEmail: string) {
  return prisma.budget.findMany({
    where: {
      user: {
        email: userEmail,
      },
    },
    select: {
      id: true,
      name: true,
      amount: true,
      startDate: true,
      endDate: true,
    },
  });
}

"use server";

import prisma from "@/lib/prisma";

export async function getUser(userEmail: string) {
  return prisma.user.findUnique({
    where: {
      email: userEmail,
    },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      categories: {
        select: {
          id: true,
          name: true,
          desc: true,
          expenses: {
            select: {
              id: true,
              name: true,
              amount: true,
            },
          },
        },
      },
      expenses: {
        select: {
          id: true,
          name: true,
          amount: true,
          date: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          notes: true,
        },
      },
      budgets: {
        select: {
          id: true,
          name: true,
          amount: true,
          startDate: true,
          endDate: true,
        },
      },
    },
  });
}

export async function deleteUser(userEmail: string) {
  return prisma.user.delete({
    where: {
      email: userEmail,
    },
  });
}

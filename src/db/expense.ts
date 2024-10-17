"use server";

import prisma from "@/lib/prisma";

export async function getExpenses(userEmail: string) {
  return prisma.expense.findMany({
    where: {
      user: {
        email: userEmail,
      },
    },
    select: {
      id: true,
      name: true,
      amount: true,
      tax: true,
      date: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      notes: true,
    },
  });
}

export async function createExpense(
  name: string,
  amount: number,
  date: string,
  tax: number,
  category: string,
  notes: string,
  userEmail: string
) {
  return prisma.expense.create({
    data: {
      name,
      amount,
      date: new Date(date),
      tax,
      category: {
        connect: {
          id: category,
        },
      },
      notes,
      user: {
        connect: {
          email: userEmail,
        },
      },
    },
    select: {
      id: true,
      name: true,
      amount: true,
      date: true,
      tax: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      notes: true,
    },
  });
}

export async function editExpense(
  id: string,
  name: string,
  amount: number,
  date: string,
  tax: number,
  category: string,
  notes: string
) {
  return prisma.expense.update({
    where: {
      id,
    },
    data: {
      name,
      amount,
      date: new Date(date),
      category: {
        connect: {
          id: category,
        },
      },
      tax,
      notes,
    },
    select: {
      id: true,
      name: true,
      amount: true,
      date: true,
      tax: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      notes: true,
    },
  });
}

export async function deleteExpense(id: string) {
  return prisma.expense.delete({
    where: {
      id,
    },
  });
}

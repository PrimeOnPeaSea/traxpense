"use server";

import prisma from "@/lib/prisma";

export async function getCategories(userEmail: string) {
  return prisma.category.findMany({
    where: {
      user: {
        email: userEmail,
      },
    },
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
  });
}

export async function createCategory(
  name: string,
  desc: string,
  userEmail: string
) {
  return prisma.category.create({
    data: {
      name,
      desc,
      user: {
        connect: {
          email: userEmail,
        },
      },
    },
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
  });
}

export async function editCategory(id: string, name: string, desc: string) {
  return prisma.category.update({
    where: {
      id,
    },
    data: {
      name,
      desc,
    },
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
  });
}

export async function deleteCategory(id: string) {
  return prisma.category.delete({
    where: {
      id,
    },
  });
}

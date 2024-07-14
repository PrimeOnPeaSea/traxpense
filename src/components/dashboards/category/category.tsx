import { auth } from "@/auth";
import { redirect } from "next/navigation";

import CategoryCard from "./categoryCard";

import { getCategories } from "@/db/category";

import { type Category } from "@/lib/types";

const Category = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect(`/`);
  }
  const userEmail = session.user.email || "";
  const categories = (await getCategories(userEmail)) as Category[];

  return <CategoryCard categories={categories} mail={userEmail} />;
};

export default Category;

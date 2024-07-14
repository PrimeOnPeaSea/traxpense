"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddCategory from "./addCategory";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import EditCategory from "./editCategory";
import DeleteCategory from "./deleteCategory";
import { type Category } from "@/lib/types";

const CategoryCard = ({
  categories,
  mail,
}: {
  categories: Category[];
  mail: string;
}) => {
  const [category, setCategory] = useState<Category[]>(categories);

  return (
    <Card className="w-full mt-5 h-[calc(100vh-210px)] overflow-y-auto">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-bold">Category</CardTitle>
        <AddCategory setCategory={setCategory} mail={mail} />
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Total Expenses</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {category.toReversed().map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.desc}</TableCell>
                  <TableCell className="text-center">
                    ₹
                    {category.expenses
                      .map((expense) => expense.amount)
                      .reduce((a, b) => a + b, 0)}
                  </TableCell>
                  <TableCell className="flex gap-2 items-center justify-end">
                    <EditCategory
                      category={[category]}
                      setCategory={setCategory}
                      id={category.id}
                    />
                    <DeleteCategory
                      setCategory={setCategory}
                      id={category.id}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;

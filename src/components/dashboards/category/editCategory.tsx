"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { editCategory } from "@/db/category";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { type Category } from "@/lib/types";

const formSchema = z.object({
  name: z.string({
    required_error: "Category name is required",
  }),
  desc: z.string({
    required_error: "Category description is required",
  }),
});

const EditCategory = ({
  category,
  setCategory,
  id,
}: {
  category: Category[];
  setCategory: React.Dispatch<React.SetStateAction<Category[]>>;
  id: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category.find((cat) => cat.id === id)?.name,
      desc: category.find((cat) => cat.id === id)?.desc,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const updatedCategory = (await editCategory(
        id,
        values.name,
        values.desc
      )) as Category;
      setCategory((prev) =>
        prev.map((cat) => (cat.id === id ? updatedCategory : cat))
      );
      setOpen(false);
      toast.success("Category Update successfully");
      form.reset();
    } catch (error) {
      toast.error("Failed to Update Selected category");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Edit the category you want to update.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Type the name of the category you want to add.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Category Description" {...field} />
                  </FormControl>
                  <FormDescription>
                    Type the description of the category you want to add.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;

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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaRegPlusSquare } from "react-icons/fa";

import { createCategory } from "@/db/category";

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

const AddCategory = ({
  setCategory,
  mail,
}: {
  setCategory: React.Dispatch<React.SetStateAction<Category[]>>;
  mail: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      desc: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const newCategory = (await createCategory(
        values.name,
        values.desc,
        mail
      )) as Category;
      setCategory((currentCategory) => [...currentCategory, newCategory]);
      toast.success("Category added successfully");
      setOpen(false);
      form.reset();
    } catch (error) {
      toast.error("Failed to add category");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-2" asChild>
        <Button className="flex items-center gap-2">
          <FaRegPlusSquare className="w-6 h-6" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Add a new category to your account.
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

export default AddCategory;

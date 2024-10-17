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
import { FaRegPlusSquare } from "react-icons/fa";

import { createExpense } from "@/db/expense";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

import type { Category, Expense } from "@/lib/types";

const formSchema = z.object({
  name: z.string({
    required_error: "Expense name is required",
  }),
  amount: z.coerce
    .number({
      required_error: "Expense amount is required",
    })
    .positive({
      message: "Expense amount must be positive",
    }),
  date: z.string({
    required_error: "Expense date is required",
  }),
  notes: z.string({
    required_error: "Expense notes is required",
  }),
  category: z.string({
    required_error: "Expense category is required",
  }),
  tax: z.coerce
    .number({
      required_error: "Expense tax is required",
    })
    .positive({
      message: "Expense tax must be positive",
    }),
});

const AddExpense = ({
  setExpense,
  category,
  mail,
}: {
  setExpense: React.Dispatch<React.SetStateAction<Expense[]>>;
  category: Category[];
  mail: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 100,
      tax: 0,
      date: new Date().toISOString().split("T")[0],
      notes: "",
      category: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const newExpense = (await createExpense(
        values.name,
        values.amount,
        values.date,
        values.tax,
        values.category,
        values.notes,
        mail
      )) as Expense;
      setExpense((currentExpense) => [...currentExpense, newExpense]);
      setOpen(false);
      toast.success("Expense added successfully");
      form.reset();
    } catch (error) {
      toast.error("Failed to add Expense");
      console.error(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-2" asChild>
        <Button className="flex items-center gap-2">
          <FaRegPlusSquare className="w-6 h-6" />
          Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>
            Add a new Expense to your account.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expense Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Expense Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Type the name of the Expense you want to add.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expense Notes</FormLabel>
                    <FormControl>
                      <Input placeholder="Expense Notes" {...field} />
                    </FormControl>
                    <FormDescription>
                      Type the notes of the Expense you want to add.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expense Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Expense Amount"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Type the amount of the Expense you want to add.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expense Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>
                      Type the date of the Expense you want to add.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4"><FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expense Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Expense Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {category.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the category of the Expense you want to add.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expense Tax</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Expense Tax"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Type the tax of the Expense you want to add.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpense;

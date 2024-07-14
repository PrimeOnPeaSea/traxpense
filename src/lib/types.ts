export type Category = {
  id: string;
  name: string;
  desc: string;
  expenses: {
    id: string;
    name: string;
    amount: number;
  }[];
};

export type Expense = {
  id: string;
  name: string;
  amount: number;
  date: Date;
  category: {
    id: string;
    name: string;
  };
  notes: string;
};

export type Budget = {
  id: string;
  name: string;
  amount: number;
  startDate: Date;
  endDate: Date;
};

export type User = {
  id: string;
  email: string;
  name: string;
  image: string;
  categories: Category[];
  expenses: Expense[];
  budgets: Budget[];
};

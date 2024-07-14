"use client";

import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface ExpenseItem {
  name: string;
  amount: number;
  category: string;
  categoryExpenseAmount: number;
  date: string;
}

interface Props {
  data: ExpenseItem[];
}

export default class StackedAreaChartCard extends PureComponent<Props> {
  render() {
    const { data } = this.props;
    return (
      <ResponsiveContainer width="100%" height={500}>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
          className="text-black/80"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="amount"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="categoryExpenseAmount"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

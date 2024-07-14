"use client";

import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import getRandomColor from "@/lib/random-color-gen";

export interface DataItem {
  name: string;
  value: number;
}

interface Props {
  data01: DataItem[];
  data02: DataItem[];
}

export default class PieChartCard extends PureComponent<Props> {
  render() {
    const { data01, data02 } = this.props;
    return (
      <ResponsiveContainer width="100%" height={500}>
        <PieChart width={500} height={500}>
          <Pie
            data={data01}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={40}
            label={true}
            paddingAngle={5}
          >
            {data01.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getRandomColor()} />
            ))}
          </Pie>
          <Pie
            data={data02}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={130}
            outerRadius={170}
            paddingAngle={5}
            label
          >
            {data02.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getRandomColor()} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

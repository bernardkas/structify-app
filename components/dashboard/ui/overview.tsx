"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
  
interface OverviewProps {
    monthlyBudgetData: any
}
export function Overview({monthlyBudgetData}: OverviewProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={monthlyBudgetData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `€${value}`}
        />
        <Bar
          dataKey="totalBudget"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
          name="Budget"
        />
        <Bar
          dataKey="totalHours"
          fill="#82ca9d"
          radius={[4, 4, 0, 0]}
          name="Hours"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/lib/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/lib/components/ui/chart";

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function PieNbTacheParProjet(data: any) {
  if (Array.isArray(data)) {
  } else {
    if (typeof data === "object" && data !== null) {
      data = Object.values(data);
    }
  }
  const chartData = data[0].map(
    (item: { label: string; count: number }, index: number) => ({
      label: item.label,
      count: item.count,
      fill: colors[index % colors.length],
    })
  );

  // Accumulation des données
  const chartConfig = chartData.reduce(
    (acc: any, item: { label: string; color: any }, index: number) => {
      acc[item.label] = {
        label: item.label,
        color: colors[index % colors.length],
      };
      return acc;
    },
    {} as ChartConfig
  );

  // Calcul du total des tâches
  const totalTaches = chartData.reduce(
    (acc: any, curr: any) => acc + curr.count,
    0
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Nombres de taches par projets</CardTitle>
        <CardDescription>Période : Janvier - Juin 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig || {}}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="label"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalTaches.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tâches par projets
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Progression de 5.2% ce mois-ci <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Répartition des tâches par statut
        </div>
      </CardFooter>
    </Card>
  );
}

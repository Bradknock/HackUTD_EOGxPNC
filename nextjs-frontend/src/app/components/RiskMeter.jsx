"use client"

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { ChartConfig, ChartContainer } from "./ui/chart"

// RiskMeter component
export default function RiskMeter({ percentage }) {
  // Calculate the angle for the RadialBar based on percentage for Risk Meter
  const endAngle = (percentage / 100) * 360;

  // Determine the color based on the percentage
  const getColor = () => {
    if (percentage <= 50) return "#4CAF50"; // Green (safe)
    if (percentage > 50 && percentage <= 70) return "#FFEB3B"; // Yellow (warning)
    return "#F44336"; // Red (critical)
  };

  // Label text based on the percentage for Maintenance Need
  const getStatusLabel = () => {
    if (percentage <= 50) return "Safe";
    if (percentage > 50 && percentage <= 70) return "Warning";
    return "Critical";
  };

  const chartData = [
    { value: percentage, fill: getColor() },  // For Risk Meter
    { value: 100, fill: getColor() },  // For Maintenance Need, always full circle (360 degrees)
  ];

  const chartConfig = {
    value: {
      label: "Risk Percentage",
    },
  };

  return (
    <Card className="flex flex-col h-[680px] text-white bg-zinc-800 bg-opacity-50 border-none">
      {/* Risk Meter Chart */}
      <CardHeader className="items-center pb-0">
        <CardTitle>Risk Meter</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData.slice(0, 1)}  // Use only the first data for Risk Meter
            endAngle={endAngle} // Set dynamic endAngle based on percentage
            innerRadius={80}
            outerRadius={140}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="value" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
  className="fill-foreground text-4xl font-bold"
>
  {percentage !== undefined && !isNaN(percentage) ? percentage.toLocaleString() : "N/A"}%
</tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Risk Percentage
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      {/* Maintenance Need Chart */}
      <CardHeader className="items-center pb-0 mt-4">
        <CardTitle>Maintenance Need</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData.slice(1)}  // Use only the second data for Maintenance Need
            endAngle={360} // Full circle (always 360)
            innerRadius={80}
            outerRadius={140}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="value" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                          {getStatusLabel()}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Based on results from ML Model
        </div>
        
      </CardFooter>
    </Card>
  );
}

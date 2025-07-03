import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "keep-react";

export const BarChartComponent = () => {
  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#1B4DFF",
    },
  };

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-3/4">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <YAxis
          dataKey="desktop"
          tickLine={false}
          tickMargin={24}
          axisLine={false}
        />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend verticalAlign="top" content={<ChartLegendContent />} />
        <Bar
          dataKey="desktop"
          fill="#1B4DFF"
          radius={[8, 8, 0, 0]}
          barSize={50}
        >
          <LabelList
            position="top"
            offset={12}
            className="fill-metal-600 dark:fill-metal-300"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "keep-react";
import FilterDropdown from "../dropdown/FilterDropdown";

export default function BarChart({
  data,
  dropdownValue,
  dropdownOptions,
  dropDownOnChange,
  chartConfig,
  title,
  dataKey,
  yAxisFormatter,
  yAxisTicks,
  sizeChart,
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm lg:text-lg font-medium text-gray-700">
          {title}
        </h3>
        <FilterDropdown
          value={dropdownValue}
          options={dropdownOptions}
          onChange={dropDownOnChange}
        />
      </div>
      <ChartContainer config={chartConfig} className="w-full overflow-x-auto">
        <div className="min-w-[300px] lg:w-full">
          <div className={sizeChart}>
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                accessibilityLayer
                data={data}
                margin={{ top: 20, right: 30, left: 35, bottom: 5 }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                />
                <YAxis
                  tickLine={false}
                  tickCount={10}
                  ticks={yAxisTicks}
                  tickFormatter={yAxisFormatter}
                  tickMargin={10}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                />
                <XAxis
                  className="hidden 2xl:block"
                  dataKey="department"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  angle={0}
                  height={80}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  cursor={{ fill: "rgba(34, 197, 94, 0.1)" }}
                />
                <Bar dataKey={dataKey} radius={[6, 6, 6, 6]} barSize={100}>
                  {data?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#22C55E" />
                  ))}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </ChartContainer>
    </div>
  );
}

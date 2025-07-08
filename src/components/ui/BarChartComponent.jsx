import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Button,
  Popover,
  PopoverAction,
  PopoverContent,
} from "keep-react";

const FilterDropdown = ({ value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverAction asChild>
        <Button
          variant="outline"
          className="w-32 justify-between text-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {value}
          <span className="ml-2">▼</span>
        </Button>
      </PopoverAction>
      <PopoverContent className="w-40 p-1">
        <div className="flex flex-col">
          {options.map((option) => (
            <button
              key={option}
              className="px-3 py-2 text-sm text-left hover:bg-gray-100 rounded"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export const BarChartComponent = ({ data }) => {
  const [employeeFilter, setEmployeeFilter] = useState("Last 2 week");

  const employeeOptions = [
    "Last 1 week",
    "Last 2 week",
    "Last 3 week",
    "Last 4 week",
  ];

  const chartConfig = {
    employees: {
      label: "Employees",
      color: "#22C55E",
    },
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-700">
          Total Karyawan Hadir per Divisi
        </h3>
        <FilterDropdown
          value={employeeFilter}
          options={employeeOptions}
          onChange={setEmployeeFilter}
        />
      </div>

      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart
          accessibilityLayer
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="#E5E7EB"
          />
          <YAxis
            tickLine={false}
            ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            tickMargin={10}
            axisLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
          />
          <XAxis
            dataKey="department"
            tickLine={false}
            tickMargin={20}
            axisLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            angle={0}
            height={80}
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
            cursor={{ fill: "rgba(34, 197, 94, 0.1)" }}
          />
          <Bar dataKey="employees" radius={[6, 6, 6, 6]} barSize={100}>
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#22C55E" />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
};
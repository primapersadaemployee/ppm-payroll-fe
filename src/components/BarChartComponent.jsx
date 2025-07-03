import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Button,
  Popover,
  PopoverAction,
  PopoverContent,
} from "keep-react";

export const BarChartComponent = () => {
  const [attendanceFilter, setAttendanceFilter] = useState("Month");
  const [employeeFilter, setEmployeeFilter] = useState("Last 2 week");

  const attendanceOptions = ["Day", "Week", "Month"];
  const employeeOptions = [
    "Last 1 week",
    "Last 2 week",
    "Last 3 week",
    "Last 4 week",
  ];

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

  const chartData = [
    { department: "IT Development", employees: 90 },
    { department: "Design Development", employees: 65 },
    { department: "Keuangan", employees: 58 },
    { department: "HRD", employees: 62 },
    { department: "Pemasaran", employees: 38 },
    { department: "Penjualan", employees: 48 },
    { department: "Produksi", employees: 52 },
    { department: "Tata Kelola", employees: 65 },
  ];

  const chartConfig = {
    employees: {
      label: "Employees",
      color: "#22C55E",
    },
  };

  const CircularProgress = ({ percentage = 80 }) => {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-40 h-40">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 160 160"
          >
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle - Green */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#22C55E"
              strokeWidth="8"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
            {/* Small orange section */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#F97316"
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (20 / 100) * circumference}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
              transform="rotate(288 80 80)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-800">
              {percentage}%
            </span>
            <span className="text-red-500 text-sm flex items-center">
              <span className="mr-1">↓</span>
              25%
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Kehadiran - 80%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>Libur - 20%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <span>Cuti - 3%</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-8 w-full">
      {/* Progress Chart Section */}
      <div className="w-1/3 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-700">
            Insights Kehadiran
          </h3>
          <Select value={attendanceFilter} onValueChange={setAttendanceFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Day">Day</SelectItem>
              <SelectItem value="Week">Week</SelectItem>
              <SelectItem value="Month">Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CircularProgress />
      </div>

      {/* Bar Chart Section */}
      <div className="w-2/3 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-700">
            Total Karyawan Hadir per Divisi
          </h3>
          <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Last 1 week">Last 1 week</SelectItem>
              <SelectItem value="Last 2 week">Last 2 week</SelectItem>
              <SelectItem value="Last 3 week">Last 3 week</SelectItem>
              <SelectItem value="Last 4 week">Last 4 week</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#E5E7EB"
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
            />
            <XAxis
              dataKey="department"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={{ fill: "rgba(34, 197, 94, 0.1)" }}
            />
            <Bar dataKey="employees" radius={[4, 4, 0, 0]} barSize={40}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#22C55E" />
              ))}
              <LabelList
                position="top"
                offset={12}
                className="fill-gray-600"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

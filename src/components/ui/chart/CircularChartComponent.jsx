import { Button, Popover, PopoverAction, PopoverContent } from "keep-react";

const FilterDropdown = ({ value, options, onChange }) => {
  return (
    <Popover>
      <PopoverAction asChild>
        <Button
          variant="outline"
          color="secondary"
          className="w-32 justify-between text-sm"
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
              onClick={() => onChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export const CircularChartComponent = ({
  title = "Insights",
  filterValue,
  filterOptions = [],
  onFilterChange,
  data = [], // Array: [{ label, value, color }]
  trend = 0,
}) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;

  const CircularProgress = () => {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-72 h-72">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 160 160"
          >
            {/* Background */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#E5E7EB"
              strokeWidth="14"
              fill="none"
            />

            {/* Segment Dinamis */}
            {data.map(({ value, color }, i) => {
              const offset = cumulativePercent;
              cumulativePercent += value;
              return (
                <circle
                  key={i}
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke={color}
                  strokeWidth="14"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={
                    circumference - (value / 100) * circumference
                  }
                  strokeLinecap="round"
                  transform={`rotate(${(offset / 100) * 360} 80 80)`}
                  className="transition-all duration-500 ease-out"
                />
              );
            })}
          </svg>

          {/* Label Tengah */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-800">
              {data[0]?.value ?? 0}%
            </span>
            <span className="text-red-500 text-sm flex items-center">
              <span className="mr-1">↓</span>
              {trend}%
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2 text-sm">
          {data.map(({ label, value, color }, idx) => (
            <div className="flex items-center gap-2" key={idx}>
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span>
                {label} - {value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        <FilterDropdown
          value={filterValue}
          options={filterOptions}
          onChange={onFilterChange}
        />
      </div>
      <div className="mt-10">
        <CircularProgress />
      </div>
    </div>
  );
};

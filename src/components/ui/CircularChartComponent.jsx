import { useState } from "react";
import { Button, Popover, PopoverAction, PopoverContent } from "keep-react";

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

export const CircularChartComponent = ({ data }) => {
  const [attendanceFilter, setAttendanceFilter] = useState("Month");
  const attendanceOptions = ["Day", "Week", "Month"];

  const CircularProgress = () => {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;

    const attendance = data?.attendance || 0;
    const holiday = data?.holiday || 0;
    const leave = data?.leave || 0;

    // Hitung rotasi berdasarkan akumulasi
    const attendanceOffset = 0;
    const holidayOffset = (attendance / 100) * 360;
    const leaveOffset = ((attendance + holiday) / 100) * 360;

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

            {/* Kehadiran - Hijau */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#22C55E"
              strokeWidth="14"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={
                circumference - (attendance / 100) * circumference
              }
              strokeLinecap="round"
              transform={`rotate(${attendanceOffset} 80 80)`}
              className="transition-all duration-500 ease-out"
            />

            {/* Libur - Oranye */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#F97316"
              strokeWidth="14"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (holiday / 100) * circumference}
              strokeLinecap="round"
              transform={`rotate(${holidayOffset} 80 80)`}
              className="transition-all duration-500 ease-out"
            />

            {/* Cuti - Abu */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#D1D5DC"
              strokeWidth="14"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (leave / 100) * circumference}
              strokeLinecap="round"
              transform={`rotate(${leaveOffset} 80 80)`}
              className="transition-all duration-500 ease-out"
            />
          </svg>

          {/* Label Tengah */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-800">
              {attendance}%
            </span>
            <span className="text-red-500 text-sm flex items-center">
              <span className="mr-1">↓</span>
              {data?.trend || 25}%
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Kehadiran - {attendance}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>Libur - {holiday}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <span>Cuti - {leave}%</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-700">
          Insights Kehadiran
        </h3>
        <FilterDropdown
          value={attendanceFilter}
          options={attendanceOptions}
          onChange={setAttendanceFilter}
        />
      </div>
      <div className="mt-10">
        <CircularProgress />
      </div>
    </div>
  );
};

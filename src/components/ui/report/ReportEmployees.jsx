import { useState } from "react";
import { CircularChartComponent } from "../chart/CircularChartComponent";

export default function ReportEmployees() {
  const [employeeData, setEmployeeData] = useState({
    permanent: 80,
    probation: 15,
    pkwt: 5,
    trend: 25,
  });
  const [employeeFilter, setEmployeeFilter] = useState("Month");
  const employeeOptions = ["Day", "Week", "Month"];

  const employeeDataArray = [
    { label: "Tetap", value: employeeData.permanent, color: "#22C55E" },
    { label: "Percobaan", value: employeeData.probation, color: "#F97316" },
    { label: "PKWT", value: employeeData.pkwt, color: "#D1D5DC" },
  ];

  return (
    <div className="flex flex-col">
      <div className="p-3 border border-gray-200 rounded-t-lg">
        <span className="text-lg text-[#455468] font-medium">
          Laporan Karyawan
        </span>
      </div>
      <div className="p-3 border border-gray-200 rounded-b-lg">
        <div className="mt-8 flex gap-8">
          <div className="w-[25%]">
            <CircularChartComponent
              title="Status Karyawan"
              filterValue={employeeFilter}
              filterOptions={employeeOptions}
              onFilterChange={setEmployeeFilter}
              data={employeeDataArray}
              trend={employeeData.trend}
            />
          </div>
          <div className="w-[75%]">{/* Table Employees */}</div>
        </div>
      </div>
    </div>
  );
}

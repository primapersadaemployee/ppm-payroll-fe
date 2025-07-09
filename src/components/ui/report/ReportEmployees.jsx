import { useState } from "react";
import CircularChart from "../chart/CircularChart";
import { Input, InputIcon } from "keep-react";
import { MagnifyingGlass, PencilSimple, Trash } from "phosphor-react";
import FilterDropdown from "../dropdown/FilterDropdown";
import TableReportEmployees from "../table/TableReportEmployees";

export default function ReportEmployees() {
  const [employeeData, setEmployeeData] = useState({
    permanent: 80,
    probation: 15,
    pkwt: 5,
    trend: 25,
  });
  const [employeeFilter, setEmployeeFilter] = useState("Month");
  const [tableFilter, setTableFilter] = useState("This Month");
  const [searchQuery, setSearchQuery] = useState("");

  const employeeOptions = ["Day", "Week", "Month"];
  const tableFilterOptions = ["This Months", "This Years"];

  const employeeDataArray = [
    { label: "Tetap", value: employeeData.permanent, color: "#22C55E" },
    { label: "Percobaan", value: employeeData.probation, color: "#F97316" },
    { label: "PKWT", value: employeeData.pkwt, color: "#D1D5DC" },
  ];

  const employeeList = [
    {
      id: 1,
      name: "Maya Thompson",
      avatar:
        "https://cdn.grid.id/crop/82x136:901x681/700x465/photo/2022/12/12/000_332d6fmjpg-20221212112056.jpg",
      contractStart: "12 Juni 2024",
      contractEnd: "12 Juni 2025",
      status: "Tetap",
      statusColor: "success",
    },
    {
      id: 2,
      name: "Jordan Lee",
      avatar:
        "https://cdn.grid.id/crop/82x136:901x681/700x465/photo/2022/12/12/000_332d6fmjpg-20221212112056.jpg",
      contractStart: "12 Juni 2024",
      contractEnd: "12 Juni 2025",
      status: "Percobaan",
      statusColor: "warning",
    },
    {
      id: 3,
      name: "Ava Martinez",
      avatar:
        "https://cdn.grid.id/crop/82x136:901x681/700x465/photo/2022/12/12/000_332d6fmjpg-20221212112056.jpg",
      contractStart: "12 Juni 2024",
      contractEnd: "12 Juni 2025",
      status: "Tetap",
      statusColor: "success",
    },
    {
      id: 4,
      name: "Oliver Smith",
      avatar:
        "https://cdn.grid.id/crop/82x136:901x681/700x465/photo/2022/12/12/000_332d6fmjpg-20221212112056.jpg",
      contractStart: "12 Juni 2024",
      contractEnd: "12 Juni 2025",
      status: "Resign",
      statusColor: "error",
    },
    {
      id: 5,
      name: "Sophia Johnson",
      avatar:
        "https://cdn.grid.id/crop/82x136:901x681/700x465/photo/2022/12/12/000_332d6fmjpg-20221212112056.jpg",
      contractStart: "12 Juni 2024",
      contractEnd: "12 Juni 2025",
      status: "PKWT",
      statusColor: "secondary",
    },
    {
      id: 6,
      name: "Liam Brown",
      avatar:
        "https://cdn.grid.id/crop/82x136:901x681/700x465/photo/2022/12/12/000_332d6fmjpg-20221212112056.jpg",
      contractStart: "12 Juni 2024",
      contractEnd: "12 Juni 2025",
      status: "Tetap",
      statusColor: "success",
    },
    {
      id: 7,
      name: "James Taylor",
      avatar:
        "https://cdn.grid.id/crop/82x136:901x681/700x465/photo/2022/12/12/000_332d6fmjpg-20221212112056.jpg",
      contractStart: "12 Juni 2024",
      contractEnd: "12 Juni 2025",
      status: "Tetap",
      statusColor: "success",
    },
  ];

  const filteredEmployees = employeeList.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <div className="p-3 border border-gray-200 rounded-t-lg">
        <span className="text-lg text-[#455468] font-medium">
          Laporan Karyawan
        </span>
      </div>
      <div className="p-3 border border-gray-200 rounded-b-lg">
        <div className="mt-4 lg:mt-8 flex flex-col xl:flex-row gap-4 lg:gap-8">
          <div className="w-full xl:w-[25%]">
            <CircularChart
              title="Status Karyawan"
              filterValue={employeeFilter}
              filterOptions={employeeOptions}
              onFilterChange={setEmployeeFilter}
              data={employeeDataArray}
              trend={employeeData.trend}
            />
          </div>
          <div className="w-full xl:w-[75%]">
            <div className="border border-gray-200 rounded-lg">
              <div className="p-4 flex flex-col md:flex-row md:justify-between">
                <div className="flex items-center justify-between md:justify-normal md:gap-4 mb-4 md:w-[70%]">
                  <h3 className="lg:text-lg font-medium text-gray-700">
                    Data Karyawan
                  </h3>
                  <FilterDropdown
                    value={tableFilter}
                    options={tableFilterOptions}
                    onChange={setTableFilter}
                  />
                </div>

                <div className="w-full md:w-[30%]">
                  <fieldset className="relative">
                    <Input
                      placeholder="Search Anything"
                      className="ps-11"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <InputIcon>
                      <MagnifyingGlass
                        size={19}
                        color="#2d3643"
                        weight="bold"
                      />
                    </InputIcon>
                  </fieldset>
                </div>
              </div>

              <div className="overflow-x-auto">
                <TableReportEmployees filteredEmployees={filteredEmployees} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

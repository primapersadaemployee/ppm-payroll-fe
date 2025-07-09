import { useState } from "react";
import { CircularChartComponent } from "../chart/CircularChartComponent";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Badge,
  Avatar,
  AvatarImage,
  Input,
  InputIcon,
  Button,
  Popover,
  PopoverAction,
  PopoverContent,
} from "keep-react";
import { MagnifyingGlass, PencilSimple, Trash } from "phosphor-react";

const FilterDropdown = ({ value, options, onChange, placeholder }) => {
  return (
    <Popover>
      <PopoverAction asChild>
        <Button
          variant="outline"
          color="secondary"
          className="w-32 justify-between text-sm"
        >
          {value || placeholder}
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
  const tableFilterOptions = ["This Month", "This Year"];

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
        "https://cdn.builder.io/api/v1/image/assets%2Fe92a801530664afd87b2e1ea886d2c84%2F9b55c53eed154653904fad5ff14b31f0?format=webp&width=40",
      contractStart: "12 Juni 2024",
      contractEnd: "12 Juni 2025",
      status: "Tetap",
      statusColor: "success",
    },
    {
      id: 2,
      name: "Jordan Lee",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets%2Fe92a801530664afd87b2e1ea886d2c84%2F9b55c53eed154653904fad5ff14b31f0?format=webp&width=40",
      contractStart: "12 Juni 2024",
      contractEnd: "12 Juni 2025",
      status: "Percobaan",
      statusColor: "warning",
    },
    {
      id: 3,
      name: "Ava Martinez",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets%2Fe92a801530664afd87b2e1ea886d2c84%2F9b55c53eed154653904fad5ff14b31f0?format=webp&width=40",
      contractStart: "12 Juni 2024",
      contractEnd: "12 Juni 2025",
      status: "Tetap",
      statusColor: "success",
    },
    {
      id: 4,
      name: "Oliver Smith",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets%2Fe92a801530664afd87b2e1ea886d2c84%2F9b55c53eed154653904fad5ff14b31f0?format=webp&width=40",
      contractStart: "12 Juni 2024",
      contractEnd: "12 Juni 2025",
      status: "Resign",
      statusColor: "error",
    },
    {
      id: 5,
      name: "Sophia Johnson",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets%2Fe92a801530664afd87b2e1ea886d2c84%2F9b55c53eed154653904fad5ff14b31f0?format=webp&width=40",
      contractStart: "12 Juni 2024",
      contractEnd: "12 Juni 2025",
      status: "PKWT",
      statusColor: "secondary",
    },
    {
      id: 6,
      name: "Liam Brown",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets%2Fe92a801530664afd87b2e1ea886d2c84%2F9b55c53eed154653904fad5ff14b31f0?format=webp&width=40",
      contractStart: "12 Juni 2024",
      contractEnd: "12 Juni 2025",
      status: "Tetap",
      statusColor: "success",
    },
    {
      id: 7,
      name: "James Taylor",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets%2Fe92a801530664afd87b2e1ea886d2c84%2F9b55c53eed154653904fad5ff14b31f0?format=webp&width=40",
      contractStart: "12 Juni 2024",
      contractEnd: "12 Juni 2025",
      status: "Tetap",
      statusColor: "success",
    },
  ];

  const filteredEmployees = employeeList.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col">
      <div className="p-3 border border-gray-200 rounded-t-lg">
        <span className="text-lg text-[#455468] font-medium">
          Laporan Karyawan
        </span>
      </div>
      <div className="p-3 border border-gray-200 rounded-b-lg">
        <div className="mt-4 lg:mt-8 flex flex-col lg:flex-row gap-4 lg:gap-8">
          <div className="w-full lg:w-[25%]">
            <CircularChartComponent
              title="Status Karyawan"
              filterValue={employeeFilter}
              filterOptions={employeeOptions}
              onFilterChange={setEmployeeFilter}
              data={employeeDataArray}
              trend={employeeData.trend}
            />
          </div>
          <div className="w-full lg:w-[75%]">
            <div className="border border-gray-200 rounded-lg">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-700">
                    Data Karyawan
                  </h3>
                  <FilterDropdown
                    value={tableFilter}
                    options={tableFilterOptions}
                    onChange={setTableFilter}
                    placeholder="Select Period"
                  />
                </div>

                <div className="w-full sm:w-64">
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

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Karyawan</TableHead>
                    <TableHead>Tanggal Kontrak</TableHead>
                    <TableHead>Akhir Kontrak</TableHead>
                    <TableHead>Status Karyawan</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage
                              src={employee.avatar}
                              alt={employee.name}
                            />
                          </Avatar>
                          <span>{employee.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{employee.contractStart}</TableCell>
                      <TableCell>{employee.contractEnd}</TableCell>
                      <TableCell>
                        <Badge color={employee.statusColor}>
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            color="secondary"
                            className="text-xs whitespace-nowrap"
                          >
                            <PencilSimple size={14} />
                            <span className="hidden sm:inline">
                              Perpanjang Kontrak
                            </span>
                            <span className="sm:hidden">Perpanjang</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            color="secondary"
                            className="text-xs whitespace-nowrap"
                          >
                            <Trash size={14} />
                            <span className="hidden sm:inline">
                              Terminasi Kontrak
                            </span>
                            <span className="sm:hidden">Terminasi</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

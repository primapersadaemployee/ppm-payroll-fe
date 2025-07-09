import { Card, CardContent, CardDescription, CardTitle } from "keep-react";
import IconKehadiran from "/iconkehadiran.png";
import { BarChartComponent } from "../chart/BarChartComponent";
import { CircularChartComponent } from "../chart/CircularChartComponent";
import { useState, useEffect } from "react";

export default function ReportAttendance() {
  const [attendanceData, setAttendanceData] = useState({
    attendance: 95,
    holiday: 4,
    leave: 1,
    trend: 25,
  });

  const [attendanceFilter, setAttendanceFilter] = useState("Month");
  const attendanceOptions = ["Day", "Week", "Month"];

  const attendanceDataArray = [
    { label: "Kehadiran", value: attendanceData.attendance, color: "#22C55E" },
    { label: "Libur", value: attendanceData.holiday, color: "#F97316" },
    { label: "Cuti", value: attendanceData.leave, color: "#D1D5DC" },
  ];

  const [departmentData, setDepartmentData] = useState([
    { department: "IT Development", employees: 90 },
    { department: "Design Development", employees: 65 },
    { department: "Keuangan", employees: 58 },
    { department: "HRD", employees: 62 },
    { department: "Pemasaran", employees: 38 },
    { department: "Penjualan", employees: 48 },
    { department: "Produksi", employees: 52 },
    { department: "Tata Kelola", employees: 65 },
  ]);

  const report = [
    {
      id: 1,
      title: "Total Karyawan Hadir",
      total: 832,
    },
    {
      id: 2,
      title: "Total Karyawan Libur",
      total: 30,
    },
    {
      id: 3,
      title: "Total Karyawan Cuti",
      total: 12,
    },
  ];

  const [employeeFilter, setEmployeeFilter] = useState("Last 2 week");

  const employeeOptions = [
    "Last 1 week",
    "Last 2 week",
    "Last 3 week",
    "Last 4 week",
  ];

  const chartConfig = {
    employees: {
      label: "Karyawan",
      color: "#22C55E",
    },
  };

  // TODO: Replace with actual API calls
  useEffect(() => {
    // Fetch attendance data
    // const fetchAttendanceData = async () => {
    //   const response = await fetch('/api/attendance');
    //   const data = await response.json();
    //   setAttendanceData(data);
    // };
    // Fetch department data
    // const fetchDepartmentData = async () => {
    //   const response = await fetch('/api/departments');
    //   const data = await response.json();
    //   setDepartmentData(data);
    // };
    // fetchAttendanceData();
    // fetchDepartmentData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="p-3 border border-gray-200 rounded-t-lg">
        <span className="text-lg text-[#455468] font-medium">
          Laporan Kehadiran
        </span>
      </div>
      <div className="p-3 border border-gray-200 rounded-b-lg">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {report.map((item) => (
              <Card key={item.id} className="max-w-lg bg-[#DDE5FF]">
                <div className="flex justify-between items-center">
                  <CardContent className="flex flex-col gap-5">
                    <CardDescription className="text-base">
                      {item.title}
                    </CardDescription>
                    <CardTitle className="text-3xl">{item.total}</CardTitle>
                  </CardContent>
                  <div className="p-6">
                    <img
                      src={IconKehadiran}
                      alt="Icon Kehadiran"
                      className="w-[72px] h-[72px]"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-4 lg:mt-8 flex flex-col lg:flex-row gap-4 lg:gap-8">
            <div className="w-full lg:w-[25%]">
              <CircularChartComponent
                title="Insights Kehadiran"
                filterValue={attendanceFilter}
                filterOptions={attendanceOptions}
                onFilterChange={setAttendanceFilter}
                data={attendanceDataArray}
                trend={attendanceData.trend}
              />
            </div>
            <div className="w-full lg:w-[75%]">
              <BarChartComponent
                data={departmentData}
                dropdownValue={employeeFilter}
                dropdownOptions={employeeOptions}
                dropDownOnChange={setEmployeeFilter}
                chartConfig={chartConfig}
                title="Total Karyawan Hadir per Divisi"
                dataKey="employees"
                yAxisTicks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

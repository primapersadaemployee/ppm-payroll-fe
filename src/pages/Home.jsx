import { useState, useEffect } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  Input,
  InputIcon,
} from "keep-react";
import { SidebarComponent } from "../components/ui/Sidebar";
import { BellSimple, HouseSimple, MagnifyingGlass } from "phosphor-react";
import BGBeranda from "/bg-beranda.webp";
import PlayStore from "/playstore.png";
import AppStore from "/appstore.png";
import IconKehadiran from "/iconkehadiran.png";
import { BarChartComponent } from "../components/ui/BarChartComponent";
import { CircularChartComponent } from "../components/ui/CircularChartComponent";

export default function Home() {
  const [attendanceData, setAttendanceData] = useState({
    attendance: 95,
    holiday: 4,
    leave: 1,
    trend: 25,
  });

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
    <div className="flex gap-4 font-poppins p-4">
      <SidebarComponent />
      <div className="p-4 w-screen">
        <div className="flex flex-col gap-8">
          <div className="flex gap-[10px] justify-between">
            <fieldset className="relative w-full">
              <Input placeholder="Search Anything" className="ps-11" />
              <InputIcon>
                <MagnifyingGlass size={19} color="#2d3643" weight="bold" />
              </InputIcon>
            </fieldset>
            <div className="flex items-center p-3 bg-[#F5F5F5] rounded-lg">
              <BellSimple size={20} color="#2d3643" weight="bold" />
            </div>
          </div>
          <div className="w-full h-auto bg-[#3629B7] rounded-lg">
            <div className="flex">
              <div className="w-[45%] p-10 flex flex-col gap-8">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">
                        <HouseSimple size={20} weight="bold" color="#FFFFFF" />
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <span className="text-white font-medium">/</span>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href="/"
                        className="text-white font-medium"
                      >
                        Beranda
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-col justify-between h-full">
                  <span className="font-semibold text-4xl text-white">
                    Good Morning , <br /> PT Prima Persada Multimedia
                  </span>
                  <div className="flex gap-5">
                    <img
                      src={PlayStore}
                      alt="Play Store"
                      className="w-40 h-auto"
                    />
                    <img
                      src={AppStore}
                      alt="App Store"
                      className="w-40 h-auto"
                    />
                  </div>
                </div>
              </div>
              <div className="w-[55%]">
                <img
                  src={BGBeranda}
                  alt="BG Beranda"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="p-3 border border-gray-200 rounded-t-lg">
              <span className="text-lg text-[#455468] font-medium">
                Laporan Kehadiran
              </span>
            </div>
            <div className="p-3 border border-gray-200 rounded-b-lg">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card className="max-w-lg bg-[#DDE5FF]">
                    <div className="flex justify-between items-center">
                      <CardContent className="flex flex-col gap-5">
                        <CardDescription className="text-base">
                          Total Karyawan Hadir
                        </CardDescription>
                        <CardTitle className="text-3xl">832</CardTitle>
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
                  <Card className="max-w-lg bg-[#DDE5FF]">
                    <div className="flex justify-between items-center">
                      <CardContent className="flex flex-col gap-5">
                        <CardDescription className="text-base">
                          Total Karyawan Libur
                        </CardDescription>
                        <CardTitle className="text-3xl">30</CardTitle>
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
                  <Card className="max-w-lg bg-[#DDE5FF]">
                    <div className="flex justify-between items-center">
                      <CardContent className="flex flex-col gap-5">
                        <CardDescription className="text-base">
                          Total Karyawan Cuti
                        </CardDescription>
                        <CardTitle className="text-3xl">12</CardTitle>
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
                </div>
                <div className="mt-8 flex gap-8">
                  <div className="w-[25%]">
                    <CircularChartComponent data={attendanceData} />
                  </div>
                  <div className="w-[75%]">
                    <BarChartComponent data={departmentData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

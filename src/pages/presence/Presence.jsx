import { useState } from "react";
import NotificationDashboard from "../../components/ui/notification/NotificationDashboard";
import { CalendarBlank, Clock, SignOut } from "phosphor-react";
import { SidebarComponent } from "../../components/layout/Sidebar";
import { AttendanceData } from "../../data/AttendanceData";
import TableWorkSchedule from "../../components/ui/table/TableWorkSchedule";
import TablePresence from "../../components/ui/table/TablePresence";
import PermissionAndLeave from "../../components/ui/section/PermissionAndLeave";

export default function Presence() {
  const [currentTab, setCurrentTab] = useState(1);

  const tab = [
    {
      id: 1,
      name: "Jadwal Kerja",
      icon: <CalendarBlank size={22} />,
    },
    {
      id: 2,
      name: "Presensi",
      icon: <Clock size={22} />,
    },
    {
      id: 3,
      name: "Izin & Cuti",
      icon: <SignOut size={22} />,
    },
  ];

  return (
    <div className="flex gap-2 lg:gap-4 font-poppins p-2 lg:p-4 min-h-screen text-[#455468]">
      <div className="sticky top-2 lg:top-0 h-fit lg:h-screen shrink-0">
        <SidebarComponent />
      </div>
      <div className="p-2 lg:p-4 w-full flex-1 overflow-hidden">
        <div className="flex flex-col gap-4 lg:gap-6">
          {/* Breadcrumb Navigation */}
          <nav className="text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Clock size={16} weight="fill" />
              <span>/</span>
              <span className="font-medium">Kehadiran</span>
              <span>/</span>
              <span className="text-gray-400">
                {currentTab === 1
                  ? "Jadwal Kerja"
                  : currentTab === 2
                  ? "Presensi"
                  : "Izin & Cuti"}
              </span>
            </div>
          </nav>

          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl lg:text-3xl font-medium">Kehadiran</h1>
            <div className="w-[20%] sm:w-auto">
              <NotificationDashboard />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex gap-1 lg:gap-8">
            {/* Tab Menu */}
            <div className="flex flex-col gap-3 w-fit lg:w-60">
              {tab.map((item) => (
                <div
                  key={item.id}
                  className={`py-1 lg:py-[6px] px-1 lg:px-4 rounded-lg cursor-pointer ${
                    item.id === currentTab
                      ? "bg-secondary"
                      : "bg-transparent hover:bg-secondary"
                  }`}
                  onClick={() => setCurrentTab(item.id)}
                >
                  <div className="flex gap-2 items-center">
                    {item.icon}
                    <span className="font-medium hidden lg:block">
                      {item.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full bg-white overflow-auto">
              {currentTab === 1 && (
                <TableWorkSchedule attendanceData={AttendanceData} />
              )}
              {currentTab === 2 && (
                <TablePresence attendanceData={AttendanceData} />
              )}
              {currentTab === 3 && <PermissionAndLeave />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

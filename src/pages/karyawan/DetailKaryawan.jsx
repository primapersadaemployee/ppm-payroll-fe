import { useState } from "react";
import NotificationHome from "../../components/ui/notification/NotificationHome";
import { Clock, Money, Receipt, UserCircle, Users } from "phosphor-react";
import { SidebarComponent } from "../../components/layout/Sidebar";
import DetailKaryawanPersonal from "../../components/ui/section/DetailKaryawanPersonal";
import DetailKaryawanKehadiran from "../../components/ui/section/DetailKaryawanKehadiran";

export default function DetailKaryawan() {
  const [currentTab, setCurrentTab] = useState(1);

  const tab = [
    {
      id: 1,
      name: "Personal",
      icon: <UserCircle size={22} />,
    },
    {
      id: 2,
      name: "Kehadiran",
      icon: <Clock size={22} />,
    },
    {
      id: 3,
      name: "Payroll",
      icon: <Money size={22} />,
    },
    {
      id: 4,
      name: "Riwayat Gaji",
      icon: <Receipt size={22} />,
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
              <Users size={16} weight="fill" />
              <span>/</span>
              <span className="font-medium">Karyawan</span>
              <span>/</span>
              <span className="font-medium truncate">Detail Karyawan</span>
              <span>/</span>
              <span className="text-gray-400">
                {currentTab === 1
                  ? "Personal"
                  : currentTab === 2
                  ? "Kehadiran"
                  : currentTab === 3
                  ? "Payroll"
                  : "Riwayat Gaji"}
              </span>
            </div>
          </nav>

          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl lg:text-3xl font-medium">Karyawan</h1>
            <div className="w-[20%] sm:w-auto">
              <NotificationHome />
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
            <div className="w-full bg-white rounded-2xl p-2 sm:p-4 lg:p-6 shadow-sm border border-gray-100">
              {currentTab === 1 && <DetailKaryawanPersonal />}
              {currentTab === 2 && <DetailKaryawanKehadiran />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

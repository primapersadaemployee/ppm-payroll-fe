import NotificationDashboard from "../../components/ui/notification/NotificationDashboard";
import { Gear } from "phosphor-react";
import { SidebarComponent } from "../../components/layout/Sidebar";
import { useState } from "react";
import DetailCompany from "../../components/ui/section/DetailCompany";
import TableCompanyPolicy from "../../components/ui/table/TableCompanyPolicy";

export default function Company() {
  const [option, setOption] = useState(1);
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
              <Gear size={16} weight="fill" />
              <span>/</span>
              <span className="font-medium">Setting</span>
              <span>/</span>
              <span>Info Perusahaan</span>
            </div>
          </nav>

          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl lg:text-3xl font-medium">Perusahaan</h1>
            <div className="w-[20%] sm:w-auto">
              <NotificationDashboard />
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full bg-white flex flex-col gap-8">
            {/* Option Button */}
            <div className="relative w-full lg:w-3/4 xl:w-1/2 h-6 sm:h-8 lg:h-10 bg-[#F5F5F5] rounded-lg p-1 flex items-center font-medium text-[#455468]">
              <div
                className={`absolute top-1 left-1 h-4 sm:h-6 lg:h-8 w-[calc(50%-4px)] bg-white rounded-lg shadow transition-all duration-300 ease-in-out ${
                  option === 2 ? "translate-x-full" : "translate-x-0"
                }`}
              ></div>

              <button
                onClick={() => setOption(1)}
                className={`z-10 w-1/2 h-full flex items-center justify-center rounded-lg transition-colors duration-300 text-xs sm:text-sm md:text-base 
        `}
              >
                Info Perusahaan
              </button>

              <button
                onClick={() => setOption(2)}
                className={`z-10 w-1/2 h-full flex items-center justify-center rounded-lg transition-colors duration-300 text-xs sm:text-sm md:text-base 
        `}
              >
                Peraturan Perusahaan
              </button>
            </div>

            {option === 1 ? <DetailCompany /> : <TableCompanyPolicy />}
          </div>
        </div>
      </div>
    </div>
  );
}

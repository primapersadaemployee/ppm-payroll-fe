import NotificationDashboard from "../../components/ui/notification/NotificationDashboard";
import { CurrencyCircleDollar } from "phosphor-react";
import { SidebarComponent } from "../../components/layout/Sidebar";

export default function Payroll() {
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
              <CurrencyCircleDollar size={16} weight="fill" />
              <span>/</span>
              <span className="font-medium">Payroll</span>
            </div>
          </nav>

          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl lg:text-3xl font-medium">Payroll</h1>
            <div className="w-[20%] sm:w-auto">
              <NotificationDashboard />
            </div>
          </div>

          {/* Main Content */}

          <div className="w-full bg-white overflow-auto"></div>
        </div>
      </div>
    </div>
  );
}

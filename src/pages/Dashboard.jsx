import { SidebarComponent } from "../components/layout/Sidebar";
import ReportAttendance from "../components/ui/report/ReportAttendance";
import SearchDashboard from "../components/ui/search/SearchDashboard";
import NotificationDashboard from "../components/ui/notification/NotificationDashboard";
import HeroDashboard from "../components/ui/hero/HeroDashboard";
import ReportSallary from "../components/ui/report/ReportSallary";
import ReportEmployees from "../components/ui/report/ReportEmployees";

export default function Dashboard() {
  return (
    <div className="flex gap-2 lg:gap-4 font-poppins p-2 lg:p-4 min-h-screen">
      <div className="sticky top-2 lg:top-0 h-fit lg:h-screen shrink-0">
        <SidebarComponent />
      </div>
      <div className="p-2 lg:p-4 w-full flex-1 overflow-hidden">
        <div className="flex flex-col gap-4 lg:gap-8">
          <div className="flex flex-row gap-2 lg:gap-[10px] justify-between">
            <div className="w-[80%] sm:flex-1">
              <SearchDashboard />
            </div>
            <div className="w-[20%] sm:w-auto">
              <NotificationDashboard />
            </div>
          </div>
          <HeroDashboard />
          <ReportAttendance />
          <ReportSallary />
          <ReportEmployees />
        </div>
      </div>
    </div>
  );
}

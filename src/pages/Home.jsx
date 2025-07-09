import { SidebarComponent } from "../components/layout/Sidebar";
import ReportAttendance from "../components/ui/report/ReportAttendance";
import SearchHome from "../components/ui/search/SearchHome";
import NotificationHome from "../components/ui/notification/NotificationHome";
import HeroHome from "../components/ui/hero/HeroHome";
import ReportSallary from "../components/ui/report/ReportSallary";
import ReportEmployees from "../components/ui/report/ReportEmployees";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 font-poppins p-2 lg:p-4 min-h-screen">
      <div className="lg:sticky lg:top-0 lg:h-screen">
        <SidebarComponent />
      </div>
      <div className="p-2 lg:p-4 w-full flex-1 overflow-hidden">
        <div className="flex flex-col gap-4 lg:gap-8">
          <div className="flex flex-col sm:flex-row gap-2 lg:gap-[10px] justify-between">
            <div className="w-full sm:flex-1">
              <SearchHome />
            </div>
            <div className="w-full sm:w-auto">
              <NotificationHome />
            </div>
          </div>
          <HeroHome />
          <ReportAttendance />
          <ReportSallary />
          <ReportEmployees />
        </div>
      </div>
    </div>
  );
}

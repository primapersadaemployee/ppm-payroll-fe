import { SidebarComponent } from "../components/layout/Sidebar";
import ReportAttendance from "../components/ui/report/ReportAttendance";
import SearchHome from "../components/ui/search/SearchHome";
import NotificationHome from "../components/ui/notification/NotificationHome";
import HeroHome from "../components/ui/hero/HeroHome";
import ReportSallary from "../components/ui/report/ReportSallary";
import ReportEmployees from "../components/ui/report/ReportEmployees";

export default function Home() {
  return (
    <div className="flex gap-4 font-poppins p-4">
      <SidebarComponent />
      <div className="p-4 w-screen">
        <div className="flex flex-col gap-8">
          <div className="flex gap-[10px] justify-between">
            <SearchHome />
            <NotificationHome />
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

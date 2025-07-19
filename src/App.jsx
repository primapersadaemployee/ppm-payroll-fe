import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Employee from "./pages/employee/Employee";
import AddEmployee from "./pages/employee/AddEmployee";
import DetailEmployee from "./pages/employee/DetailEmployee";
import Presence from "./pages/presence/Presence";
import Payroll from "./pages/payroll/Payroll";
import DetailPayroll from "./pages/payroll/DetailPayroll";
import Announcement from "./pages/announcement/Announcement";
import Report from "./pages/report/Report";
import PayrollSummary from "./pages/report/PayrollSummary";
import PayrollReport from "./pages/report/PayrollReport";
import Settings from "./pages/settings/Settings";
import Company from "./pages/settings/Company";
import PayrollSetting from "./pages/settings/PayrollSetting";
import ScheduleSetting from "./pages/settings/ScheduleSetting";
import Overtime from "./pages/settings/Overtime";
import AttendanceLocation from "./pages/settings/AttendanceLocation";

export default function App() {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/employee/add" element={<AddEmployee />} />
      <Route path="/employee/detail/:id" element={<DetailEmployee />} />
      <Route path="/presence" element={<Presence />} />
      <Route path="/payroll" element={<Payroll />} />
      <Route path="/payroll/detail/:id" element={<DetailPayroll />} />
      <Route path="/announcement" element={<Announcement />} />
      <Route path="/report" element={<Report />} />
      <Route path="/report/payroll-summary" element={<PayrollSummary />} />
      <Route path="/report/payroll" element={<PayrollReport />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/settings/company" element={<Company />} />
      <Route path="/settings/payroll" element={<PayrollSetting />} />
      <Route path="/settings/schedule" element={<ScheduleSetting />} />
      <Route path="/settings/overtime" element={<Overtime />} />
      <Route
        path="/settings/attendance-location"
        element={<AttendanceLocation />}
      />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

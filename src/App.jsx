import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import ResetPassword from './pages/auth/ResetPassword';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Employee from './pages/employee/Employee';
import AddEmployee from './pages/employee/AddEmployee';
import DetailEmployee from './pages/employee/DetailEmployee';
import Presence from './pages/presence/Presence';
import Payroll from './pages/payroll/Payroll';
import DetailPayroll from './pages/payroll/DetailPayroll';

export default function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/employee/add" element={<AddEmployee />} />
      <Route path="/employee/detail/:id" element={<DetailEmployee />} />
      <Route path="/presence" element={<Presence />} />
      <Route path="/payroll" element={<Payroll />} />
      <Route path="/payroll/detail/:id" element={<DetailPayroll />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

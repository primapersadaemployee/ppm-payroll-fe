import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Karyawan from "./pages/Karyawan";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/karyawan" element={<Karyawan />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

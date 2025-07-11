import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Karyawan from "./pages/karyawan/Karyawan";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AddKaryawan from "./pages/karyawan/AddKaryawan";
import DetailKaryawan from "./pages/karyawan/DetailKaryawan";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/karyawan" element={<Karyawan />} />
      <Route path="/karyawan/tambah-karyawan" element={<AddKaryawan />} />
      <Route path="/karyawan/detail-karyawan" element={<DetailKaryawan />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

import { useState } from "react";
import TableSalaryHistory from "../table/TableSalaryHistory";

export default function DetailEmployeeSalaryHistory({ karyawan }) {
  const riwayatGaji = karyawan.riwayatGaji;
  const [salaryHistory] = useState(riwayatGaji);

  return <TableSalaryHistory salaryHistory={salaryHistory} />;
}

import { useState } from "react";
import FilterDropdown from "../dropdown/FilterDropdown";
import TableSalaryHistory from "../table/TableSalaryHistory";

export default function DetailEmployeeSalaryHistory({ karyawan }) {
  const [selectedStatus, setSelectedStatus] = useState("Semua Status");
  const riwayatGaji = karyawan.riwayatGaji;
  const [salaryHistory] = useState(riwayatGaji);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const statuses = ["transfer", "belum transfer"];

  const filterSalaryHistory = salaryHistory.filter((sallary) => {
    const matchesStatus =
      selectedStatus === "Semua Status" || sallary.status === selectedStatus;

    return matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filterSalaryHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSallaryHistory = filterSalaryHistory.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-2xl py-4 lg:py-6 shadow-sm border border-gray-100">
      <div className="flex flex-col xl:flex-row xl:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4 px-4 lg:px-6">
          <h2 className="text-lg font-medium">Riwayat Gaji</h2>
        </div>
        <div className="px-4 lg:px-6">
          <FilterDropdown
            value={selectedStatus}
            options={statuses}
            onChange={handleFilterChange(setSelectedStatus)}
          />
        </div>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto">
        <TableSalaryHistory
          salaryHistory={paginatedSallaryHistory}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

import { useState } from "react";
import FilterDropdown from "../dropdown/FilterDropdown";
import TableKehadiranHarian from "../table/TableKehadiranHarian";
import { DetailKehadiranData } from "../../../data/DetailKehadiranData";

export default function DetailKaryawanKehadiran() {
  const [option, setOption] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("Semua Status");
  const [employees] = useState(DetailKehadiranData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const statuses = ["Hadir", "Izin", "Sakit"];

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter((employee) => {
    const matchesStatus =
      selectedStatus === "Semua Status" || employee.status === selectedStatus;

    return matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-9">
      {/* Option Button */}
      <div className="relative w-full lg:w-3/4 xl:w-1/2 h-6 sm:h-8 lg:h-10 bg-[#F5F5F5] rounded-lg p-1 flex items-center font-medium text-[#455468]">
        <div
          className={`absolute top-1 left-1 h-4 sm:h-6 lg:h-8 w-[calc(50%-4px)] bg-white rounded-lg shadow transition-all duration-300 ease-in-out ${
            option === 2 ? "translate-x-full" : "translate-x-0"
          }`}
        ></div>

        <button
          onClick={() => setOption(1)}
          className={`z-10 w-1/2 h-full flex items-center justify-center rounded-lg transition-colors duration-300 text-xs sm:text-sm md:text-base 
        `}
        >
          Harian
        </button>

        <button
          onClick={() => setOption(2)}
          className={`z-10 w-1/2 h-full flex items-center justify-center rounded-lg transition-colors duration-300 text-xs sm:text-sm md:text-base 
        `}
        >
          Histori Kehadiran
        </button>
      </div>

      {/* Content */}
      <div>
        <div className="bg-white rounded-2xl py-4 lg:py-6 shadow-sm border border-gray-100">
          <div className="flex flex-col xl:flex-row xl:items-center lg:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4 px-4 lg:px-6">
              <h2 className="text-lg font-medium">Daftar Karyawan</h2>
            </div>
            <div className="px-4 lg:px-6">
              <FilterDropdown
                value={selectedStatus}
                options={statuses}
                onChange={handleFilterChange(setSelectedStatus)}
              />
            </div>
          </div>

          {/* Employee Table */}
          <div className="overflow-x-auto">
            <TableKehadiranHarian
              employees={paginatedEmployees}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

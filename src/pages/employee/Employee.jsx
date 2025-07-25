import { useState } from "react";
import { SidebarComponent } from "../../components/layout/Sidebar";
import NotificationDashboard from "../../components/ui/notification/NotificationDashboard";
import TableEmployee from "../../components/ui/table/TableEmployee";
import FilterDropdown from "../../components/ui/dropdown/FilterDropdown";
import { Button, Input, InputIcon } from "keep-react";
import { Plus, MagnifyingGlass, Users } from "phosphor-react";
import { Link } from "react-router-dom";
import { EmployeeData } from "../../data/EmployeeData";
import { useTableFeatures } from "../../hooks/useTableFeatures";

export default function Employee() {
  const [employees] = useState(EmployeeData);

  const filterConfig = [
    {
      name: "division",
      key: "divisi",
      defaultValue: "Semua Divisi",
      keys: ["nama", "idKartuIdentitas"],
    },
    {
      name: "status",
      key: "statusKaryawan",
      defaultValue: "Semua Status",
      keys: ["nama", "idKartuIdentitas"],
    },
  ];

  const {
    currentPage,
    setCurrentPage,
    searchTerm,
    handleSearchChange,
    filters,
    handleFilterChange,
    paginatedData,
    totalPages,
  } = useTableFeatures({
    initialData: employees,
    filterConfig,
  });

  const divisions = [
    "Semua Divisi",
    "IT",
    "Design",
    "Keuangan",
    "HRD",
    "Pemasaran",
    "Penjualan",
    "Produksi",
    "Tata Kelola",
  ];
  const statuses = ["Semua Status", "Tetap", "Resign", "PKWT", "Percobaan"];

  return (
    <div className="flex gap-2 lg:gap-4 font-poppins p-2 lg:p-4 min-h-screen text-[#455468]">
      <div className="sticky top-2 lg:top-0 h-fit lg:h-screen shrink-0">
        <SidebarComponent />
      </div>
      <div className="p-2 lg:p-4 w-full flex-1 overflow-hidden">
        <div className="flex flex-col gap-4 lg:gap-6">
          {/* Breadcrumb */}
          <nav className="text-sm">
            <div className="flex items-center gap-2">
              <Users size={16} weight="fill" />
              <span>/</span>
              <span className="font-medium">Karyawan</span>
            </div>
          </nav>

          {/* Page Title */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl lg:text-3xl font-medium">Karyawan</h1>
            <div className="w-[20%] sm:w-auto">
              <NotificationDashboard />
            </div>
          </div>

          {/* Data Karyawan Section */}
          <div className="bg-white rounded-2xl py-4 lg:py-6 shadow-sm border border-gray-100">
            {/* Section Header with Filters */}
            <div className="flex flex-col xl:flex-row xl:items-center lg:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4 px-4 lg:px-6">
                <h2 className="text-lg font-medium">Daftar Karyawan</h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 lg:gap-4 px-4 lg:px-6">
                <fieldset className="relative w-full">
                  <Input
                    type="text"
                    placeholder="Cari"
                    name="search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="flex-1 ps-11"
                  />
                  <InputIcon>
                    <MagnifyingGlass size={19} color="#2d3643" weight="bold" />
                  </InputIcon>
                </fieldset>
                <Link to="/employee/add">
                  <Button className="flex items-center gap-2 whitespace-nowrap bg-primary hover:bg-primary/90 text-white">
                    <Plus size={16} />
                    Tambah Karyawan
                  </Button>
                </Link>
                <FilterDropdown
                  value={filters.division}
                  options={divisions}
                  onChange={handleFilterChange("division")}
                />
                <FilterDropdown
                  value={filters.status}
                  options={statuses}
                  onChange={handleFilterChange("status")}
                />
              </div>
            </div>

            {/* Employee Table */}
            <div className="overflow-x-auto">
              <TableEmployee
                employees={paginatedData}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

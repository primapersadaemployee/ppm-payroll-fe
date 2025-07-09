import { useState } from "react";
import { SidebarComponent } from "../components/layout/Sidebar";
import SearchHome from "../components/ui/search/SearchHome";
import NotificationHome from "../components/ui/notification/NotificationHome";
import TableKaryawan from "../components/ui/table/TableKaryawan";
import FilterDropdown from "../components/ui/dropdown/FilterDropdown";
import { Button } from "keep-react";
import { Plus } from "phosphor-react";

// Dummy employee data
const generateEmployeeData = () => {
  const positions = ["Manager", "Staff", "Supervisor", "Operator", "Admin"];
  const departments = ["Bendahara", "Marketing", "Dev team", "Operations"];
  const statuses = ["Tetap", "Kontrak", "Freelance"];
  const statusColors = {
    Tetap: "success",
    Kontrak: "warning",
    Freelance: "error",
  };

  return Array.from({ length: 20 }, (_, i) => ({
    id: `1484 - ${String(i + 1).padStart(3, "0")}`,
    name: [
      "John Doe",
      "Jane Smith",
      "Michael Johnson",
      "Emily Davis",
      "David Wilson",
      "Sarah Brown",
      "James Jones",
      "Lisa Garcia",
      "Robert Miller",
      "Jennifer Taylor",
      "William Anderson",
      "Ashley Thomas",
      "Christopher Jackson",
      "Amanda White",
      "Matthew Harris",
      "Jessica Martin",
      "Daniel Thompson",
      "Laura Garcia",
      "Andrew Martinez",
      "Stephanie Robinson",
    ][i],
    position: positions[i % positions.length],
    department: departments[i % departments.length],
    nik: `1234567${String(i + 890).padStart(3, "0")}`,
    status: statuses[i % statuses.length],
    statusColor: statusColors[statuses[i % statuses.length]],
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 1}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`,
    startDate: `01/01/202${(i % 4) + 1}`,
    gender: i % 2 === 0 ? "Laki-laki" : "Perempuan",
    birthDate: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}/${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}/199${Math.floor(Math.random() * 5) + 0}`,
  }));
};

export default function Karyawan() {
  const [employees] = useState(generateEmployeeData());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("Semua Departemen");
  const [selectedStatus, setSelectedStatus] = useState("Semua Status");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "Semua Departemen" ||
      employee.department === selectedDepartment;

    const matchesStatus =
      selectedStatus === "Semua Status" || employee.status === selectedStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Reset to first page when filters change
  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const departments = [
    "Semua Departemen",
    "Bendahara",
    "Marketing",
    "Dev team",
    "Operations",
  ];
  const statuses = ["Semua Status", "Tetap", "Kontrak", "Freelance"];

  return (
    <div className="flex gap-2 lg:gap-4 font-poppins p-2 lg:p-4 min-h-screen">
      <div className="sticky top-2 lg:top-0 h-fit lg:h-screen shrink-0">
        <SidebarComponent />
      </div>
      <div className="p-2 lg:p-4 w-full flex-1 overflow-hidden">
        <div className="flex flex-col gap-4 lg:gap-6">
          {/* Header */}
          <div className="flex flex-row gap-2 lg:gap-[10px] justify-between">
            <div className="w-[80%] sm:flex-1">
              <fieldset className="relative w-full">
                <input
                  type="text"
                  placeholder="Cari karyawan..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </div>
              </fieldset>
            </div>
            <div className="w-[20%] sm:w-auto">
              <NotificationHome />
            </div>
          </div>

          {/* Page Title */}
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800">
              Karyawan
            </h1>
          </div>

          {/* Data Karyawan Section */}
          <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm">
            {/* Section Header with Filters */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Data Karyawan
                </h2>
                <span className="text-sm text-gray-500">
                  {filteredEmployees.length} dari {employees.length} karyawan
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 lg:gap-4">
                <FilterDropdown
                  value={selectedDepartment}
                  options={departments}
                  onChange={handleFilterChange(setSelectedDepartment)}
                />
                <FilterDropdown
                  value={selectedStatus}
                  options={statuses}
                  onChange={handleFilterChange(setSelectedStatus)}
                />
                <Button
                  variant="softBg"
                  color="primary"
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <Plus size={16} />
                  Tambah Karyawan
                </Button>
              </div>
            </div>

            {/* Employee Table */}
            <div className="overflow-x-auto">
              <TableKaryawan
                employees={paginatedEmployees}
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

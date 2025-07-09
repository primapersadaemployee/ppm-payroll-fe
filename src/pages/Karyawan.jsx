import { useState } from "react";
import { SidebarComponent } from "../components/layout/Sidebar";
import NotificationHome from "../components/ui/notification/NotificationHome";
import TableKaryawan from "../components/ui/table/TableKaryawan";
import FilterDropdown from "../components/ui/dropdown/FilterDropdown";
import { Button, Input, InputIcon } from "keep-react";
import { Plus, MagnifyingGlass, House } from "phosphor-react";

// Dummy employee data with all required fields
const generateEmployeeData = () => {
  const names = [
    "John Hassan",
    "Eleanor Prince",
    "Guy Hawkins",
    "Kousar Pol",
    "Jenny Wilson",
    "Ariana McCoy",
    "Kristin Watson",
    "Michel Franklin",
    "Belkissa Armenians",
    "Dummy Employee",
    "Andi Setiawan",
    "Budi Santoso",
    "Citra Dewi",
    "Dian Pratama",
    "Eka Sari",
    "Fajar Rahman",
    "Gita Permata",
    "Hendra Wijaya",
    "Indah Lestari",
    "Joko Susilo",
  ];

  const genders = ["Laki - Laki", "Perempuan"];
  const citizenships = ["WNI", "WNA"];
  const identities = ["KTP", "SIM", "Passport"];
  const birthPlaces = [
    "Bandung",
    "Jakarta",
    "Surabaya",
    "Medan",
    "Semarang",
    "Yogyakarta",
  ];
  const maritalStatuses = ["Belum Menikah", "Menikah", "Janda", "Duda"];
  const religions = ["Islam", "Kristen", "Katolik", "Hindu", "Buddha"];
  const bloodTypes = ["A", "B", "AB", "O"];
  const educations = ["SMA", "D3", "S1", "S2", "S3"];
  const divisions = ["Bendahara", "Marketing", "Dev team", "Operations", "HR"];
  const statuses = ["Tetap", "Kontrak", "Freelance"];
  const statusColors = {
    Tetap: "success",
    Kontrak: "warning",
    Freelance: "error",
  };

  return Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: names[i],
    gender: genders[i % 2],
    citizenship: citizenships[i % 2],
    identity: identities[i % 3],
    idNumber: `1484 - ${String(i + 1).padStart(3, "0")}`,
    nik: `1234567${String(i + 890).padStart(3, "0")}`,
    birthPlace: birthPlaces[i % birthPlaces.length],
    birthDate: `0${(i % 9) + 1}/0${(i % 9) + 1}/200${i % 4}`,
    maritalStatus: maritalStatuses[i % maritalStatuses.length],
    religion: religions[i % religions.length],
    bloodType: bloodTypes[i % bloodTypes.length],
    education: educations[i % educations.length],
    division: divisions[i % divisions.length],
    status: statuses[i % statuses.length],
    statusColor: statusColors[statuses[i % statuses.length]],
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 1}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`,
  }));
};

export default function Karyawan() {
  const [employees] = useState(generateEmployeeData());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("Semua Divisi");
  const [selectedStatus, setSelectedStatus] = useState("Semua Status");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.idNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.nik.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDivision =
      selectedDivision === "Semua Divisi" ||
      employee.division === selectedDivision;

    const matchesStatus =
      selectedStatus === "Semua Status" || employee.status === selectedStatus;

    return matchesSearch && matchesDivision && matchesStatus;
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

  const divisions = [
    "Semua Divisi",
    "Bendahara",
    "Marketing",
    "Dev team",
    "Operations",
    "HR",
  ];
  const statuses = ["Semua Status", "Tetap", "Kontrak", "Freelance"];

  return (
    <div className="flex gap-2 lg:gap-4 font-poppins p-2 lg:p-4 min-h-screen">
      <div className="sticky top-2 lg:top-0 h-fit lg:h-screen shrink-0">
        <SidebarComponent />
      </div>
      <div className="p-2 lg:p-4 w-full flex-1 overflow-hidden">
        <div className="flex flex-col gap-4 lg:gap-6">
          {/* Header with search and notification */}
          <div className="flex flex-row gap-2 lg:gap-[10px] justify-between">
            <div className="w-[80%] sm:flex-1">
              <fieldset className="relative w-full">
                <Input
                  placeholder="Search Anything"
                  className="ps-11"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <InputIcon>
                  <MagnifyingGlass size={19} color="#2d3643" weight="bold" />
                </InputIcon>
              </fieldset>
            </div>
            <div className="w-[20%] sm:w-auto">
              <NotificationHome />
            </div>
          </div>

          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <House size={16} />
              <span>/</span>
              <span className="text-gray-900 font-medium">Karyawan</span>
            </div>
          </nav>

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
              </div>

              <div className="flex flex-col sm:flex-row gap-2 lg:gap-4">
                <FilterDropdown
                  value={selectedDivision}
                  options={divisions}
                  onChange={handleFilterChange(setSelectedDivision)}
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

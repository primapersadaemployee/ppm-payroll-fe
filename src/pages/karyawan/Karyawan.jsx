import { useState } from 'react';
import { SidebarComponent } from '../../components/layout/Sidebar';
import NotificationHome from '../../components/ui/notification/NotificationHome';
import TableKaryawan from '../../components/ui/table/TableKaryawan';
import FilterDropdown from '../../components/ui/dropdown/FilterDropdown';
import { Button, Input, InputIcon } from 'keep-react';
import { Plus, MagnifyingGlass, House, Users } from 'phosphor-react';
import { Link } from 'react-router-dom';
import { KaryawanData } from '../../data/KaryawanData';

export default function Karyawan() {
  const [employees] = useState(KaryawanData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('Semua Divisi');
  const [selectedStatus, setSelectedStatus] = useState('Semua Status');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.idKartuIdentitas
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesDivision =
      selectedDivision === 'Semua Divisi' ||
      employee.divisi === selectedDivision;

    const matchesStatus =
      selectedStatus === 'Semua Status' ||
      employee.statusKaryawan === selectedStatus;

    return matchesSearch && matchesDivision && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + itemsPerPage
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
    'Semua Divisi',
    'IT',
    'Design',
    'Keuangan',
    'HRD',
    'Pemasaran',
    'Penjualan',
    'Produksi',
    'Tata Kelola',
  ];
  const statuses = ['Semua Status', 'Tetap', 'Resign', 'PKWT', 'Percobaan'];

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
              <NotificationHome />
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
                <Link to="/karyawan/tambah-karyawan">
                  <Button className="flex items-center gap-2 whitespace-nowrap bg-primary hover:bg-primary/90 text-white">
                    <Plus size={16} />
                    Tambah Karyawan
                  </Button>
                </Link>
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

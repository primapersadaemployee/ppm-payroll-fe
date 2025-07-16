import {
  Badge,
  Button,
  Input,
  InputIcon,
  Popover,
  PopoverAction,
  PopoverContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "keep-react";
import {
  CaretLeft,
  CaretRight,
  FunnelSimple,
  DownloadSimple,
  MagnifyingGlass,
} from "phosphor-react";
import { useState } from "react";
import FilterDropdown from "../dropdown/FilterDropdown";

export default function TableDetailPayroll({ payrollDetail, onDownload }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("Semua Status");
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const statuses = [
    "Semua Status",
    "Sudah Dibayar",
    "Siap Bayar",
    "Belum Siap",
  ];

  // Filter data based on search term
  const filteredKaryawan = payrollDetail.karyawan.filter((employee) => {
    const matchesSearch = employee.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "Semua Status" ||
      employee.statusPembayaran === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredKaryawan.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredKaryawan.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Sudah Dibayar":
        return "success";
      case "Belum Siap":
        return "error";
      case "Siap Bayar":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <div className="bg-white rounded-2xl py-4 lg:py-6 shadow-sm border border-gray-100">
      {/* Header dengan tombol download dan filter */}
      <div className="flex flex-col xl:flex-row xl:items-center lg:justify-between gap-4 mb-6 px-4 lg:px-6">
        <h2 className="text-lg font-medium">Daftar Payroll</h2>
        <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-end">
          <Button
            className="flex items-center gap-2 whitespace-nowrap bg-primary hover:bg-primary/90 text-white"
            onClick={onDownload}
          >
            <DownloadSimple size={20} />
            Download Slip Gaji Massal
          </Button>
          <div className="flex gap-2 items-center">
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
            <FilterDropdown
              value={selectedStatus}
              options={statuses}
              onChange={handleFilterChange(setSelectedStatus)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="w-full rounded-t-none">
          <TableHeader>
            <TableRow className="text-[#8897AE] bg-[#F9FAFB]">
              {/* {["No", "Nama", "Bank", "Status Pembayaran", "Total"].map(
                (text, i) => (
                  <TableHead
                    key={i}
                    className="text-[#8897AE] bg-[#F9FAFB] text-center"
                  >
                    {text}
                  </TableHead>
                )
              )} */}
              <TableHead className="text-center">No</TableHead>
              <TableHead className="text-center min-w-[150px] truncate">
                Nama
              </TableHead>
              <TableHead className="text-center min-w-[120px]">Bank</TableHead>
              <TableHead className="text-center min-w-[200px]">
                Status Pembayaran
              </TableHead>
              <TableHead className="text-center min-w-[150px]">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((employee, index) => (
                <TableRow
                  key={employee.id}
                  className="hover:bg-gray-50 font-medium"
                >
                  <TableCell className="text-center">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell className="text-center">{employee.name}</TableCell>
                  <TableCell className="text-center">{employee.bank}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      color={getStatusBadge(employee.statusPembayaran)}
                      variant="base"
                    >
                      {employee.statusPembayaran}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {employee.total}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <p className="font-medium">
                    {searchTerm
                      ? "Tidak ada data yang cocok dengan pencarian."
                      : "Belum ada data karyawan."}
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 px-4 lg:px-6">
            <div className="flex items-center justify-between gap-1">
              <Button
                size="sm"
                variant="outline"
                color="secondary"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 flex items-center"
              >
                <CaretLeft size={14} />
                <span>Previous</span>
              </Button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    return (
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1
                    );
                  })
                  .map((page, index, array) => {
                    const showEllipsis =
                      index > 0 && page - array[index - 1] > 1;
                    return (
                      <div key={page} className="flex items-center">
                        {showEllipsis && (
                          <span className="px-2 text-gray-400">...</span>
                        )}
                        <Button
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={`min-w-[32px] h-8 rounded-full ${
                            currentPage === page
                              ? "bg-[#5E718D] text-white hover:bg-[#5E718D]"
                              : "text-[#455468] bg-transparent hover:bg-[#5E718D] hover:text-white"
                          }`}
                        >
                          {page}
                        </Button>
                      </div>
                    );
                  })}
              </div>

              <Button
                size="sm"
                variant="outline"
                color="secondary"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 flex items-center"
              >
                <span>Next</span>
                <CaretRight size={14} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

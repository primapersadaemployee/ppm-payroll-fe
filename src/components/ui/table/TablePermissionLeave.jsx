import {
  Button,
  Input,
  InputIcon,
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
  MagnifyingGlass,
  NotePencil,
  Plus,
} from "phosphor-react";
import { useState } from "react";
import { PermissionLeaveData } from "../../../data/AttendanceData";
import FilterDropdown from "../dropdown/FilterDropdown";
import { useAddPermissionLeaveStore } from "../../../store/presence/AddPermissionLeaveStore";
import { useEditPermissionLeaveStore } from "../../../store/presence/EditPermissionLeaveStore";
import EditPermissionLeaveModal from "../modal/EditPermissionLeaveModal";
import { format } from "date-fns";
import AddPermissionLeaveModal from "../modal/AddPermissionLeaveModal";
import ConfirmModal from "../modal/common/ConfirmModal";
import { useTableFeatures } from "../../../hooks/useTableFeatures";

export default function TablePermissionLeave() {
  const {
    setPermissionLeave,
    setIsFirstModalOpen,
    isSecondModalOpen: isEditSecondModalOpen,
    setIsSecondModalOpen: setIsEditSecondModalOpen,
    resetForm: resetEditForm,
  } = useEditPermissionLeaveStore();
  const {
    setIsFirstModalOpen: setIsAddFirstModalOpen,
    isSecondModalOpen,
    setIsSecondModalOpen,
    resetForm,
  } = useAddPermissionLeaveStore();

  const filterConfig = [
    {
      name: "status",
      key: "status",
      defaultValue: "Semua Status",
      keys: ["nama"],
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
    initialData: PermissionLeaveData,
    filterConfig,
  });

  const statuses = [
    "Semua Status",
    "Disetujui",
    "Ditolak",
    "Arsip",
    "Menunggu Persetujuan",
  ];

  const handleEditPermissionLeave = (id) => {
    setPermissionLeave(id, PermissionLeaveData);
    setIsFirstModalOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl py-4 lg:py-6 shadow-sm border border-gray-100">
      {/* Section Header with Filters */}
      <div className="flex flex-col xl:flex-row xl:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4 px-4 lg:px-6">
          <h2 className="text-lg font-medium">Daftar Izin</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 lg:gap-4 px-4 lg:px-6">
          <Button
            className="flex items-center gap-2 whitespace-nowrap bg-primary hover:bg-primary/90 text-white"
            onClick={() => setIsAddFirstModalOpen(true)}
          >
            <Plus size={16} />
            Tambah Pengajuan
          </Button>
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
            value={filters.status}
            options={statuses}
            onChange={handleFilterChange("status")}
          />
        </div>
      </div>

      {/* Annual Leave Table */}
      <div className="overflow-x-auto">
        <div className="space-y-4">
          <Table className="w-full rounded-t-none">
            <TableHeader>
              <TableRow>
                <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center">
                  No
                </TableHead>
                <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center min-w-[170px]">
                  Nama
                </TableHead>
                <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center min-w-[190px]">
                  Tanggal Pengajuan
                </TableHead>
                <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center min-w-[150px]">
                  Jumlah Hari
                </TableHead>
                <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center min-w-[150px]">
                  Tanggal Izin
                </TableHead>
                <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center min-w-[220px]">
                  Status
                </TableHead>
                <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center min-w-[150px]">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((employee) => (
                  <TableRow
                    key={employee.id}
                    className="hover:bg-gray-50 font-medium"
                  >
                    <TableCell className="text-center">{employee.id}</TableCell>
                    <TableCell className="text-center">
                      {employee.nama}
                    </TableCell>
                    <TableCell className="text-center">
                      {format(employee.tanggalPengajuan, "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell className="text-center">
                      {employee.jumlahHari}
                    </TableCell>
                    <TableCell className="text-center">
                      {format(employee.tanggalIzin, "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell className="text-center">
                      {employee.status}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        className="py-[2px] px-4 bg-[#F5F5F5] text-[#455468] font-medium hover:bg-white hover:text-[#455468]"
                        title="Edit"
                        onClick={() => handleEditPermissionLeave(employee.id)}
                      >
                        <span>
                          <NotePencil size={19} />
                        </span>
                        <span>Edit</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <p className="font-medium">Belum ada data izin.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <AddPermissionLeaveModal />
          <ConfirmModal
            open={isSecondModalOpen}
            onClose={() => {
              setIsSecondModalOpen(false);
              resetForm();
            }}
            title="Tambah Pengajuan Izin Berhasil"
            description="Pengajuan Izin berhasil ditambahkan."
            onClick={() => {
              setIsSecondModalOpen(false);
              resetForm();
            }}
          />
          <EditPermissionLeaveModal permissionLeave={PermissionLeaveData} />
          <ConfirmModal
            open={isEditSecondModalOpen}
            onClose={() => {
              setIsEditSecondModalOpen(false);
              resetEditForm();
            }}
            title="Edit Pengajuan Izin Berhasil"
            description="Pengajuan Izin berhasil diubah."
            onClick={() => {
              setIsEditSecondModalOpen(false);
              resetEditForm();
            }}
          />
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 px-4 lg:px-6">
              <div className="flex items-center justify-between gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  color="secondary"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 flex items-center"
                >
                  <CaretLeft size={14} />
                  <span>Previous</span>
                </Button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      // Show first page, last page, current page, and pages around current
                      return (
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 1
                      );
                    })
                    .map((page, index, array) => {
                      // Add ellipsis if there's a gap
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
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
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
    </div>
  );
}

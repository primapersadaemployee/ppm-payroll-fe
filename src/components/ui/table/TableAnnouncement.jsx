import {
  Badge,
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
import { CaretLeft, CaretRight, MagnifyingGlass, Plus } from "phosphor-react";
import { useState } from "react";
import { AnnounceData } from "../../../data/AnnounceData";
import FilterDropdown from "../dropdown/FilterDropdown";
import { useAddAnnouncementStore } from "../../../store/announcement/AddAnnouncementStore";
import { format } from "date-fns";
import AddAnnouncementModal from "../modal/AddAnnouncementModal";
import ConfirmModal from "../modal/ConfirmModal";
import { id } from "date-fns/locale";

export default function TableAnnouncement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Semua Status");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const {
    setIsFirstModalOpen: setIsAddFirstModalOpen,
    isSecondModalOpen,
    setIsSecondModalOpen,
    resetForm,
  } = useAddAnnouncementStore();

  const statuses = ["Semua Status", "Sudah Dibaca", "Belum Dibaca"];

  // Filter announcements based on search and filters
  const filteredAnnounceData = AnnounceData.filter((announce) => {
    const matchesSearch = announce.isiPengumuman
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "Semua Status" || announce.dibaca === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredAnnounceData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAnnouncements = filteredAnnounceData.slice(
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

  const getStatusBadge = (status) => {
    switch (status) {
      case "Sudah Dibaca":
        return "success";
      case "Belum Dibaca":
        return "error";
      default:
        return "secondary";
    }
  };

  return (
    <div className="bg-white rounded-2xl py-4 lg:py-6 shadow-sm border border-gray-100">
      {/* Section Header with Filters */}
      <div className="flex flex-col xl:flex-row xl:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4 px-4 lg:px-6">
          <h2 className="text-lg font-medium">Daftar Pengumuman</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 lg:gap-4 px-4 lg:px-6">
          <Button
            className="flex items-center gap-2 whitespace-nowrap bg-primary hover:bg-primary/90 text-white"
            onClick={() => setIsAddFirstModalOpen(true)}
          >
            <Plus size={16} />
            Tambah Pengumuman
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
            value={selectedStatus}
            options={statuses}
            onChange={handleFilterChange(setSelectedStatus)}
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
                <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center">
                  Waktu
                </TableHead>
                <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center min-w-[220px]">
                  Tanggal Akhir Publikasi
                </TableHead>
                <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center min-w-[260px]">
                  Text
                </TableHead>
                <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center min-w-[160px]">
                  Dibaca
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAnnouncements.length > 0 ? (
                paginatedAnnouncements.map((announce) => (
                  <TableRow
                    key={announce.id}
                    className="hover:bg-gray-50 font-medium"
                  >
                    <TableCell className="text-center">{announce.id}</TableCell>
                    <TableCell className="text-center">
                      {announce.waktu}
                    </TableCell>
                    <TableCell className="text-center">
                      {format(announce.tanggalAkhirPublikasi, "dd MMMM yyyy", {
                        locale: id,
                      })}
                    </TableCell>
                    <TableCell className="text-center truncate max-w-[260px]">
                      {announce.isiPengumuman}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="base"
                        color={getStatusBadge(announce.dibaca)}
                      >
                        {announce.dibaca}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <p className="font-medium">Belum ada data pengumuman.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <AddAnnouncementModal />
          <ConfirmModal
            open={isSecondModalOpen}
            onClose={() => {
              setIsSecondModalOpen(false);
              resetForm();
            }}
            title="Tambah Pengumuman Berhasil"
            description="Pengumuman berhasil ditambahkan."
            onClick={() => {
              setIsSecondModalOpen(false);
              resetForm();
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

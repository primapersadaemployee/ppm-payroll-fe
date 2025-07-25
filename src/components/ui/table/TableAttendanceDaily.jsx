import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "keep-react";
import { CaretLeft, CaretRight, NotePencil } from "phosphor-react";
import EditAttendanceDailyModal from "../modal/EditAttendanceDailyModal";
import ConfirmModal from "../modal/common/ConfirmModal";
import { useEditAttendanceDailyStore } from "../../../store/employee/EditAttendanceDailyStore";
import { format } from "date-fns";
import { useTableFeatures } from "../../../hooks/useTableFeatures";
import FilterDropdown from "../dropdown/FilterDropdown";

export default function TableAttendanceDaily({ attendances }) {
  const {
    setIsFirstModalOpen,
    setKehadiran,
    isSecondModalOpen,
    setIsSecondModalOpen,
  } = useEditAttendanceDailyStore();
  const editAttendanceDaily = (id) => {
    setKehadiran(id, attendances);
    setIsFirstModalOpen(true);
  };

  const filterConfig = [
    {
      name: "status",
      key: "status",
      defaultValue: "Semua Status",
    },
  ];

  const {
    currentPage,
    setCurrentPage,
    filters,
    handleFilterChange,
    paginatedData,
    totalPages,
  } = useTableFeatures({
    initialData: attendances,
    filterConfig,
  });

  const statuses = ["Semua Status", "Hadir", "Izin", "Sakit"];

  return (
    <div className="bg-white rounded-2xl py-4 lg:py-6 shadow-sm border border-gray-100">
      <div className="flex flex-col xl:flex-row xl:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4 px-4 lg:px-6">
          <h2 className="text-lg font-medium">Daftar Kehadiran Harian</h2>
        </div>
        <div className="px-4 lg:px-6">
          <FilterDropdown
            value={filters.status}
            options={statuses}
            onChange={handleFilterChange("status")}
          />
        </div>
      </div>
      <div className="space-y-4">
        <Table className="w-full rounded-t-none">
          <TableHeader>
            <TableRow>
              <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center">
                No
              </TableHead>
              <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center">
                Tanggal
              </TableHead>
              <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center">
                Shift
              </TableHead>
              <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center">
                Status
              </TableHead>
              <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center">
                Masuk
              </TableHead>
              <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center">
                Keluar
              </TableHead>
              <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center">
                Terlambat
              </TableHead>
              <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center">
                Durasi Terlambat
              </TableHead>
              <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((attendance) => (
                <TableRow
                  key={attendance.id}
                  className="hover:bg-gray-50 font-medium"
                >
                  <TableCell className="text-center">{attendance.id}</TableCell>
                  <TableCell className="text-center">
                    {format(new Date(attendance.tanggal), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell className="text-center">
                    {attendance.shift}
                  </TableCell>
                  <TableCell className="text-center">
                    {attendance.status}
                  </TableCell>
                  <TableCell className="text-center">
                    {attendance.masuk}
                  </TableCell>
                  <TableCell className="text-center">
                    {attendance.keluar}
                  </TableCell>
                  <TableCell className="text-center">
                    {attendance.terlambat}
                  </TableCell>
                  <TableCell className="text-center">
                    {attendance.durasiKeterlambatan}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      className="py-[2px] px-4 bg-[#F5F5F5] text-[#455468] font-medium hover:bg-white hover:text-[#455468]"
                      title="Edit"
                      onClick={() => editAttendanceDaily(attendance.id)}
                    >
                      <NotePencil size={19} />
                      <span>Edit</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <p className="font-medium">
                      Belum ada data kehadiran harian.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <EditAttendanceDailyModal attendances={attendances} />
        <ConfirmModal
          open={isSecondModalOpen}
          onClose={() => setIsSecondModalOpen(false)}
          title="Edit Kehadiran Harian Berhasil"
          description="Kehadiran harian berhasil diubah."
          onClick={() => setIsSecondModalOpen(false)}
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
                          // variant={currentPage === page ? "softBg" : "link"}
                          // color={currentPage === page ? "primary" : "secondary"}
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
  );
}

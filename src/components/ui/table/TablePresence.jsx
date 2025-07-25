import {
  Button,
  DatePicker,
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
  NotePencil,
} from "phosphor-react";
import { useEffect, useState } from "react";
import { format, getDaysInMonth, startOfMonth, addDays } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import EditPresenceModal from "../modal/EditPresenceModal";
import { useEditPresenceStore } from "../../../store/presence/EditPresenceStore";
import ConfirmModal from "../modal/common/ConfirmModal";
import { useTableFeatures } from "../../../hooks/useTableFeatures";

export default function TablePresence({ attendanceData }) {
  const {
    setPresence,
    setIsFirstModalOpen,
    isSecondModalOpen,
    setIsSecondModalOpen,
  } = useEditPresenceStore();

  // Gabungkan dan siapkan data awal
  const flatAttendanceData = attendanceData.flatMap((attendance) =>
    attendance.presensi.map((presensi) => ({
      ...presensi,
      nama: attendance.nama,
      idEmployee: attendance.id,
    }))
  );

  const {
    paginatedData,
    itemsPerPage,
    currentPage,
    setCurrentPage,
    totalPages,
    selectedDate,
    handleDateChange,
  } = useTableFeatures({
    initialData: flatAttendanceData,
    filterConfig: [{ name: "search", keys: ["nama"] }],
    dateFilterKey: "tanggal",
  });

  const [dateList, setDateList] = useState([]);

  // Generate daftar tanggal di bulan ini
  useEffect(() => {
    const start = startOfMonth(selectedDate);
    const days = getDaysInMonth(start);
    const dates = Array.from({ length: days }, (_, i) => {
      const current = addDays(start, i);
      return {
        dateObj: current,
        formatted: format(current, "yyyy-MM-dd"),
        label: format(current, "EEEE", { locale: idLocale }),
      };
    });
    setDateList(dates);
  }, [selectedDate]);

  const handleEditPresence = (idEmployee, idPresence) => {
    setPresence(idEmployee, idPresence, attendanceData);
    setIsFirstModalOpen(true);
  };

  return (
    <>
      {/* Tanggal Horizontal */}
      <div className="flex items-center gap-2 overflow-x-auto px-4 lg:px-6 pb-4">
        {dateList.map((d) => (
          <Button
            key={d.formatted}
            size="sm"
            onClick={() => handleDateChange(d.dateObj)}
            className={`rounded-xl min-w-[128px] px-3 py-8 flex flex-col items-center border border-gray-100 ${
              format(selectedDate, "yyyy-MM-dd") === d.formatted
                ? "bg-primary text-white"
                : "bg-white text-[#455468] hover:bg-primary hover:text-white"
            }`}
          >
            <span className="capitalize font-medium">{d.label}</span>
            <span className="text-xs">{format(d.dateObj, "dd MMM yyyy")}</span>
          </Button>
        ))}
      </div>
      <div className="bg-white rounded-2xl py-4 lg:py-6 shadow-sm border border-gray-100">
        {/* Filter dan Header */}
        <div className="flex flex-col xl:flex-row xl:items-center lg:justify-between gap-4 mb-6 px-4 lg:px-6">
          <h2 className="text-lg font-medium">Daftar Presensi</h2>
          <Popover>
            <PopoverAction asChild>
              <Button
                color="secondary"
                size="lg"
                className="flex gap-2 border border-metal-100"
                variant="outline"
              >
                <FunnelSimple size={20} />
                Filter
              </Button>
            </PopoverAction>
            <PopoverContent align="start" className="max-w-min border-0">
              <DatePicker
                mode="single"
                selected={selectedDate}
                onSelect={handleDateChange}
                captionLayout="dropdown"
                fromYear={1950}
                toYear={2030}
                classNames={{
                  caption: "relative",
                  caption_label: "hidden",
                  caption_dropdowns:
                    "flex gap-4 items-center w-full justify-center",
                  dropdown_month: "min-w-[120px] text-sm",
                  dropdown_year: "min-w-[100px] text-sm",
                  dropdown:
                    "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto">
          <Table className="w-full rounded-t-none">
            <TableHeader>
              <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center">
                No
              </TableHead>
              <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center min-w-[170px]">
                Nama
              </TableHead>
              <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center min-w-[150px]">
                Shift
              </TableHead>
              <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center min-w-[180px]">
                Status
              </TableHead>
              <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center min-w-[150px]">
                Masuk
              </TableHead>
              <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center min-w-[150px]">
                Keluar
              </TableHead>
              <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center min-w-[150px]">
                Terlambat
              </TableHead>
              <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center min-w-[170px]">
                Durasi Terlambat
              </TableHead>
              <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center min-w-[150px]">
                Aksi
              </TableHead>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((presence, index) => (
                  <TableRow
                    key={`${presence.idEmployee}-${presence.id}`}
                    className="hover:bg-gray-50 font-medium"
                  >
                    <TableCell className="text-center">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </TableCell>
                    <TableCell className="text-center">
                      {presence.nama}
                    </TableCell>
                    <TableCell className="text-center">
                      {presence.shift}
                    </TableCell>
                    <TableCell className="text-center">
                      {presence.status}
                    </TableCell>
                    <TableCell className="text-center">
                      {presence.masuk}
                    </TableCell>
                    <TableCell className="text-center">
                      {presence.keluar}
                    </TableCell>
                    <TableCell className="text-center">
                      {presence.terlambat}
                    </TableCell>
                    <TableCell className="text-center">
                      {presence.durasiTerlambat}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        size="sm"
                        className="py-[2px] px-4 bg-[#F5F5F5] text-[#455468] hover:bg-white"
                        onClick={() =>
                          handleEditPresence(presence.idEmployee, presence.id)
                        }
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
                    <p className="font-medium">Belum ada data presensi.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <EditPresenceModal attendanceData={attendanceData} />
          <ConfirmModal
            open={isSecondModalOpen}
            onClose={() => setIsSecondModalOpen(false)}
            title="Edit Kehadiran Presensi Berhasil"
            description="Kehadiran Presensi berhasil diubah."
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
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
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
    </>
  );
}

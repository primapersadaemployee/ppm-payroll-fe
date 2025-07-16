import {
  Button,
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
import { ReportPayroll } from "../../../data/ReportData";
import { useState } from "react";
import { CaretLeft, CaretRight, FunnelSimple } from "phosphor-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function TableReportPayroll() {
  const [selectedMonth, setSelectedMonth] = useState(null); // Null untuk menunjukkan tidak ada filter
  const [selectedYear, setSelectedYear] = useState(null); // Null untuk menunjukkan tidak ada filter
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Data awal (semua data)
  const allPayroll = ReportPayroll;

  // Filter berdasarkan selectedMonth dan selectedYear jika ada
  const filterPayroll =
    selectedMonth !== null && selectedYear !== null
      ? ReportPayroll.filter((payroll) => {
          const payrollDate = new Date(payroll.bulan);
          return (
            payrollDate.getMonth() === selectedMonth &&
            payrollDate.getFullYear() === selectedYear
          );
        })
      : allPayroll;

  // Pagination
  const totalPages = Math.ceil(filterPayroll.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayroll = filterPayroll.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="bg-white rounded-2xl py-4 lg:py-6 shadow-sm border border-gray-100">
      {/* Header dengan tombol dan filter */}
      <div className="flex flex-col xl:flex-row xl:items-center lg:justify-between gap-4 mb-6 px-4 lg:px-6">
        <h2 className="text-lg font-medium">Daftar Pembayaran Gaji</h2>
        <div className="flex gap-2 items-center">
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
              <div className="p-4">
                <div className="flex gap-4 items-center">
                  <select
                    value={selectedMonth ?? ""} // Kosong jika belum dipilih
                    onChange={(e) => {
                      const newMonth = e.target.value
                        ? parseInt(e.target.value)
                        : null;
                      setSelectedMonth(newMonth);
                    }}
                    className="min-w-[120px] text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Semua Bulan</option>
                    {[
                      "Januari",
                      "Februari",
                      "Maret",
                      "April",
                      "Mei",
                      "Juni",
                      "Juli",
                      "Agustus",
                      "September",
                      "Oktober",
                      "November",
                      "Desember",
                    ].map((month, index) => (
                      <option key={index} value={index}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedYear ?? ""} // Kosong jika belum dipilih
                    onChange={(e) => {
                      const newYear = e.target.value
                        ? parseInt(e.target.value)
                        : null;
                      setSelectedYear(newYear);
                    }}
                    className="min-w-[100px] text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Semua Tahun</option>
                    {Array.from({ length: 11 }, (_, i) => 2020 + i).map(
                      (year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="w-full rounded-t-none">
          <TableHeader>
            <TableRow className="bg-[#F9FAFB]">
              <TableHead className="text-[#8897AE] text-center">No</TableHead>
              <TableHead className="text-[#8897AE] text-center min-w-[140px]">
                Bulan
              </TableHead>
              <TableHead className="text-[#8897AE] text-center min-w-[140px]">
                Bank
              </TableHead>
              <TableHead className="text-[#8897AE] text-center min-w-[140px]">
                Jumlah Slip
              </TableHead>
              <TableHead className="text-[#8897AE] text-center min-w-[200px]">
                Total
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPayroll.length > 0 ? (
              paginatedPayroll.map((payroll, index) => (
                <TableRow
                  key={payroll.id}
                  className="hover:bg-gray-50 font-medium cursor-pointer"
                >
                  <TableCell className="text-center">{payroll.id}</TableCell>
                  <TableCell className="text-center">
                    {format(payroll.bulan, "MMMM yyyy", { locale: id })}
                  </TableCell>
                  <TableCell className="text-center">{payroll.bank}</TableCell>
                  <TableCell className="text-center">
                    {payroll.jumlahSlip}
                  </TableCell>
                  <TableCell className="text-center">{payroll.total}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <p className="font-medium">Belum ada data pembayaran gaji.</p>
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

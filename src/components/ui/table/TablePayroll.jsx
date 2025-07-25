import {
  Button,
  Input,
  InputIcon,
  LineProgress,
  LineProgressBar,
  LineProgressText,
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
  MagnifyingGlass,
} from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function TablePayroll({
  paginatedData,
  itemsPerPage,
  currentPage,
  totalPages,
  onPageChange,
  searchTerm,
  onSearchChange,
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
}) {
  const navigate = useNavigate();

  const handleRowClick = (payrollId) => {
    navigate(`/payroll/detail/${payrollId}`);
  };

  const calculateProgressReadyToPay = (karyawan) => {
    const readyToPay = karyawan.filter(
      (k) => k.statusPembayaran === "Siap Bayar"
    ).length;
    return Math.round((readyToPay / karyawan.length) * 100);
  };

  const calculateProgressAlreadyPaid = (karyawan) => {
    const alreadyPaid = karyawan.filter(
      (k) => k.statusPembayaran === "Sudah Dibayar"
    ).length;
    return Math.round((alreadyPaid / karyawan.length) * 100);
  };

  return (
    <div className="bg-white rounded-2xl py-4 lg:py-6 shadow-sm border border-gray-100">
      {/* Header dengan tombol dan filter */}
      <div className="flex flex-col xl:flex-row xl:items-center lg:justify-between gap-4 mb-6 px-4 lg:px-6">
        <h2 className="text-lg font-medium">Daftar Payroll</h2>
        <div className="flex gap-2 items-center">
          {/* <Button
            size="lg"
            className="flex items-center gap-2 whitespace-nowrap bg-primary hover:bg-primary/90 text-white"
          >
            <Plus size={16} />
            Tambah Slip Tidak Tetap
          </Button> */}
          <fieldset className="relative w-full">
            <Input
              type="text"
              placeholder="Cari"
              name="search"
              value={searchTerm}
              onChange={onSearchChange}
              className="flex-1 ps-11"
            />
            <InputIcon>
              <MagnifyingGlass size={19} color="#2d3643" weight="bold" />
            </InputIcon>
          </fieldset>
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
                    value={selectedMonth}
                    onChange={(e) => {
                      const newMonth = parseInt(e.target.value);
                      onMonthChange(newMonth);
                    }}
                    className="min-w-[120px] text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
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
                    value={selectedYear}
                    onChange={(e) => {
                      const newYear = parseInt(e.target.value);
                      onYearChange(newYear);
                    }}
                    className="min-w-[100px] text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
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
            <TableRow className=" bg-[#F9FAFB]">
              <TableHead className="text-[#8897AE] text-center">No</TableHead>
              <TableHead className="text-[#8897AE] text-center">Slip</TableHead>
              <TableHead className="text-[#8897AE] text-center min-w-[220px]">
                Periode
              </TableHead>
              <TableHead className="text-[#8897AE] text-center">
                Karyawan
              </TableHead>
              <TableHead className="text-[#8897AE] text-center min-w-[200px]">
                Siap Bayar
              </TableHead>
              <TableHead className="text-[#8897AE] text-center min-w-[200px]">
                Sudah Bayar
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((payroll, index) => {
                const siapBayarProgress = calculateProgressReadyToPay(
                  payroll.karyawan
                );
                const sudahBayarProgress = calculateProgressAlreadyPaid(
                  payroll.karyawan
                );

                return (
                  <TableRow
                    key={payroll.id}
                    className="hover:bg-gray-50 font-medium cursor-pointer"
                    onClick={() => handleRowClick(payroll.id)}
                  >
                    <TableCell className="text-center">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </TableCell>
                    <TableCell className="text-center">
                      {payroll.slip}
                    </TableCell>
                    <TableCell className="text-center">
                      {`${format(payroll.startPeriode, "dd MMMM yyyy", {
                        locale: id,
                      })} - ${format(payroll.endPeriode, "dd MMMM yyyy", {
                        locale: id,
                      })}`}
                    </TableCell>
                    <TableCell className="text-center">
                      {payroll.karyawan.length}
                    </TableCell>
                    <TableCell className="text-center">
                      <LineProgress progress={siapBayarProgress}>
                        <LineProgressBar
                          lineBackground="bg-success-50"
                          className="bg-success-500 border border-gray-100"
                        />
                        <LineProgressText>
                          {siapBayarProgress}%
                        </LineProgressText>
                      </LineProgress>
                    </TableCell>
                    <TableCell className="text-center">
                      <LineProgress progress={sudahBayarProgress}>
                        <LineProgressBar
                          lineBackground="bg-success-50"
                          className="bg-success-500 border border-gray-100"
                        />
                        <LineProgressText>
                          {sudahBayarProgress}%
                        </LineProgressText>
                      </LineProgress>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <p className="font-medium">Belum ada data payroll.</p>
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
                onClick={() => onPageChange((prev) => Math.max(1, prev - 1))}
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
                          onClick={() => onPageChange(page)}
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
                  onPageChange((prev) => Math.min(totalPages, prev + 1))
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

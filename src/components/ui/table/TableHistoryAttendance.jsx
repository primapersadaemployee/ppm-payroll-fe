import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "keep-react";
import { CaretLeft, CaretRight } from "phosphor-react";

export default function TableHistoryAttendance({
  historyAttendances,
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="space-y-4">
      <Table className="w-full rounded-t-none">
        <TableHeader>
          <TableRow>
            <TableHead className=" text-[#8897AE] bg-[#F9FAFB]">No</TableHead>
            <TableHead className=" text-[#8897AE] bg-[#F9FAFB]">Tipe</TableHead>
            <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center">
              Tanggal
            </TableHead>
            <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center">
              Waktu
            </TableHead>
            <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center">
              Status Lokasi
            </TableHead>
            <TableHead className=" text-[#8897AE] bg-[#F9FAFB] text-center">
              Keluar
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyAttendances.length > 0 ? (
            historyAttendances.map((history) => (
              <TableRow
                key={history.id}
                className="hover:bg-gray-50 font-medium"
              >
                <TableCell className="text-center">{history.id}</TableCell>
                <TableCell className="text-center">{history.tipe}</TableCell>
                <TableCell className="text-center">{history.tanggal}</TableCell>
                <TableCell className="text-center">{history.waktu}</TableCell>
                <TableCell className="text-center">
                  {history.statusLokasi}
                </TableCell>
                <TableCell className="text-center">{history.keluar}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8">
                <div className="flex flex-col items-center gap-2">
                  <p className="font-medium">
                    Belum ada data histori kehadiran.
                  </p>
                </div>
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
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
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
                  const showEllipsis = index > 0 && page - array[index - 1] > 1;

                  return (
                    <div key={page} className="flex items-center">
                      {showEllipsis && (
                        <span className="px-2 text-gray-400">...</span>
                      )}
                      <Button
                        size="sm"
                        // variant={currentPage === page ? "softBg" : "link"}
                        // color={currentPage === page ? "primary" : "secondary"}
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
                onPageChange(Math.min(totalPages, currentPage + 1))
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
  );
}

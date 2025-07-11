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
import EditKehadiranHarianModal from "../modal/EditKehadiranHarianModal";
import { useState } from "react";
import ConfirmKehadiranHarianModal from "../modal/ConfirmKehadiranHarianModal";

export default function TableKehadiranHarian({
  employees,
  currentPage,
  totalPages,
  onPageChange,
}) {
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Table className="w-full rounded-t-none">
        <TableHeader>
          <TableRow>
            <TableHead className=" text-[#8897AE] bg-[#F9FAFB]">No</TableHead>
            <TableHead className=" text-[#8897AE] bg-[#F9FAFB]">
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
          {employees.length > 0 ? (
            employees.map((employee) => (
              <TableRow
                key={employee.id}
                className="hover:bg-gray-50 font-medium"
              >
                <TableCell className="text-center">{employee.id}</TableCell>
                <TableCell className="text-center">
                  {employee.tanggal}
                </TableCell>
                <TableCell className="text-center">{employee.shift}</TableCell>
                <TableCell className="text-center">{employee.status}</TableCell>
                <TableCell className="text-center">{employee.masuk}</TableCell>
                <TableCell className="text-center">{employee.keluar}</TableCell>
                <TableCell className="text-center">
                  {employee.terlambat}
                </TableCell>
                <TableCell className="text-center">
                  {employee.durasiKeterlambatan}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    className="py-[2px] px-4 bg-[#F5F5F5] text-[#455468] font-medium hover:bg-white hover:text-[#455468]"
                    title="Edit"
                    onClick={() => setIsFirstModalOpen(true)}
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
      <EditKehadiranHarianModal
        isFirstModalOpen={isFirstModalOpen}
        setIsFirstModalOpen={setIsFirstModalOpen}
        setIsSecondModalOpen={setIsSecondModalOpen}
      />
      <ConfirmKehadiranHarianModal
        isSecondModalOpen={isSecondModalOpen}
        setIsSecondModalOpen={setIsSecondModalOpen}
      />
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

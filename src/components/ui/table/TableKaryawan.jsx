import {
  Avatar,
  AvatarImage,
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Pagination,
} from "keep-react";
import { PencilSimple, Trash, DotsThree } from "phosphor-react";

export default function TableKaryawan({
  employees,
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="space-y-4">
      <Table className="w-full min-w-[800px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5 min-w-[180px] text-[#8897AE]">
              Nama Karyawan
            </TableHead>
            <TableHead className="w-1/6 min-w-[120px] text-[#8897AE]">
              ID / NIK
            </TableHead>
            <TableHead className="w-1/6 min-w-[120px] text-[#8897AE]">
              Posisi
            </TableHead>
            <TableHead className="w-1/6 min-w-[120px] text-[#8897AE]">
              Departemen
            </TableHead>
            <TableHead className="w-1/6 min-w-[100px] text-[#8897AE]">
              Status
            </TableHead>
            <TableHead className="w-1/6 min-w-[120px] text-[#8897AE] text-center">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <TableRow key={employee.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={employee.avatar} alt={employee.name} />
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        {employee.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {employee.gender}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{employee.id}</span>
                    <span className="text-xs text-gray-500">
                      {employee.nik}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{employee.position}</span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-700">{employee.department}</span>
                </TableCell>
                <TableCell>
                  <Badge variant="base" color={employee.statusColor}>
                    {employee.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      color="secondary"
                      className="p-2 h-8 w-8"
                      title="Edit"
                    >
                      <PencilSimple size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      color="error"
                      className="p-2 h-8 w-8"
                      title="Delete"
                    >
                      <Trash size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      color="secondary"
                      className="p-2 h-8 w-8"
                      title="More"
                    >
                      <DotsThree size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-gray-400">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-medium">
                    Tidak ada data karyawan
                  </p>
                  <p className="text-gray-400 text-sm">
                    Coba ubah filter atau kata kunci pencarian
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            Halaman {currentPage} dari {totalPages}
          </div>
          <Pagination>
            <Pagination.Navigator
              prev
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            />

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
                    <Pagination.Item
                      active={currentPage === page}
                      onClick={() => onPageChange(page)}
                    >
                      {page}
                    </Pagination.Item>
                  </div>
                );
              })}

            <Pagination.Navigator
              next
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
}

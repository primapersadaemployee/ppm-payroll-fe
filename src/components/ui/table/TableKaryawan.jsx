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
} from "keep-react";
import {
  PencilSimple,
  Trash,
  DotsThree,
  CaretLeft,
  CaretRight,
} from "phosphor-react";

export default function TableKaryawan({
  employees,
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="space-y-4">
      <Table className="w-full min-w-[1600px]">
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[150px] text-[#8897AE]">Nama</TableHead>
            <TableHead className="min-w-[120px] text-[#8897AE]">
              Jenis Kelamin
            </TableHead>
            <TableHead className="min-w-[80px] text-[#8897AE]">Warga</TableHead>
            <TableHead className="min-w-[100px] text-[#8897AE]">
              Identitas
            </TableHead>
            <TableHead className="min-w-[120px] text-[#8897AE]">
              ID/NIK
            </TableHead>
            <TableHead className="min-w-[120px] text-[#8897AE]">
              Tempat Lahir
            </TableHead>
            <TableHead className="min-w-[120px] text-[#8897AE]">
              Tanggal Lahir
            </TableHead>
            <TableHead className="min-w-[130px] text-[#8897AE]">
              Status Perkawinan
            </TableHead>
            <TableHead className="min-w-[80px] text-[#8897AE]">Agama</TableHead>
            <TableHead className="min-w-[120px] text-[#8897AE]">
              Golongan Darah
            </TableHead>
            <TableHead className="min-w-[140px] text-[#8897AE]">
              Pendidikan Terakhir
            </TableHead>
            <TableHead className="min-w-[100px] text-[#8897AE]">
              Divisi
            </TableHead>
            <TableHead className="min-w-[130px] text-[#8897AE]">
              Status Karyawan
            </TableHead>
            <TableHead className="min-w-[80px] text-[#8897AE] text-center">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <TableRow key={employee.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={employee.avatar} alt={employee.name} />
                    </Avatar>
                    <span className="font-medium text-gray-900">
                      {employee.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{employee.gender}</TableCell>
                <TableCell>{employee.citizenship}</TableCell>
                <TableCell>{employee.identity}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{employee.idNumber}</span>
                    <span className="text-xs text-gray-500">
                      {employee.nik}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{employee.birthPlace}</TableCell>
                <TableCell>{employee.birthDate}</TableCell>
                <TableCell>{employee.maritalStatus}</TableCell>
                <TableCell>{employee.religion}</TableCell>
                <TableCell>
                  <span className="font-medium">{employee.bloodType}</span>
                </TableCell>
                <TableCell>{employee.education}</TableCell>
                <TableCell>{employee.division}</TableCell>
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
                      className="p-1 h-6 w-6"
                      title="Edit"
                    >
                      <PencilSimple size={12} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      color="error"
                      className="p-1 h-6 w-6"
                      title="Delete"
                    >
                      <Trash size={12} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      color="secondary"
                      className="p-1 h-6 w-6"
                      title="More"
                    >
                      <DotsThree size={12} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={14} className="text-center py-8">
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
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="outline"
              color="secondary"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2"
            >
              <CaretLeft size={14} />
            </Button>

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
                      variant={currentPage === page ? "softBg" : "outline"}
                      color={currentPage === page ? "primary" : "secondary"}
                      onClick={() => onPageChange(page)}
                      className="min-w-[32px] h-8"
                    >
                      {page}
                    </Button>
                  </div>
                );
              })}

            <Button
              size="sm"
              variant="outline"
              color="secondary"
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="p-2"
            >
              <CaretRight size={14} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
